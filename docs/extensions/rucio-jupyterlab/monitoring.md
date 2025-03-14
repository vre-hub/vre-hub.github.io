# Prometheus monitoring

[Prometheus](https://prometheus.io/docs/introduction/overview/) is an open-source systems monitoring and alerting toolkit. 
It collects and stores its metrics as time series data, i.e. metrics information is stored with the timestamp at which it was recorded, alongside optional key-value pairs called labels.

## Monitoring configuration for the Rucio Jupyterlab extension

In order to integrate the metrics with the extension the current directoruy structure has been modified in the following way (only added/ modified files are shown):
```
rucio_jupyterlab/
├── __init__.py
├── metrics.py
├── handlers/
│   ├── handlers.py
│   └── instances.py
```

---
### ✅ New file:  `metrics.py`

This file **defines and exposes prometheus metrics and helper decorators** in isolation.

```python
from prometheus_client import Counter, Summary, generate_latest, CONTENT_TYPE_LATEST
import functools

REQUEST_COUNT = Counter('my_jupyterlab_extension_requests_total', 'Total number of HTTP requests')
REQUEST_LATENCY = Summary('my_jupyterlab_extension_request_latency_seconds', 'Latency of HTTP requests')

# decorator to measure metrics automatically
def prometheus_metrics(handler_method):
    @functools.wraps(handler_method)
    def wrapper(self, *args, **kwargs):
        REQUEST_COUNT.inc()
        with REQUEST_LATENCY.time():
            return handler_method(self, *args, **kwargs)
    return wrapper
```

---

### 📝 Modified file:`handlers.py` - ***NOT NECESSARY***

This file **declares MetricsHandler to expose the `/metrics` URL** clearly.

```python
from jupyter_server.base.handlers import JupyterHandler
from .metrics import generate_latest, CONTENT_TYPE_LATEST

class MetricsHandler(JupyterHandler):
    def get(self):
        self.set_header("Content-Type", CONTENT_TYPE_LATEST)
        self.finish(generate_latest())
```

Then when spawning routes: 
```python
(url_path_join(base_path, 'metrics'), MetricsHandler),
```

Where `base_path = url_path_join(base_url, 'rucio-jupyterlab')`

#### Why is this not necessary? 

We want to aggregate all the metrics under **the same endpoint**, which is natively `web_app.settings["base_url"]/metrics`.
In this case, creting an additional endpoint in `rucio-jupyterlab/metrics` is not needed!

:::tip[Use the native `/metrics` endpoint!]
Don't bother adding the stuff above, and leverage the endpoint created by the Jupyter server!
:::
---

### 📝 Modified file:  `instances.py`

In this file the `prometheus_metrics` function is imported as a decorator right after the one that checks authentication.

```python
import json
import tornado
from rucio_jupyterlab.db import get_db
from rucio_jupyterlab.rucio import RucioAPI
from .base import RucioAPIHandler
from rucio_jupyterlab.metrics import prometheus_metrics

class InstancesHandler(RucioAPIHandler):

    @tornado.web.authenticated  # Ensure user authentication first
    @prometheus_metrics         # Then increment the metrics
    def get(self):
        db = get_db()
        active_instance = db.get_active_instance()
        if not active_instance:
            active_instance = self.rucio_config.get_default_instance()

        auth_type = db.get_active_auth_method()
        if not auth_type:
            auth_type = self.rucio_config.get_default_auth_type()

        instances = self.rucio_config.list_instances()
        self.finish(json.dumps({
            'active_instance': active_instance,
            'auth_type': auth_type,
            'instances': instances
        }))

    @tornado.web.authenticated
    @prometheus_metrics
    def put(self):
        json_body = self.get_json_body()
        picked_instance = json_body['instance']
        picked_auth_type = json_body['auth']

        db = get_db()
        db.set_active_instance(picked_instance)
        db.set_active_auth_method(picked_auth_type)

        RucioAPI.clear_auth_token_cache()

        self.finish(json.dumps({'success': True}))
```

---

### Including all the other handlers

Adding decorators to the handlers that need to be tracked is the next step.
Example with `PurgeCacheHandler` below:

```python [purge_cache.py]
#purge_cache.py
import json
import tornado
from rucio_jupyterlab.db import get_db
from .base import RucioAPIHandler
from rucio_jupyterlab.metrics import prometheus_metrics

class PurgeCacheHandler(RucioAPIHandler):
    @tornado.web.authenticated
    @prometheus_metrics
    def post(self):
        db = get_db()  # pylint: disable=invalid-name
        db.purge_cache()
        self.finish(json.dumps({'success': True}))
```