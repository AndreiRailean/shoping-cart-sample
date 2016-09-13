'use strict'

import test from 'ava'

import User from './User'
import {yearsAgoDate} from './lib'

test('Employee discount rate is 30%', (t) => {
  let user = new User()
  user.isEmployee = true

  t.is(user.discountRate, 0.3)
})

test('Affiliate discount rate is 10%', (t) => {
  let user = new User()
  user.isAffiliate = true

  t.is(user.discountRate, 0.1)
})

test('Loyal customer discount rate is 5%', (t) => {
  let user = new User()
  user.firstPurchaseDate = yearsAgoDate(3)

  t.is(user.discountRate, 0.05)
})

test('Regular customer discount rate is 0', (t) => {
  let user = new User()

  t.is(user.discountRate, 0)
})
