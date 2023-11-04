// ** Mock Adapter
import mock from '@/@fake-db/mock'

// ** Types
import { AppBarSearchType } from '@/@fake-db/types'

const searchData: AppBarSearchType[] = [
  {
    id: 1,
    url: '/dashboards/analytics',
    icon: 'tabler:chart-pie-2',
    title: 'Analytics Dashboard',
    category: 'dashboards'
  },
  {
    id: 2,
    url: '/dashboards/crm',
    icon: 'tabler:device-analytics',
    title: 'CRM Dashboard',
    category: 'dashboards'
  },
  {
    id: 3,
    url: '/dashboards/ecommerce',
    icon: 'tabler:shopping-cart',
    title: 'eCommerce Dashboard',
    category: 'dashboards'
  },
  {
    id: 4,
    url: '/apps/email',
    icon: 'tabler:mail',
    title: 'Email',
    category: 'appsPages'
  },
  {
    id: 5,
    url: '/apps/chat',
    icon: 'tabler:messages',
    title: 'Chat',
    category: 'appsPages'
  },
  {
    id: 6,
    url: '/apps/calendar',
    icon: 'tabler:calendar',
    title: 'Calendar',
    category: 'appsPages'
  },
  {
    id: 7,
    url: '/apps/invoice/list',
    icon: 'tabler:list-numbers',
    title: 'Invoice List',
    category: 'appsPages'
  },
  {
    id: 8,
    url: '/apps/invoice/preview',
    icon: 'tabler:file-text',
    title: 'Invoice Preview',
    category: 'appsPages'
  },
  {
    id: 9,
    url: '/apps/invoice/edit',
    icon: 'tabler:file-pencil',
    title: 'Invoice Edit',
    category: 'appsPages'
  },
  {
    id: 10,
    url: '/apps/invoice/add',
    icon: 'tabler:file-plus',
    title: 'Invoice Add',
    category: 'appsPages'
  },
  {
    id: 11,
    url: '/apps/user/list',
    icon: 'tabler:users',
    title: 'User List',
    category: 'appsPages'
  },
  {
    id: 12,
    url: '/apps/user/view/account',
    icon: 'tabler:user',
    title: 'User View - Account',
    category: 'appsPages'
  },
  {
    id: 13,
    url: '/apps/user/view/security',
    icon: 'tabler:lock',
    title: 'User View - Security',
    category: 'appsPages'
  },
  {
    id: 14,
    url: '/apps/user/view/billing-plan',
    icon: 'tabler:currency-dollar',
    title: 'User View - Billing & Plans',
    category: 'appsPages'
  },
  {
    id: 15,
    url: '/apps/user/view/notification',
    icon: 'tabler:bell',
    title: 'User View - Notification',
    category: 'appsPages'
  },
  {
    id: 16,
    url: '/apps/user/view/connection',
    icon: 'tabler:link',
    title: 'User View - Connection',
    category: 'appsPages'
  },
  {
    id: 17,
    url: '/apps/roles',
    icon: 'tabler:shield',
    title: 'Roles',
    category: 'appsPages'
  },
  {
    id: 18,
    url: '/apps/permissions',
    icon: 'tabler:lock',
    title: 'Permissions',
    category: 'appsPages'
  },
  {
    id: 19,
    url: '/pages/user-profile/profile',
    icon: 'tabler:user-circle',
    title: 'User Profile',
    category: 'appsPages'
  },
  {
    id: 20,
    url: '/pages/user-profile/teams',
    icon: 'tabler:users',
    title: 'User Profile - Teams',
    category: 'appsPages'
  },
  {
    id: 21,
    url: '/pages/user-profile/projects',
    icon: 'tabler:layout-grid',
    title: 'User Profile - Projects',
    category: 'appsPages'
  },
  {
    id: 22,
    url: '/pages/user-profile/connections',
    icon: 'tabler:link',
    title: 'User Profile - Connections',
    category: 'appsPages'
  },
  {
    id: 23,
    url: '/pages/account-settings/account',
    icon: 'tabler:settings',
    title: 'Account Settings',
    category: 'appsPages'
  },
  {
    id: 24,
    url: '/pages/account-settings/security',
    icon: 'tabler:lock',
    title: 'Account Settings - Security',
    category: 'appsPages'
  },
  {
    id: 25,
    url: '/pages/account-settings/billing',
    icon: 'tabler:currency-dollar',
    title: 'Account Settings - Billing',
    category: 'appsPages'
  },
  {
    id: 26,
    url: '/pages/account-settings/notifications',
    icon: 'tabler:bell',
    title: 'Account Settings - Notifications',
    category: 'appsPages'
  },
  {
    id: 27,
    url: '/pages/account-settings/connections',
    icon: 'tabler:link',
    title: 'Account Settings - Connections',
    category: 'appsPages'
  },
  {
    id: 28,
    url: '/pages/faq',
    icon: 'tabler:help',
    title: 'FAQ',
    category: 'appsPages'
  },
  {
    id: 29,
    url: '/pages/help-center',
    icon: 'tabler:help',
    title: 'Help Center',
    category: 'appsPages'
  },
  {
    id: 30,
    url: '/pages/pricing',
    icon: 'tabler:currency-dollar',
    title: 'Pricing',
    category: 'appsPages'
  },
  {
    id: 31,
    url: '/pages/misc/coming-soon',
    icon: 'tabler:clock',
    title: 'Coming Soon',
    category: 'appsPages'
  },
  {
    id: 32,
    url: '/pages/misc/under-maintenance',
    icon: 'tabler:barrier-block',
    title: 'Under Maintenance',
    category: 'appsPages'
  },
  {
    id: 33,
    url: '/pages/misc/404-not-found',
    icon: 'tabler:alert-circle',
    title: 'Page Not Found - 404',
    category: 'appsPages'
  },
  {
    id: 34,
    url: '/pages/misc/401-not-authorized',
    icon: 'tabler:user-x',
    title: 'Not Authorized - 401',
    category: 'appsPages'
  },
  {
    id: 35,
    url: '/pages/misc/500-server-error',
    icon: 'tabler:server-off',
    title: 'Server Error - 500',
    category: 'appsPages'
  },
  {
    id: 36,
    url: '/pages/auth/login-v1',
    icon: 'tabler:login',
    title: 'Login V1',
    category: 'appsPages'
  },
  {
    id: 37,
    url: '/pages/auth/login-v2',
    icon: 'tabler:login',
    title: 'Login V2',
    category: 'appsPages'
  },
  {
    id: 38,
    url: '/pages/auth/login-with-appbar',
    icon: 'tabler:login',
    title: 'Login With AppBar',
    category: 'appsPages'
  },
  {
    id: 39,
    url: '/pages/auth/register-v1',
    icon: 'tabler:user-plus',
    title: 'Register V1',
    category: 'appsPages'
  },
  {
    id: 40,
    url: '/pages/auth/register-v2',
    icon: 'tabler:user-plus',
    title: 'Register V2',
    category: 'appsPages'
  },
  {
    id: 41,
    url: '/pages/auth/register-multi-steps',
    icon: 'tabler:user-plus',
    title: 'Register Multi-Steps',
    category: 'appsPages'
  },
  {
    id: 42,
    icon: 'tabler:mail',
    category: 'appsPages',
    title: 'Verify Email V1',
    url: '/pages/auth/verify-email-v1'
  },
  {
    id: 43,
    icon: 'tabler:mail',
    category: 'appsPages',
    title: 'Verify Email V2',
    url: '/pages/auth/verify-email-v2'
  },
  {
    id: 44,
    url: '/pages/auth/forgot-password-v1',
    icon: 'tabler:lock',
    title: 'Forgot Password V1',
    category: 'appsPages'
  },
  {
    id: 45,
    url: '/pages/auth/forgot-password-v2',
    icon: 'tabler:lock',
    title: 'Forgot Password V2',
    category: 'appsPages'
  },
  {
    id: 46,
    url: '/pages/auth/reset-password-v1',
    icon: 'tabler:lock',
    title: 'Reset Password V1',
    category: 'appsPages'
  },
  {
    id: 47,
    url: '/pages/auth/reset-password-v2',
    icon: 'tabler:lock',
    title: 'Reset Password V2',
    category: 'appsPages'
  },
  {
    id: 48,
    icon: 'tabler:devices',
    category: 'appsPages',
    title: 'Two Steps V1',
    url: '/pages/auth/two-steps-v1'
  },
  {
    id: 49,
    icon: 'tabler:devices',
    category: 'appsPages',
    title: 'Two Steps V2',
    url: '/pages/auth/two-steps-v2'
  },
  {
    id: 50,
    icon: 'tabler:shopping-cart',
    category: 'appsPages',
    title: 'Wizard - Checkout',
    url: '/pages/wizard-examples/checkout'
  },
  {
    id: 51,
    category: 'appsPages',
    icon: 'tabler:building',
    title: 'Wizard - Property Listing',
    url: '/pages/wizard-examples/property-listing'
  },
  {
    id: 52,
    icon: 'tabler:gift',
    category: 'appsPages',
    title: 'Wizard - Create Deal',
    url: '/pages/wizard-examples/create-deal'
  },
  {
    id: 53,
    url: '/pages/dialog-examples',
    icon: 'tabler:square',
    title: 'Dialog Examples',
    category: 'appsPages'
  },
  {
    id: 54,
    url: '/ui/typography',
    icon: 'tabler:typography',
    title: 'Typography',
    category: 'userInterface'
  },
  {
    id: 55,
    url: '/ui/icons',
    icon: 'tabler:brand-tabler',
    title: 'Icons',
    category: 'userInterface'
  },
  {
    id: 56,
    url: '/ui/cards/basic',
    icon: 'tabler:credit-card',
    title: 'Card Basic',
    category: 'userInterface'
  },
  {
    id: 57,
    url: '/ui/cards/advanced',
    icon: 'tabler:id',
    title: 'Card Advanced',
    category: 'userInterface'
  },
  {
    id: 58,
    url: '/ui/cards/statistics',
    icon: 'tabler:chart-bar',
    title: 'Card Statistics',
    category: 'userInterface'
  },
  {
    id: 59,
    url: '/ui/cards/widgets',
    icon: 'tabler:chart-pie',
    title: 'Card Widgets',
    category: 'userInterface'
  },
  {
    id: 60,
    url: '/ui/cards/actions',
    icon: 'tabler:mouse-2',
    title: 'Card Actions',
    category: 'userInterface'
  },
  {
    id: 61,
    url: '/components/accordion',
    icon: 'tabler:fold',
    title: 'Accordion',
    category: 'userInterface'
  },
  {
    id: 62,
    url: '/components/alerts',
    icon: 'tabler:alert-triangle',
    title: 'Alerts',
    category: 'userInterface'
  },
  {
    id: 63,
    url: '/components/avatars',
    icon: 'tabler:user-circle',
    title: 'Avatars',
    category: 'userInterface'
  },
  {
    id: 64,
    url: '/components/badges',
    icon: 'tabler:bell',
    title: 'Badges',
    category: 'userInterface'
  },
  {
    id: 65,
    url: '/components/buttons',
    icon: 'tabler:hand-click',
    title: 'Buttons',
    category: 'userInterface'
  },
  {
    id: 66,
    url: '/components/button-group',
    icon: 'tabler:box-multiple',
    title: 'Button Group',
    category: 'userInterface'
  },
  {
    id: 67,
    url: '/components/chips',
    icon: 'tabler:badge-4k',
    title: 'Chips',
    category: 'userInterface'
  },
  {
    id: 68,
    url: '/components/dialogs',
    icon: 'tabler:square',
    title: 'Dialogs',
    category: 'userInterface'
  },
  {
    id: 69,
    url: '/components/list',
    icon: 'tabler:list',
    title: 'List',
    category: 'userInterface'
  },
  {
    id: 70,
    url: '/components/menu',
    icon: 'tabler:menu-2',
    title: 'Menu',
    category: 'userInterface'
  },
  {
    id: 71,
    url: '/components/pagination',
    icon: 'tabler:arrow-badge-right',
    title: 'Pagination',
    category: 'userInterface'
  },
  {
    id: 72,
    url: '/components/progress',
    icon: 'tabler:chart-donut',
    title: 'Progress',
    category: 'userInterface'
  },
  {
    id: 73,
    url: '/components/ratings',
    icon: 'tabler:star',
    title: 'Ratings',
    category: 'userInterface'
  },
  {
    id: 74,
    url: '/components/snackbar',
    icon: 'tabler:message-dots',
    title: 'Snackbar',
    category: 'userInterface'
  },
  {
    id: 75,
    url: '/components/swiper',
    icon: 'tabler:swipe',
    title: 'Swiper',
    category: 'userInterface'
  },
  {
    id: 76,
    url: '/components/tabs',
    icon: 'tabler:browser',
    title: 'Tabs',
    category: 'userInterface'
  },
  {
    id: 77,
    url: '/components/timeline',
    icon: 'tabler:timeline-event',
    title: 'Timeline',
    category: 'userInterface'
  },
  {
    id: 78,
    url: '/components/toast',
    icon: 'tabler:bell',
    title: 'Toast',
    category: 'userInterface'
  },
  {
    id: 79,
    url: '/components/tree-view',
    icon: 'tabler:git-merge',
    title: 'Tree View',
    category: 'userInterface'
  },
  {
    id: 80,
    url: '/components/more',
    icon: 'tabler:layout-grid-add',
    title: 'More Components',
    category: 'userInterface'
  },
  {
    id: 81,
    url: '/forms/form-elements/text-field',
    icon: 'tabler:forms',
    title: 'TextField',
    category: 'formsTables'
  },
  {
    id: 82,
    url: '/forms/form-elements/select',
    icon: 'tabler:list-check',
    title: 'Select',
    category: 'formsTables'
  },
  {
    id: 83,
    url: '/forms/form-elements/checkbox',
    icon: 'tabler:checkbox',
    title: 'Checkbox',
    category: 'formsTables'
  },
  {
    id: 84,
    url: '/forms/form-elements/radio',
    icon: 'tabler:circle-dot',
    title: 'Radio',
    category: 'formsTables'
  },
  {
    id: 85,
    icon: 'tabler:list-details',
    title: 'Custom Inputs',
    category: 'formsTables',
    url: '/forms/form-elements/custom-inputs'
  },
  {
    id: 86,
    url: '/forms/form-elements/textarea',
    icon: 'tabler:forms',
    title: 'Textarea',
    category: 'formsTables'
  },
  {
    id: 87,
    url: '/forms/form-elements/autocomplete',
    icon: 'tabler:space',
    title: 'Autocomplete',
    category: 'formsTables'
  },
  {
    id: 88,
    url: '/forms/form-elements/pickers',
    icon: 'tabler:calendar-event',
    title: 'Date Pickers',
    category: 'formsTables'
  },
  {
    id: 89,
    url: '/forms/form-elements/switch',
    icon: 'tabler:toggle-right',
    title: 'Switch',
    category: 'formsTables'
  },
  {
    id: 90,
    url: '/forms/form-elements/file-uploader',
    icon: 'tabler:upload',
    title: 'File Uploader',
    category: 'formsTables'
  },
  {
    id: 91,
    url: '/forms/form-elements/editor',
    icon: 'tabler:edit',
    title: 'Editor',
    category: 'formsTables'
  },
  {
    id: 92,
    url: '/forms/form-elements/slider',
    icon: 'tabler:adjustments-horizontal',
    title: 'Slider',
    category: 'formsTables'
  },
  {
    id: 93,
    url: '/forms/form-elements/input-mask',
    icon: 'tabler:forms',
    title: 'Input Mask',
    category: 'formsTables'
  },
  {
    id: 94,
    url: '/forms/form-layouts',
    icon: 'tabler:box',
    title: 'Form Layouts',
    category: 'formsTables'
  },
  {
    id: 95,
    url: '/forms/form-validation',
    icon: 'tabler:checkbox',
    title: 'Form Validation',
    category: 'formsTables'
  },
  {
    id: 96,
    url: '/forms/form-wizard',
    icon: 'tabler:text-wrap-disabled',
    title: 'Form Wizard',
    category: 'formsTables'
  },
  {
    id: 97,
    url: '/tables/mui',
    icon: 'tabler:table',
    title: 'Table',
    category: 'formsTables'
  },
  {
    id: 98,
    url: '/tables/data-grid',
    icon: 'tabler:layout-grid',
    title: 'Mui DataGrid',
    category: 'formsTables'
  },
  {
    id: 99,
    url: '/charts/apex-charts',
    icon: 'tabler:chart-sankey',
    title: 'Apex Charts',
    category: 'chartsMisc'
  },
  {
    id: 100,
    url: '/charts/recharts',
    icon: 'tabler:chart-ppf',
    title: 'Recharts',
    category: 'chartsMisc'
  },
  {
    id: 101,
    url: '/charts/chartjs',
    icon: 'tabler:chart-line',
    title: 'ChartJS',
    category: 'chartsMisc'
  },
  {
    id: 102,
    url: '/acl',
    icon: 'tabler:shield',
    title: 'Access Control (ACL)',
    category: 'chartsMisc'
  }
]

// ** GET Search Data
mock.onGet('/app-bar/search').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: []
  }

  const includeData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: []
  }

  searchData.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5) {
      exactData[obj.category].push(obj)
    }
  })

  searchData.forEach(obj => {
    const isMatched =
      !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5) {
      includeData[obj.category].push(obj)
    }
  })

  const categoriesCheck: string[] = []

  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0) {
      categoriesCheck.push(category)
    }
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })
  }

  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  return [
    200,
    [
      ...exactData.dashboards.concat(includeData.dashboards).slice(0, resultsLength),
      ...exactData.appsPages.concat(includeData.appsPages).slice(0, resultsLength),
      ...exactData.userInterface.concat(includeData.userInterface).slice(0, resultsLength),
      ...exactData.formsTables.concat(includeData.formsTables).slice(0, resultsLength),
      ...exactData.chartsMisc.concat(includeData.chartsMisc).slice(0, resultsLength)
    ]
  ]
})
