import Constants from '../constants'

/*
 * AWS S3 accounts credentials details here
**/

const maxRetries = 3
const waitTime = 5000 // 5 seconds
const aws = {}
aws.accessKeyId = Constants.AWS.accessKeyId
aws.secretAccessKey = Constants.AWS.secretAccessKey
aws.region = Constants.AWS.region
aws.sslEnabled = true
aws.maxRetries = maxRetries
aws.waitTime = waitTime
aws.bucket = Constants.AWS.bucket
aws.s3 = process.env.AWS_S3 || 'https://s3.amazonaws.com/'
aws.prefix = ''
aws.marker = ''
aws.params = {}
aws.params.Bucket = Constants.AWS.bucket

export default Object.freeze(aws)

