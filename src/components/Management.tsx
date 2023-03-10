type ManagementParams = {
    latency: number;
    arrayLength: number;
    inProcess: boolean;
    setLatency: React.ChangeEventHandler<HTMLInputElement>;
    setArrayLength: React.ChangeEventHandler<HTMLInputElement>;
    run: React.MouseEventHandler<HTMLButtonElement>
    random: React.MouseEventHandler<HTMLButtonElement>
    sort: React.MouseEventHandler<HTMLButtonElement>
}

export default function Management(params: ManagementParams) {
    return (
        <div className='wrapper settings'>
            <div className='form'>
                <label>Set sorting latency: </label>
                <input defaultValue={params.latency} disabled={params.inProcess} onChange={params.setLatency} type="number" /> 
                
                <label>Set array length:</label>
                <input defaultValue={params.arrayLength} disabled={params.inProcess} onChange={params.setArrayLength} type="number" />
            </div>
            <div className="buttons">
                <button onClick={params.run}>{params.inProcess?"Stop":"Run"}</button>
                <button onClick={params.random}>New random set</button>
                <button disabled={params.inProcess} onClick={params.sort}>Sort one step</button>
            </div>
        </div>
    )
}