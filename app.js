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
    client.subscribe('123456/Alarm', function (err) {
        if (err) {
            console.log("Error sub Topic /Alarm")
        }
    })
    client.subscribe('123456/Notif', function (err) {
        if (err) {
            console.log("Error sub Topic /Notif")
        }
    })
    client.subscribe('123456/Warning', function (err) {
        if (err) {
            console.log("Error sub Topic /Warning")
        }
    })
    client.subscribe('123456/Request', function (err) {
        if (err) {
            console.log("Error sub Topic /Request")
        }
    })
    client.subscribe('123456/Response', function (err) {
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
            console.log("Error sub Topic /DISCONN")
        }
    })
    client.subscribe('123456/LWT', function (err) {
        if (err) {
            console.log("Error sub Topic /LWT")
        }
    })

})

client.on('message', (topic, message) => {
    var name_topic = (topic.split("/")[1])//.ToString();
    console.log((name_topic))
    var imei = (topic.split("/")[0]);
    switch (name_topic) {
        case 'Alarm':
            client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${JSON.parse(message).code},"result":1}`)
            client.publish(`${imei}/Request`,`{"id":"${imei}", "code": 901}`)
            console.log(message.toString())
            break;
        case 'Warning':
            client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${JSON.parse(message.toString()).code},"result":1}`)
            client.publish(`${imei}/Request`,`{"id":"${imei}", "code": 901}`)
            console.log(message.toString())

            break;
        case 'Notif':
            var code = JSON.parse(message.toString()).code
            client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${code},"result":1}`)
            switch (code) {
                case 329:
                    console.log("Enter Maintainance Mode")
                    client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${code},"result":1}`)
                    break;
                case 330:
                    console.log("Enter Normal Mode")
                    client.publish(`${imei}/AWNResp`, `{ "id": "${imei}", "code":${code},"result":1}`)
                    break;
                case 381:
                    console.log("Set nguong cam bien nhiet")
                    client.publish(`${imei}/AWNResp`, `{"id":"${imei}","code":911,"info":{ "Number Phone":0384035197,"value":100}}`)
                    break;
                case 382:
                    console.log("Set nguong cam bien detvir")
                    client.publish(`${imei}/AWNResp`, `{"id":"${imei}","code":912,"info":{"NumberPhone":0384035197,"value":100}}`)
                    break;
                case 383:
                    console.log("Set nguong cam bien smvir")
                    client.publish(`${imei}/AWNResp`, `{"id":"${imei}","code":913,"info":{"NumberPhone":0384035197,"value":100}}`)
                    break;
                case 391:
                    console.log("Yeu Cau Doi Pass")
                    client.publish(`${imei}/AWNResp`, `{"id":"${imei}","code":391,"result":1}`)
                    break;
                case 399:
                    console.log("Yeu Cau Dong Bo")
                    client.publish(`${imei}/Request`, `{"id":"${imei}","code":902,"info":{"TEMP":100,"DETVR":101,"SMVR":102}}`)
                    client.publish(`${imei}/Request`, `{"id":"${imei}","code":903,"info":{"Acc1":{"N":0384035197,"P":"trungdd1" },"Acc2":{"N":0384035197,"P":"trungdd2" },"Acc3":{"N":0384035197,"P":"trungdd3" },"Acc4":{"N":0384035197,"P":"trungdd4" },"Acc5":{"N":0384035197,"P":"trungdd5" },"Acc6":{"N":0384035197,"P":"trungdd6" },"Acc7":{"N":0384035197,"P":"trungdd7" },}}`)
                    client.publish(`${imei}/Request`, `{"id":"${imei}","code":904,"info":{"ATMID":"oxff","Retry":100}}`)
                    break;
            }
            break;
        case 'Response':
            console.log(message.toString())
            break;
        case 'CONNECT':
            console.log(JSON.parse(message.toString()))
            var code = JSON.parse(message.toString()).code
            switch (code) {
                case 997:
                    client.publish(`${imei}/CONNECTRESP`, `{"id":"${imei}","code":997,"result":1}`)
                    break;
                case 998:
                    client.publish(`${imei}/CONNECTRESP`, `{"id":"${imei}","code":998,"result":1}`)
                    break;
            }
            break;
        case 'LWT':
            console.log(JSON.parse(message.toString()))
            break;
        case 'DISCONN':
            console.log(message.toString())
            break;
    }
})