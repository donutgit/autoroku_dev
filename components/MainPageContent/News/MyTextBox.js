// import React from 'react';

// const TestComponent = (props) => {
//   console.log("my text box", props);
//   return (
//     <div>
//       <h1 style={{color: props.color}}>Kappa</h1>
//     </div>
//   );
// }

// export default TestComponent;
import React, { Component } from 'react';

class TestComponent extends Component {

  getInput = el => {
    console.log(el);
    console.log(this);
    this.input = el;
  };
  trigger = () => {
    console.log(this)
  }
  // componentDidMount() {
  //   this.setState({color: "black"})
  // }
  render() {
    console.log(this)
    return (
      <input ref={(input) => this.inputValue = input} onChange={this.trigger} />
    );
  }
}

export default TestComponent;
