import axios from 'axios'

export default function request(config) {
  const axios1 = axios.create({
    baseURL: '',
    timeout: 10000
  })

  return axios1(config)
}