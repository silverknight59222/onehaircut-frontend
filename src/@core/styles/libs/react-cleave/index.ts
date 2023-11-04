// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

const CleaveWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  '& input': {
    width: '100%',
    background: 'none',
    lineHeight: 1.4375,
    padding: '7.5px 13px',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,
    border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: `rgba(${theme.palette.customColors.main}, 0.28)`
    },
    '&:focus, &:focus-visible': {
      outline: 0,
      boxShadow: theme.shadows[2],
      borderColor: `${theme.palette.primary.main} !important`,
      '&::placeholder': {
        transform: 'translateX(4px)'
      }
    },
    '&::placeholder': {
      opacity: 0.42,
      transition: theme.transitions.create(['transform'], { duration: theme.transitions.duration.shorter })
    }
  }
}))

export default CleaveWrapper
