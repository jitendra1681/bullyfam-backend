/*
 * Tax Provision General Default setting
 **/
export default {
  jobs: [
    {
      name: 'Sending HTOK return kit email',
      // send email time at morning 8 am
      time: '00 08 * * *',
      timezone: 'America/New_York',
      request: {
        method: 'POST',
        url: '/send-htok-return-email',
        // send payload
        payload: { 'isEmailSend': true, 'payload': true }
      },
      onComplete: (res) => {
        // eslint-disable-next-line no-console
        console.log('Sending htok return kit email', { res })
      }
    },
    {
      name: 'Sending email on not received HTOK',
      // send email time at morning 8:10 am
      time: '10 08 * * *',
      // send email on america new york
      timezone: 'America/New_York',
      request: {
        method: 'POST',
        url: '/send-not-received-htok-email',
        // send payload
        payload: { 'isEmailSend': true, 'payload': true }
      },
      onComplete: (res) => {
        // eslint-disable-next-line no-console
        console.log('Sending email on not received HTOK', { res })
      }
    }
  ]
}
