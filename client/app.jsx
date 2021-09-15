import React from 'react';
import parseRoute from './lib/parse-route';
import NavHeader from './components/navHeader';
import AddItemForm from './pages/addStock';
import Home from './pages/home';
import StockItems from './pages/stockItems';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNewItem = this.addNewItem.bind(this);

    this.state = {
      route: parseRoute(window.location.hash),
      stock: {
        isLoading: true,
        items: []
      }
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });

    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        this.setState({
          stock: {
            items: data,
            isLoading: false
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addNewItem(newItem) {
    this.setState({
      stock: {
        items: [...this.state.stock.items, newItem]
      }
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home stock={this.state.stock}/>;
    }
    if (route.path === 'stock') {
      return <StockItems stock={this.state.stock}/>;
    }
    if (route.path === 'addStock') {
      return <AddItemForm handleNewItem={this.addNewItem}/>;
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
