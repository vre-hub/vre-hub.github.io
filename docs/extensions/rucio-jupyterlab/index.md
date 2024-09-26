# Rucio JuputerLab Extension

[![Test](https://github.com/rucio/jupyterlab-extension/actions/workflows/test.yml/badge.svg)](https://github.com/rucio/jupyterlab-extension/actions/workflows/test.yml)
[![Build and Publish Extension](https://github.com/rucio/jupyterlab-extension/actions/workflows/build-and-publish-tagged.yml/badge.svg)](https://github.com/rucio/jupyterlab-extension/actions/workflows/build-and-publish-tagged.yml)

:::tip[IMPORTANT]
Please note that this documentation is specific to the deployment of the Rucio extension within the 
CERN VRE analysis platform.

For details on the configuration of the extension, please visit the [rucio/jupyterlab-extension](https://github.com/rucio/jupyterlab-extension) GitHub repository, and refer to the extension [configuration guide](https://github.com/rucio/jupyterlab-extension/blob/master/CONFIGURATION.md).
:::

This JupyterLab extension integrates with [Rucio - Scientific Data Management](https://github.com/rucio/rucio) to allow users to access some of Rucio's capabilities directly from the JupyterLab interface.


The extension is composed of a Python package named `rucio_jupyterlab`
for the server extension and a NPM package named `rucio-jupyterlab`
for the frontend extension.


## Requirements

* JupyterLab >= 3.0
* Rucio Server >= 1.28

## Install

You will need NodeJS to install the extension. For JupyterLab 4.x you will need NodeJS >= 20 and >= 14 for JupyterLab 3.x.

### JupyterLab 4.x

```bash
pip install rucio-jupyterlab
```

### JupyterLab 3.x

For JupyterLab 3.x, please use the latest supported version.

```bash
pip install rucio-jupyterlab==0.10.0
```