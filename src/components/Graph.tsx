type State = {
    numbers: number[]
}

function Graph(state: State) {
    const maxElWidth = 35;
    let elementWidth: number = 0.7*window.innerWidth/state.numbers.length;
    if(elementWidth>maxElWidth) elementWidth=maxElWidth
    console.log(elementWidth)
function numberStyle(x: number) {
    return(
        {
            height: `${10*x}px`,
        }
    )
}
    return (
        <div className={"wrapper graph"}>
            {state.numbers.map((x, key) => (
                <div key={key} style={numberStyle(x)}></div>
            ))}
        </div>
    )
}
export default Graph