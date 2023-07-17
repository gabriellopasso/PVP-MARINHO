import createGame from 'createGame'
export default function createKeyboardListener(document){
    const state = {
        observers: []
    }
    function subscribe(observeFunction){
        state.observers.push(observeFunction)
    }
    function notifyAll(command){
        //console.log(`Notifying ${state.observers.length} observers`)
        for (const observeFunction of state.observers){
            observeFunction(command)
        }
    }
    
    document.addEventListener('keydown', handleKeydown)
    
    const game = createGame()
    function handleKeydown(event){

        const keyPressed = event.key
        

        const command = {
            playerId: game.state.jogadores['playerId'],                   
            keyPressed
        }
    
        notifyAll(command)
    }
    return{
        subscribe
    }
}