export default function createKeyboardListener(){
        
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
    
    function handleKeydown(event){

        const keyPressed = event.key
        

        const command = {
            playerId: 'player2',                   
            keyPressed
        }
    
        notifyAll(command)
    }
    return{
        subscribe
    }
}