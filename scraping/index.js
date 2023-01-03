import * as cheerio from 'cheerio'

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scraps (url) {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

async function getLeaderBoard () {
  const $ = await scraps(URLS.leaderboard)
  const $rows = $('table tbody tr')

  const cleanText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, '')
    .trim()

  const LEADERBOARD_SELECTOR = {
    Teams: '.fs-table-text_3',
    Wins: '.fs-table-text_4',
    Loses: '.fs-table-text_5',
    ScoredGoals: '.fs-table-text_6',
    ConcededGoals: '.fs-table-text_7',
    CardsYellow: '.fs-table-text_8',
    CardsRed: '.fs-table-text_9'
  }

  $rows.each((index, el) => {
    const leaderboardEntries = Object.entries(LEADERBOARD_SELECTOR).map(([key, selector]) => {
      const rawValue = $(el).find(selector).text()
      const value = cleanText(rawValue)
      return [key, value]
    })
    console.log(leaderboardEntries)
    console.log(Object.fromEntries(leaderboardEntries))
  })
}

/* const leaderboard = [{
  team: 'Team',
  wins: 0,
  loses: 0,
  goalsScored: 0,
  goalsConceded: 0,
  cardsYellow: 0,
  cardsRed: 0
}] */
await getLeaderBoard()
