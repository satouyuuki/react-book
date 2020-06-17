import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      siteName: '',
      siteURL: '',
      sites: [],
      updateId: '',
      updateName: '',
      updateURL: '',
      deleteId: ''
    }
  }

  componentDidMount() {
    this.readData();
  }

  readData() {
    fetch('http://localhost:3000/sites')
      .then(res => res.json())
      .then(sites => this.setState({
        sites: sites
      }))
      .catch(err => console.log(err));
  }

  handleNewNameInput(e) {
    this.setState({ siteName: e.target.value });
  }

  handleNewURLInput(e) {
    this.setState({ siteURL: e.target.value });
  }
  handleUpdateIdInput(e) {
    this.setState({ updateId: e.target.value });
  }
  handleUpdateNameInput(e) {
    this.setState({ updateName: e.target.value });
  }
  handleUpdateURLInput(e) {
    this.setState({ updateURL: e.target.value });
  }
  handleDeleteIdInput(e) {
    this.setState({ deleteId: e.target.value });
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
      .then((site) => {
        const sites = this.state.sites;
        sites.push(site)
        this.setState({ sites: sites });
        this.setState({ siteName: '' });
        this.setState({ siteURL: '' });
      })
      .catch(err => console.log(err));
  }

  updateData() {
    if (
      this.state.updateName === '' ||
      this.state.updateURL === '' ||
      this.state.updateId === ''
    ) return;
    const siteInfo = {
      name: this.state.updateName,
      url: this.state.updateURL
    }
    fetch(`http://localhost:3000/sites/${this.state.updateId}`, {
      method: 'put',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(siteInfo)
    })
      .then(res => res.json())
      .then((site) => {
        const sites = this.state.sites;
        const index = sites.findIndex(item => item.id === site.id);
        sites[index] = site;
        this.setState({ sites: sites });
        this.setState({ updateId: '' });
        this.setState({ updateName: '' });
        this.setState({ updateURL: '' });
      
    })
  }
  deleteData() {
    if (
      this.state.deleteId === ''
    ) return;
    const sites = this.state.sites;
    fetch(`http://localhost:3000/sites/${this.state.deleteId}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .then((site) => {
        const sites = this.state.sites;
        const index = sites.findIndex(item => item.id === site.id);
        sites.splice(index, 1);
        this.setState({ sites: sites });
        this.setState({ deleteId: '' });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>Create data</h3>
        <div>
          <input value={this.state.siteName}
            onChange={this.handleNewNameInput.bind(this)}
            placeholder="Site Name"/>
        </div>
        <div>
          <input value={this.state.siteURL}
            onChange={this.handleNewURLInput.bind(this)}
            placeholder="Site URL"/>
        </div>
        <button
          onClick={this.createData.bind(this)}>Create</button>
        <hr />
        <h3>Read data</h3>
        <ul>
          {
            this.state.sites.map((site) => {
              return (
                <li key={site.id}>
                  {site.id} {site.name} {site.url}
                </li>
              )
            })
          }
        </ul>
        <hr />
        <h3>Update data</h3>
        <div>
          <input value={this.state.updateId}
            onChange={this.handleUpdateIdInput.bind(this)}
            placeholder="ID" />
        </div>
        <div>
          <input value={this.state.updateName}
            onChange={this.handleUpdateNameInput.bind(this)}
            placeholder="Update Name" />
        </div>
        <div>
          <input value={this.state.updateURL}
            onChange={this.handleUpdateURLInput.bind(this)}
            placeholder="Update URL" />
        </div>
        <button
          onClick={this.updateData.bind(this)}>Update</button>
        <hr />
        
        <h3>Delete data</h3>
        <div>
          <input value={this.state.deleteId}
            onChange={this.handleDeleteIdInput.bind(this)}
            placeholder="ID" />
        </div>
        <button
          onClick={this.deleteData.bind(this)}>Delete</button>
        <hr />

      </div>
    )
  }
}

export default App;
