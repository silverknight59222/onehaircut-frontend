// ** React Imports
import { SyntheticEvent, useState, useEffect, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, useTheme } from '@mui/material/styles'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MuiListItem, { ListItemProps } from '@mui/material/ListItem'

// ** Third Party Imports
import clsx from 'clsx'
import { usePopper } from 'react-popper'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Theme Config Import
import themeConfig from '@/configs/themeConfig'

// ** Types
import { NavGroup } from '@/@core/layouts/types'
import { Settings } from '@/@core/context/settingsContext'

// ** Custom Components Imports
import HorizontalNavItems from './HorizontalNavItems'
import UserIcon from '@/layouts/components/UserIcon'
import Translations from '@/layouts/components/Translations'
import CanViewNavGroup from '@/layouts/components/acl/CanViewNavGroup'

// ** Utils
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'
import { hasActiveChild } from '@/@core/layouts/utils'

interface Props {
  item: NavGroup
  settings: Settings
  hasParent?: boolean
}

// ** Styled Components
const ListItem = styled(MuiListItem)<ListItemProps>(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    background: theme.palette.action.hover
  }
}))

const NavigationMenu = styled(Paper)(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing(2, 0),
  maxHeight: 'calc(100vh - 13rem)',
  backgroundColor: theme.palette.background.paper,
  ...(themeConfig.menuTextTruncate ? { width: 250 } : { minWidth: 250 }),
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(1)
  },

  '&::-webkit-scrollbar': {
    width: 6
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 20,
    background: hexToRGBA(theme.palette.mode === 'light' ? '#B0ACB5' : '#575468', 0.6)
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: 20,
    background: 'transparent'
  },
  '& .MuiList-root': {
    paddingTop: 0,
    paddingBottom: 0
  },
  '& .menu-group.Mui-selected': {
    backgroundColor: theme.palette.action.hover
  }
}))

