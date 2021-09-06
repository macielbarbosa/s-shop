import React, { useState } from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Close } from '@material-ui/icons'
import { Button } from '@material-ui/core'

import { Page } from '.'
import { useContext } from '../context'
import { Paginacao } from './Paginacao'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
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
      width: 300,
    },
    '& input': {
      width: 50,
      padding: 10,
    },
  },
}))

export const Home = () => {
  const classes = useStyles()
  const { produtos, removerProduto } = useContext()
  const [paginacao, setPaginacao] = useState([0, 10])
  const [busca, setBusca] = useState('')
  const [pagina, setPagina] = useState(1)
  const produtosLista = produtos.filter(({ nome }) => nome.includes(busca))

  const onChangePaginacao = (pagina, paginacao) => {
    setPagina(pagina)
    setPaginacao(paginacao)
  }

  const onChangeBusca = (event) => {
    setPagina(1)
    setBusca(event.target.value)
  }

  return (
    <Page>
      <div className={classes.root}>
        <div className={classes.header}>
          <Breadcrumbs separator="›">
            <Typography>Home</Typography>
          </Breadcrumbs>
          <TextField variant="outlined" placeholder="Buscar" onChange={onChangeBusca} />
        </div>
        <div className={classnames(classes.row, classes.listHeader)}>
          <div>Produto</div>
          <div>Descrição</div>
          <div></div>
        </div>
        {produtosLista.slice(paginacao[0], paginacao[1]).map((produto, index) => (
          <Produto key={index} className={classes.row} valor={produto} />
        ))}
        <div className={classes.paginacao}>
          <Paginacao quantidade={produtosLista.length} onChange={onChangePaginacao} pagina={pagina} />
        </div>
      </div>
    </Page>
  )
}

const Produto = ({ valor, className }) => {
  const [quantidade, setQuantidade] = useState(1)
  const { adicionarCesta } = useContext()

  const onChangeQuantidade = (event) => {
    const { value } = event.target
    setQuantidade(value < 1 ? 1 : value)
  }

  return (
    <div className={className}>
      <div>{valor.nome}</div>
      <div>{valor.descricao}</div>
      <div>
        <TextField
          value={quantidade}
          variant="outlined"
          placeholder="Quantidade"
          type="number"
          onChange={onChangeQuantidade}
          inputProps={{ min: 1 }}
          style={{ marginRight: 10 }}
        />
        <Button color="primary" onClick={() => adicionarCesta({ ...valor, quantidade: Number(quantidade) })}>
          Adicionar
        </Button>
      </div>
    </div>
  )
}
