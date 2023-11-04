// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Util Import
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

// ** Custom Components Imports
import CustomChip from '@/@core/components/mui/chip'

// ** Types
import { PricingPlanProps } from './types'

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(16),
  borderRadius: theme.shape.borderRadius
}))

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(2.5)
  }
}))

const PlanDetails = (props: PricingPlanProps) => {
  // ** Props
  const { plan, data } = props

  const renderFeatures = () => {
    return data?.planBenefits.map((item: string, index: number) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component='span' sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2.5 }}>
          <Icon icon='tabler:circle' fontSize='0.875rem' />
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{item}</Typography>
      </Box>
    ))
  }

  return (
    <BoxWrapper
      sx={{
        border: theme =>
          !data?.popularPlan
            ? `1px solid ${theme.palette.divider}`
            : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      {data?.popularPlan ? (
        <CustomChip
          rounded
          size='small'
          skin='light'
          label='Popular'
          color='primary'
          sx={{
            top: 24,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 500,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <img
          width={data?.imgWidth}
          src={`${data?.imgSrc}`}
          height={data?.imgHeight}
          alt={`${data?.title.toLowerCase().replace(' ', '-')}-plan-img`}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem' }}>
          {data?.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{data?.subtitle}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ mt: 2.5, mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>
              $
            </Typography>
            <Typography variant='h1' sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 1.4168 }}>
              {plan === 'monthly' ? data?.monthlyPrice : data?.yearlyPlan.perMonth}
            </Typography>
            <Typography sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>/month</Typography>
          </Box>
          {plan !== 'monthly' && data?.monthlyPrice !== 0 ? (
            <Typography
              variant='body2'
              sx={{
                mt: 4,
                top: 52,
                left: '50%',
                position: 'absolute',
                color: 'text.disabled',
                transform: 'translateX(-50%)'
              }}
            >{`USD ${data?.yearlyPlan.totalAnnual}/year`}</Typography>
          ) : null}
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <Button
        fullWidth
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={data?.popularPlan ? 'contained' : 'tonal'}
      >
        {data?.currentPlan ? 'Your Current Plan' : 'Upgrade'}
      </Button>
    </BoxWrapper>
  )
}

export default PlanDetails
