// ** Mock Adapter
import mock from '@/@fake-db/mock'

// ** Type Imports
import { CardStatsType } from '@/@fake-db/types'

const cardStatsData: CardStatsType = {
  statsSquare: [
    {
      stats: '97.8k',
      title: 'Orders',
      avatarColor: 'error',
      icon: 'tabler:briefcase'
    },
    {
      stats: '3.4k',
      title: 'Review',
      avatarColor: 'success',
      icon: 'tabler:message-dots'
    }
  ],
  statsHorizontal: [
    {
      stats: '86%',
      icon: 'tabler:cpu',
      title: 'CPU Usage'
    },
    {
      stats: '1.24gb',
      icon: 'tabler:server',
      title: 'Memory Usage',
      avatarColor: 'success'
    },
    {
      stats: '0.2%',
      avatarColor: 'error',
      title: 'Downtime Ratio',
      icon: 'tabler:chart-pie-2'
    },
    {
      stats: '128',
      title: 'Issues Found',
      avatarColor: 'warning',
      icon: 'tabler:alert-octagon'
    }
  ],
  statsVertical: [
    {
      stats: '1.28k',
      chipColor: 'error',
      chipText: '-12.2%',
      avatarColor: 'error',
      title: 'Total Profit',
      subtitle: 'Last week',
      avatarIcon: 'tabler:credit-card'
    },
    {
      stats: '24.67k',
      chipText: '+25.7%',
      title: 'Total Sales',
      chipColor: 'success',
      subtitle: 'Last week',
      avatarColor: 'success',
      avatarIcon: 'tabler:credit-card'
    }
  ],
  statsWithAreaChart: [
    {
      stats: '92.6k',
      avatarIcon: 'tabler:users',
      title: 'Subscribers Gained',
      chartSeries: [{ data: [40, 4, 58, 12, 35, 10, 84] }]
    },
    {
      stats: '36.5%',
      chartColor: 'error',
      avatarColor: 'error',
      title: 'Quarterly Sales',
      avatarIcon: 'tabler:shopping-cart',
      chartSeries: [{ data: [44, 75, 24, 57, 6, 84] }]
    },
    {
      stats: '97.5k',
      chartColor: 'warning',
      avatarColor: 'warning',
      title: 'Orders Received',
      avatarIcon: 'tabler:package',
      chartSeries: [{ data: [30, 84, 11, 76, 0, 49, 9] }]
    },
    {
      stats: '91.8k',
      chartColor: 'success',
      avatarColor: 'success',
      title: 'Revenue Generated',
      avatarIcon: 'tabler:credit-card',
      chartSeries: [{ data: [6, 35, 25, 61, 32, 84, 70] }]
    }
  ],
  statsHorizontalWithDetails: [
    {
      stats: '21,459',
      title: 'Session',
      trendDiff: '+29',
      icon: 'tabler:user',
      subtitle: 'Total Users'
    },
    {
      stats: '4,567',
      trendDiff: '+18',
      title: 'Paid Users',
      avatarColor: 'error',
      icon: 'tabler:user-plus',
      subtitle: 'Last week analytics'
    },
    {
      stats: '19,860',
      trendDiff: '-14',
      trend: 'negative',
      title: 'Active Users',
      avatarColor: 'success',
      icon: 'tabler:user-check',
      subtitle: 'Last week analytics'
    },
    {
      stats: '237',
      trendDiff: '+42',
      title: 'Pending Users',
      avatarColor: 'warning',
      icon: 'tabler:user-exclamation',
      subtitle: 'Last week analytics'
    }
  ]
}

mock.onGet('/cards/statistics').reply(() => {
  return [200, cardStatsData]
})
