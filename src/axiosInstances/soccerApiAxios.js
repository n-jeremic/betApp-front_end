import axios from 'axios'

export default axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  method: 'GET',
  params: {
    season: 2020
  },
  headers: {
    'x-rapidapi-key': 'e6b9e9b1bb5d5ce7ed09896e06b9112c'
  }
})
