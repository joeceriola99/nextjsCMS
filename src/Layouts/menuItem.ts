import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Dashboard',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Components',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'PayMyCheck',
        link: { href: '/404' },
      },
      {
        title: 'Modules',
        link: { href: '/admin/cms/modules' },
      },
      // {
      //   title: 'Actions',
      //   link: { href: '/extra-components/actions' },
      // },
      // {
      //   title: 'Alert',
      //   link: { href: '/extra-components/alert' },
      // },
      // {
      //   title: 'List',
      //   link: { href: '/extra-components/list' },
      // },
      // {
      //   title: 'Spinner',
      //   link: { href: '/extra-components/spinner' },
      // },
      // {
      //   title: 'Progress Bar',
      //   link: { href: '/extra-components/progress' },
      // },
      // {
      //   title: 'Tabs',
      //   link: { href: '/extra-components/tabs' },
      // },
      // {
      //   title: 'Chat',
      //   link: { href: '/extra-components/chat' },
      // },
      // {
      //   title: 'Cards',
      //   link: { href: '/extra-components/cards' },
      // },
      // {
      //   title: 'Flip Card',
      //   link: { href: '/extra-components/flip-card' },
      // },
      // {
      //   title: 'Reveal Card',
      //   link: { href: '/extra-components/reveal-card' },
      // },
    ],
  },
  {
    title: 'Forms',
    icon: { name: 'edit-2-outline' },
    children: [
      {
        title: 'Contact Us',
        link: { href: '/404' },
      },
      {
        title: 'Social Media',
        link: { href: '/404' },
      },
      // {
      //   title: 'Buttons',
      //   link: { href: '/forms/buttons' },
      // },
      // {
      //   title: 'Select',
      //   link: { href: '/forms/select' },
      // },
    ],
  },
  {
    title: 'eCommerce',
    icon: { name: 'keypad-outline' },
    children: [
      {
        title: 'Sales',
        link: { href: '/404' },
      },
      {
        title: 'Catalog',
        link: { href: '/404' },
      },
      {
        title: 'Modifiers',
        link: { href: '/404' },
      },
      {
        title: 'Shipping',
        link: { href: '/404' },
      },
      // {
      //   title: 'Animated Searches',
      //   link: { href: '/ui-features/search' },
      // },
    ],
  },
  {
    title: 'Payment Methods',
    icon: { name: 'browser-outline' },
    children: [
      {
        title: 'Credit Cards',
        link: { href: '/404' },
      },
      {
        title: 'Gift Cards',
        link: { href: '/404' },
      },
      {
        title: 'Rewards',
        link: { href: '/404' },
      },
      {
        title: 'Cryptocurrency',
        link: {
          href: '/404',
        },
      },
    ],
  },
  {
    title: 'Pages',
    icon: { name: 'text-outline' },
    children: [
      {
        title: 'New',
        link: { href: '/editors/tinymce' },
      },
      {
        title: 'Page Manager',
        link: { href: '/admin/page-manager' },
      },
      // {
      //   title: 'CKEditor',
      //   link: { href: '/editors/ckeditor' },
      // },
    ],
  },
  {
    title: 'API Endpoints',
    icon: { name: 'shuffle-2-outline' },
    children: [
      {
        title: 'SIC Endpoint',
        link: { href: '/404' },
      },
      {
        title: 'POS Endpoint',
        link: { href: '/404' },
      },
      // {
      //   title: '404',
      //   link: { href: '/miscellaneous/404' },
      // },
    ],
  },
  {
    title: 'Accounts',
    icon: { name: 'lock-outline' },
    children: [
      {
        title: 'Users',
        link: { href: '/404' },
      },
      {
        title: 'Users Manager',
        link: { href: '/404' },
      },
      // {
      //   title: 'Login',
      //   link: { href: '/auth/login' },
      // },
      // {
      //   title: 'Register',
      //   link: { href: '/auth/register' },
      // },
      // {
      //   title: 'Request Password',
      //   link: { href: '/auth/request-password' },
      // },
      // {
      //   title: 'Reset Password',
      //   link: { href: '/auth/reset-password' },
      // },
    ],
  },
];

export default items;
