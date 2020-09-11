import soccerApiAxios from '../axiosInstances/soccerApiAxios'

export const fetchLeagueFixtures = (leagueId, from, to) => {
  return soccerApiAxios({
    method: 'GET',
    url: `/fixtures?league=${leagueId}&from=${from}&to=${to}&season=2020`
  })
}
