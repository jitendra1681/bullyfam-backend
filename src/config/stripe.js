const stripe = {}
/*
 * Tax Provision Stripe Credentials are here
**/
stripe.key = {
  $filter: 'env',
  development: process.env.STRIPE_KEY,
  sandbox: process.env.STRIPE_KEY,
  production: process.env.STRIPE_KEY,
  test: process.env.STRIPE_KEY,
  $default: process.env.STRIPE_KEY
}

stripe.clientId = {
  $filter: 'env',
  development: 'ca_B8TyxdIRWgmjM92VjpgeIV8rwllkS7Ye',
  sandbox: 'ca_B8TyxdIRWgmjM92VjpgeIV8rwllkS7Ye',
  production: process.env.STRIPE_CLIENT_ID || 'ca_B8TyxdIRWgmjM92VjpgeIV8rwllkS7Ye',
  test: 'ca_B8TyxdIRWgmjM92VjpgeIV8rwllkS7Ye',
  $default: 'ca_B8TyxdIRWgmjM92VjpgeIV8rwllkS7Ye'
}

stripe.product = {
  $filter: 'env',
  development: process.env.SKU || 'sku_BNavGQBKtYPbLN',
  sandbox: process.env.SKU || 'sku_BNavGQBKtYPbLN',
  production: process.env.SKU || 'sku_BNavGQBKtYPbLN',
  test: process.env.SKU || 'sku_BNavGQBKtYPbLN',
  $default: process.env.SKU || 'sku_BNavGQBKtYPbLN'
}

export default stripe
