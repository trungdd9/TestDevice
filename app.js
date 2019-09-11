const mqtt = require('mqtt')
// const url = 'mqtt://fs14.ddns.net:1884'
const url = 'mqtt://fs14.ddns.net:1884'
// const url = 'mqtt://broker.shiftr.io:1883'

// var client = mqtt.connect(url, {clientId: 'SERVER', username: 'admin', password: 'admin'})
// var client = mqtt.connect(url, {clientId: 'SERVER', username: 'khoclk40', password: 'kynguyen'})
var client = mqtt.connect(url, { clientId: 'SERVER' })
client.on('error', (err) => {
    console.log('Error')
    if (err) {
        console.log(err)
    }
    client = mqtt.connect(url)
})

client.on('connect', () => {
    client.subscribe('1234567890/ALARM', function (err) {
        if (err) {
            console.log("Error sub Topic /Alarm")
        }
    })
    client.subscribe('1234567890/WARNING', function (err) {
        if (err) {
            console.log("Error sub Topic /Warning")
        }
    })
    client.subscribe('1234567890/Request', function (err) {
        if (err) {
            console.log("Error sub Topic /Request")
        }
    })
    client.subscribe('1234567890/Response', function (err) {
        if (err) {
            console.log("Error sub Topic /Response")
        }
    })
    client.subscribe('123456/CONNECT', function (err) {
        if (err) {
            console.log("Error sub Topic /CONN")
        }
    })
    client.subscribe('123456/DISCONN', function (err) {
        if (err) {
            console.log("Error sub Topic /CONN")
        }
    })
    client.subscribe('123456/LWT', function (err) {
        if (err) {
            console.log("Error sub Topic /CONN")
        }
    })

})

client.on('message', (topic, message) => {
    var name_topic = (topic.split("/")[1])//.ToString();
    console.log((name_topic))
    var imei = (topic.split("/")[0]);
    switch (name_topic) {
        case 'ALARM':
            client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${JSON.parse(message).code},"result":1}`)
            client.on("message", (topic2, message2) => {
                console.log(topic2);
                console.log(JSON.parse(message2.toString()))
                client.end;
            })
            break;
        case 'WARNING':
            client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${JSON.parse(message.toString()).code},"result":1}`)
            break;
        case 'NOTIF':
            client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${JSON.parse(message.toString()).code},"result":1}`)
            break;
        case 'Response':
            console.log(JSON.parse(message.toString()))
            break;
        case 'CONNECT':
            console.log(JSON.parse(message.toString()))
            break;
        case 'LWT':
            console.log(JSON.parse(message.toString()))
            break;
        case 'DISCONN':
            console.log(message.toString())
            break;
    }
})