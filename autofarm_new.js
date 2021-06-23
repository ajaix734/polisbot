const newToken = window.Game.csrfToken
let interval = null
const autoFarm = async (newToken) => {
    //await sleep(time)
    let collect_url = `https://es98.grepolis.com/game/farm_town_overviews?town_id=9067&action=claim_loads_multiple&h=${newToken}`
    let payload = '{"towns":[5989,10610,7461,9317,9378,9067,4322,9984,5974,9754],"time_option_base":300,"time_option_booty":600,"claim_factor":"normal","town_id":9984,"nl_init":true}'
    // await GM_Post(collect_url, 'json=' + encodeURI(payload))
    fetch(collect_url, {
        method: 'POST',
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
        body: 'json=' + encodeURI(payload)
    })
        .then(response => response.json())
        .then(json => console.log(json))
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    //let getPayload1 = encodeURI('{"chunks":[{"x":29,"y":24,"timestamp":1623407194},{"x":28,"y":24,"timestamp":1623407194},{"x":29,"y":23,"timestamp":1623406964},{"x":28,"y":23,"timestamp":1623407194}],"town_id":9378,"nl_init":true}')
    //let getUrl1 = `https://es98.grepolis.com/game/map_data?town_id=9378&action=get_chunks&h=${newToken}&json=${getPayload1}&_=1623403896854`
    //let getPayload2 = encodeURI('{"island_x":582,"island_y":481,"current_town_id":9378,"booty_researched":1,"diplomacy_researched":"","trade_office":0,"town_id":9378,"nl_init":true}')
    //let getUrl2 = `https://es98.grepolis.com/game/farm_town_overviews?town_id=9378&action=get_farm_towns_for_town&h=${newToken}&json=${getPayload2}&_=1623403896855`
    //await GM_Get(getUrl1)
    //await GM_Get(getUrl2)
    // let getPayload = encodeURI('{"town_id":9067,"nl_init":true}')
    // let getURL = `https://es98.grepolis.com/game/farm_town_overviews?town_id=9067&action=fetch&h=${newToken}&json=${getPayload}&_=1623420284183`
    // await GM_Get(getURL)
    console.log('Autofarm running')
}

// function GM_Post(url, payload) {
//     return new Promise((resolve, reject) => {
//         GM_xmlhttpRequest({
//             method: 'POST',
//             url: url,
//             data: payload,
//             headers: {
//                 "accept": "text/plain, */*; q=0.01",
//                 "accept-language": "en-US,en;q=0.9",
//                 "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//                 "sec-fetch-dest": "empty",
//                 "sec-fetch-mode": "cors",
//                 "sec-fetch-site": "same-origin",
//                 "sec-gpc": "1",
//                 "x-requested-with": "XMLHttpRequest",
//                 "origin": "origin: https://es98.grepolis.com",
//                 "referrer": "https://es98.grepolis.com/game/index?login=1&p=848929475&ts=1623751483",
//                 "cookie": document.cookie
//             },
//             onload: function (response) {
//                 resolve(JSON.parse(response.responseText))
//             },
//             onerror: function (error) {
//                 reject(error)
//             }
//         })
//     })
// }


autoFarm(newToken)

interval = setInterval(() => autoFarm, 610000)