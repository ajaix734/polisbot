const newToken = window.Game.csrfToken

const TOWN_MAP = new Map()
TOWN_MAP["Titan"] = '9067'
TOWN_MAP["Titan 2"] = '9317'
TOWN_MAP["Titan 3"] = '9378'
TOWN_MAP["Titan 4"] = '7461'
TOWN_MAP["Titan 5"] = '5989'
TOWN_MAP["Titan 6"] = '5974'
TOWN_MAP["Titan 7"] = '9754'
TOWN_MAP["Titan 8"] = '4322'
TOWN_MAP["Titan 9"] = '9984' // => bireme
TOWN_MAP["Titan 10"] = '10610' // => land def


const BOOST_MAP = new Map()
BOOST_MAP["ls"] = { wood: 29500, stone: 6500, iron: 18600 }
BOOST_MAP["bir"] = { wood: 29500, stone: 7482, iron: 0 }
BOOST_MAP["hop"] = { wood: 0, stone: 15000, iron: 30000 }
BOOST_MAP["sling"] = { wood: 16500, stone: 29500, iron: 12000 }
BOOST_MAP["horse"] = { wood: 20000, stone: 10000, iron: 29500 }
BOOST_MAP["dlu"] = { wood: 29500, stone: 0, iron: 27000 }
BOOST_MAP["all"] = { wood: 29000, stone: 29000, iron: 29000 }

const sameIslandDLU = [
    {
        cs_time: moment.tz("2021-06-15 08:33:25", "Europe/Madrid").unix() - 1,
        anchors: [
            '{ "hoplite": 157, "rider": 53, "catapult": 1, "id": 9367, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }',
            '{ "hoplite": 157, "rider": 53, "id": 9367, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }'
        ]
    }
]

const diffIslandDLU1 = [
    {
        cs_time: moment.tz("2021-06-15 15:38:55", "Europe/Madrid").unix() - 1,
        anchors: [
            //'{"hoplite": 157, "rider": 53, "small_transporter": 20, "demolition_ship": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }',
            '{"hoplite": 157, "rider": 53, "small_transporter": 20, "big_transporter": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }',
            '{"hoplite": 157, "rider": 53, "small_transporter": 20, "attack_ship": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }',
            '{"hoplite": 157, "rider": 53, "small_transporter": 20, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }'
        ]
    }
]

const diffIslandDLU2 = [
    {
        cs_time: moment.tz("2021-06-11 01:05:03", "Europe/Madrid").unix() - 1,
        anchors: [
            '{"hoplite": 110, "rider": 54, "small_transporter": 1, "demolition_ship": 1, "id": 9070, "type": "support", "town_id": ' + TOWN_MAP['Titan'] + ', "nl_init": true }',
            '{"sword": 23, "archer": 31, "hoplite": 1, "rider": 4, "chariot": 1, "small_transporter": 1, "big_transporter": 1, "id": 9070, "type": "support", "town_id": ' + TOWN_MAP['Titan'] + ', "nl_init": true }',
            '{"sword": 130, "rider": 54, "small_transporter": 17, "attack_ship": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 3'] + ', "nl_init": true }',
            '{"sword": 130, "big_transporter": 5, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 10'] + ', "nl_init": true }'
        ]
    }
]

const bireme = [
    {
        cs_time: moment.tz("2021-06-15 15:38:55", "Europe/Madrid").unix() - 1,
        anchors: [
            '{ "bireme": 44, "demolition_ship": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 9'] + ', "nl_init": true }',
            '{ "bireme": 44, "big_transporter": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 9'] + ', "nl_init": true }',
            '{ "bireme": 44, "attack_ship": 1, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 9'] + ', "nl_init": true }',
            '{ "bireme": 44, "id": 5105, "type": "support", "town_id": ' + TOWN_MAP['Titan 9'] + ', "nl_init": true }'
        ]
    }
]

let interval = null


