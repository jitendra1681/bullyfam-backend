/* eslint-disable complexity */

import _ from 'lodash'
import Boom from 'boom'
import Jwt from 'jsonwebtoken'
import Hoek from 'hoek'

import constants from './constants'
import Config from './config'
import Users from './users/users_model'

/*eslint no-magic-numbers: ['error', { 'ignore': [-1, 0, 1, 8, -240, 5, 10]}]*/
/*eslint max-len: ["error", { "code": 150000 }]*/
const extractUserId = request => {
  return _.get(request, 'auth.credentials.id', false)
}
const createSlug = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
const checkTags = tags => {
  return new Promise((resolve) => {
    const obj = {
      VOW: false,
      VHTO: false,
      RCFJ: false
    }
    const tag = `${tags}`.replace(/\s/g, '')
    const tagArr = `${tag.trim()}`.split(',')
    if (tagArr.length) {
      _.forEach(tagArr, t => {
        if (t.replace(/\s/g, '') === 'VOW') {
          obj.VOW = true
        }
        if (t === 'VHTO') {
          obj.VHTO = true
        }
        if (t === 'RCFJ') {
          obj.RCFJ = true
        }
      })
      if (obj.VOW && obj.VHTO && obj.RCFJ) {
        obj.VOW = false
        obj.VHTO = false
        obj.RCFJ = false
      }
      resolve(obj)
    } else {
      resolve(obj)
    }
  })
}

const checkTagsArr = tags => {
  return new Promise((resolve) => {
    const obj = {
      VOW: false,
      VHTO: false,
      RCFJ: false
    }
    if (tags.length) {
      _.forEach(tags, t => {
        if (t.replace(/\s/g, '') === 'VOW') {
          obj.VOW = true
        }
        if (t === 'VHTO') {
          obj.VHTO = true
        }
        if (t === 'RCFJ') {
          obj.RCFJ = true
        }
      })
      if (obj.VOW && obj.VHTO && obj.RCFJ) {
        obj.VOW = false
        obj.VHTO = false
        obj.RCFJ = false
      }
      resolve(obj)
    } else {
      resolve(obj)
    }
  })
}

const checkAdditionalTags = order => {
  return new Promise((resolve) => {
    const tags = String(_.get(order, 'orderApiResponse.tags', ''))
    let RCFJ = false
    const tag = `${tags}`.replace(/\s/g, '')
    const tagArr = `${tag.trim()}`.split(',')
    if (tagArr.length) {
      _.forEach(tagArr, t => {
        const tVal = t.replace(/\s/g, '')
        if (tVal !== 'VHTO' && tVal !== 'VOW') {
          RCFJ = true
        }
      })
      resolve(RCFJ)
    } else {
      resolve(RCFJ)
    }
  })
}

const checkHTOKLineProductIds = async order => {
  return new Promise((resolve) => {
    const lineItems = _.get(order, 'orderApiResponse.line_items', [])
    const produdtIds = []
    _.map(lineItems, item => {
      if (_.get(order, 'orderType', '') === 'HTOK' && _.get(item, 'product_id', null) && item.vendor !== 'Ring Concierge') {
        produdtIds.push(item.product_id)
      } else if (_.get(order, 'orderType', '') === 'VOW' && _.get(item, 'product_id', null) &&
        _.get(item, 'properties', []).length > 8 && item.vendor === 'Vow') {
        produdtIds.push(item.product_id)
      }
    })
    return resolve(_.uniq(produdtIds))
  })
}

const removeSpace = (name) => {
  return name && name !== '' ? (name.replace(/\s/g, '')).toLowerCase() : ''
}
const removeSpaceWithTrim = (name) => {
  return name && name !== '' ? (name.trim()) : ''
}

const checkVowPropertiesItems = async order => {
  return new Promise((resolve) => {
    const lineItems = _.get(order, 'orderApiResponse.line_items', [])
    const vowItem = _.find(lineItems, item => {
      if (_.get(order, 'orderType', '') === 'VOW' &&
        _.get(item, 'properties', []).length > 8 && removeSpace(item.vendor) === 'vow') {
        return item
      }
    })
    const diamondItem = _.find(lineItems, item => {
      if (_.get(order, 'orderType', '') === 'VOW' &&
        _.get(item, 'properties', []).length === 5 && _.includes(constants.DAIMONDVENDOR, item.vendor)) {
        return item
      }
    })

    const propertiesObj = {}
    const totalAmount = parseFloat(_.get(vowItem, 'price', 0)) + parseFloat(_.get(diamondItem, 'price', 0))
    const colors = _.get(vowItem, 'variant_title', '').split('/')
    const orderShape = _.get(vowItem, 'variant_title', '').split('/')
    propertiesObj.settingId = _.get(vowItem, 'id', 0)
    propertiesObj.variantId = _.get(vowItem, 'variant_id', 0)
    propertiesObj.bandcolor = `${_.get(colors, '[1]', '')}`.trim()
    propertiesObj.designDetails = `${_.get(colors, '[2]', '')}`.trim()
    propertiesObj.locationId = _.get(order, 'orderApiResponse.location_id', '')
    propertiesObj.diamondSettingPrice = totalAmount
    // eslint-disable-next-line camelcase
    propertiesObj.product_id = _.get(vowItem, 'product_id', 0)
    _.map(_.get(vowItem, 'properties', []), v => {
      if (_.get(v, 'name', '') !== '' && removeSpace(_.get(v, 'name', '')) === 'diamondmeasurement') {
        _.set(propertiesObj, `[${removeSpace(v.name)}]`, `${removeSpace(v.value)}`.trim())
        _.set(propertiesObj, `[${removeSpace(v.name)}text]`, `${v.value}`.trim())
      } else {
        _.set(propertiesObj, `[${removeSpace(v.name)}]`, `${v.value}`.trim())
      }
    })
    const shape = `${_.get(propertiesObj, 'diamond', '')}`.indexOf('#') !== -1 ? `${_.get(propertiesObj, 'diamond', '')}`.split('#')[0] : ''
    const diamond = `${_.get(propertiesObj, 'diamond', '')}`.split('#')
    const certnum = _.get(diamond, '[1]', '')
    _.set(propertiesObj, 'cert_num', certnum)

    if (shape !== '') {
      propertiesObj.shape = `${shape}`.trim()
      if (propertiesObj.shape.indexOf('Antique Style') !== -1) {
        propertiesObj.shape1 = `${propertiesObj.shape}`.replace('Antique Style', 'Antique-Style')
      }
      const variantName = _.get(vowItem, 'variant_title', '').replace(`${shape}/`, '')
      const variantSlug = createSlug(variantName)
      propertiesObj.variantSlug = variantSlug

      propertiesObj.title = _.get(vowItem, 'title', '')
    }

    // const vColor = removeSpace(_.get(orderShape, '[1]', ''))
    // switch (vColor) {
    //   case 'yellowgold':
    //     _.set(orderShape, '[1]', '14k Yellow Gold and Platinum')
    //     break
    //   case 'rosegold':
    //     _.set(orderShape, '[1]', '14k Rose Gold and Platinum')
    //     break
    // }
    propertiesObj.orderShape = orderShape
    if (_.get(propertiesObj, 'variantSlug', '') === '' && orderShape.length > 1) {
      propertiesObj.shape = `${_.get(orderShape, '[0]', '')}`.trim()
      if (propertiesObj.shape.indexOf('Antique Style') !== -1) {
        propertiesObj.shape1 = `${propertiesObj.shape}`.replace('Antique Style', 'Antique-Style')
      }
      const variantName = _.get(vowItem, 'variant_title', '').replace(`${_.get(orderShape, '[0]', '')}/`, '')
      const variantSlug = createSlug(variantName)
      propertiesObj.variantSlug = variantSlug
      propertiesObj.title = _.get(vowItem, 'title', '')
    }
    if (propertiesObj.variantSlug.indexOf('antique-style') !== -1 || propertiesObj.variantSlug.indexOf('antique style') !== -1) {
      propertiesObj.variantSlug = propertiesObj.variantSlug.replace('antique-style-round-', '')
      propertiesObj.variantSlug = propertiesObj.variantSlug.replace('antique-style-cushtion-', '')
    }
    return resolve(propertiesObj)
  })
}

const checkVowLineItemId = order => {
  return new Promise((resolve) => {
    const lineItems = _.get(order, 'orderApiResponse.line_items', [])
    const vowItem = _.find(lineItems, item => {
      if (_.get(order, 'orderType', '') === 'VOW' && _.get(item, 'product_id', null) &&
        _.get(item, 'properties', []).length > 8 && item.vendor === 'Vow') {
        return item
      }
    })
    return resolve(vowItem)
  })
}

