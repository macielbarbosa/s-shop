import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import AddIcon from '@material-ui/icons/Add'
import { useContext } from '../context'

const useStyles = makeStyles(() => ({
  root: {
    margin: '20px 0 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    '& > :not(:last-child)': {
      marginRight: 20,
    },
    '& > :nth-child(2)': {
      flexGrow: 1,
      '& .MuiTextField-root': {
        width: '100%',
      },
    },
    '& > :nth-child(3)': {
      width: 150,
    },
    '& > :last-child': {
      marginTop: 10,
    },
  },
}))

export const ProdutoForm = () => {
  const classes = useStyles()
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const context = useContext()

  const adicionarProduto = () => {
    console.log({ nome, descricao, preco })
    if (!nome) {
      alert('Informe o nome do produto.')
      return
    }
    context.adicionarProduto({ nome, descricao, preco })
    setNome('')
    setDescricao('')
    setPreco('')
  }

  return (
    <div className={classes.root}>
      <div>
        <Typography>Produto</Typography>
        <TextField
          variant="outlined"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </div>
      <div>
        <Typography>Descrição</Typography>
        <TextField
          variant="outlined"
          placeholder="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
      </div>
      <div>
        <Typography>Preço</Typography>
        <TextField
          variant="outlined"
          placeholder="Preço"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
        />
      </div>
      <Button variant="contained" color="primary" onClick={adicionarProduto}>
        <AddIcon fontSize="small" />
      </Button>
    </div>
  )
}