const cityBoosting = async (newToken, townToBoost, boostingStrategy) => {
    const getTowns = async (newToken, townToBoost) => {
        let getTownsUrlPayload = encodeURI('{"town_id":' + townToBoost + ',"nl_init":true}')
        let getTownsUrl = `https://es98.grepolis.com/game/town_overviews?town_id=${townToBoost}&action=trade_overview&h=${newToken}&json=${getTownsUrlPayload}&_=1623556816178`
        let result = {
            data: await GM_Get(getTownsUrl)
        }
        let towns = _.filter(result.data.json.towns, (town) => { return town.id !== parseInt(townToBoost) && town.id !== parseInt(TOWN_MAP["Titan 9"]) && town.id !== parseInt(TOWN_MAP["Titan 10"]) })
        return _.map(towns, (obj) => {
            return {
                id: obj.id, res: obj.res
            }
        })
    }

    const getTradeInfo = async (newToken, fromTown, townToBoost) => {
        let tradeInfoUrlPayload = encodeURI('{"id":' + townToBoost + ',"town_id":' + fromTown + ',"nl_init":true}')
        let tradeInfoUrl = `https://es98.grepolis.com/game/town_info?town_id=${fromTown}&action=trading&h=${newToken}&json=${tradeInfoUrlPayload}&_=1623555972567`
        let result = {
            data: await GM_Get(tradeInfoUrl)
        }
        let tradeData = result.data.json.data
        if (tradeData.available_capacity === 0) {
            return false
        }
        else {
            return tradeData
        }
    }

    const processTradeData = async (tradeData, boostingStrategy, obj, townToBoost) => {
        let target_warehouse = boostingStrategy
        let current_warehouse = {
            wood: tradeData.resources.wood + tradeData.incoming_resources.wood,
            stone: tradeData.resources.stone + tradeData.incoming_resources.stone,
            iron: tradeData.resources.iron + tradeData.incoming_resources.iron
        }
        let final_warehouse = {}

        if (target_warehouse.wood - current_warehouse.wood > 0) {
            final_warehouse.wood = target_warehouse.wood - current_warehouse.wood
        }

        if (target_warehouse.stone - current_warehouse.stone > 0) {
            final_warehouse.stone = target_warehouse.stone - current_warehouse.stone
        }

        if (target_warehouse.iron - current_warehouse.iron > 0) {
            final_warehouse.iron = target_warehouse.iron - current_warehouse.iron
        }

        if (_.isEmpty(final_warehouse)) {
            console.log(`${townToBoost} Warehouse full`)
            return
        }

        let toSend = {
            wood: 0,
            stone: 0,
            iron: 0
        }
        let sum = 0
        for (let key of Object.keys(final_warehouse)) {
            let temp = Math.min(obj.res[key], final_warehouse[key])
            temp = Math.min(temp, tradeData.available_capacity - sum)
            sum += temp
            toSend[key] = temp
            obj.res[key] -= toSend[key]
        }
        // console.log('current warehouse: ', current_warehouse)
        console.log('final warehouse: ', final_warehouse)
        console.log('To send', toSend)
        console.log('From Town', obj.id)
        console.log('Town capacity: ', tradeData.available_capacity)

        if (sum >= 100) {
            let sendTradeUrl = `https://es98.grepolis.com/game/town_info?town_id=${obj.id}&action=trade&h=${newToken}`
            let sendTradePayload = encodeURI('{"id":' + townToBoost + ',"wood":' + toSend.wood + ',"stone":' + toSend.stone + ',"iron":' + toSend.iron + ',"town_id":' + obj.id + ',"nl_init":true}')
            let result = {
                data: await GM_Post(sendTradeUrl, 'json=' + sendTradePayload)
            }

            if (result.data.json.error) {
                console.error(result.data.json)
                return
            }
            let getPayload = encodeURI('{"town_id":' + townToBoost + ',"nl_init":true}')
            let getURL = `https://es98.grepolis.com/game/town_overviews?town_id=${townToBoost}&action=trade_overview&h=${newToken}&json=${getPayload}&_=1623773044188`
            await GM_Get(getURL)
            // let tempResult = _.find(result.data.json.notifications, { "subject": "Trade" })
            // let finalTradeData = JSON.parse(tempResult.param_str)
            // await sleep(finalTradeData.Trade.arrival_seconds_left * 1000)
            // let newTradeData = await getTradeInfo(, newToken, obj.id, townToBoost)
            // await processTradeData(, newTradeData, boostingStrategy, obj, townToBoost)
        }
    }
    let townsData = await getTowns(newToken, townToBoost)
    for (let obj of townsData) {
        let tradeData = await getTradeInfo(newToken, obj.id, townToBoost)
        if (tradeData) {
            processTradeData(tradeData, boostingStrategy, obj, townToBoost)
        }
        await sleep(50000)
    }
}


