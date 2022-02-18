import React, {Component} from 'react'
import './Calculator.css'

// Components:
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0,
}

export default class Calculator extends Component {

  state = {...initialState} 

  clearMemory() {
    this.setState({...initialState})
  }

  setOperation (operation) {
    if (this.state.current === 0) {
      this.setState({current: 1, clearDisplay: true, operation: operation})
    } 
    else {
      const equals = operation === '='
      const curentOperation = this.state.operation

      const values = [...this.state.values]
      
      switch(curentOperation) {
        case '+':
          values[0] = parseFloat(values[0]) + parseFloat(values[1]);
        break;

        case '-':
          values[0] = parseFloat(values[0]) - parseFloat(values[1]);
        break;

        case '*':
          values[0] = parseFloat(values[0]) * parseFloat(values[1]);
        break;

        case '/':
          values[0] = parseFloat(values[0]) / parseFloat(values[1]);
        break;
      }
      values[1] = 0

      this.setState({
        values: values, 
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals
      })
    }
  }

  addDigit(n) {
    
    if(n === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({displayValue: displayValue, clearDisplay: false});

    if (n !== '.') {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({values: values})
    }
  }

  render() {
    const addDigit = (n) => this.addDigit(n)
    const setOperation = (op) => this.setOperation(op)
    return (
      <div className='calculator'>
        <Display value={this.state.displayValue}></Display>
        <Button label="AC" click={() => this.clearMemory()} triple ></Button>
        <Button label="/" click={setOperation} operation></Button>
        <Button label="7" click={addDigit}></Button>
        <Button label="8" click={addDigit}></Button>
        <Button label="9" click={addDigit}></Button>
        <Button label="*" click={setOperation} operation></Button>
        <Button label="4" click={addDigit}></Button>
        <Button label="5" click={addDigit}></Button>
        <Button label="6" click={addDigit}></Button>
        <Button label="-" click={setOperation} operation></Button>
        <Button label="1" click={addDigit}></Button>
        <Button label="2" click={addDigit}></Button>
        <Button label="3" click={addDigit}></Button>
        <Button label="+" click={setOperation} operation></Button>
        <Button label="0" click={addDigit} double></Button>
        <Button label="." click={addDigit}></Button>
        <Button label="=" click={setOperation} operation></Button>
      </div>
    )
  }
}