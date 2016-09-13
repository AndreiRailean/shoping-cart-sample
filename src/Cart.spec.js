'use strict'

import test from 'ava'

import User from './User'
import Cart from './Cart'

import { yearsAgoDate } from './lib'

const employee = new User({isEmployee: true})
const affiliate = new User({isAffiliate: true})
const loyalCustomer = new User({firstPurchaseDate: yearsAgoDate(3)})

test('No Discount on Grocery bill under $100', (t) => {
  const cart = new Cart()

  const bread = {
    name: 'Bread',
    isGrocery: true,
    price: 5.00
  }
  const apples = {
    name: 'Apples',
    isGrocery: true,
    price: 4.00
  }

  cart.add(bread, 4)
  cart.add(apples, 2.5)

  const total = 30

  t.is(cart.subtotal, total)
  t.is(cart.total, total)

  cart.user = employee
  t.is(cart.total, total)

  cart.user = affiliate
  t.is(cart.total, total)

  cart.user = loyalCustomer
  t.is(cart.total, total)
})

test('$5 Discount on $105 Grocery bill', (t) => {
  const cart = new Cart()
  const product = {
    name: 'Food',
    isGrocery: true,
    price: 110
  }
  cart.add(product)

  const discount = 5
  const total = product.price - discount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, discount)
  t.is(cart.total, total)
})

test('$45 discount on $990 purchase (no grocery)', (t) => {
  const cart = new Cart()
  const product = {
    name: 'Not Food',
    price: 990
  }
  cart.add(product, 1)

  const discount = 45
  const total = product.price - discount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, discount)
  t.is(cart.total, total)
})

test('Employee gets 30% discount and volume discount', (t) => {
  const cart = new Cart({ user: employee })
  const product = {
    name: 'Not Food',
    price: 1000.00
  }

  cart.add(product)

  const userDiscount = 300
  const volumeDiscount = 50

  const discount = userDiscount + volumeDiscount
  const total = product.price - discount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, discount)
  t.is(cart.total, total)
})

test('Affiliate gets 10% discount and volume discount', (t) => {
  const cart = new Cart({ user: affiliate })
  const product = {
    name: 'Not Food',
    price: 1000.00
  }
  cart.add(product)

  const userDiscount = 100
  const volumeDiscount = 50

  const discount = userDiscount + volumeDiscount
  const total = product.price - discount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, discount)
  t.is(cart.total, total)
})

test('Customer for 2 years gets 5% discount and volume discount', (t) => {
  const cart = new Cart({user: loyalCustomer})
  const product = {
    name: 'Not Food',
    price: 1000.00
  }
  cart.add(product)

  const userDiscount = 50
  const volumeDiscount = 50

  const discount = userDiscount + volumeDiscount
  const total = product.price - discount

  t.is(cart.subtotal, product.price)
  t.is(cart.discount, discount)
  t.is(cart.total, total)
})

test('Regular customer only receives volume discount', (t) => {
  const cart = new Cart()
  const product = {
    name: 'Not Food',
    price: 1000.00
  }
  cart.add(product)

  const discount = 50
  const total = product.price - discount

  t.is(cart.userDiscount, 0)
  t.is(cart.subtotal, product.price)
  t.is(cart.discount, discount)
  t.is(cart.total, total)
})

test('No percentage discount on groceries', (t) => {
  const cart = new Cart()
  const product = {
    name: 'Not Food',
    price: 100.00
  }
  const food = {
    name: 'Food',
    isGrocery: true,
    price: 100.00
  }
  cart.add(product)
  cart.add(food, 2)

  // regular customer
  t.is(cart.userDiscount, 0)
  t.is(cart.volumeDiscount, 15)
  t.is(cart.discount, 15)
  t.is(cart.total, 285)

  // employee
  cart.user = employee
  t.is(cart.userDiscount, 30)
  t.is(cart.discount, 45)
  t.is(cart.total, 255)

  // affiliate
  cart.user = affiliate
  t.is(cart.userDiscount, 10)
  t.is(cart.discount, 25)
  t.is(cart.total, 275)

  // loyal customer
  cart.user = loyalCustomer
  t.is(cart.userDiscount, 5)
  t.is(cart.discount, 20)
  t.is(cart.total, 280)
})
