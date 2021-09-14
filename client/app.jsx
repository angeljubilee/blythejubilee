import React from 'react';
import { parseRoute } from './lib';
import NavHeader from './components/navHeader';
import AddItemForm from './pages/addStock';
import Home from './pages/home';
import ShopItems from './pages/shopItems';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'stock') {
      return <ShopItems />;
    }
    if (route.path === 'addStock') {
      return <AddItemForm />;
    }
  }

  render() {
    return (
      <>
        <NavHeader/>
        { this.renderPage() }
      </>
    );
  }
}
