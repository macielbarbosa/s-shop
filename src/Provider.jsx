import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { Context } from './context'
import { localStorage } from './utils/localStorage'

class ProviderComponent extends Component {
  constructor(props) {
    super(props)
    const cesta = localStorage.getItem('cesta')
    this.state = {
      cesta: cesta ? cesta : [],
      modoCliente: true,
    }
  }

  setCesta = (cesta) => {
    localStorage.setItem('cesta', cesta)
    this.setState({ cesta })
  }

  adicionarCesta = (produto) => {
    const { cesta } = this.state
    const indexProdutoCesta = cesta.findIndex(({ nome }) => nome === produto.nome)
    const produtoEstaNaCesta = indexProdutoCesta !== -1
    if (produtoEstaNaCesta) {
      const produtoCesta = cesta[indexProdutoCesta]
      produtoCesta.quantidade += produto.quantidade
      this.setCesta(cesta)
    } else {
      this.setCesta({ cesta: [...this.state.cesta, produto] })
    }
  }

  removerCesta = (nome) => {
    const { cesta } = this.state
    const index = cesta.findIndex((produto) => produto.nome === nome)
    cesta.splice(index, 1)
    this.setCart(cesta)
  }

  toggleModo = () => {
    const { modoCliente } = this.state
    this.props.history.push(modoCliente ? 'produtos' : '/')
    this.setState({ modoCliente: !this.state.modoCliente })
  }

  render() {
    const { cesta, modoCliente } = this.state
    return (
      <Context.Provider
        value={{
          cesta,
          modoCliente,
          adicionarCesta: this.adicionarCesta,
          removerCesta: this.removerCesta,
          toggleModo: this.toggleModo,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Provider = compose(withRouter)(ProviderComponent)
