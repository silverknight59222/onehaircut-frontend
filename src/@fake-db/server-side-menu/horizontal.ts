// ** Mock Adapter
import mock from '@/@fake-db/mock'

// ** Type import
import { HorizontalNavItemsType } from '@/@core/layouts/types'

const navigation: HorizontalNavItemsType = [
  {
    icon: 'tabler:smart-home',
    title: 'Dashboards',
    children: [
      {
        icon: 'tabler:chart-pie-2',
        title: 'Analytics',
        path: '/dashboards/analytics'
      },
      {
        icon: 'tabler:device-analytics',
        title: 'CRM',
        path: '/dashboards/crm'
      },
      {
        icon: 'tabler:shopping-cart',
        title: 'eCommerce',
        path: '/dashboards/ecommerce'
      }
    ]
  },
  {
    icon: 'tabler:layout-grid-add',
    title: 'Apps',
    children: [
      {
        title: 'Email',
        icon: 'tabler:mail',
        path: '/apps/email'
      },
      {
        title: 'Chat',
        icon: 'tabler:messages',
        path: '/apps/chat'
      },
      {
        title: 'Calendar',
        icon: 'tabler:calendar',
        path: '/apps/calendar'
      },
      {
        title: 'Invoice',
        icon: 'tabler:file-dollar',
        children: [
          {
            title: 'List',
            path: '/apps/invoice/list'
          },
          {
            title: 'Preview',
            path: '/apps/invoice/preview'
          },
          {
            title: 'Edit',
            path: '/apps/invoice/edit'
          },
          {
            title: 'Add',
            path: '/apps/invoice/add'
          }
        ]
      },
      {
        title: 'User',
        icon: 'tabler:user',
        children: [
          {
            title: 'List',
            path: '/apps/user/list'
          },
          {
            title: 'View',
            children: [
              {
                title: 'Account',
                path: '/apps/user/view/account'
              },
              {
                title: 'Security',
                path: '/apps/user/view/security'
              },
              {
                title: 'Billing & Plans',
                path: '/apps/user/view/billing-plan'
              },
              {
                title: 'Notifications',
                path: '/apps/user/view/notification'
              },
              {
                title: 'Connection',
                path: '/apps/user/view/connection'
              }
            ]
          }
        ]
      },
      {
        title: 'Roles & Permissions',
        icon: 'tabler:settings',
        children: [
          {
            title: 'Roles',
            path: '/apps/roles'
          },
          {
            title: 'Permissions',
            path: '/apps/permissions'
          }
        ]
      }
    ]
  },
  {
    icon: 'tabler:color-swatch',
    title: 'UI',
    children: [
      {
        title: 'Typography',
        icon: 'tabler:typography',
        path: '/ui/typography'
      },
      {
        title: 'Icons',
        path: '/ui/icons',
        icon: 'tabler:brand-tabler'
      },
      {

        title: 'Cards',
        icon: 'tabler:id',
        children: [
          {
            title: 'Basic',
            path: '/ui/cards/basic'
          },
          {
            title: 'Advanced',
            path: '/ui/cards/advanced'
          },
          {
            title: 'Statistics',
            path: '/ui/cards/statistics'
          },
          {
            title: 'Widgets',
            path: '/ui/cards/widgets'
          },
          {
            title: 'Actions',
            path: '/ui/cards/actions'
          }
        ]
      },
      {
        title: 'Components',
        icon: 'tabler:archive',
        children: [
          {
            title: 'Accordion',
            path: '/components/accordion'
          },
          {
            title: 'Alerts',
            path: '/components/alerts'
          },
          {
            title: 'Avatars',
            path: '/components/avatars'
          },
          {
            title: 'Badges',
            path: '/components/badges'
          },
          {
            title: 'Buttons',
            path: '/components/buttons'
          },
          {
            title: 'Button Group',
            path: '/components/button-group'
          },
          {
            title: 'Chips',
            path: '/components/chips'
          },
          {
            title: 'Dialogs',
            path: '/components/dialogs'
          },
          {
            title: 'List',
            path: '/components/list'
          },
          {
            title: 'Menu',
            path: '/components/menu'
          },
          {
            title: 'Pagination',
            path: '/components/pagination'
          },
          {
            title: 'Progress',
            path: '/components/progress'
          },
          {
            title: 'Ratings',
            path: '/components/ratings'
          },
          {
            title: 'Snackbar',
            path: '/components/snackbar'
          },
          {
            title: 'Swiper',
            path: '/components/swiper'
          },
          {
            title: 'Tabs',
            path: '/components/tabs'
          },
          {
            title: 'Timeline',
            path: '/components/timeline'
          },
          {
            title: 'Toasts',
            path: '/components/toast'
          },
          {
            title: 'Tree View',
            path: '/components/tree-view'
          },
          {
            title: 'More',
            path: '/components/more'
          },
        ]
      }
    ]
  },
  {
    icon: 'tabler:file',
    title: 'Pages',
    children: [
      {
        title: 'User Profile',
        icon: 'tabler:user-circle',
        children: [
          {
            title: 'Profile',
            path: '/pages/user-profile/profile'
          },
          {
            title: 'Teams',
            path: '/pages/user-profile/teams'
          },
          {
            title: 'Projects',
            path: '/pages/user-profile/projects'
          },
          {
            title: 'Connections',
            path: '/pages/user-profile/connections'
          }
        ]
      },
      {
        icon: 'tabler:settings',
        title: 'Account Settings',
        children: [
          {
            title: 'Account',
            path: '/pages/account-settings/account'
          },
          {
            title: 'Security',
            path: '/pages/account-settings/security'
          },
          {
            title: 'Billing',
            path: '/pages/account-settings/billing'
          },
          {
            title: 'Notifications',
            path: '/pages/account-settings/notifications'
          },

          {
            title: 'Connections',
            path: '/pages/account-settings/connections'
          }
        ]
      },
      {
        title: 'FAQ',
        path: '/pages/faq',
        icon: 'tabler:help'
      },
      {
        title: 'Help Center',
        icon: 'tabler:help',
        path: '/pages/help-center'
      },
      {
        title: 'Pricing',
        icon: 'tabler:currency-dollar',
        path: '/pages/pricing'
      },
      {
        title: 'Miscellaneous',
        icon: 'tabler:3d-cube-sphere',
        children: [
          {
            openInNewTab: true,
            title: 'Coming Soon',
            path: '/pages/misc/coming-soon'
          },
          {
            openInNewTab: true,
            title: 'Under Maintenance',
            path: '/pages/misc/under-maintenance'
          },
          {
            openInNewTab: true,
            title: 'Page Not Found - 404',
            path: '/pages/misc/404-not-found'
          },
          {
            openInNewTab: true,
            title: 'Not Authorized - 401',
            path: '/pages/misc/401-not-authorized'
          },
          {
            openInNewTab: true,
            title: 'Server Error - 500',
            path: '/pages/misc/500-server-error'
          }
        ]
      },
      {
        title: 'Auth Pages',
        icon: 'tabler:lock',
        children: [
          {
            title: 'Login',
            children: [
              {
                openInNewTab: true,
                title: 'Login v1',
                path: '/pages/auth/login-v1'
              },
              {
                openInNewTab: true,
                title: 'Login v2',
                path: '/pages/auth/login-v2'
              },
              {
                openInNewTab: true,
                title: 'Login With AppBar',
                path: '/pages/auth/login-with-appbar'
              }
            ]
          },
          {
            title: 'Register',
            children: [
              {
                openInNewTab: true,
                title: 'Register v1',
                path: '/pages/auth/register-v1'
              },
              {
                openInNewTab: true,
                title: 'Register v2',
                path: '/pages/auth/register-v2'
              },
              {
                openInNewTab: true,
                title: 'Register Multi-Steps',
                path: '/pages/auth/register-multi-steps'
              }
            ]
          },
          {
            title: 'Verify Email',
            children: [
              {
                openInNewTab: true,
                title: 'Verify Email v1',
                path: '/pages/auth/verify-email-v1'
              },
              {
                openInNewTab: true,
                title: 'Verify Email v2',
                path: '/pages/auth/verify-email-v2'
              }
            ]
          },
          {
            title: 'Forgot Password',
            children: [
              {
                openInNewTab: true,
                title: 'Forgot Password v1',
                path: '/pages/auth/forgot-password-v1'
              },
              {
                openInNewTab: true,
                title: 'Forgot Password v2',
                path: '/pages/auth/forgot-password-v2'
              }
            ]
          },
          {
            title: 'Reset Password',
            children: [
              {
                openInNewTab: true,
                title: 'Reset Password v1',
                path: '/pages/auth/reset-password-v1'
              },
              {
                openInNewTab: true,
                title: 'Reset Password v2',
                path: '/pages/auth/reset-password-v2'
              }
            ]
          },
          {
            title: 'Two Steps',
            children: [
              {
                openInNewTab: true,
                title: 'Two Steps v1',
                path: '/pages/auth/two-steps-v1'
              },
              {
                openInNewTab: true,
                title: 'Two Steps v2',
                path: '/pages/auth/two-steps-v2'
              }
            ]
          }
        ]
      },
      {
        title: 'Wizard Examples',
        icon: 'tabler:forms',
        children: [
          {
            title: 'Checkout',
            path: '/pages/wizard-examples/checkout'
          },
          {
            title: 'Property Listing',
            path: '/pages/wizard-examples/property-listing'
          },
          {
            title: 'Create Deal',
            path: '/pages/wizard-examples/create-deal'
          }
        ]
      },
      {
        icon: 'tabler:square',
        title: 'Dialog Examples',
        path: '/pages/dialog-examples'
      }
    ]
  },
  {
    title: 'Forms & Tables',
    icon: 'tabler:checkbox',
    children: [
      {
        title: 'Form Elements',
        icon: 'tabler:toggle-left',
        children: [
          {
            title: 'Text Field',
            path: '/forms/form-elements/text-field'
          },
          {
            title: 'Select',
            path: '/forms/form-elements/select'
          },
          {
            title: 'Checkbox',
            path: '/forms/form-elements/checkbox'
          },
          {
            title: 'Radio',
            path: '/forms/form-elements/radio'
          },
          {
            title: 'Custom Inputs',
            path: '/forms/form-elements/custom-inputs'
          },
          {
            title: 'Textarea',
            path: '/forms/form-elements/textarea'
          },
          {
            title: 'Autocomplete',
            path: '/forms/form-elements/autocomplete'
          },
          {
            title: 'Date Pickers',
            path: '/forms/form-elements/pickers'
          },
          {
            title: 'Switch',
            path: '/forms/form-elements/switch'
          },
          {
            title: 'File Uploader',
            path: '/forms/form-elements/file-uploader'
          },
          {
            title: 'Editor',
            path: '/forms/form-elements/editor'
          },
          {
            title: 'Slider',
            path: '/forms/form-elements/slider'
          },
          {
            title: 'Input Mask',
            path: '/forms/form-elements/input-mask'
          },
        ]
      },
      {
        icon: 'tabler:layout-navbar',
        title: 'Form Layouts',
        path: '/forms/form-layouts'
      },
      {
        title: 'Form Validation',
        path: '/forms/form-validation',
        icon: 'tabler:checkbox'
      },
      {
        title: 'Form Wizard',
        path: '/forms/form-wizard',
        icon: 'tabler:text-wrap-disabled'
      },
      {
        title: 'Table',
        icon: 'tabler:table',
        path: '/tables/mui'
      },
      {
        title: 'Mui DataGrid',
        icon: 'tabler:layout-grid',
        path: '/tables/data-grid'
      }
    ]
  },
  {
    title: 'Charts',
    icon: 'tabler:chart-pie',
    children: [
      {
        title: 'Apex',
        icon: 'tabler:chart-sankey',
        path: '/charts/apex-charts'
      },
      {
        title: 'Recharts',
        icon: 'tabler:chart-ppf',
        path: '/charts/recharts'
      },
      {
        title: 'ChartJS',
        path: '/charts/chartjs',
        icon: 'tabler:chart-line'
      }
    ]
  },
  {
    title: 'Others',
    icon: 'tabler:dots',
    children: [
      {
        path: '/acl',
        action: 'read',
        subject: 'acl-page',
        icon: 'tabler:shield',
        title: 'Access Control'
      },
      {
        title: 'Menu Levels',
        icon: 'tabler:menu-2',
        children: [
          {
            title: 'Menu Level 2.1'
          },
          {
            title: 'Menu Level 2.2',
            children: [
              {
                title: 'Menu Level 3.1'
              },
              {
                title: 'Menu Level 3.2'
              }
            ]
          }
        ]
      },
      {
        title: 'Disabled Menu',
        icon: 'tabler:eye-off',
        disabled: true
      },
      {
        title: 'Raise Support',
        icon: 'tabler:lifebuoy',
        externalLink: true,
        openInNewTab: true,
        path: 'https://pixinvent.ticksy.com/'
      },
      {
        title: 'Documentation',
        icon: 'tabler:file-text',
        externalLink: true,
        openInNewTab: true,
        path: 'https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation'
      }
    ]
  }
]

mock.onGet('/api/horizontal-nav/data').reply(() => {
  return [200, navigation]
})
