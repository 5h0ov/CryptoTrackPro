import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CryptoTrackPro Documentation',
  tagline: 'Documentation for the CryptoTrackPro project',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '5h0ov', // Usually your GitHub org/user name.
  projectName: 'crypto-tracker', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/your-github-user/crypto-tracker/edit/main/docs-site/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'CryptoTrackPro',
      logo: {
        alt: 'CryptoTrackPro Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://shattereddisk.github.io/rickroll/rickroll.mp4',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://shattereddisk.github.io/rickroll/rickroll.mp4',
          label: 'Website',
          position: 'right',
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
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Integration',
              to: '/docs/api-integration',
            },
            {
              label: 'State Management',
              to: '/docs/state-management',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/in/shuvadipta-das-915b28216/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/5h0ov',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CryptoTrackPro. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