const autoFarm = async (newToken) => {
    //await sleep(time)
    let collect_url = `https://es98.grepolis.com/game/farm_town_overviews?town_id=9067&action=claim_loads_multiple&h=${newToken}`
    let payload = '{"towns":[5989,10610,7461,9317,9378,9067,4322,9984,5974,9754],"time_option_base":300,"time_option_booty":600,"claim_factor":"normal","town_id":9984,"nl_init":true}'
    await GM_Post(collect_url, 'json=' + encodeURI(payload))
    //let getPayload1 = encodeURI('{"chunks":[{"x":29,"y":24,"timestamp":1623407194},{"x":28,"y":24,"timestamp":1623407194},{"x":29,"y":23,"timestamp":1623406964},{"x":28,"y":23,"timestamp":1623407194}],"town_id":9378,"nl_init":true}')
    //let getUrl1 = `https://es98.grepolis.com/game/map_data?town_id=9378&action=get_chunks&h=${newToken}&json=${getPayload1}&_=1623403896854`
    //let getPayload2 = encodeURI('{"island_x":582,"island_y":481,"current_town_id":9378,"booty_researched":1,"diplomacy_researched":"","trade_office":0,"town_id":9378,"nl_init":true}')
    //let getUrl2 = `https://es98.grepolis.com/game/farm_town_overviews?town_id=9378&action=get_farm_towns_for_town&h=${newToken}&json=${getPayload2}&_=1623403896855`
    //await GM_Get(getUrl1)
    //await GM_Get(getUrl2)
    let getPayload = encodeURI('{"town_id":9067,"nl_init":true}')
    let getURL = `https://es98.grepolis.com/game/farm_town_overviews?town_id=9067&action=fetch&h=${newToken}&json=${getPayload}&_=1623420284183`
    await GM_Get(getURL)
    console.log('Autofarm running')
}

