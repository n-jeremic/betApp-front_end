import axios from 'axios'

const API_KEY = '7de53b2fd8db98db32d37921f403db29'

export default axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': API_KEY
  }
})
