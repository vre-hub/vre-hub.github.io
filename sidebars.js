/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  GetStarted: [
    // 'intro',
    // 'hello',
    // {
    //   type: 'category',
    //   label: 'ATLAS and the Large Hadron Collider',
    //   link: {
    //     type: 'doc',
    //     id: '/'
    //   },
    //   items: [
    //     'auth',
    //     'developer',
    //     'notebook',
    //     'reana',
    //     'rucio',
    //       ],
    // },
    // {
    //   type: 'category',
    //   label: 'Get started',
    //   items: [
    //     'auth',
    //     'developer',
    //     'notebook',
    //     'reana',
    //     'rucio',
    //   ],
    // },
  ],

  RucioJuputerlab: [
    {
      type: 'doc',
      label: 'Home',
      id: 'extensions/rucio-jupyterlab/index',
    },
    {
      type: 'doc',
      label: 'Configuration',
      id: 'extensions/rucio-jupyterlab/configuration',
    },
    {
      type: 'doc',
      label: 'Monitoring',
      id: 'extensions/rucio-jupyterlab/monitoring',
    }
  ],

  ReanaJupyterlab: [
    {
      type: 'doc',
      id: 'extensions/reana-jupyterlab/index',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Getting started',
      items: [
        'extensions/reana-jupyterlab/introduction/about',
        {
          type: 'category',
          label: 'Installation',
          items: [
            'extensions/reana-jupyterlab/introduction/installation/users',
            'extensions/reana-jupyterlab/introduction/installation/developers',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Usage',
      items: [
        'extensions/reana-jupyterlab/usage/connection',
        'extensions/reana-jupyterlab/usage/workflows',
        'extensions/reana-jupyterlab/usage/create',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      link: {
        type: 'doc',
        id: 'extensions/reana-jupyterlab/implementation/index',
      },
      items: [
        'extensions/reana-jupyterlab/implementation/frontend',
        'extensions/reana-jupyterlab/implementation/backend',
      ],
    },
  ],

  ZenodoJupyterlab: [
    {
      type: 'doc',
      label: 'Home',
      id: 'extensions/zenodo-jupyterlab/index',
    },
    {
      type: 'doc',
      label: 'Installation',
      id: 'extensions/zenodo-jupyterlab/install',
    },
    {
      type: 'doc',
      label: 'Extension usage',
      id: 'extensions/zenodo-jupyterlab/extension-usage',
    },
    {
      type: 'category',
      label: 'Implementation',
      link: {
        type: 'doc',
        id: 'extensions/zenodo-jupyterlab/implementation/index',
      },
      items: [
        'extensions/zenodo-jupyterlab/implementation/frontend',
        'extensions/zenodo-jupyterlab/implementation/backend',
      ],
    },
  ],

  TechnicalDocumentation: [
    {
      type: 'doc',
      label: 'CERN VRE Technical Documentation',
      id: 'tech-docs/home' ,
    },
    {
      type: 'category',
      label: 'Cluster Setup',
      items: [
        'tech-docs/cluster-setup/openstack',
        'tech-docs/cluster-setup/kubernetes',
      ]
    },
    {
      type: 'category',
      label: 'Services',
      items: [
        'tech-docs/services/aai',
        'tech-docs/services/data-management',
        'tech-docs/services/jupyterhub',
        'tech-docs/services/computing-resources',
      ],
    },
  ]
};

export default sidebars;
