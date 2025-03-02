import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */


const sidebars: SidebarsConfig = {
  // manually configuring sidebar
  Sidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation', 'project-structure'],
    },
    {
      type: 'category',
      label: 'Technical Documentation',
      items: ['api-integration', 'state-management', 'authentication'],
    },
    {
      type: 'category',
      label: 'Development',
      items: ['challenges-solutions', 'best-practices'],
    },
  ],
};

export default sidebars;