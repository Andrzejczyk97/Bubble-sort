import React from 'react';
import Header from './components/Header';
import Graph from './components/Graph';
import Management from './components/Management';
import './globalStyles.css';
type State = {
  numbers: number[]
  succeed: boolean,
  numbersSwapped: boolean,
  inProcess: boolean
}
type Params = {
  sortFunc: (numbers: number[]) => SortResult
  arrayGenerator: (a: number, b: number) => number[]
}

type SortResult = {
  numbers: number[],
  succeed: boolean,
  numbersSwapped: boolean
}

export default class App extends React.Component<Params, State> {

  timerID_: number
  arrayLength: number
  latency: number
  sortFunc: (array: number[]) => SortResult
  arrayGenerator_: (elementsCount: number, maxValue: number) => number[]
  readonly maxValue: number = 25
  readonly minDelay: number = 1
  readonly maxDelay: number = 1000
  readonly minArrayLength: number = 2
  readonly maxArrayLength: number = 50

  constructor(params: Params) {
    super(params);
    this.timerID_=NaN  
    this.arrayLength = 20
    this.maxValue = 20
    this.latency = 200
    this.sortFunc = params.sortFunc
    this.arrayGenerator_ = params.arrayGenerator

    this.state= {
      numbers: this.arrayGenerator_(this.arrayLength, this.maxValue),
      succeed: false,
      numbersSwapped: false,
      inProcess: false
    }
    
  }
  setSortingLatency: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newLatency: number = parseInt(event.target.value)
    if (Number.isNaN(newLatency) || newLatency<this.minDelay || newLatency>this.maxDelay) {
      window.alert(`Wrong latency was set. New latency must ba a number from ${this.minDelay} to ${this.maxDelay}.`)
      event.target.value = this.latency.toString()
      return
    }
    this.latency = newLatency
  }
  setArrayLength: React.ChangeEventHandler<HTMLInputElement> = event => {
    const newArrayLength: number = parseInt(event.target.value)
    if (Number.isNaN(newArrayLength) || newArrayLength<this.minArrayLength || newArrayLength>this.maxArrayLength) {
      window.alert(`Wrong array length was set. New array length must be a number in range < ${this.minArrayLength}, ${this.maxArrayLength}>`)
      event.target.value = this.arrayLength.toString()
      return
    }
    this.arrayLength = newArrayLength;
    this.setState({
      numbers: this.arrayGenerator_(this.arrayLength, this.maxValue),
      succeed: false,
      inProcess: false
    })
  }
  setVal = (value: string) => {
    if(value==="latency") this.latency+=100
  }

  random:(React.MouseEventHandler<HTMLButtonElement>) = event => {
    let newArray: number[] = this.arrayGenerator_(this.arrayLength, this.maxValue)
    this.setState(
      {
        numbers: newArray,
        succeed: false,
        numbersSwapped: false,
        inProcess: false
      }
    )
  } 

  sort:React.MouseEventHandler<HTMLButtonElement> = event => {
    let responseState = this.sortFunc(this.state.numbers)
    this.setState(responseState)
  }

  run: React.MouseEventHandler<HTMLButtonElement> = event => {
    const {numbers, inProcess} = this.state
    this.setState({inProcess: !inProcess})

    if (inProcess) {
        window.clearInterval(this.timerID_)
        return
    }

    this.timerID_ = window.setInterval(() => {
        const response = this.sortFunc(numbers)

        if (response.numbersSwapped)
            this.setState({numbers: response.numbers, inProcess: true, succeed: response.succeed})

        this.setState({succeed: response.succeed})

        if (this.state.succeed) {
            this.setState({inProcess: false})
            window.clearInterval(this.timerID_)
        }
    }, this.latency)
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Graph numbers={this.state.numbers}/>
        <Management 
                  latency = {this.latency}
                  arrayLength = {this.arrayLength}
                  inProcess = {this.state.inProcess}
                  setLatency = {this.setSortingLatency} 
                  setArrayLength = {this.setArrayLength} 
                  run = {this.run}
                  random = {this.random}
                  sort = {this.sort}
        />
      </div>
    )
  };
}


