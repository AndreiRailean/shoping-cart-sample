'use strict'

import test from 'ava'

import User from './User'
import Cart from './Cart'

import { yearsAgoDate } from './lib'

let bread = { name: 'Bread', isGrocery: true, price: 5.00 }
let milk = { name: 'Milk', isGrocery: true, price: 2.50 }
let apples = { name: 'Apples', isGrocery: true, price: 4.00 }
let socks = { name: 'Socks', price: 10.00 }
let tv = { name: 'TV', price: 990.00 }

test('No Discount on Grocery bill under $100', (t) => {
  let cart = new Cart()
  cart.add(bread, 2)
  cart.add(milk, 4)
  cart.add(apples, 2.5)

  t.is(cart.subtotal, 30)

  let employee = new User()
  cart.user = employee
  t.is(cart.total, 30)
})

test('$5 Discount on $105 Grocery bill', (t) => {
  let cart = new Cart()
  let product = {
    name: 'Food',
    isGrocery: true,
    price: 110
  }
  cart.add(product)

  let expectedDiscount = 5

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, expectedDiscount)
  t.is(cart.total, product.price - expectedDiscount)
})

test('$45 discount on $990 purchase (no grocery)', (t) => {
  let cart = new Cart()
  cart.add(tv, 1)

  t.is(cart.subtotal, 990)
  t.is(cart.discount, 45)
  t.is(cart.total, 990-45)
})

test('Employee gets 30% discount', (t) => {
  let user = new User({isEmployee: true})

  let product = {
    name: 'Not Food',
    price: 1000.00
  }

  let cart = new Cart({ user })
  cart.add(product)

  let expectedUserDiscount = 300
  let expectedBillDiscount = 50
  let expectedDiscount = expectedUserDiscount + expectedBillDiscount
  let expectedTotal = product.price - expectedDiscount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, expectedDiscount)
  t.is(cart.total, expectedTotal)
})

test('Affiliate gets 10% discount', (t) => {
  let user = new User({isAffiliate: true})

  let product = {
    name: 'Not Food',
    price: 1000.00
  }

  let cart = new Cart({ user })
  cart.add(product)

  let expectedUserDiscount = 100
  let expectedBillDiscount = 50
  let expectedDiscount = expectedUserDiscount + expectedBillDiscount
  let expectedTotal = product.price - expectedDiscount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, expectedDiscount)
  t.is(cart.total, expectedTotal)
})

test('Customer for over 2 years gets 5% discount', (t) => {
  let user = new User({firstPurchaseDate: yearsAgoDate(3)})

  let product = {
    name: 'Not Food',
    price: 1000.00
  }

  let cart = new Cart({ user })
  cart.add(product)

  let expectedUserDiscount = 50
  let expectedBillDiscount = 50
  let expectedDiscount = expectedUserDiscount + expectedBillDiscount
  let expectedTotal = product.price - expectedDiscount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, expectedDiscount)
  t.is(cart.total, expectedTotal)
})
