import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddSite extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      siteName: '',
      siteURL: '',
    }
  }
  handleNewNameInput(e) {
    this.setState({ siteName: e.target.value });
  }

  handleNewURLInput(e) {
    this.setState({ siteURL: e.target.value });
  }
  createData() {
    if (this.state.siteName === '' || this.state.siteURL === '') return;
    const siteInfo = {
      name: this.state.siteName,
      url: this.state.siteURL
    }
    fetch(`http://localhost:3000/sites`, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(siteInfo)
    })
      .then(res => res.json())
      .then(() => {
        this.setState({ siteName: '' });
        this.setState({ siteURL: '' });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <br/>
        <input value={this.state.siteName}
          onChange={this.handleNewNameInput.bind(this)}
          placeholder="Site Name" />
        <input value={this.state.siteURL}
          onChange={this.handleNewURLInput.bind(this)}
          placeholder="Site URL" />
        <button
          onClick={this.createData.bind(this)}>Create</button>
      </div>
    )
  }
}
export default AddSite;