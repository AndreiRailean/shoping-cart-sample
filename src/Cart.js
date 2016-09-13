'use strict'

import User from './User'

export default class Cart {
  constructor ({user}={}) {
    this._user = user || new User()
    this._products = []
  }

  add (product, quantity=1) {
    if (product) {
      this._products.push({
        product,
        quantity
      })
    }
  }

  get products () {
    return this._products
  }

  set user (user) {
    this._user = user
  }

  get user () {
    return this._user
  }

  get subtotal () {
    return this.products.reduce((sub, line) => {
      let lineTotal = line.product.price * line.quantity
      return sub + lineTotal
    }, 0)
  }

  get volumeDiscount () {
    return Math.floor(this.subtotal / 100) * 5
  }

  get userDiscount () {
    let discountable = (
      this.products
      .filter((line) => !line.product.isGrocery)
      .reduce((sub, line) => {
        let lineTotal = line.product.price * line.quantity
        return sub + lineTotal
      }, 0)
    )

    return (
      discountable * this.user.discountRate
    )
  }

  get discount () {
    return (
      this.volumeDiscount + this.userDiscount
    )
  }

  get total () {
    return (
      this.subtotal - this.discount
    )
  }
}
