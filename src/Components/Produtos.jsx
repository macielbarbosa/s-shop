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
      width: 200,
    },
    '& > :nth-child(2)': {
      width: '100%',
    },
    '& > :nth-child(3)': {
      width: 100,
    },
    '& > :nth-child(4)': {
      width: 100,
    },
  },
}))

export const Produtos = () => {
  const classes = useStyles()
  const { produtos, removerProduto } = useContext()
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
        <ProdutoForm />
        <div className={classnames(classes.row, classes.listHeader)}>
          <div>Produto</div>
          <div>Descrição</div>
          <div>Preço</div>
          <div></div>
        </div>
        {produtos.slice(paginacao[0], paginacao[1]).map((produto, index) => (
          <div key={index} className={classes.row}>
            <div>{produto.nome}</div>
            <div>{produto.descricao}</div>
            <div>R$ {produto.preco}</div>
            <div>
              <Button onClick={() => removerProduto(produto.nome)}>
                <Close />
              </Button>
            </div>
          </div>
        ))}
        <div className={classes.paginacao}>
          <Paginacao quantidade={produtos.length} onChange={onChangePaginacao} pagina={pagina} />
        </div>
      </div>
    </Page>
  )
}
