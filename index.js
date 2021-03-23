import axios from 'axios'

const noRedirectOptions = {
    maxRedirects: 0,
    validateStatus: status => status >= 200 && status < 303
}

const main = async () => {
    const session = axios.create()
    let trash = null
    session.defaults.withCredentials = true
    session.defaults.headers['user-agent'] = 'Chrome/51.0.2704.63'

    const res = await session.get('https://en.grepolis.com')
    let cookies = {}
    cookies = setCookies(session, cookies, res.headers['set-cookie'])
    const loginCheckUrl = 'https://en.grepolis.com/glps/login_check'
    session.defaults.headers['x-requested-with'] = 'XMLHttpRequest'
    session.defaults.headers['x-xsrf-token'] = cookies['XSRF-TOKEN']
    const username = 'tobbot'
    const password = 'jaisanarv'
    const data = `login%5Buserid%5D=${username}&login%5Bpassword%5D=${password}&login%5Bremember_me%5D=true`
    const check = await session.post(loginCheckUrl, data, noRedirectOptions)
    cookies = setCookies(session, cookies, check.headers['set-cookie'])
    const lobby = await session.get('https://en.grepolis.com/', noRedirectOptions)
    cookies = setCookies(session, cookies, lobby.headers['set-cookie'])
    const redirectUrl = lobby.headers.location
    const jobOffer = await session.get(redirectUrl, noRedirectOptions)
    cookies = setCookies(session, cookies, jobOffer.headers['set-cookie'])
    const lobbyPage = await session.get('https://en0.grepolis.com/start/index')
    const lobbyData = lobbyPage.data
    let start = lobbyData.indexOf('CSRF.token = ') + 14
    let end = lobbyData.indexOf("'", start)
    const token = lobbyData.substring(start, end)
    const gameworldURL = 'https://en0.grepolis.com/start?action=login_to_game_world'
    const gameworld = 'en134'
    const gameworldData = `world=${gameworld}&facebook_session=&facebook_login=&token=${token}&portal_sid=&name=tobbot&password=`
    const temp = await session.post(gameworldURL, gameworldData, noRedirectOptions)
    cookies = setCookies(session, cookies, temp.headers['set-cookie'])
    trash = temp.headers.location
    const baseUrl = `https://${gameworld}.grepolis.com`
    const temp1 = await session.get(trash, noRedirectOptions)
    cookies = setCookies(session, cookies, temp1.headers['set-cookie'])
    const lastUrl = temp1.headers.location
    const game = await session.get(baseUrl + lastUrl)
    cookies = setCookies(session, cookies, game.headers['set-cookie'])
    start = game.data.indexOf('csrfToken')
    console.log(game.data.substring(start, start + 80))
    start = game.data.indexOf('csrfToken') + 12
    end = game.data.indexOf('"', start)
    const newToken = game.data.substring(start, end)
    const townId = '7135'
    let dataUrldata = '{"types":[{"type":"frontendBridge"},{"type":"buildings"},{"type":"powers"},{"type":"godPowersTown"},{"type":"godPowersCommand"},{"type":"units"},{"type":"inventoryItems"},{"type":"heroes"},{"type":"progressable"},{"type":"campaignUnits"},{"type":"campaignStages"},{"type":"campaignMeta"},{"type":"easterIngredients"},{"type":"map","param":{"x":10,"y":10}},{"type":"bar"},{"type":"backbone"}],"town_id":7135,"nl_init":false}'
    const dataUrl = `https://${gameworld}.grepolis.com/game/data?town_id=${townId}&action=get&h=${newToken}`
    dataUrldata = 'json=' + encodeURI(dataUrldata)
    const lastResponse = await session.post(dataUrl, dataUrldata)
    const upgradeFarm = '{"model_url":"BuildingOrder","action_name":"buildUp","arguments":{"building_id":"storage"},"town_id":7135,"nl_init":true}'
    const upgradeUrl = `https://${gameworld}.grepolis.com/game/frontend_bridge?town_id=${townId}&action=execute&h=${newToken}`
    const execute = await session.post(upgradeUrl, 'json=' + encodeURI(upgradeFarm), noRedirectOptions)
    // cookies = setCookies(session, cookies, execute.headers['set-cookie'])
    console.log(execute.data)

}
const parseCookies = (setCookies) => {
    const cookies = {}

    for (const cookie of setCookies) {
        const pair = cookie.split(';')[0].split('=')
        cookies[pair[0]] = pair[1]
    }

    return cookies
}

const setCookies = (session, oldCookies, setCookiesHeader) => {
    const cookies = {
        ...oldCookies,
        ...parseCookies(setCookiesHeader)
    }

    session.defaults.headers['cookie'] = cookieToString(cookies).trim()

    return cookies
}

const cookieToString = (cookies) => {
    let cookieString = ''

    for (const [key, value] of Object.entries(cookies)) {
        cookieString += `${key}=${value};`
    }

    return cookieString
}

main()
    .then(() => console.log('running main'))
    .catch(err => console.error(err))