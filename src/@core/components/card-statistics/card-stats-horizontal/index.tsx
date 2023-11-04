// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardStatsHorizontalProps } from '@/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'

const CardStatsHorizontal = (props: CardStatsHorizontalProps) => {
  // ** Props
  const { sx, icon, stats, title, avatarSize = 42, iconSize = '1.625rem', avatarColor = 'primary' } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ gap: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant='h5' sx={{ mb: 0.5 }}>
            {stats}
          </Typography>
          <Typography variant='body2'>{title}</Typography>
        </Box>
        <CustomAvatar skin='light' color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default CardStatsHorizontal
