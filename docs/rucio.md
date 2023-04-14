# The Rucio Data Lake 

The Data Lake infrastructure is made up of distributed Storge Elements adn of a reliable framework to upload and transfer data between them. 
An overview of the available Rucio Storage Elements (RSEs) can be foudn in the [Grafana monitoring dashboard](https://monit-grafana.cern.ch/d/PJ65OqBVz/vre-rucio-events?orgId=51). If you do not have access to it, register with a CERN SSO account, them email us at _escape-cern-ops@cern.ch_. 
The location of the storage elemtns is shown on the map:

<html>
<head>
    
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    
        <script>
            L_NO_TOUCH = false;
            L_DISABLE_3D = false;
        </script>
    
    <style>html, body {width: 100%;height: 100%;margin: 0;padding: 0;}</style>
    <style>#map {position:absolute;top:0;bottom:0;right:0;left:0;}</style>
    <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.js"></script>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/python-visualization/folium/folium/templates/leaflet.awesome.rotate.min.css"/>
    
            <meta name="viewport" content="width=device-width,
                initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <style>
                #map_d33ed0a4ea1be488d4518a9af2cc6b04 {
                    position: relative;
                    width: 100.0%;
                    height: 100.0%;
                    left: 0.0%;
                    top: 0.0%;
                }
                .leaflet-container { font-size: 1rem; }
            </style>
        
</head>
<body>
    
    
            <div class="folium-map" id="map_d33ed0a4ea1be488d4518a9af2cc6b04" ></div>
        
