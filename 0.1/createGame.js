export default function createGame(){           
    const state = {
        jogadores: {},
        frutas: {}
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.jogadores[playerId] = {
            x: playerX,
            y: playerY
        }
        

    }
    
    function createPlayer(){
        const x = Math.floor(Math.random() * (10 - 0) + 0)
        const y = Math.floor(Math.random() * (10 - 0) + 0)
        const id = `player${Math.floor(Math.random()* (10 - 1) + 1)}${Math.floor(Math.random()* (10 - 1) + 1)}`
        console.log(x, y, id)
        return {'PlayerId':id,'playerX': x, 'playerY': y}  //addPlayer({'PlayerId':id,'playerX': x, 'playerY': y }) 
    }
    function createFruit(){
        const x = Math.floor(Math.random() * (10-0)+0)
        const y = Math.floor(Math.random() * (10-0)+0)
        const id = `fruit${Math.floor(Math.random()* (10 - 1) + 1)}${Math.floor(Math.random()* (10 - 1) + 1)}`
        return {'fruitId': id, 'fruitX': x, 'fruitY': y}
    }
    
    function removePlayer(command){
        const playerId = command.playerId
        
        delete state.jogadores[playerId]
    }

    function addFruit(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.frutas[fruitId] = {
            x: fruitX,
            y: fruitY
        }
        
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.frutas[fruitId]
    }

    function movePlayer(command){
        //console.log(`game.movePlayer() -> moving ${command.playerId} with ${command.keyPressed}`)

        const acceptedMoves = {
            ArrowUp(player){
                //console.log('moving player up')
                if (player.y - 1 >=0){
                    player.y -= 1
                }
            },
            ArrowRight(player){
                //console.log('moving player right')
                if (player.x + 1 < tela.width){
                    player.x += 1
                }
            },
            ArrowDown(player){
                //console.log('moving player down')
                if (player.y + 1 < tela.height){
                player.y += 1
                }
            },
            ArrowLeft(player){
                //console.log('moving player left')
                if (player.x - 1 >= 0 ){
                player.x -= 1
                }
            }
        }
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.jogadores[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]
        
        if (player && moveFunction){
            moveFunction(player)
            checkForFruitCollision(playerId)
        }                      
    }
    function checkForFruitCollision(playerId){
        for (const playerId in state.jogadores){
            const player = state.jogadores[playerId]
            for (const fruitId in state.frutas){
                const fruit = state.frutas[fruitId]
                console.log(`checking ${playerId} and ${fruitId}`)

                if (player.x === fruit.y && player.y === fruit.y){
                    console.log(`collision between ${playerId} and ${fruitId}`)
                    removeFruit({ fruitId: fruitId })
                }
            }
        }
    }

    return {
        createPlayer,
        createFruit,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer, 
        state
    }
}