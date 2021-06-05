import axios from 'axios'
// const axios = require('axios')

export default function request(config) {
  const axios1 = axios.create({
    baseURL: 'http://127.0.0.1:8085',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })

  return axios1(config)
}