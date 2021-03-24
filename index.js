import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import fs from 'fs'

const noRedirectOptions = {
    maxRedirects: 0,
    validateStatus: status => status >= 200 && status < 303
}

let construction_queue = ["lumber", "ironer", "stoner"] // lumber 4 --> 5 // ironer 2 --> 3 // stoner 2 --> 3
let interval = null
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
    const building = "main"
    // const upgradeFarm = '{"model_url":"BuildingOrder","action_name":"buildUp","arguments":{"building_id":"docks"},"town_id":7135,"nl_init":true}'
    // const upgrademain = '{"model_url":"BuildingOrder","action_name":"buildUp","arguments":{"building_id":"main"},"town_id":7135,"nl_init":true}'
    // const upgradeUrl = `https://${gameworld}.grepolis.com/game/frontend_bridge?town_id=${townId}&action=execute&h=${newToken}`
    // const execute = await session.post(upgradeUrl, 'json=' + encodeURI(upgrademain), noRedirectOptions)
    // console.log(execute.data)
    // Construction Module

    // interval = setInterval(getBuildingData(newToken, session), 30000)
    await getBuildingData(newToken, session)

}

const getBuildingData = async (newToken, session) => {
    if (construction_queue.length > 0) {
        let buildingDataUrl = `https://en134.grepolis.com/game/building_main?town_id=7135&action=index&h=${newToken}&json=${encodeURI('{"town_id":7135,"nl_init":true}')}`
        let buildingdata = await session.get(buildingDataUrl)
        let data = await parseBuildingData(buildingdata.data.json.html, newToken, session)
        await getBuildingData(newToken, session)
    }
    else {
        console.log('Finished processing construction queue')
    }
}

const parseBuildingData = async (buildingData, newToken, session) => {
    const start = buildingData.indexOf('BuildingMain.buildings = ') + 25
    const end = buildingData.indexOf('BuildingMain.full_queue = ', start)
    let stalebuildata = JSON.parse(buildingData.substring(start, end).replace(";", "").trim())
    let isQueueFull = buildingData.substring(end + 26, end + 31) === "true" ? true : false
    if (!isQueueFull) {
        if (construction_queue.length > 0) {
            let building = construction_queue.shift()
            if (stalebuildata[building].can_upgrade) {
                let upgradeCommand = '{"model_url":"BuildingOrder","action_name":"buildUp","arguments":{"building_id":"' + building + '"},"town_id":7135,"nl_init":true}'
                console.log(`Processing building : ${building}`)
                const upgradeUrl = `https://en134.grepolis.com/game/frontend_bridge?town_id=7135&action=execute&h=${newToken}`
                const execute = await session.post(upgradeUrl, 'json=' + encodeURI(upgradeCommand), noRedirectOptions)
                // {"model_url":"BuildingOrder/377435","action_name":"buyInstant","arguments":{"order_id":377435},"town_id":7135,"nl_init":true}
                let fourMins = 240
                let mybuildingData = _.find(execute.data.json.notifications, { "subject": "BuildingOrder" })
                let order_id = mybuildingData.param_id
                let parsedData = JSON.parse(mybuildingData.param_str)
                let finishTime = parsedData.BuildingOrder.building_time
                // let created_at = parsedData.BuildingOrder.created_at
                // let completeAt = parsedData.BuildingOrder.to_be_completed_at
                // console.log(finishTime)
                // {
                if (finishTime <= fourMins) {
                    let instantCommand = '{ "model_url": "BuildingOrder/' + order_id + '", "action_name": "buyInstant", "arguments": { "order_id": ' + order_id + ' }, "town_id": 7135, "nl_init": true }'
                    // {"model_url":"BuildingOrder/377655","action_name":"buyInstant","arguments":{"order_id":377655},"town_id":7135,"nl_init":true}
                    const execute = await session.post(upgradeUrl, 'json=' + encodeURI(instantCommand), noRedirectOptions)
                    // console.log(instantCommand)
                    console.log(execute.data)
                    console.log(`Buying instant buy for buidling : ${building}`)

                }
                else {
                    let sleepTime = finishTime - fourMins

                    // Usage!
                    await sleep((sleepTime + 10) * 1000)
                    let instantCommand = '{ "model_url": "BuildingOrder/' + order_id + '", "action_name": "buyInstant", "arguments": { "order_id": ' + order_id + ' }, "town_id": 7135, "nl_init": true }'
                    const execute2 = await session.post(upgradeUrl, 'json=' + encodeURI(instantCommand), noRedirectOptions)
                    console.log(execute2.data)
                    console.log(`Buying instant buy for buidling : ${building}`)
                }
                // }
            }
        }
    }
}

// sleep time expects milliseconds
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
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
        cookieString += `${key}=${value}; `
    }

    return cookieString
}

main()
    .then(() => console.log('running main'))
    .catch(err => console.error(err))