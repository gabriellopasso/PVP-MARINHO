

export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId){
    const context = screen.getContext('2d')
    screen.width = game.state.screen.width
    screen.height = game.state.screen.height
    context.fillStyle = 'white'
    context.fillRect(0, 0, game.state.screen.width, game.state.screen.height)
    
    
    for (const fruitId in game.state.frutas) {
        const fruit = game.state.frutas[fruitId]
        context.fillStyle = '#08a331'
        context.fillRect(fruit.x, fruit.y, 10, 10 );
    }
    
    for (const playerId in game.state.jogadores){
        const player = game.state.jogadores[playerId]
        context.fillStyle = '#000000'
        context.fillRect(player.x, player.y, 10, 10)
    }

    const currentPlayer = game.state.jogadores[currentPlayerId]

    if (currentPlayer) {
        context.fillStyle = '#FDED00'
        context.fillRect(currentPlayer.x, currentPlayer.y, 10, 10)
    }

    requestAnimationFrame(()=> {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}