import React, {Component} from 'react';
import AddSite from './components/AddSite';
import EditSite from './components/EditSite';
import SiteList from './components/SiteList';
import { Route } from 'react-router-dom';
class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={SiteList} />
        <Route path="/sites/add" component={AddSite} />
        <Route path="/sites/edit/:id" component={EditSite} />
      </div>
    )
  }
}

export default App;
