import dotenv from 'dotenv'
import _ from 'lodash'

/*eslint camelcase: ["error", {properties: "never"}]*/

dotenv.config()

export default {
  HTTP200: 200,
  HTTP201: 201,
  HTTP202: 202,
  HTTP204: 204,
  HTTP400: 400,
  HTTP401: 401,
  HTTP402: 402,
  HTTP403: 403,
  HTTP404: 404,
  HTTP406: 406,
  HTTP422: 422,
  HTTP500: 500,
  HTTP502: 502,
  SSN_LENGTH: 4,
  ENV_TYPES: {
    PROD: 'production',
    DEV: 'development',
    TEST: 'test'
  },
  EMAIL: {
    VERIFICATION: {
      PLACES: 1000,
      MULTIPLE: 9000
    },
    ADMIN_MOBILE: ''
  },
  /*Needs to be Return by: when Shipping status changes to "delivered" + 9 days -
  we’ll look at this for credit so if item delivered on Jan 2 this date would be Jan 11
  */
  EstimatedReturnDate: 9, //Needs to be return Date
  SALT_FACTOR: 5,
  DEFAULTCODE: 1221,
  DEFAULTUSER: process.env.DEFAULTUSER,
  SuperAdmin: ['1', '2'],
  USER: {
    ROLES: {
      RC_ADMIN: '1', //RC Admin
      RC_TEAM: '2', //RC TEAM
      SUPPLIER: '3' //Supplier
    },
    DISPALY_ROLES: {
      1: 'RC Admin', //Super Admin
      2: 'RC Team',
      3: 'Supplier'
    }
  },
  DAIMONDVENDOR: ['RR', 'JR', 'RDI', 'HZ', 'RC', 'OM', 'DR', 'NK', 'BL'],
  EMAILREGEX: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-\+])+\.)+([a-zA-Z0-9]{2,4})+$/i,
  Hosts: [`${process.env.HOST}`],
  MongoDBAuth: {
    authdb: _.get(process.env, 'AUTHDB', ''),
    user: _.get(process.env, 'MONGOUSER', ''),
    password: _.get(process.env, 'MONGOPASSWORD', '')
  },
  AWS: {
    accessKeyId: _.get(process.env, 'ACCESSKEYID', ''),
    secretAccessKey: _.get(process.env, 'SECRETACCESSKEY', ''),
    bucket: _.get(process.env, 'BUCKET', ''),
    region: _.get(process.env, 'REGION', '')
  },
  USERAPIS: {
    RC_ADMIN: [
      // { path: '/users', method: 'get' },
      // { path: '/copyentity/{id}', method: 'get' }
    ]
  },
  HTOITEMS: [
    'ringsizerbox',
    'ringsizer',
    'plain1.5mmband-yellow',
    'plain1.5mmband-rose',
    'pamphlet',
    'micropave1.5mmband-white',
    'hometry-onkit',
    'essienailpolish'
  ],
  BANDS: ['plain1.5mmband-yellow', 'plain1.5mmband-rose', 'micropave1.5mmband-white'],
  RINGSIZER: 'ringsizer',
  RINGSIZERBOX: 'ringsizerbox',
  FullReturn: ['ringsizerbox', 'hometry-onkit'],
  HTOHIDEITEMID: ['essienailpolish'],
  HTOKPamphlet: 'pamphlet',
  HOMETRYONKIT: 'hometry-onkit',
  RcfjProductType: ['Vow Engagement Rings', 'Home Try-On', 'Home-Try-On-Kit'],
  shopifyOrderStatus: {
    '': 'Unfulfilled',
    'null': 'Unfulfilled',
    'fulfilled': 'Fulfilled',
    'partial': 'Partially Fulfilled'
  },
  MoveVoWToAnotherSection: [
    'available-to-ship-new',
    'available-to-ship-restocked',
    'damaged-goods',
    'needsrepair',
    'missing'
  ],
  htokKitReturnDamagedMsg: {
    '0': 'HTO Kit CZ Engagement Ring Unsellable ($100 fee)',
    '1': 'HTO Kit CZ Metal Alloy Band Unsellable',
    '2': 'HTO Kit Returned And Ring Sizer Unsellable',
    '3': 'HTO Kit Ring Sizer Box Unsellable',
    '4': 'Home Try On Kit Unsellable',
    '5': 'Ring Sizer Box Unsellable'
  },
  htokKitReturnNeedsRepairMsg: {
    '0': 'HTO Kit CZ Engagement Ring Needs Repair',
    '1': 'HTO Kit CZ Metal Alloy Band Needs Repair',
    '2': 'HTO Kit Returned And Ring Sizer Needs Repair',
    '3': 'HTO Kit Ring Sizer Box Needs Repair',
    '4': 'Home Try On Kit Needs Repair',
    '5': 'Ring Sizer Box Needs Repair'
  },
  htokKitReturnMissingMsg: {
    '0': 'HTO Kit CZ Engagement Ring Missing ($100 fee)',
    '1': 'HTO Kit CZ Metal Alloy Band Missing',
    '2': 'HTO Kit Returned And Ring Sizer Missing',
    '3': 'HTO Kit Ring Sizer Box Missing',
    '4': 'Home Try On Kit Missing',
    '5': 'Ring Sizer Box Missing',
    '6': 'Pamphlet Missing'
  },
  returnCondition: {
    'sellable': 'Sellable',
    'unsellable': 'Unsellable',
    'needsrepair': 'Needs Repair',
    'missing': 'Missing'
  },
  VOWFULFILMENTSTATUS: {
    '0': 'Pending Approval',
    '1': 'Assigned',
    '2': 'Diamond Received',
    '3': 'Diamond Sent to MFG',
    '4': 'Diamond Returned to Supplier',
    '5': 'Repair Received from Customer',
    '6': 'Sent for Repair',
    '7': 'Ring in QA',
    '8': 'Ready to Ship',
    '9': 'Shipped',
    '10': 'Delivered',
    '11': 'Cancelled - Credit Card',
    '12': 'Cancelled - Store Credit',
    '13': 'Cancelled Outside of Window',
    '14': 'Cancelled - Fraud',
    '15': 'Return Initiated',
    '16': 'Return Received',
    '17': 'Return Rejected',
    '18': 'Refund for Return - Credit Card',
    '19': 'Refund for Return - Store Credit',
    '20': 'Repair Initiated'
  },
  VOWCANCELREFUND: ['11', '12', '13', '14'],
  HTOFULFILMENTSTATUS: {
    '0': 'Unfulfilled',
    '1': 'Assigned',
    '2': 'Shipped',
    '3': 'Delivered',
    '4': 'Full Return',
    '5': 'Partial Return',
    '6': 'No Return',
    '7': 'Damaged Return',
    '8': 'Cancelled - Fraud'
  },
  HTOKCANCELREFUND: ['8', '6'],
  RINGSTATUS: {
    'unconfirmed': 'Unconfirmed',
    'diamondreceived': 'Diamond Received',
    'ringinproduction': 'Ring in Production',
    'ringreadyforpickup': 'Ring Ready for Pick up',
    'ringpickedup': 'Ring Picked Up',
    'cancelled': 'Cancelled'
  },
  orderHtokStatus: {
    'unfulfilled': '',
    'assignorder': 'Assign Order',
    'shiporder': 'Ship Order',
    'initiatereturn': 'Initiate Return',
    'cancelorder': 'Cancel Order',
    'noreturn': 'Mark Return Not Received'
  },
  InternalVowStatus: {
    'unassigned': 'Unassigned',
    'assigned': 'Assigned',
    'diamondreceived': 'Diamond Received',
    'diamondsenttomfg': 'Diamond Sent to MFG',
    'diamondreturnedtosupplier': 'Diamond Returned to Supplier',
    'sentforrepair': 'Sent for Repair',
    'ringinqa': 'Ring in QA',
    'readytoship': 'Ready to Ship',
    'repairreturnreceived': 'Repair/Return Received',
    'ringpickedup': 'Ring Picked Up'
  },
  orderVowStatus: {
    'unfulfilled': '',
    'assignorder': 'Assign Order',
    'shiporder': 'Ship Order',
    'initiatereturn': 'Initiate Return',
    'initiaterepair': 'Initiate Repair',
    'rejectreturn': 'Reject Return',
    'refundorder': 'Refund Order',
    'cancelorder': 'Cancel Order'
  },
  poType: {
    'assembly': 'Assembly PO',
    'setting': 'Setting PO',
    'settingassembly': 'Setting + Assembly PO',
    'repair': 'Repair PO',
    'diamond': 'Diamond PO'
  },
  checkOnHandItems: [
    //'returninitiated',
    'repairinitiated'
    //'repairreceived'
  ],
  InternalRcfjStatus: {
    'open': 'Open',
    'onhold': 'On Hold',
    'committed': 'Committed',
    'picked': 'Picked',
    'packed': 'Packed',
    'repairInProcess': 'Repair in Process',
    'repairComplete': 'Repair Complete'
  },
  fulfilmentStatus: {
    'unfulfilled': 'Unfulfilled',
    'assigned': 'Assigned',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'returninitiated': 'Return Initiated',
    'repairinitiated': 'Repair Initiated',
    'repairreceived': 'Repair Received',
    'returnreceived': 'Return Received',
    'returnrejected': 'Return Rejected',
    'noreturn': 'No Return',
    'refunded': 'Refunded',
    'cancelled': 'Cancelled',
    'returnnotreceived': 'Return Not Received',
    'replacementinitiated': 'Replacement Initiated'
  },
  fulfilmentStatusHtok: {
    'unfulfilled': 'Unfulfilled',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'returnreceived': 'Return Received',
    'noreturn': 'No Return',
    'cancelled': 'Cancelled',
    'returnnotreceived': 'Return Not Received'
  },
  showIncomigArrows: [
    'manuallyadded',
    'addedfromincoming',
    'movedfromdamagedgoods',
    'newincomingpoorder'
  ],
  incomingPosEvents: {
    'manuallyadded': 'Added',
    'movedtoavailableinventory': 'Moved to Sellable Inventory',
    'movedtodamagedinventory': 'Moved to Unsellable Inventory',
    'movedtomissinginventory': 'Moved to Missing Inventory',
    'manuallyremoved': 'Removed'
  },
  showArrows: [
    'manuallyadded',
    'addedfromincoming',
    'movedfromdamagedgoods',
    'movedbecausereturnreceived',
    'movedfromavailabletoship-restocked',
    'movedfromavailabletoship-new',
    'movedtoavailabletoship-restocked',
    'movedtoavailabletoship-new',
    'addedfromdamaged',
    'addedfrommissing',
    'addedfromneedsrepair',
    'movedfrommissing'
  ],
  showDamageArrows: [
    'manuallyadded',
    'addedfromincoming',
    'movedbecausereturnreceived',
    'movedfromavailabletoship-restocked',
    'movedfromavailabletoship-new',
    'movedtodamagedgoods',
    'movedfrommissing',
    'movedfromneedsrepair',
    'addedfromneedsrepair',
    'addedfrommissing'
  ],
  showNeedsRepairArrows: [
    'manuallyadded',
    'addedfromincoming',
    'movedbecausereturnreceived',
    'movedfromavailabletoship-restocked',
    'movedfromavailabletoship-new',
    'movedfromdamagedgoods',
    'movedtoneedsrepair',
    'movedfrommissing',
    'addedfromdamaged',
    'addedfrommissing'
  ],
  showMissingArrows: [
    'manuallyadded',
    'addedfromincoming',
    'movedbecausereturnreceived',
    'movedfromavailabletoship-restocked',
    'movedfromavailabletoship-new',
    'movedfromdamagedgoods',
    'movedfromneedsrepair',
    'movedtomissing',
    'addedfromneedsrepair',
    'addedfromdamaged'
  ],
  inventoryEvents: {
    'manuallyremoved': 'Manually Removed',
    'manuallyadded': 'Manually Added',
    'movedtoavailableinventory': 'Moved to Sellable Inventory',
    'movedtoneedsrepairinventory': 'Moved to Needs Repair Inventory',
    'movedtomissinginventory': 'Moved to Missing Inventory',
    'movedtodamagedinventory': 'Moved to Unsellable Inventory',
    'movedtodamagedgoods': 'Moved to Unsellable Inventory',
    'movedfromdamagedgoods': 'Moved from Unsellable Inventory',
    'movedtoneedsrepair': 'Moved to Needs Repair Inventory',
    'movedfromneedsrepair': 'Moved from Needs Repair Inventory',
    'movedtomissing': 'Moved to Missing Inventory',
    'movedfrommissing': 'Moved from Missing Inventory',
    'addedfromincoming': 'Added from Incoming Inventory',
    'addedfromdamaged': 'Added from Unsellable Inventory',
    'addedfrommissing': 'Added from Missing Inventory',
    'addedfromavailabletoship': 'Added from Sellable Inventory',
    'addedfromneedsrepair': 'Added from Needs Repair Inventory',
    'neworder': 'New Order',
    'newshopifyorders': 'New Order',
    'newincomingpoorder': 'Incoming order added',
    'updateincomingpoorder': 'Edit Incoming order',
    'movedbecausereturnreceived': 'Moved because Return Received',
    'movedfromavailabletoship-restocked': 'Moved from Sellable - Restocked Inventory',
    'movedfromavailabletoship-new': 'Moved from Sellable - New Inventory',
    'movedtoavailabletoship-restocked': 'Moved to Sellable - Restocked Inventory',
    'movedtoavailabletoship-new': 'Moved to Sellable - New Inventory'
  },
  allOrderActions: {
    'unfulfilled': 'unfulfilled',
    'assigned': 'assigned',
    'shipped': 'shipped',
    'delivered': 'delivered',
    'returninitiated': 'returninitiated',
    'repairinitiated': 'repairinitiated',
    'repairreceived': 'repairreceived',
    'returnreceived': 'returnreceived',
    'returnrejected': 'returnrejected',
    'noreturn': 'noreturn',
    'refunded': 'refunded',
    'initiatereturn': 'initiatereturn',
    'cancelled': 'cancelled'
  },
  allInternalStatus: {
    'unassigned': 'unassigned',
    'assigned': 'assigned',
    'diamondreceived': 'diamondreceived',
    'diamondsenttomfg': 'diamondsenttomfg',
    'diamondreturnedtosupplier': 'diamondreturnedtosupplier',
    'sentforrepair': 'sentforrepair',
    'ringinqa': 'ringinqa',
    'readytoship': 'readytoship',
    'ringpickedup': 'ringpickedup',
    'repairreturnreceived': 'repairreturnreceived',
    'unfulfilled': 'unfulfilled',
    'shipped': 'shipped',
    'delivered': 'delivered',
    'returnreceived': 'returnreceived',
    'noreturn': 'noreturn',
    'cancelled': 'cancelled'
  },
  purchaseOrderType: {
    'assembly': 'assembly',
    'setting': 'setting',
    'settingassembly': 'settingassembly',
    'repair': 'repair',
    'diamond': 'diamond'
  },
  trackingStatus: {
    'AC': 'accepted',
    'NY': 'in_transit',
    'IT': 'in_transit',
    'DE': 'delivered',
    'EX': 'delivered_exception',
    'AT': 'delivery_attempt',
    'UN': 'unknown',
    'CE': 'cancelled'
  },
  trackingStatusValue: {
    'AC': 'Accepted',
    'NY': 'Not Yet In System',
    'IT': 'In Transit',
    'DE': 'Delivered',
    'EX': 'Delivered Exception',
    'AT': 'Delivery Attempt',
    'UN': 'Unknown',
    'CE': 'Cancelled'
  },
  vendorInfoFromSource: [
    {
      name: 'RR',
      account_id: 68119,
      email: 'rrdiamondinc@mailinator.com',
      company: 'Ryan & Rodney Diamonds Inc.',
      fullname: 'Ryan & Rodney',
      phone: '12125752028',
      address: '10 West 47th Street, #11 New York, NY 10036 United States',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['OM', 'CU', 'OE', 'CB'],
      names: ['RR', 'rr']
    },
    {
      name: 'JR',
      account_id: 56068,
      email: 'joel@mailinator.com, greg@mailinator.com',
      company: 'Jack Reiss',
      fullname: 'Jack Reiss',
      phone: '12128409500',
      address: '580 5th Avenue, suite 1212 New York, NY 10036 United States',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['CU', 'OM', 'EU'],
      names: ['JR', 'jr']
    },
    {
      name: 'RDI',
      account_id: 21684,
      email: 'gjordan@mailinator.com',
      company: 'RDI Diamonds Incorporated',
      fullname: 'RDI Diamonds',
      phone: '18008748768',
      address: '2300 W Ridge Rd #4, Rochester, NY 14626, United States',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['RB', 'OV', 'CU', 'EM', 'RA', 'PS', 'CB'],
      names: ['RDI', 'rdi']
    },
    {
      name: 'HZ',
      account_id: 25333,
      email: 'sales@mailinator.com',
      company: 'Horizon Diamonds',
      fullname: 'Horizon',
      phone: '12123541828',
      address: '1212 6th Ave Suite 302, New York, NY 10036, United States',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['RD', 'OV', 'CU', 'EC', 'RA', 'PS', 'CM', 'CB'],
      names: ['HZ', 'hz']
    },
    {
      name: 'RC',
      account_id: 103644,
      email: 'vow@ringconcierge.com',
      company: 'Ring Concierge',
      fullname: 'Ring Concierge',
      phone: '16465803059',
      address: 'Madison Ave, New York, NY 10022, United States',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['OM', 'CU', 'OE', 'EU', 'CB', 'RB', 'OV', 'EM', 'RA', 'PS', 'RD', 'EC', 'CM', 'CUS', 'CUSB', 'RAD'],
      names: ['RC', 'rc']
    }, {
      name: 'DR',
      account_id: 111935,
      email: 'vow@ringconcierge.com',
      company: 'David Rovinsky',
      fullname: 'David Rovinsky',
      phone: '16469988111',
      address: '555 Madison Avenue, Suite #1400. New York, NY 10022',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['OM', 'CU', 'OE', 'EU', 'CB', 'RB', 'OV', 'EM', 'RA', 'PS', 'RD', 'EC', 'CM', 'CUS', 'CUSB', 'RAD'],
      names: ['DR', 'dr']
    },
    {
      name: 'OM',
      account_id: 66863,
      email: 'vow@ringconcierge.com',
      company: 'Ofer Mizrahi Diamonds Inc',
      fullname: 'Ofer Mizrahi',
      phone: '13125589060',
      address: '50 W 47St, Suite 1609 New York, NY, 10036, United States',
      country: 'United States',
      state: 'New York',
      city: 'Chicago',
      allowedDiamondsFromSheet: ['PS', 'EM', 'OV', 'CUS', 'CUSB', 'RAD'],
      names: ['OM', 'om']
    },
    {
      name: 'NK',
      account_id: 117373,
      email: 'vow@ringconcierge.com',
      company: 'Nader Kash Int.',
      fullname: 'Nader Kash',
      phone: '16469988111',
      address: 'New York,New York,USA,555 MADISON AVENUE,Suite 1400,10022',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      allowedDiamondsFromSheet: ['BR', 'CMB', 'EC', 'OV', 'PR', 'PS', 'RA'],
      names: ['NK', 'nk']
    },
    {
      name: 'BL',
      account_id: 61666,
      email: 'vow@ringconcierge.com',
      company: 'Belgium',
      fullname: 'Belgium',
      phone: '2129378715',
      address: '20 West 47th Street #500',
      country: 'United States',
      state: 'NY',
      city: 'New York',
      allowedDiamondsFromSheet: ['PS', 'EM', 'OV', 'CUS', 'RAD', 'PRIN'],
      names: ['BL', 'bl']
    }
  ],
  DIAMONDPOEMAILSCC: [ 'maggie@ringconcierge.com'],
  DIAMONDPOEMAILS: [ 'maggie@ringconcierge.com', 'fullstack@relibit.com', 'projects@relibit.com' ],
  DIAMONDPOSTAGEMAILS: [ 'maggie@ringconcierge.com', 'fullstack@relibit.com' ],
  RCFJVendor: ['Ring Concierge', 'Kelly Bello', 'Ring Concierge Fine Jewelry']
}
