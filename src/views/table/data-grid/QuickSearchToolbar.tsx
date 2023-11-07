// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { GridToolbarFilterButton } from '@mui/x-data-grid'

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/text-field'

// ** Icon Imports
import Icon from '@/@core/components/icon'

interface Props {
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
}

const QuickSearchToolbar = (props: Props) => {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <GridToolbarFilterButton />
      <CustomTextField
        value={props.value}
        placeholder='Search…'
        onChange={props.onChange}
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon fontSize='1.25rem' icon='tabler:search' />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
              <Icon fontSize='1.25rem' icon='tabler:x' />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />
    </Box>
  )
}

export default QuickSearchToolbar
