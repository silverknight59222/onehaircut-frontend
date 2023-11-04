// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardStatsSquareProps } from '@/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from '@/@core/components/icon'
import CustomAvatar from '@/@core/components/mui/avatar'

const CardStatsSquare = (props: CardStatsSquareProps) => {
  // ** Props
  const { sx, icon, stats, title, iconSize = 24, avatarSize = 42, avatarColor = 'primary' } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CustomAvatar skin='light' color={avatarColor} sx={{ mb: 2, width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
        <Typography variant='h5' sx={{ mb: 2 }}>
          {stats}
        </Typography>
        <Typography variant='body2'>{title}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsSquare
