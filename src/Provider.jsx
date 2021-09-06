import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { Context } from './context'
import { localStorage } from './utils/localStorage'

class ProviderComponent extends Component {
  constructor(props) {
    super(props)
    const cesta = localStorage.getItem('cesta')
    const produtos = localStorage.getItem('produtos')
    const compras = localStorage.getItem('compras')
    this.state = {
      produtos: produtos || [],
      cesta: cesta || [],
      compras: compras || [],
      modoCliente: true,
    }
  }

  setLista = (nome, itens) => {
    localStorage.setItem(nome, itens)
    this.setState({ [nome]: itens })
  }

  adicionarProduto = (produto) => {
    const { produtos } = this.state
    const jaExiste = produtos.some(({ nome }) => nome === produto.nome)
    if (jaExiste) {
      alert('O produto já existe.')
    } else {
      this.setLista('produtos', [...produtos, produto])
    }
  }

  removerProduto = (nome) => {
    const { produtos } = this.state
    const index = produtos.findIndex((produto) => produto.nome === nome)
    const naoExiste = index === -1
    if (naoExiste) return
    produtos.splice(index, 1)
    this.setLista('produtos', produtos)
  }

  adicionarCesta = (produto) => {
    const { cesta } = this.state
    const indexProdutoCesta = cesta.findIndex(({ nome }) => nome === produto.nome)
    const produtoEstaNaCesta = indexProdutoCesta !== -1
    if (produtoEstaNaCesta) {
      const produtoCesta = cesta[indexProdutoCesta]
      produtoCesta.quantidade += produto.quantidade
      this.setLista('cesta', cesta)
    } else {
      this.setLista('cesta', [...this.state.cesta, produto])
    }
  }

  removerCesta = (nome) => {
    const { cesta } = this.state
    const index = cesta.findIndex((produto) => produto.nome === nome)
    const naoExiste = index === -1
    if (naoExiste) return
    cesta.splice(index, 1)
    this.setLista('cesta', cesta)
  }

  finalizar = (nome) => {
    const { compras, cesta } = this.state
    const compra = {
      nome,
      quantidade: cesta.length,
      total: cesta.reduce((total, produto) => total + Number(produto.preco) * produto.quantidade, 0),
    }
    this.setLista('compras', [...compras, compra])
    this.setLista('cesta', [])
  }

  toggleModo = () => {
    const { modoCliente } = this.state
    this.props.history.push(modoCliente ? 'produtos' : '/')
    this.setState({ modoCliente: !this.state.modoCliente })
  }

  render() {
    const { cesta, modoCliente, produtos } = this.state
    return (
      <Context.Provider
        value={{
          produtos,
          cesta,
          modoCliente,
          adicionarCesta: this.adicionarCesta,
          removerCesta: this.removerCesta,
          adicionarProduto: this.adicionarProduto,
          removerProduto: this.removerProduto,
          toggleModo: this.toggleModo,
          finalizar: this.finalizar,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Provider = compose(withRouter)(ProviderComponent)
