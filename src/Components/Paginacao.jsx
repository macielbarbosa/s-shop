import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export const Paginacao = ({ quantidade, pagina, onChange }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination
        page={pagina}
        count={Math.ceil(quantidade / 10)}
        onChange={(_, pagina) => onChange(pagina, [(pagina - 1) * 10, pagina * 10])}
      />
    </div>
  )
}
