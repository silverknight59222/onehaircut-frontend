// ** React Imports
import React, { Ref, useState, ReactNode, forwardRef, ReactElement, MouseEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import ListItemText from '@mui/material/ListItemText'
import { Theme, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Configs Imports
import themeConfig from '@/configs/themeConfig'

// ** Hooks Imports
import { useSettings } from '@/@core/hooks/useSettings'
import FullTable from "@/views/datatable/FullTable";

interface DataType {
  name: string
  email: string
  value: string
  avatar: string
}

interface OptionsType {
  name: string
  avatar: string
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})


interface DialogShareProjectProps {
  show: any;
  setShow: any;
  children: any;
}
const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: theme.palette.common.white, // Set icon color to white
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.error.main} !important`, // Set background to red
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.error.dark, // Optionally change the hover color to a darker red
    color: theme.palette.common.white
  }
}));


const headers:any = [
  "Date",
  "Client",
  "Produits",
  "Prix",
  "Facture",
  "Moyen de paiement",
  "Status"
];

const data = [
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },    {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },
  {
    Date: "12/07/2023",
    Client: "Amanda louis",
    Produits: "Carré plongeant",
    Prix: "80 $",
    Facture: "non Disponible",
    "Moyen de paiement": "Visa",
    Status: "En vérification"
  },

  // ... Add more rows as needed
];

const DialogShareProject: React.FC<DialogShareProjectProps> = ({ show, setShow, children }) => {  // ** States
  // const [show, setShow] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('sm'))

  // ** Var
  const { direction } = settings

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        PaperProps={{
          style: { maxWidth: 'none', width: '80%' }, // Set a specific width here
        }}
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          {children}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogShareProject
