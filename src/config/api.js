import pkg from '../../package.json'

/*
 * Tax Provision Api Title, Description, version settings in this file
**/
const api = {
  auth: false,
  info: {
    title: 'Bully Fam',
    description: '',
    version: pkg.version
  },
  jsonEditor: true,
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ jwt: [] }]
}

export default api