</body>
<script>
    
    
            var map_d33ed0a4ea1be488d4518a9af2cc6b04 = L.map(
                "map_d33ed0a4ea1be488d4518a9af2cc6b04",
                {
                    center: [40.0, 0.0],
                    crs: L.CRS.EPSG3857,
                    zoom: 3,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );

            

        
    
            var tile_layer_e2a08e0b6ddff30d6bc6d44fcd4e6b7b = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
            var marker_b19befb5078314d12ebf6ace4e4a8b8e = L.marker(
                [46.23, 6.05],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
            var div_icon_bb1d95e17b76c62431d2f52e57aed383 = L.divIcon({"className": "empty", "html": "\u003cdiv style=\"font-family: courier new; font-size: 15px; color: blue\"\u003eCERN\u003c/div\u003e"});
            marker_b19befb5078314d12ebf6ace4e4a8b8e.setIcon(div_icon_bb1d95e17b76c62431d2f52e57aed383);
        
    
        var popup_2d8bdc9f60fa4542870f7c2c845791ec = L.popup({"maxWidth": "100%"});

        
            
                var html_61ac8c6e38e617ed1ca45ab95292a869 = $(`<div id="html_61ac8c6e38e617ed1ca45ab95292a869" style="width: 100.0%; height: 100.0%;">CERN</div>`)[0];
                popup_2d8bdc9f60fa4542870f7c2c845791ec.setContent(html_61ac8c6e38e617ed1ca45ab95292a869);
            
        

        marker_b19befb5078314d12ebf6ace4e4a8b8e.bindPopup(popup_2d8bdc9f60fa4542870f7c2c845791ec)
        ;

        
    
    
            var marker_88ddb5868808d612a5d7cfbcb6894b0c = L.marker(
                [44.0, 11.0],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
            var div_icon_565fbead3b04e23af86d01673b6530a8 = L.divIcon({"className": "empty", "html": "\u003cdiv style=\"font-family: courier new; font-size: 15px; color: blue\"\u003eCNAF\u003c/div\u003e"});
            marker_88ddb5868808d612a5d7cfbcb6894b0c.setIcon(div_icon_565fbead3b04e23af86d01673b6530a8);
        
    
        var popup_dd94a8cf3e0c6758f90f6b3b84cd1b91 = L.popup({"maxWidth": "100%"});

        
            
                var html_bfad9fb5beba3050384c1a1475087948 = $(`<div id="html_bfad9fb5beba3050384c1a1475087948" style="width: 100.0%; height: 100.0%;">CNAF</div>`)[0];
                popup_dd94a8cf3e0c6758f90f6b3b84cd1b91.setContent(html_bfad9fb5beba3050384c1a1475087948);
            
        

        marker_88ddb5868808d612a5d7cfbcb6894b0c.bindPopup(popup_dd94a8cf3e0c6758f90f6b3b84cd1b91)
        ;

        
    
    
            var marker_516d78249b5246ba001b48a41988ca56 = L.marker(
                [50.0, 14.0],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
            var div_icon_35499eaf0cf67851dcb27634d202973e = L.divIcon({"className": "empty", "html": "\u003cdiv style=\"font-family: courier new; font-size: 15px; color: blue\"\u003eCENSNET\u003c/div\u003e"});
            marker_516d78249b5246ba001b48a41988ca56.setIcon(div_icon_35499eaf0cf67851dcb27634d202973e);
        
    
        var popup_51e79b1557ec4a9f7c1f30dfcd46afbc = L.popup({"maxWidth": "100%"});

        
            
                var html_9e40e722cbb41ed0ff7dfa1a74093d69 = $(`<div id="html_9e40e722cbb41ed0ff7dfa1a74093d69" style="width: 100.0%; height: 100.0%;">CENSNET</div>`)[0];
                popup_51e79b1557ec4a9f7c1f30dfcd46afbc.setContent(html_9e40e722cbb41ed0ff7dfa1a74093d69);
            
        

        marker_516d78249b5246ba001b48a41988ca56.bindPopup(popup_51e79b1557ec4a9f7c1f30dfcd46afbc)
        ;

        
    
    
            var marker_2e704d433d8136e6a4f8c21aef060523 = L.marker(
                [53.57, 9.88],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
            var div_icon_79bb81d0d1f44406fcdc2eade2fb7e57 = L.divIcon({"className": "empty", "html": "\u003cdiv style=\"font-family: courier new; font-size: 15px; color: blue\"\u003eDESY\u003c/div\u003e"});
            marker_2e704d433d8136e6a4f8c21aef060523.setIcon(div_icon_79bb81d0d1f44406fcdc2eade2fb7e57);
        
    
        var popup_edf7897a0d9886b175a6c2cd342ba777 = L.popup({"maxWidth": "100%"});

        
            
                var html_0393d59c57e2d2e911f884ef431112be = $(`<div id="html_0393d59c57e2d2e911f884ef431112be" style="width: 100.0%; height: 100.0%;">DESY</div>`)[0];
                popup_edf7897a0d9886b175a6c2cd342ba777.setContent(html_0393d59c57e2d2e911f884ef431112be);
            
        

        marker_2e704d433d8136e6a4f8c21aef060523.bindPopup(popup_edf7897a0d9886b175a6c2cd342ba777)
        ;

        
    
    
            var marker_ebb43e1306fc8af5022e810c44931d41 = L.marker(
                [45.78, 4.86],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
            var div_icon_a0e1f974ef9a0a03f4f0c2445917e8d8 = L.divIcon({"className": "empty", "html": "\u003cdiv style=\"font-family: courier new; font-size: 15px; color: blue\"\u003eCC\u003c/div\u003e"});
            marker_ebb43e1306fc8af5022e810c44931d41.setIcon(div_icon_a0e1f974ef9a0a03f4f0c2445917e8d8);
        
    
        var popup_f7d5d57457546664698cb86340ba1ec8 = L.popup({"maxWidth": "100%"});

        
            
                var html_c91c6ca10941b27ef7749ef7bd9b27a6 = $(`<div id="html_c91c6ca10941b27ef7749ef7bd9b27a6" style="width: 100.0%; height: 100.0%;">CC</div>`)[0];
                popup_f7d5d57457546664698cb86340ba1ec8.setContent(html_c91c6ca10941b27ef7749ef7bd9b27a6);
            
        

        marker_ebb43e1306fc8af5022e810c44931d41.bindPopup(popup_f7d5d57457546664698cb86340ba1ec8)
        ;

        
    
    
            var marker_5d648a7b9900799a4f5c662edf0e0c3e = L.marker(
                [46.23, 6.05],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
        var popup_1cef76c0ca2f7c61dfdf4b49d20727b3 = L.popup({"maxWidth": "100%"});

        
            
                var html_1e0e108315b85accfedb8a3cca3ab129 = $(`<div id="html_1e0e108315b85accfedb8a3cca3ab129" style="width: 100.0%; height: 100.0%;">CERN</div>`)[0];
                popup_1cef76c0ca2f7c61dfdf4b49d20727b3.setContent(html_1e0e108315b85accfedb8a3cca3ab129);
            
        

        marker_5d648a7b9900799a4f5c662edf0e0c3e.bindPopup(popup_1cef76c0ca2f7c61dfdf4b49d20727b3)
        ;

        
    
    
            var marker_633b2b5b7796ded80f89cc437979f37a = L.marker(
                [44.0, 11.0],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
        var popup_216ea95b79c2d5202dfca03de6cad842 = L.popup({"maxWidth": "100%"});

        
            
                var html_c41e07fa72a1bbf82c7f179a40e59333 = $(`<div id="html_c41e07fa72a1bbf82c7f179a40e59333" style="width: 100.0%; height: 100.0%;">CNAF</div>`)[0];
                popup_216ea95b79c2d5202dfca03de6cad842.setContent(html_c41e07fa72a1bbf82c7f179a40e59333);
            
        

        marker_633b2b5b7796ded80f89cc437979f37a.bindPopup(popup_216ea95b79c2d5202dfca03de6cad842)
        ;

        
    
    
            var marker_c63de1235e2e8174937c7f9e857ca711 = L.marker(
                [50.0, 14.0],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
        var popup_c6158bbd33ccfc4d14cd787f2aac14e4 = L.popup({"maxWidth": "100%"});

        
            
                var html_fb704c01ccd6cc6e9fd2336ef176e487 = $(`<div id="html_fb704c01ccd6cc6e9fd2336ef176e487" style="width: 100.0%; height: 100.0%;">CENSNET</div>`)[0];
                popup_c6158bbd33ccfc4d14cd787f2aac14e4.setContent(html_fb704c01ccd6cc6e9fd2336ef176e487);
            
        

        marker_c63de1235e2e8174937c7f9e857ca711.bindPopup(popup_c6158bbd33ccfc4d14cd787f2aac14e4)
        ;

        
    
    
            var marker_de0619ed9a9cb0a62051aadf2a9ef320 = L.marker(
                [53.57, 9.88],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
        var popup_8a76e17cead2e397a4d0952ac1d3ca52 = L.popup({"maxWidth": "100%"});

        
            
                var html_3f5135bffd557973b85507b166b64733 = $(`<div id="html_3f5135bffd557973b85507b166b64733" style="width: 100.0%; height: 100.0%;">DESY</div>`)[0];
                popup_8a76e17cead2e397a4d0952ac1d3ca52.setContent(html_3f5135bffd557973b85507b166b64733);
            
        

        marker_de0619ed9a9cb0a62051aadf2a9ef320.bindPopup(popup_8a76e17cead2e397a4d0952ac1d3ca52)
        ;

        
    
    
            var marker_d73b38728eb6ecf31308633204e9562e = L.marker(
                [45.78, 4.86],
                {}
            ).addTo(map_d33ed0a4ea1be488d4518a9af2cc6b04);
        
    
        var popup_1fb6f61619dfac0dabcc021dff5ec454 = L.popup({"maxWidth": "100%"});

        
            
                var html_14432932ca5377655d34717b2e4f4f2b = $(`<div id="html_14432932ca5377655d34717b2e4f4f2b" style="width: 100.0%; height: 100.0%;">CC</div>`)[0];
                popup_1fb6f61619dfac0dabcc021dff5ec454.setContent(html_14432932ca5377655d34717b2e4f4f2b);
            
        

        marker_d73b38728eb6ecf31308633204e9562e.bindPopup(popup_1fb6f61619dfac0dabcc021dff5ec454)
        ;

        
    
</script>
</html>

This guide takes a look at how to install the Rucio client environment in two different ways. 
1. Installing the required packages on your local machine
2. Using a Docker container. Docker technologies mitigate dependency and platform specific issues, and are therefore recommended; however, if you want to upload large data that are present on your system, you will need to copy them inside the Docker container, and then upload them on the Rucio DataLake. This might be cumbersome, especially if you are dealing with large files. 


In general, there are two main ways to authenticate to the Rucio instance: via X509 certificates and via OIDC tokens. These two ways require different configuration files for Rucio. 

### X509 Rucio configuration 

The X509 certificate is placed in the `.globus/` directory. 
The `rucio.cfg` file is usually place in the `/opt/rucio/etc/` directory. 

```console
[client]
rucio_host = https://escape-rucio.cern.ch
auth_host = https://escape-rucio-auth.cern.ch
ca_cert = /etc/pki/tls/certs/CERN-bundle.pem
auth_type = x509_proxy
username =
password =
account = <myrucioaccount>
client_cert = .globus/usercert.pem
client_key = .globus/userkey.pem
client_x509_proxy = /tmp/x509_up #(or check where the voms-proxy-init command saves the proxy file!)
request_retries = 3

[policy]
permission = generic
schema = generic
lfn2pfn_algorithm_default = hash
support = https://github.com/rucio/rucio/issues/
support_rucio = https://github.com/rucio/rucio/issues/
```

### OIDC token Rucio configuration 

The `rucio.cfg` file is usually place in the `/opt/rucio/etc/` directory. 

```console
[client]
rucio_host = https://escape-rucio.cern.ch
auth_host = https://escape-rucio-auth.cern.ch
ca_cert = /etc/pki/tls/certs/CERN-bundle.pem
auth_type = oidc
username =
password =
account = <your_account>
request_retries = 3
oidc_issuer = escape
auth_oidc_refresh_activate = true
oidc_scope = openid profile offline_access wlcg wlcg.groups
oidc_polling = true

[policy]
permission = escape
schema = escape
lfn2pfn_algorithm_default = hash
support = https://github.com/rucio/rucio/issues/
support_rucio = https://github.com/rucio/rucio/issues/
```

## 1. Manual installation 

We assume you are running the commands from a CentOS Linux distribution, in our case a `CS8 - x86_64` image. Run the commands int he following order:

```console
yum install -y epel-release.noarch && \
    yum clean all && \
    rm -rf /var/cache/yum
    
yum upgrade -y && \
    yum clean all && \
    rm -rf /var/cache/yum
    
yum -y install wget gfal2*

yum -y install https://repo.ius.io/ius-release-el7.rpm && \
    yum install -y voms-clients-java gfal2-all gfal2-util python3-gfal2 xrootd-client\
                   nordugrid-arc-client nordugrid-arc-plugins-gfal \
                   nordugrid-arc-plugins-globus nordugrid-arc-plugins-s3 \
                   nordugrid-arc-plugins-xrootd && \
    yum clean all && \
    rm -rf /var/cache/yum

```
Then, install the certificates for the VOMS validation:


```console
curl -Lo /etc/yum.repos.d/EGI-trustanchors.repo https://repository.egi.eu/sw/production/cas/1/current/repo-files/EGI-trustanchors.repo && yum -y update && yum -y install ca-certificates ca-policy-egi-core fetch-crl && yum clean all && rm -rf /var/cache/yum

curl -Lo /etc/pki/tls/certs/CERN-bundle.pem https://gitlab.cern.ch/plove/rucio/-/raw/7121c7200257a4c537b56ce6e7e438f0b35c6e48/etc/web/CERN-bundle.pem

mkdir -p /etc/vomses \
    && wget https://indigo-iam.github.io/escape-docs/voms-config/voms-escape.cloud.cnaf.infn.it.vomses -O /etc/vomses/voms-escape.cloud.cnaf.infn.it.vomses
mkdir -p /etc/grid-security/vomsdir/escape \
    && wget https://indigo-iam.github.io/escape-docs/voms-config/voms-escape.cloud.cnaf.infn.it.lsc -O /etc/grid-security/vomsdir/escape/voms-escape.cloud.cnaf.infn.it.lsc
```

Next, you need the python rucio-client. We suggest to do this in a fresh virtual environment. 

```console
# Latest version of Rucio 
export RUCIO_LATEST=1.30.0

python3 -m pip install --user virtualenv
python3 -m venv rucio --system-site-packages
source rucio/bin/activate
python3.6 -m pip install --no-cache-dir --upgrade pip && \
python3.6 -m pip install  --no-cache-dir --upgrade setuptools && \
python3.6 -m pip install --no-cache-dir --pre rucio-clients==${RUCIO_LATEST} && \
python3.6 -m pip install --no-cache-dir jinja2 j2cli pyyaml
```   
Have your `rucio.cfg` file ready in `/opt/rucio/etc/` and run:
```console
export RUCIO_CONFIG=/opt/rucio/etc/rucio.cfg
```
If you use X509 verification, you will alo need the command: 

```console
voms-proxy-init --voms escape --cert .globus/usercert.pem --key .globus/userkey.pem 
```
Otherwise, if you use tokens, you are good to go. 

By typing in the terminal:

```console
$ rucio whoami
```
You should see your username being recognised. If it is your first time using tokens, you will be redirected to a link starting with  'https://escape-rucio-auth.cern.ch/auth/...', click on it and choose the duration of your token. You should be all set up to run your rucio commands!

## 2. Docker installation 

Docker needs to be installed following the [Docker installation](https://docs.docker.com/get-docker/) instructions. The procedure will change depending on your operating system. 
The Docker file will extend the Rucio image and will enable the user to interact with the Data Lake. Further information can be found [here](https://github.com/cern-vre/containers/tree/main/rucio-client). 
The Docker image for this project can be pulled and tagged with:

```console
$ docker pull projectescape/rucio-client:latest
$ docker tag projectescape/rucio-client rucio-client
```
Alternatively, to build your own image locally, clone the repository linked above and follow the instructions in the ‘Build image’ section of the [README](https://github.com/cern-vre/containers/tree/main/rucio-client) file. 

A default Rucio `/opt/rucio/etc/rucio.cfg` file is incorporated into the image and supplied to the container when it is run. The values from this default can be partially or fully overridden by either specifying parameters as environment variables or by mounting a bespoke configuration file. 
<!-- Examples of both methods are discussed in the [README](https://github.com/ESCAPE-WP2/Rucio-Client-Containers/blob/master/rucio-client-container/README.md) file. -->

Note that if you are uploading data from the host machine where the Docker container is running, you will need to bind that directory for it to be accessible inside the container.
<!-- If you are on a HPC cluster, or somewhere where Docker is not usable, try running the container with [Singularity](### Singularity installation).  -->

### X509 authentication

Assuming that your X509 certificate is in the `.globus` directory, they must now be volume bound to `/opt/rucio/etc/` in the container on initialisation. The following command will link the key pairs from the local path to the rucio path:

```console
$ docker run -e RUCIO_CFG_ACCOUNT=<myrucioaccount> -v ~/.globus/usercert.pem:/opt/rucio/etc/usercert.pem -v ~/.globus/userkey.pem:/opt/rucio/etc/userkey.pem -it --name=rucio-client rucio-client
```
Replace \< myrucioaccount \> with your IAM username. If you encounter permission problems, execute the above command with root permission:

```console
$ docker run --user root -e RUCIO_CFG_ACCOUNT=<myrucioaccount> -v ~/.globus/usercert.pem:/opt/rucio/etc/usercert.pem -v ~/.globus/userkey.pem:/opt/rucio/etc/userkey.pem -it --name=rucio-client rucio-client
```
The -v option is a volume mount, which mounts your certificates from your local directory into the docker container. 
Make sure to specify the correct origin folder for the certificates, otherwise the command will generate an empty directory inside the container!

To see whether you initialized the Docker container correctly, refer to the [Docker documentation](https://docs.docker.com/get-started/). For example, you could run: 

```console
$ docker ps -a
```
The command should show the `rucio-client` container running. 

If you cannot log in as root and you get permission errors, add your user account to the docker group:

```console
$ sudo groupadd docker
$ sudo gpasswd -a $USER docker
```
Sometimes you will still need to give the /var/run/docker.sock socket and /var/run/docker directory the proper permissions to make it work:

```console
$ sudo chown root:docker /var/run/docker.sock
$ sudo chown -R root:docker /var/run/docker
```
Place your original X509 complete certificate in your `.globus/` directory and run the following command:

```console
$ docker run --user "$(id -u):$(id -g)" -e RUCIO_CFG_ACCOUNT=<myrucioaccount> --mount "type=bind,src=$(pwd)/.globus,dst=/opt/rucio/etc" --workdir /opt/rucio/etc -it --name=rucio-client rucio-client
```
You will be automatically logged into the Docker container, within a Rucio environment. 
Once this command brings you inside the docker container, execute the following to allow all the VOMs to take place. **Without the following you will not be abel to execute uploads and downloads!**

```console
$ voms-proxy-init --voms escape --cert /opt/rucio/etc/client.crt --key /opt/rucio/etc/client.key
```

#### OIDC token authentication
If you want to access the `rucio-client container` with OpenID Token authentication, execute:

```console
docker run --user root -e RUCIO_CFG_ACCOUNT=<myrucioaccount> -it --name=rucio-client rucio-client
cd /opt/rucio/etc/
```

**General note:** To access the rucio-client Docker container in the future, always use this command from the machine where you have Docker installed:

```console
$ sudo docker exec -it rucio-client /bin/bash
```
Take a look at some [Rucio CLI Quickstart commands](https://docs.google.com/document/d/1LKJu56VMg7jkh19BtWoS3xSNYPf_kJN2xRKQrankfB8/edit#heading=h.avprao92dhlc) to get you familiarised with the main concepts. 

<!-- ### Singularity installation   

To use the client in [Singularity](https://sylabs.io/guides/3.3/user-guide/quick_start.html#quick-installation-steps), first create a Singularity image based on the Docker version
```console
$ n
```
Then, create a directory and add your credentials as follows. You will have to replace \< myrucioaccount \> with your IAM username. 

```console
$ mkdir -p ${HOME}/.rucio
$ export RUCIO_CFG_ACCOUNT=<myrucioaccount>
$ singularity run -B ${HOME}/.rucio/:/opt/rucio/etc -B ${HOME}/.globus/client.crt:/opt/rucio/etc/client.crt -B ${HOME}/.globus/client.key:/opt/rucio/etc/client.key rucio-cli.simg
```
When running the containerised client, the directory that contains the configuration files should be writable at run time. 
This means that you have to bind it to the container. 
Note that this will cause the configuration to be kept between runs, as opposed to running the client in a Docker container which will write a new configuration file at run time (this means that setting the RUCIO_CFG_ACCOUNT variable will only be needed during the first run). 
If for any reason you want to reset the configuration, just erase the rucio.cfg in the configuration directory (in the example: $HOME/.rucio). -->
## Uploading data on the Data Lake

In order to uplaod data on the Data Lake, and supposing that you want to organise your data into data sets, you will need to choose an RSE (Rucio Storage Element), a Scope name and a Dataset name. 

The Scope name follows the formatting _Experiment_Institute_Project_ (e.g. ATLAS_LAPP_SP, the EOSC-Future Science Project)
The Dataset name follows the formatting _ProjectType.DataDescription.DataType_ (DM.LeptonResonance.Data20015_10TeV, the ProjectType for EOSC-Future is either DM or EU). 

To add a scope, you need to have administrator rights. If you don't have them, ask the system administrators to create a scope for you. 

```console
$ rucio-admin scope add --account=<your_IAM_account_name> --scope <Experiment_Institute_Project>
$ rucio-admin scope list
```
You can either upload single files, create a dataset, and attach the files to the dataset, or you can directly upload your folder (and the command will automatically create a dataset):

Example of how to upload single files:
```console
$ rucio upload --scope ATLAS_LAPP_SP --rse EULAKE-1 DM.LeptonResonance.Data20015_10TeV.root
```
Example of how to create a dataset:
```console
$ rucio add-dataset ATLAS_LAPP_SP:DM.LeptonResonance.Data20015_10TeV
```
Example of how to attach files to your dataset:
```console
$ rucio attach ATLAS_LAPP_SP:DM.LeptonResonance.Data20015_10TeV ATLAS_LAPP_SP:DM.LeptonResonance.Data20015_10TeV.root
```
Example of how to upload a whole file folder (cannot contain a folder within it):
```console
$ rucio -v upload --rse EULAKE-1 --scope ATLAS_LAPP_SP --recursive ./folder_name/
```
To inspect all the datasets within a scope:
```console
$ rucio list-dids ATLAS_LAPP_SP:*
```
To display changes of files within one dataset:
```console
$ rucio list-files ATLAS_LAPP_SP:DM.LeptonResonance.Data20015_10TeV
```
To see which rule protects your files:
```console
$ rucio list-rules --account=<your_account>
```
To delete the files, either set a --lifetime flag when you upload data, or delete the replication rules associated to the data (the expiration wil be set in 1 hr time):
```console
$ rucio delete-rule --purge-replicas --all rule_id
```
To add and look for metadata associated to a file or data set:
```console
$ rucio set-metadata --did ATLAS_LAPP_SP:DM.LeptonResonance.Data20015_10TeV --key KEY --value VALUE
$ rucio get-metadata --plugin JSON ATLAS_LAPP_SP:DM.LeptonResonance.Data20015_10TeV
$ rucio list-dids-extended --filter 'type=all' --filter 'KEY=VALUE' ATLAS_LAPP_SP:*
```
DO NOT use the value True or False for the _VALUE_ variable, as this will not be recognised by Rucio. 

You should keep in mind that the scope will not get deleted from the Rucio memory. 

Have a look at the [rucio client documentation](https://rucio.readthedocs.io/en/latest/man/rucio.html) to perform more actions on your recently uploaded data. 
You can also upload your data in a more user-friendly way using the [DLaaS](dlaas.md###1. File Browser).   
<!-- 
## Rucio RESTful APIs    

Interacting with the client environment can be done through the Docker container, or through the RestAPI. This is a way for developers to be able to integrate any kind of scripts into the environment without the need of installing all the Rucio CLI dependencies.

#### *Token generation* 

Now that you have the VOMS in place, you will just need to add your token, which will expire and will be regenerated every hour, to your Rest API request. 
To get the token, run the command:

```console
$ curl -i --key ~/.globus/userkey.pem --cert ~/.globus/usercert.pem -H "X-Rucio-Account: <myrucioaccount>" -X GET https://escape-rucio-auth.cern.ch/auth/x509 | sed -n -e 's/^.*X-Rucio-Auth-Token: //p'
```
The \< myrucioaccount \> instance needs to be replaced with your Rucio UI account name, the same as your IAM account (but you can also find it by navigating [here](https://escape-rucio-webui.cern.ch/) and selecting the ‘Account management’ option under the Admin scroll-down menu). 

*Note: Using curl with the --insecure option allows curl to make insecure connections (i.e. curl does not verify the certificate), bypassing: curl: (60) SSL certificate problem: self signed certificate in certificate chain. Another solution is proposed [here](https://escape-rucio-webui.cern.ch/).*

Create a variable by copying the token which has been generated and running in the command line:

```console
$ token="<your_token>"
```
Do not forget the “ symbol. 

After the token has been saved, you can run any Rest Api command, for example listing all the available RSEs or all the scopes:

```console
$ curl -X GET -H "X-Rucio-Auth-Token: $token" https://escape-rucio.cern.ch/rses/
$ curl -X GET -H "X-Rucio-Auth-Token: $token" https://escape-rucio.cern.ch/scopes/
```

#### *Proxy generation*

The proxy generation with the x509 certificate works in the same way, the only difference is the command to get the token: 

```console
$ curl -i --key ~/.globus/userkey.pem --cert ~/.globus/usercert.pem -H "X-Rucio-Account: <myrucioaccount>" -X GET https://escape-rucio-auth.cern.ch/auth/x509_proxy | sed -n -e 's/^.*X-Rucio-Auth-Token: //p'
```
Again, using curl with the --insecure option might be useful. Follow the same steps as above to make Rest API requests. 

To find all the Rucio REST API commands, navigate [here](https://rucio.readthedocs.io/en/latest/rest.html).
 -->
