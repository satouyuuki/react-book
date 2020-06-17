import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
class SiteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
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

  handleUpdateRouter(id) {
    this.props.history.push(`/sites/edit/${id}`);
  }
  handleCreateRouter() {
    this.props.history.push('/sites/add');
  }

  deleteData(id) {
    fetch(`http://localhost:3000/sites/${id}`, {
      method: 'delete'
    })
      .then(res => res.json())
      .then((site) => {
        const sites = this.state.sites;
        const index = sites.findIndex(item => item.id === site.id);
        sites.splice(index, 1);
        this.setState({ sites: sites });
      })
      .catch(err => console.log(err));
  }


  render() {
    console.log(this.props);
    return (
      <div>
        <button
          onClick={this.handleCreateRouter.bind(this)}>Add</button>
        <ul>
          {
            this.state.sites.map((site) => {
              return (
                <li key={site.id}>
                  {site.id} {site.name} {site.url}
                  <button 
                    onClick={this.handleUpdateRouter.bind(this, site.id)}>EDIT</button>
                  <button 
                    onClick={this.deleteData.bind(this, site.id)}>DEL</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

}
export default withRouter(SiteList);