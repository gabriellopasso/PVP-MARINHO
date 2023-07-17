export default function renderScreen(screen, game, requestAnimationFrame){
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.fillRect(0, 0, 10, 10)
    
    for (const fruitId in game.state.frutas) {
        const fruit = game.state.frutas[fruitId]
        context.fillStyle = '#08a331'
        context.fillRect(fruit.x, fruit.y, 1, 1 )
    }
    
    for (const playerId in game.state.jogadores){
        const player = game.state.jogadores[playerId]
        context.fillStyle = '#000000'
        context.fillRect(player.x, player.y, 1, 1)
    }
            
    requestAnimationFrame(()=> {
        renderScreen(screen, game, requestAnimationFrame)
    })
}