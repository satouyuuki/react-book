import React from 'react';

export class SubComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <div>{this.props.value}</div>
        <button
          onClick={this.props.onClick()}>Add + 1
        </button>
      </div>
    )
  }
}