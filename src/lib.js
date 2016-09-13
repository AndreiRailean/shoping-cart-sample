'use strict'

export const yearsAgoDate = (yearsAgo) => {
  const now = new Date()
  return new Date(now.getFullYear() - yearsAgo, now.getMonth(), now.getDate())
}
