import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class EditSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateName: '',
      updateURL: '',
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    fetch(`http://localhost:3000/sites/${id}`)
      .then((res) => res.json())
      .then(site => {
        console.log(site);
        this.setState({ updateName: site.name });
        this.setState({ updateURL: site.url });
      })
      .catch(err => console.log(err));
  }
  handleUpdateNameInput(e) {
    this.setState({ updateName: e.target.value });
  }
  handleUpdateURLInput(e) {
    this.setState({ updateURL: e.target.value });
  }
  updateData() {
    if (
      this.state.updateName === '' ||
      this.state.updateURL === ''
    ) return;
    const siteInfo = {
      name: this.state.updateName,
      url: this.state.updateURL
    }
    const id = this.props.match.params.id;
    fetch(`http://localhost:3000/sites/${id}`, {
      method: 'put',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(siteInfo)
    })
      .then(res => res.json())
      .then((site) => {
        alert(`
        name: ${site.name},
        url: ${site.url}
        に更新しました
        `)
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <input value={this.state.updateName}
          onChange={this.handleUpdateNameInput.bind(this)}
          placeholder="Update Name" />
        <input value={this.state.updateURL}
          onChange={this.handleUpdateURLInput.bind(this)}
          placeholder="Update URL" />
        <button
          onClick={this.updateData.bind(this)}>Update</button>
        <hr />
      </div>
    )
  }

}
export default EditSite;