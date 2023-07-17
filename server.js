import express from 'express'
import http from 'http'
import createGame from './public/createGame.js'
import socketio from 'socket.io'


const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({playerId: 'player1', playerX: 1, playerY: 2})
game.addFruit({fruitId: 'fruit1', fruitY: 2, fruitX: 9})
game.addFruit({fruitId: 'fruit2', fruitY: 9, fruitX: 2})

console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> player connected on Server with id: ${playerId}`)
})

server.listen(3000, () => {
    console.log('> Server listening on port: 3000')
})