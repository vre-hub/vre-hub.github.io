# Installation guide for users

## Intallation via pip

To install the extension, run the following command:
```bash
pip install reana-jupyterlab
```

In case you want to run the tests, install the extension with the following command:
```bash
pip install reana-jupyterlab[dev]
```

## Docker image
It is possible to run the extension in a Docker container. To download and run the image, use the following commands:
```bash
docker pull ghcr.io/vre-hub/reana-jupyterlab-extension:<version>
docker run -p 8888:8888 ghcr.io/vre-hub/reana-jupyterlab-extension
```

All the available versions can be found [here](https://github.com/vre-hub/reana-jupyterlab-extension/pkgs/container/reana-jupyterlab-extension).