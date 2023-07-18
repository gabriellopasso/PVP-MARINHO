export default function createGame(){           
    const state = {
        jogadores: {},
        frutas: {},
        screen: {
            width: 20, 
            height: 20
        }
    }
    
    const observers = []

    function start() {
        const frequency = 10000

        setInterval(addFruit, frequency)
    }
    
     function subscribe(observeFunction){
        observers.push(observeFunction)
     }
 
    function notifyAll(command){
        for (const observeFunction of observers){
            observeFunction(command)
        }
         
     }

    function setState(newState){
        Object.assign(state, newState)  
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

        state.jogadores[playerId] = {
            x: playerX,
            y: playerY
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        })
    }
    
    
    function removePlayer(command){
        const playerId = command.playerId
        
        delete state.jogadores[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function addFruit(command){
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000) 
        const fruitX =  command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY =  command ? command.fruitY : Math.floor(Math.random() * state.screen.height)

        state.frutas[fruitId] = {
            x: fruitX,
            y: fruitY
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
        
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.frutas[fruitId]

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        })
    }

    function movePlayer(command){
        //console.log(`game.movePlayer() -> moving ${command.playerId} with ${command.keyPressed}`)
        notifyAll(command)

        const acceptedMoves = {
            ArrowUp(player){
                if (player.y - 1 >=0){
                    player.y = player.y -1
                }
            },
            ArrowRight(player){
                if (player.x + 1 < state.screen.width){
                    player.x = player.x + 1 
                }
            },
            ArrowDown(player){
                if (player.y + 1 < state.screen.height){
                    player.y = player.y + 1 
                }
            },
            ArrowLeft(player){
                if (player.x - 1 >= 0 ){
                player.x = player.x - 1 
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
                //console.log(`checking ${playerId} and ${fruitId}`)

                if (player.x === fruit.x && player.y === fruit.y){
                    //console.log(`collision between ${playerId} and ${fruitId}`)
                    removeFruit({ fruitId: fruitId })
                }
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        setState,
        subscribe,
        start,
        state
    }
}