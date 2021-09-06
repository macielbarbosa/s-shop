import React, { useState } from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Close } from '@material-ui/icons'
import { Button } from '@material-ui/core'

import { Page } from '.'
import { useContext } from '../context'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  listHeader: {
    fontSize: 20,
  },
  inputNome: {
    margin: '20px 0 20px',
  },
  footer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > button': {
      marginTop: 20,
    },
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
      width: 60,
    },
    '& > :nth-child(2)': {
      width: 200,
    },
    '& > :nth-child(3)': {
      width: '100%',
    },
    '& > :nth-child(4)': {
      width: 150,
    },
    '& > :nth-child(5)': {
      width: 120,
    },
  },
}))

export const Cesta = () => {
  const classes = useStyles()
  const { cesta, removerCesta, finalizar } = useContext()
  const [nome, setNome] = useState('')

  const onClickFinalizar = () => {
    if (!nome) {
      alert('Preencha o seu nome.')
      return
    }
    finalizar(nome)
  }

  return (
    <Page>
      <div className={classes.root}>
        <Breadcrumbs separator="›">
          <Typography>Cesta</Typography>
        </Breadcrumbs>
        <div className={classes.inputNome}>
          <Typography>Nome</Typography>
          <TextField
            variant="outlined"
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            fullWidth
          />
        </div>
        <div className={classnames(classes.row, classes.listHeader)}>
          <div>Qtd</div>
          <div>Produto</div>
          <div>Descrição</div>
          <div>Valor</div>
          <div></div>
        </div>
        {cesta.map((produto, index) => (
          <div key={index} className={classes.row}>
            <div>{produto.quantidade}</div>
            <div>{produto.nome}</div>
            <div>{produto.descricao}</div>
            <div>R$ {(Number(produto.preco) * produto.quantidade).toFixed(2)}</div>
            <div>
              <Button onClick={() => removerCesta(produto.nome)}>
                <Close />
              </Button>
            </div>
          </div>
        ))}
        <div className={classes.footer}>
          <Typography>
            Total R${' '}
            {cesta.reduce((total, produto) => total + Number(produto.preco) * produto.quantidade, 0).toFixed(2)}
          </Typography>
          <Button color="primary" variant="contained" onClick={onClickFinalizar}>
            Finalizar compra
          </Button>
        </div>
      </div>
    </Page>
  )
}
