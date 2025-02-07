// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VRE-hub',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://vre-hub.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vre-hub', // Usually your GitHub org/user name.
  projectName: 'vre-hub.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/vre-hub/vre-hub.github.io/tree/main',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        // theme: prismThemes.dracula,
        additionalLanguages: ['bash','ini'],
      },
      // Replace with your project's social card
      image: 'img/logo.png',
      navbar: {
        title: 'VRE at CERN',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'GetStarted',
          //   position: 'left',
          //   label: 'Get started',
          // },
          {
            type: 'doc', // This is a preset regarding the type of document, please update if needed
            docId: 'auth', // The ID of the corresponding document. This should match with what you wrote in the document header.
            position: 'left',
            label: 'AAI', // The title that will appear on the menu
          },
          {
            type: 'doc', // This is a preset regarding the type of document, please update if needed
            docId: 'rucio', // The ID of the corresponding document. This should match with what you wrote in the document header.
            position: 'left',
            label: 'Rucio', // The title that will appear on the menu
          },
          {
            type: 'doc', // This is a preset regarding the type of document, please update if needed
            docId: 'reana', // The ID of the corresponding document. This should match with what you wrote in the document header.
            position: 'left',
            label: 'REANA', // The title that will appear on the menu
          },
          {
            type: 'doc', // This is a preset regarding the type of document, please update if needed
            docId: 'notebook', // The ID of the corresponding document. This should match with what you wrote in the document header.
            position: 'left',
            label: 'JupyterHub', // The title that will appear on the menu
          },
          // {
          //   type: 'doc', // This is a preset regarding the type of document, please update if needed
          //   docId: 'developer', // The ID of the corresponding document. This should match with what you wrote in the document header.
          //   position: 'left',
          //   label: 'Dev documentation', // The title that will appear on the menu
          // },
          {
            type: 'dropdown',
            label: 'JupyterLab Extensions', // The ID of the corresponding document. This should match with what you wrote in the document header.
            position: 'left',
            items: [
              {
                type: 'doc',
                label: 'Rucio Jupyterlab',
                docId: 'extensions/rucio-jupyterlab/index',
              },
              {
                type: 'docSidebar',
                sidebarId: 'ReanaJupyterlab',
                label: 'Reana Jupyterlab',
              },
              {
                type: 'docSidebar',
                sidebarId: 'ZenodoJupyterlab',
                label: 'Zenodo Jupyterlab',
              },
            ],
          },
          {
            type: 'doc',
            docId: 'tech-docs/home',
            position: 'left',
            label: 'Technical Documentation'
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'VRE User documentation',
                to: '/',
              },
              {
                label: 'VRE Technical documentation',
                to: '/tech-docs/home',
              },
              {
                label: 'How to contribute',
                to: '/tech-docs/home#how-to-contribute',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'VRE WG monthly meetings',
                href: 'https://indico.cern.ch/category/17065/',
              },
              // {
              //   label: 'VRE bi-weekly meetings',
              //   href: 'https://indico.in2p3.fr/category/1033/',
              // },
              {
                label: 'VRE Mattermost channel invitation link',
                href: 'https://mattermost.web.cern.ch/signup_user_complete/?id=zqaa9p5fqfd9bnnc64at4b5aye&md=link&sbr=su',
              },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/docusaurus',
              // },
            ],
          },
          {
            title: 'Git',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'View GitHub profile',
                href: 'https://github.com/vre-hub',
              },
              {
                label: 'Download ZIP file',
                href: 'https://github.com/vre-hub/vre-hub.github.io/zipball/main',
              },
              {
                label: 'Download TAR ball',
                href: 'https://github.com/vre-hub/vre-hub.github.io/tarball/main',
              },
              {
                label: 'View on GitHub',
                href: 'https://github.com/vre-hub/vre-hub.github.io',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} VRE-Hub. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