const startAttack = async (newToken, from, payload) => {
    let attack_url = `https://es98.grepolis.com/game/town_info?town_id=${from}&action=send_units&h=${newToken}`
    let cance_url = `https://es98.grepolis.com/game/frontend_bridge?town_id=${from}&action=execute&h=${newToken}`
    // let cs_time = moment.tz("2021-06-09 08:32:00", "Europe/Madrid").unix() - 1// YY-MM-DD

    const antiTimer = async (payload, cs_time) => {
        const attackResult = {
            data: await GM_Post(attack_url, 'json=' + encodeURI(payload))
        }
        if (attackResult.data.json.error) {
            //console.log('Previous payload successfull.Skipping this.')
            return
        }
        let attackData = _.find(attackResult.data.json.notifications, { "subject": "MovementsUnits" })
        let desiredTime = cs_time
        // let times = JSON.parse(attackData.param_str)
        let command = JSON.parse(attackData.param_str)
        let timeDifference = desiredTime - command.MovementsUnits.arrival_at
        let shutDownCheck = timeDifference < -15 && timeDifference > -30 ? true : false
        console.log(timeDifference)
        if (timeDifference === 0 || timeDifference === 1) {
            console.log('Support Sent')
        }
        else if (shutDownCheck) {
            let cancel_payload = '{ "model_url": "Commands", "action_name": "cancelCommand", "arguments": { "id": ' + command.MovementsUnits.command_id + ' }, "town_id": ' + from + ', "nl_init": true }'
            await GM_Post(cance_url, 'json=' + encodeURI(cancel_payload))
            // await sleep(1500)
            console.log('Arrival Time exceeded..Moving to next payload')
        }
        else {
            console.log('Trying Again')
            let cancel_payload = '{ "model_url": "Commands", "action_name": "cancelCommand", "arguments": { "id": ' + command.MovementsUnits.command_id + ' }, "town_id": ' + from + ', "nl_init": true }'
            const returnResult = {
                data: await GM_Post(cance_url, 'json=' + encodeURI(cancel_payload))
            }
            let returnData = _.find(returnResult.data.json.notifications, { "subject": "MovementsUnits" })
            let arrivalTime = JSON.parse(returnData.param_str)
            if (moment.tz("Europe/Madrid").unix() < arrivalTime.MovementsUnits.arrival_at) {
                await sleep((arrivalTime.MovementsUnits.arrival_at - moment.tz("Europe/Madrid").unix()) * 1000)
            }
            else {
                await sleep(1400)
            }
            await antiTimer(payload, cs_time)
        }
    }

    const initialAttack = async (payload, cs_time) => {
        const attackResult = {
            data: await GM_Post(attack_url, 'json=' + encodeURI(payload))
        }
        let attackData = _.find(attackResult.data.json.notifications, { "subject": "MovementsUnits" })
        let desiredTime = cs_time
        // let times = JSON.parse(attackData.param_str)
        let command = JSON.parse(attackData.param_str)
        let timeDifference = desiredTime - command.MovementsUnits.arrival_at
        if (timeDifference >= 50) {
            let cancel_payload = '{ "model_url": "Commands", "action_name": "cancelCommand", "arguments": { "id": ' + command.MovementsUnits.command_id + ' }, "town_id": ' + from + ', "nl_init": true }'
            await GM_Post(cance_url, 'json=' + encodeURI(cancel_payload))
            await sleep((timeDifference - 45) * 1000)
            await antiTimer(payload, cs_time)
        }
        else if (timeDifference < 0) {
            let cancel_payload = '{ "model_url": "Commands", "action_name": "cancelCommand", "arguments": { "id": ' + command.MovementsUnits.command_id + ' }, "town_id": ' + from + ', "nl_init": true }'
            const returnResult = {
                data: await GM_Post(cance_url, 'json=' + encodeURI(cancel_payload))
            }
            let returnData = _.find(returnResult.data.json.notifications, { "subject": "MovementsUnits" })
            let arrivalTime = JSON.parse(returnData.param_str)
            await sleep((arrivalTime.MovementsUnits.arrival_at - moment.tz("Europe/Madrid").unix()) * 1000)
            console.log(`Missed window. moving to next payload`)
        }
        else {
            let cancel_payload = '{ "model_url": "Commands", "action_name": "cancelCommand", "arguments": { "id": ' + command.MovementsUnits.command_id + ' }, "town_id": ' + from + ', "nl_init": true }'
            const returnResult = {
                data: await GM_Post(cance_url, 'json=' + encodeURI(cancel_payload))
            }
            let returnData = _.find(returnResult.data.json.notifications, { "subject": "MovementsUnits" })
            let arrivalTime = JSON.parse(returnData.param_str)
            await sleep((arrivalTime.MovementsUnits.arrival_at - moment.tz("Europe/Madrid").unix()) * 1000)
            await antiTimer(payload, cs_time)
        }
    }
    try {
        for (let i of payload) {
            for (let j of i.anchors) {
                await initialAttack(j, i.cs_time)
                await sleep(5000)
            }
        }
    } catch (error) {
        console.error(error)
        //process.exit(0)
    }

    // await antiTimer(slow1)

}

const sleep = (time) => {
    console.log(`sleeping for ${time / 1000} s`)
    return new Promise((resolve) => setTimeout(resolve, time))
}

function getRandom(max) {
    return Math.ceil(Math.random() * max);
}


function GM_Get(url) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                "origin": "origin: https://es98.grepolis.com",
                "referrer": "https://es98.grepolis.com/game/index?login=1&p=848929475&ts=1623751483",
                "cookie": document.cookie
            },
            onload: function (response) {
                resolve(JSON.parse(response.responseText))
            },
            onerror: function (error) {
                reject(error)
            }
        })
    })
}

function GM_Post(url, payload) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            data: payload,
            headers: {
                "accept": "text/plain, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-requested-with": "XMLHttpRequest",
                "origin": "origin: https://es98.grepolis.com",
                "referrer": "https://es98.grepolis.com/game/index?login=1&p=848929475&ts=1623751483",
                "cookie": document.cookie
            },
            onload: function (response) {
                resolve(JSON.parse(response.responseText))
            },
            onerror: function (error) {
                reject(error)
            }
        })
    })
}

//startAttack(newToken, TOWN_MAP['Titan 10'], diffIslandDLU2)
//startAttack(newToken, TOWN_MAP['Titan 3'], diffIslandDLU1)
//startAttack(newToken, TOWN_MAP['Titan 9'], bireme)
//autoFarm(newToken)
cityBoosting(newToken, TOWN_MAP["Titan 8"], BOOST_MAP["ls"])
    //interval = setInterval(() => cityBoosting(newToken, TOWN_MAP["Titan 4"], BOOST_MAP["ls"]), 3600000)//</script>");
