## Running the code
`npm install`

`npm test`

### Requirements
`nodejs` version `6.5`

### About the code
All code is in `./src` directory

Code is written as a library. There's no command-line runnable component that accepts input.

Please see `*.spec.js` files in `./src` to understand usage.

---

## Implementation Assumptions
Customer's first purchase date is used for "Customer for over 2 years" calculations.
Customer matching this criteria is called "Loyal Customer" in code

Volume discount ($5 for every $100) is not considered to be a percentage based discount and is applied in addition to percentage based discount.

All individual discounts are calculated based on full price bill subtotal.

---

## Challenge
On a retail website, the following discounts apply:
1. If the user is an employee of the store, he gets a 30% discount
2. If the user is an affiliate of the store, he gets a 10% discount
3. If the user has been a customer for over 2 years, he gets a 5% discount
4. For every $100 on the bill, there would be a $ 5 discount (e.g. for $ 990, you get $ 45 as a discount)
5. The percentage based discounts do not apply on groceries
6. A user can get only one of the percentage based discounts on a bill.

Write a program with test cases such that **given a bill, it finds the net payable amount**. Please note the stress is on *object oriented approach* and *test coverage*.
