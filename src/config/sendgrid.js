/*
 * Tax Provision Sendgrid Api connection details are here
 * all generated template ids are includes in "templateIds" arrays in below settings
**/
const sendgrid = {
  apiKey: process.env.SEND_GRID || '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',
  senderEmail: process.env.SENDER_EMAIL || 'vow@ringconcierge.com',
  senderEmailInfo: 'info@ringconcierge.com',

  templateIds: {
    // eslint-disable-next-line camelcase
    portal_login_verification_code: 'd-78cfd1b7afbb4c8580872f76080f180d',
    // eslint-disable-next-line camelcase
    portal_database_backup: 'd-846bce2b6f4d4dfc88607579781cb7cd',
    // eslint-disable-next-line camelcase
    assigned_purchase_order: 'd-55fd4ca2c97c4647be3f484c43a7fe8a',
    // eslint-disable-next-line camelcase,
    ready_to_ship_rc_admin_purchase_order: 'd-99566bdb2b5348bdb95a74cfae3c6524',
    // eslint-disable-next-line camelcase,
    ready_to_ship_customer_purchase_order: 'd-b5a5d4c0b8d341a1be73433ecb9e2897',
    // eslint-disable-next-line camelcase,
    repair_delivered_purchase_order: 'd-f677cb51aa4945ecbe498f9046627028',
    // eslint-disable-next-line camelcase,
    update_purchase_order: 'd-7a8df986742f460e98b57aefb2428a7d',
    // eslint-disable-next-line camelcase,
    repair_initiated_order: 'd-5fc648b65def4596b1d89a3eec05b0eb',
    // eslint-disable-next-line camelcase,
    return_initiated_order: 'd-c395d64b55c84555af762e9a9d8c1082',
    // eslint-disable-next-line camelcase,
    canceled_credit_order: 'd-0d62801c5967453d94186be3fcb2a396',
    // eslint-disable-next-line camelcase,
    canceled_refunded_order: 'd-15c4b95456ec4baa8fe8c777a138c8c4',
    // eslint-disable-next-line camelcase,
    vow_repair_request_user: 'd-5fc648b65def4596b1d89a3eec05b0eb',
    // eslint-disable-next-line camelcase,
    vow_return_request: 'd-da56bad751714030a98f1b310a08d4d1',
    // eslint-disable-next-line camelcase,
    vow_return_request_user: 'd-60ef8899d4484bdaa0fc3d4a18e7f2ea',
    // eslint-disable-next-line camelcase,
    vow_exchange_request_user: 'd-c395d64b55c84555af762e9a9d8c1082',
    // eslint-disable-next-line camelcase,
    diamond_po_email: 'd-d2fcc00d3a664f74898b4a0856255c6f',
    // eslint-disable-next-line camelcase,
    made_for_you_fine: 'd-6164e5cc231446578f99e0dd0107ccd8',
    // eslint-disable-next-line camelcase,
    time_to_return_home_kit: 'd-8bd51be4839b430c855308750754cb3e',
    // eslint-disable-next-line camelcase,
    received_hto_home_kit: 'd-864377b126cb4002b07bafbba7fb4ac0',
    // eslint-disable-next-line camelcase,
    not_received_hto_home_kit: 'd-dde5f33e01de4644bcd3c610d4056922',
    // eslint-disable-next-line camelcase,
    fulfillment_reorder_level: 'd-c0892e6160a64249a1376a648977ac3c',
    // eslint-disable-next-line camelcase,
    bulk_print: 'd-405bbcbd88f346308e2c1bd2bb691f7c'
  }
}

export default sendgrid
