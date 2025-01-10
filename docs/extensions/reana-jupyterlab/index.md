# Reana JupyterLab Extension
[![Install dependencies and build](https://github.com/vre-hub/reana-jupyterlab-extension/actions/workflows/build-and-publish.yml/badge.svg)](https://github.com/vre-hub/reana-jupyterlab-extension/actions/workflows/build-and-publish.yml/badge.svg)
[![Test](https://github.com/vre-hub/reana-jupyterlab-extension/actions/workflows/test.yml/badge.svg)](https://github.com/vre-hub/reana-jupyterlab-extension/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/vre-hub/reana-jupyterlab-extension/graph/badge.svg?token=OLV3EOPYFI)](https://codecov.io/gh/vre-hub/reana-jupyterlab-extension)
[![Python Versions](https://img.shields.io/pypi/pyversions/reana-jupyterlab.svg)](https://pypi.org/project/reana-jupyterlab)
[![PyPI Version](https://img.shields.io/pypi/v/reana-jupyterlab.svg)](https://pypi.org/project/reana-jupyterlab)
[![Docs](https://img.shields.io/badge/Docs-VRE%20Hub-blue)](https://vre-hub.github.io/docs/extensions/reana-jupyterlab/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.13366643.svg)](https://doi.org/10.5281/zenodo.13366643)

Reana JupyterLab plugin provides a set of tools to interact with the [Reana](https://reanahub.io/) workflow management system from within JupyterLab. 

![](../../../static/img/reana-demo.gif)

## Requirements
- JupyterLab{'>=4'},{'<'}5
- Notebook{'<'}7
- Node.js==20
- [Custom version of `reana-client`](https://github.com/mdonadoni/reana-client/tree/vre-summer-24)