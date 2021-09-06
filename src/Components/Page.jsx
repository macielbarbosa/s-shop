import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Button } from '@material-ui/core'
import { useContext } from '../context'
import { useHistory } from 'react-router'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    border: '1px solid lightgray',
  },
  body: {
    display: 'flex',
  },
  content: {
    width: '100%',
    padding: '30px 40px',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 200,
    height: '93vh',
    borderRight: '1px solid lightgray',
    '& span': {
      textAlign: 'center',
    },
  },
}))

export const Page = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  const { modoCliente, toggleModo } = useContext()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            S-Shop
          </Typography>
          <Button color="secondary" variant="contained" onClick={toggleModo}>
            {modoCliente ? 'Cliente' : 'Admin'}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <div className={classes.drawer}>
          <List>
            {modoCliente ? (
              <Fragment>
                <ListItem button onClick={() => history.push('/')}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => history.push('/cesta')}>
                  <ListItemText primary="Cesta" />
                </ListItem>
              </Fragment>
            ) : (
              <Fragment>
                <ListItem button onClick={() => history.push('/produtos')}>
                  <ListItemText primary="Produtos" />
                </ListItem>
                <ListItem button onClick={() => history.push('/compras')}>
                  <ListItemText primary="Compras" />
                </ListItem>
              </Fragment>
            )}
          </List>
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}
