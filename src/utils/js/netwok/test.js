import request from './request.js'

request({
  url: '/user',
  data: {
    mail: 'dsa'
  }
}).then((result) => {
  console.log('success')
  console.log(result.data)
}).catch((error) => {

  console.log('asdsads')
  console.log(error)
})




