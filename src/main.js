import React from 'react';
import ReactDOM from 'react-dom';

import { SubComponent } from './sub-component';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 0
    };
  }

  handleClick() {
    console.log('クリックされました');
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <SubComponent name="My Counter for Babel"
          value={this.state.count}
          onClick={() => this.handleClick.bind(this)}
        />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));