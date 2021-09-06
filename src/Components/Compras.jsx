import React, { useState } from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import { Close } from '@material-ui/icons'
import { Button } from '@material-ui/core'

import { Page } from '.'
import { ProdutoForm } from './ProdutoForm'
import { useContext } from '../context'
import { Paginacao } from './Paginacao'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  listHeader: {
    marginTop: 30,
    fontSize: 20,
  },
  paginacao: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    '& > *': {
      border: '1px solid gray',
      margin: '-1px -1px 0px 0px',
      padding: '5px 10px',
      display: 'flex',
      alignItems: 'center',
      wordBreak: 'break-all',
    },
    '& > :nth-child(1)': {
      width: 400,
    },
    '& > :nth-child(2)': {
      width: '100%',
    },
    '& > :nth-child(3)': {
      width: 400,
    },
  },
}))

export const Compras = () => {
  const classes = useStyles()
  const { compras } = useContext()
  const [paginacao, setPaginacao] = useState([0, 10])
  const [pagina, setPagina] = useState(1)
  const onChangePaginacao = (pagina, paginacao) => {
    setPagina(pagina)
    setPaginacao(paginacao)
  }
  return (
    <Page>
      <div className={classes.root}>
        <Breadcrumbs separator="›">
          <Typography color="textPrimary">Admin</Typography>
          <Typography>Produtos</Typography>
        </Breadcrumbs>
        <div className={classnames(classes.row, classes.listHeader)}>
          <div>Nome</div>
          <div>Qtd</div>
          <div>Total</div>
        </div>
        {compras.slice(paginacao[0], paginacao[1]).map((compra, index) => (
          <div key={index} className={classes.row}>
            <div>{compra.nome}</div>
            <div>{compra.quantidade}</div>
            <div>R$ {compra.total.toFixed(2)}</div>
          </div>
        ))}
        <div className={classes.paginacao}>
          <Paginacao quantidade={compras.length} onChange={onChangePaginacao} pagina={pagina} />
        </div>
      </div>
    </Page>
  )
}