const checkDiamondLineItemId = order => {
  return new Promise((resolve) => {
    const lineItems = _.get(order, 'orderApiResponse.line_items', [])
    const vowItem = _.find(lineItems, item => {
      if (_.get(order, 'orderType', '') === 'VOW' &&
        _.get(item, 'properties', []).length === 5 && _.includes(constants.DAIMONDVENDOR, item.vendor)) {
        return item
      }
    })
    return resolve(vowItem)
  })
}


const CheckDomain = request => {
  try {
    const checkHost = constants.Hosts.indexOf(_.get(request, 'headers.origin', ''))
    if (checkHost === -1) {
      return true
    } else {
      return true
    }
  } catch (err) {
    return false
  }
}

const getLinks = (httpResponse) => {
  const obj = {
    nextUrl: '',
    nextLimit: '',
    previousUrl: '',
    previousLimit: '',
    linkType: ''
  }
  let headerLink = _.get(httpResponse, 'headers.link', '')
  obj.linkType = headerLink.indexOf('rel="previous"') !== -1 ? 'both' : 'next'
  headerLink = headerLink.replace(/\s/g, '').replace('<', '').replace('>;', '').replace('rel="next"', '').replace('rel="previous"', '')
  const links = headerLink.indexOf(',') !== -1 ? headerLink.split(',') : [headerLink]
  if (obj.linkType === 'both') {
    obj.nextUrl = _.get(links, '[1]', '')
    obj.nextUrl = obj.nextUrl.replace(/\s/g, '').replace('<', '').replace('>;', '').replace('rel="next"', '').replace('rel="previous"', '')
    obj.nextLimit = obj.nextUrl.split('?')[1]
    obj.previousUrl = _.get(links, '[0]', '')
    obj.previousUrl = obj.previousUrl.replace(/\s/g, '').replace('<', '').replace('>;', '').replace('rel="next"', '').replace('rel="previous"', '')
    obj.previousLimit = obj.previousUrl.split('?')[1]
  } else if (obj.linkType === 'next') {
    obj.nextUrl = _.get(links, '[0]', '')
    obj.nextUrl = obj.nextUrl.replace(/\s/g, '').replace('<', '').replace('>;', '').replace('rel="next"', '').replace('rel="previous"', '')
    obj.nextLimit = obj.nextUrl.split('?')[1]
  }
  if (obj.nextUrl === '' && obj.linkType === 'both') {
    obj.linkType = 'previous'
  }
  return obj
}


const getStatus = (action) => {
  let status = ''
  switch (action) {
    case 0:
      status = 'Inactive'
      break
    case 10:
      status = 'Active'
      break
    default:
      status = 'Inactive'
      break
  }
  return status
}

const getRoles = (action) => {
  let roles = ''
  switch (action) {
    case '1':
      roles = 'RC Admin'
      break
    case '2':
      roles = 'RC Team'
      break
    case '3':
      roles = 'Supplier Team'
      break
    default:
      roles = 'Supplier Team'
      break
  }
  return roles
}

const extractUserScopes = request => {
  return _.get(request, 'auth.credentials.scope', [])
}

const isAdmin = request => {
  return _.intersection(extractUserScopes(request), Users.getAdminScopes()).length > 0
}

const isPartner = request => {
  return _.intersection(extractUserScopes(request), Users.getOwnerScopes()).length > 0
}

const hasPermission = (request, userId) => {
  return isAdmin(request) || String(extractUserId(request)) === String(userId)
}

const extractManagedUserId = request => {
  return _.get(request, 'auth.credentials.managedUserId', false)
}

const extractManagedCompanyRole = request => {
  return _.get(request, 'auth.credentials.companyRoles', false)
}

const extractAccountingCompanyId = request => {
  return _.get(request, 'auth.credentials.accountingCompanyId', false)
}

const extractcurrentOffset = request => {
  return _.get(request, 'auth.credentials.currentOffset', -240)
}

const extractUserQuery = (request, key = '_id') => {
  const userId = extractUserId(request)
  const query = {}
  query[key] = userId

  if (isAdmin(request)) {
    const managedUserId = extractManagedUserId(request)
    if (managedUserId) {
      query[key] = { $in: [extractUserId(request), managedUserId] }
    }
  }
  return query
}

