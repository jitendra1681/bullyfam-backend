import Mongoose from 'mongoose'

// import Constants from '../constants'
/*eslint no-magic-numbers: ['error', { 'ignore': [0, -240]}]*/
const schema = new Mongoose.Schema({
  name: { type: String, default: '' },
  socialId: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  username: { type: String, default: '', unique: true },
  accountType: { type: String, default: '' },
  phoneNo: { type: String, default: '', unique: true },
  role: { type: String, default: 'user' },
  deviceToken: { type: String, default: '' },
  deviceType: { type: String, default: '' },
  deviceId: { type: String, default: '' },
  status: { type: Boolean, default: false },
  resetPasswordToken: { type: String, default: '' },
  resetPasswordExpires: { type: Date, default: '' },
  lastLogin: { type: Date, default: Date.now },
  offset: { type: Number, default: 0 },
  isBlock: { type: Boolean, default: false },
  country: { type: String, default: '' },
  gender: { type: String, default: '' },
  profilePicture: { type: String, default: '' },
  otp: { type: String, default: '' },
  address: { type: String, default: '' },
  userToken: { type: String, default: '' },
  folllewrs: { type: Array, default: [] }
}, {
  timestamps: true
})


const newLocal = 'Users'
export default Mongoose.model(newLocal, schema)
