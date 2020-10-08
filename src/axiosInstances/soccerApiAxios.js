import axios from 'axios'

const accessKeys = [
  'f71bb08779b83d2e9e48e438fc3b3b82',
  'e6b9e9b1bb5d5ce7ed09896e06b9112c'
]

export default axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  method: 'GET',
  headers: {
    'x-rapidapi-key': accessKeys[1]
  }
})
