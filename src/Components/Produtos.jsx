import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Page } from '.'

const useStyles = makeStyles(() => ({
  root: {},
}))

export const Produtos = () => {
  const classes = useStyles()
  return (
    <Page>
      <div className={classes.root}>Produtos</div>
    </Page>
  )
}
