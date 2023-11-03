// ** React Imports
import { ElementType, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import MuiListItem, { ListItemProps } from '@mui/material/ListItem'

// ** Third Party Imports
import clsx from 'clsx'

// ** Theme Config Import
import themeConfig from '@/configs/themeConfig'

// ** Types
import { NavLink } from '@/@core/layouts/types'
import { Settings } from '@/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from '@/layouts/components/UserIcon'
import Translations from '@/layouts/components/Translations'
import CanViewNavLink from '@/layouts/components/acl/CanViewNavLink'

// ** Util Imports
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'
import { handleURLQueries } from '@/@core/layouts/utils'

interface Props {
  item: NavLink
  settings: Settings
  hasParent: boolean
}

const ListItem = styled(MuiListItem)<
  ListItemProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: 'auto',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.active, &.active:hover': {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
  },
  '&.active .MuiTypography-root, &.active .MuiListItemIcon-root': {
    color: theme.palette.primary.main
  },
  '&.active .MuiTypography-root': {
    fontWeight: 500
  },
  '&:focus-visible': {
    outline: 0,
    backgroundColor: theme.palette.action.focus
  }
}))

const HorizontalNavLink = (props: Props) => {
  // ** Props
  const { item, settings, hasParent } = props

  // ** Hook & Vars
  const router = useRouter()
  const { navSubItemIcon, menuTextTruncate } = themeConfig

  const icon = item.icon ? item.icon : navSubItemIcon

  const Wrapper = !hasParent ? List : Fragment

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  return (
    <CanViewNavLink navLink={item}>
      <Wrapper {...(!hasParent ? { component: 'div', sx: { py: settings.skin === 'bordered' ? 2.625 : 2.75 } } : {})}>
        <ListItem
          component={Link}
          disabled={item.disabled}
          {...(item.disabled && { tabIndex: -1 })}
          className={clsx({ active: isNavLinkActive() })}
          target={item.openInNewTab ? '_blank' : undefined}
          href={item.path === undefined ? '/' : `${item.path}`}
          onClick={e => {
            if (item.path === undefined) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
          sx={{
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
            ...(!hasParent
              ? {
                  '&.active, &.active:hover': {
                    boxShadow: theme => `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
                    background: theme =>
                      `linear-gradient(72.47deg, ${theme.palette.primary.main} 22.16%, ${hexToRGBA(
                        theme.palette.primary.main,
                        0.7
                      )} 76.47%)`,
                    '&:focus-visible': {
                      background: theme =>
                        `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${hexToRGBA(
                          theme.palette.primary.dark,
                          0.7
                        )} 76.47%)`
                    },
                    '& .MuiTypography-root, & .MuiListItemIcon-root': {
                      color: 'common.white'
                    }
                  }
                }
              : {
                  mx: 2,
                  width: theme => `calc(100% - ${theme.spacing(2 * 2)})`,
                  '&.active, &.active:hover': {
                    '&:focus-visible': {
                      backgroundColor: theme => hexToRGBA(theme.palette.primary.main, 0.24)
                    }
                  }
                })
          }}
        >
          <Box sx={{ gap: 2, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(menuTextTruncate && { overflow: 'hidden' })
              }}
            >
              <ListItemIcon sx={{ mr: 2, color: 'text.secondary' }}>
                <UserIcon icon={icon} fontSize={icon === navSubItemIcon ? '0.625rem' : '1.375rem'} />
              </ListItemIcon>
              <Typography {...(menuTextTruncate && { noWrap: true })} sx={{ color: 'text.secondary' }}>
                <Translations text={item.title} />
              </Typography>
            </Box>
            {item.badgeContent ? (
              <Chip
                size='small'
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{ height: 22, minWidth: 22, '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' } }}
              />
            ) : null}
          </Box>
        </ListItem>
      </Wrapper>
    </CanViewNavLink>
  )
}

export default HorizontalNavLink
