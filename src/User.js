'use strict'

import {yearsAgoDate} from './lib'

export default class User {
  constructor ({
    isEmployee=false,
    isAffiliate=false,
    firstPurchaseDate
  }={}) {
    this._isEmployee = !!isEmployee
    this._isAffiliate = !!isAffiliate
    this._firstPurchaseDate = firstPurchaseDate || new Date()
  }

  set firstPurchaseDate (date) {
    this._firstPurchaseDate = date
  }

  set isEmployee (flag = true) {
    this._isEmployee = !!flag
  }

  get isEmployee () {
    return this._isEmployee
  }

  set isAffiliate (flag = true) {
    this._isAffiliate = !!flag
  }

  get isAffiliate () {
    return this._isAffiliate
  }

  get isCustomer () {
    return !(this.isEmployee || this.isAffiliate)
  }

  get isLoyal () {
    const twoYearsAgo = yearsAgoDate(this.loyaltyTerm)
    return this._firstPurchaseDate <= twoYearsAgo
  }

  get loyaltyTerm () {
    return 2
  }

  get discountRate () {
    if (this.isEmployee) {
      return 0.3
    } else if (this.isAffiliate) {
      return 0.1
    } else if (this.isLoyal) {
      return 0.05
    } else {
      return 0
    }
  }
}