const HorizontalNavGroup = (props: Props) => {
  // ** Props
  const { item, hasParent, settings } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const router = useRouter()
  const currentURL = router.asPath
  const { skin, direction } = settings
  const { navSubItemIcon, menuTextTruncate, horizontalMenuToggle, horizontalMenuAnimation } = themeConfig

  const popperOffsetHorizontal = direction === 'rtl' ? 16 : -16
  const popperPlacement = direction === 'rtl' ? 'bottom-end' : 'bottom-start'
  const popperPlacementSubMenu = direction === 'rtl' ? 'left-start' : 'right-start'

  // ** States
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [popperElement, setPopperElement] = useState(null)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [referenceElement, setReferenceElement] = useState(null)

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: hasParent ? popperPlacementSubMenu : popperPlacement,
    modifiers: [
      {
        enabled: true,
        name: 'offset',
        options: {
          offset: hasParent ? [-8, 19] : [popperOffsetHorizontal, -2]
        }
      },
      {
        enabled: true,
        name: 'flip'
      }
    ]
  })

  const handleGroupOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
    update ? update() : null
  }

  const handleGroupClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  const handleMenuToggleOnClick = (event: SyntheticEvent) => {
    if (anchorEl) {
      handleGroupClose()
    } else {
      handleGroupOpen(event)
    }
  }

  useEffect(() => {
    handleGroupClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const icon = item.icon ? item.icon : navSubItemIcon
  const toggleIcon = direction === 'rtl' ? 'tabler:chevron-left' : 'tabler:chevron-right'

  const WrapperCondition = horizontalMenuToggle === 'click'
  const MainWrapper = WrapperCondition ? ClickAwayListener : 'div'
  const ChildWrapper = WrapperCondition ? 'div' : Fragment
  const AnimationWrapper = horizontalMenuAnimation ? Fade : Fragment

  const childMenuGroupStyles = () => {
    if (attributes && attributes.popper) {
      if (direction === 'ltr') {
        if (attributes.popper['data-popper-placement'] === 'right-start') {
          return 'left'
        }
        if (attributes.popper['data-popper-placement'] === 'left-start') {
          return 'right'
        }
      } else {
        if (attributes.popper['data-popper-placement'] === 'right-start') {
          return 'right'
        }
        if (attributes.popper['data-popper-placement'] === 'left-start') {
          return 'left'
        }
      }
    }
  }

  return (
    <CanViewNavGroup navGroup={item}>
      {/* @ts-ignore */}
      <MainWrapper {...(WrapperCondition ? { onClickAway: handleGroupClose } : { onMouseLeave: handleGroupClose })}>
        <ChildWrapper>
          <List component='div' sx={{ py: skin === 'bordered' ? 2.625 : 2.75 }}>
            <ListItem
              aria-haspopup='true'
              {...(WrapperCondition ? {} : { onMouseEnter: handleGroupOpen })}
              className={clsx('menu-group', { 'Mui-selected': hasActiveChild(item, currentURL) })}
              {...(horizontalMenuToggle === 'click' ? { onClick: handleMenuToggleOnClick } : {})}
              sx={{
                ...(menuOpen ? { backgroundColor: 'action.hover' } : {}),
                ...(!hasParent
                  ? {
                      '&.Mui-selected': {
                        boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
                        background: `linear-gradient(72.47deg, ${
                          theme.direction === 'ltr'
                            ? theme.palette.primary.main
                            : hexToRGBA(theme.palette.primary.main, 0.7)
                        } 22.16%, ${
                          theme.direction === 'ltr'
                            ? hexToRGBA(theme.palette.primary.main, 0.7)
                            : theme.palette.primary.main
                        } 76.47%)`,
                        '& .MuiTypography-root, & .MuiListItemIcon-root, & svg': {
                          color: 'common.white'
                        }
                      }
                    }
                  : { mx: 2, width: `calc(100% - ${theme.spacing(2 * 2)})` })
              }}
            >
              <Box
                sx={{
                  gap: 2,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                ref={setReferenceElement}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    ...(menuTextTruncate && { overflow: 'hidden' })
                  }}
                >
                  <ListItemIcon sx={{ mr: 2, color: menuOpen ? 'text.primary' : 'text.secondary' }}>
                    <UserIcon icon={icon} fontSize={icon === navSubItemIcon ? '0.625rem' : '1.375rem'} />
                  </ListItemIcon>
                  <Typography
                    {...(menuTextTruncate && { noWrap: true })}
                    sx={{ color: menuOpen ? 'text.primary' : 'text.secondary' }}
                  >
                    <Translations text={item.title} />
                  </Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', color: menuOpen ? 'text.secondary' : 'text.disabled' }}
                >
                  {item.badgeContent ? (
                    <Chip
                      size='small'
                      label={item.badgeContent}
                      color={item.badgeColor || 'primary'}
                      sx={{
                        mr: 2,
                        height: 22,
                        minWidth: 22,
                        '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                      }}
                    />
                  ) : null}
                  <Icon icon={hasParent ? toggleIcon : 'tabler:chevron-down'} fontSize='1.125rem' />
                </Box>
              </Box>
            </ListItem>
            <AnimationWrapper {...(horizontalMenuAnimation && { in: menuOpen, timeout: { exit: 300, enter: 400 } })}>
              <Box
                style={styles.popper}
                ref={setPopperElement}
                {...attributes.popper}
                sx={{
                  zIndex: theme.zIndex.appBar,
                  ...(!horizontalMenuAnimation && { display: menuOpen ? 'block' : 'none' }),
                  pl: childMenuGroupStyles() === 'left' ? (skin === 'bordered' ? 1.5 : 1.25) : 0,
                  pr: childMenuGroupStyles() === 'right' ? (skin === 'bordered' ? 1.5 : 1.25) : 0,
                  ...(hasParent ? { position: 'fixed !important' } : { pt: skin === 'bordered' ? 5.25 : 5.5 })
                }}
              >
                <NavigationMenu
                  sx={{
                    ...(hasParent ? { overflowY: 'auto', overflowX: 'visible', maxHeight: 'calc(100vh - 21rem)' } : {}),
                    ...(skin === 'bordered'
                      ? { boxShadow: 0, border: `1px solid ${theme.palette.divider}` }
                      : { boxShadow: 6 })
                  }}
                >
                  <HorizontalNavItems {...props} hasParent horizontalNavItems={item.children} />
                </NavigationMenu>
              </Box>
            </AnimationWrapper>
          </List>
        </ChildWrapper>
      </MainWrapper>
    </CanViewNavGroup>
  )
}

export default HorizontalNavGroup
