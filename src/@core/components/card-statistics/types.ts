// ** Types
import { ApexOptions } from 'apexcharts'
import { ChipProps } from '@mui/material/Chip'
import { SxProps, Theme } from '@mui/material'
import { ThemeColor } from '@/@core/layouts/types'

export type CardStatsSquareProps = {
  icon: string
  stats: string
  title: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
}

export type CardStatsHorizontalProps = {
  icon: string
  stats: string
  title: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
}

export type CardStatsWithAreaChartProps = {
  stats: string
  title: string
  avatarIcon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  chartColor?: ThemeColor
  avatarColor?: ThemeColor
  avatarIconSize?: number | string
  chartSeries: ApexOptions['series']
}

export type CardStatsVerticalProps = {
  stats: string
  title: string
  chipText: string
  subtitle: string
  avatarIcon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  chipColor?: ChipProps['color']
}

export type CardStatsHorizontalWithDetailsProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
}