const isValidJson = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const createAdminJwt = (admin, managedUser) => {
  const contents = {
    id: admin._id,
    scope: admin.roles,
    managedUserId: managedUser._id,
    companyRoles: managedUser.companyRoles,
    accountingCompanyId: _.get(managedUser, 'accountingCompanyId', ''),
    mangaedScope: managedUser.roles,
    currentOffset: managedUser.currentOffset,
    createdAt: Date.now()
  }
  const options = Hoek.applyToDefaults({
    key: null,
    expires: '1m',
    verifyOptions: { algorithms: ['HS256'] }
  }, Config.get('/auth'))

  const token = Jwt.sign(
    contents,
    options.key,
    {
      algorithm: options.verifyOptions.algorithms[0],
      expiresIn: options.expires
    }
  )

  return token
}

export const createJwt = user => {
  const contents = {
    id: user._id,
    scope: user.roles,
    companyRoles: user.companyRoles,
    accountingCompanyId: _.get(user, 'accountingCompanyId', ''),
    currentOffset: user.currentOffset,
    createdAt: Date.now()
  }
  const options = Hoek.applyToDefaults({
    key: null,
    expires: '3min',
    verifyOptions: { algorithms: ['HS256'] }
  }, Config.get('/auth'))

  const token = Jwt.sign(
    contents,
    options.key,
    {
      algorithm: options.verifyOptions.algorithms[0],
      expiresIn: options.expires
    }
  )

  return token
}

export const boomify = err => {
  const statusCode = Number(_.get(err, 'statusCode', _.get(err, 'raw.statusCode', constants.HTTP400)))
  const strErr = `${err}`
  const message = _.get(err, 'message', _.get(err, 'raw.message', _.get(err, 'error_message', strErr === '' ? 'Bad Request' : strErr)))

  let boom = null
  if (_.get(err, 'isBoom', false)) {
    boom = err
  } else if (!_.isError(err)) {
    boom = Boom.create(statusCode, message, { timestamp: Date.now() })
  } else if (_.isError(err)) {
    boom = Boom.wrap(err, statusCode, message)
  } else { // err.isBoom
    boom = err
  }
  if (!_.get(boom, 'response', false)) {
    console.error('error', boom) // eslint-disable-line no-console
  } else {
    console.error('error', _.get(boom, 'output', '')) // eslint-disable-line no-console
  }
  return boom
}

export const getOrderTypeFromOrderTag = (tags) => {
  let orderType = ''
  if (`${tags}`.indexOf('VOW') !== -1) {
    if (tags === 'RCFJ, VOW') {
      orderType = 'RCFJ, VOW'
    } else {
      orderType = 'VOW'
    }
  } else if (`${tags}`.indexOf('VHTO') !== -1) {
    if (tags === 'RCFJ, VHTO') {
      orderType = 'RCFJ, HTOK'
    } else {
      orderType = 'HTOK'
    }
  } else if (`${tags}`.indexOf('RCFJ') !== -1) {
    if (tags === 'RCFJ, VOW') {
      orderType = 'RCFJ, VOW'
    } else if (tags === 'RCFJ, VHTO') {
      orderType = 'RCFJ, HTOK'
    } else {
      orderType = 'RCFJ'
    }
  }
  if (`${tags}`.indexOf('VOW') !== -1 && `${tags}`.indexOf('VHTO') !== -1) {
    orderType = 'VOW, HTOK'
  }
  return orderType
}

export default {
  boomify,
  createAdminJwt,
  createJwt,
  extractUserId,
  extractUserQuery,
  extractUserScopes,
  extractcurrentOffset,
  hasPermission,
  isAdmin,
  isPartner,
  isValidJson,
  extractManagedCompanyRole,
  extractAccountingCompanyId,
  CheckDomain,
  getRoles,
  getStatus,
  getLinks,
  checkTags,
  checkAdditionalTags,
  checkVowLineItemId,
  checkHTOKLineProductIds,
  checkVowPropertiesItems,
  removeSpace,
  removeSpaceWithTrim,
  createSlug,
  checkTagsArr,
  checkDiamondLineItemId,
  getOrderTypeFromOrderTag
}
