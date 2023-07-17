import express from 'express'
import http from 'http'
import createGame from './public/createGame.js'
import socketio from 'socket.io'


const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.subscribe((command) => {
    console.log(`> Emiitting ${command.type}`)
    sockets.emit(command.type, command)
})

console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> player connected on Server with id: ${playerId}`)

    game.addPlayer({ playerId: playerId })
    console.log(game.state)

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
        console.log(`> player disconnected on Server with id: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log('> Server listening on port: 3000')
})