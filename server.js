const dgram = require('dgram')
const wait = require('waait')
const commandDelays = require('./commandDelays')

const PORT = 8889;
const HOST = '192.168.10.1'

// create socket connection via udp4 and bind to PORT
const drone = dgram.createSocket('udp4')
drone.bind(PORT)

//listen to messages being sent back from drone
drone.on('message', message => {
  console.log(`🎉: ${message}`)
})

//error handler
function handleError(err) {
  if (err) {
    console.log('ERROR')
    console.log(err)
  }
}

// enter command mode
// drone.send('command', 0, 7, PORT, HOST, handleError)

//send battery command, offset, length of command, port, host, callback
// drone.send('battery?', 0, 8, PORT, HOST, handleError)

const commands = ['command', 'battery?', 'takeoff', 'land']

let i = 0

async function fly() {
  const command = commands[i]
  const delay = commandDelays[command]
  console.log(`running command: ${command}`)
  drone.send(command, 0, command.length, PORT, HOST, handleError)
  await wait(delay)
  i += 1
  if (i < commands.length) {
    return fly();
  }
  console.log('done flying!')
}

fly()
