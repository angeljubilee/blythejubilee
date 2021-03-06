import React from 'react';
import _ from 'lodash';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import AddItemForm from './pages/add-stock';
import Home from './pages/home';
import StockItems from './pages/stock';
import Cart from './pages/cart';
import Item from './pages/item';
import Order from './pages/order';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNewItem = this.addNewItem.bind(this);
    this.addCartItem = this.addCartItem.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.resetCart = this.resetCart.bind(this);

    this.state = {
      route: parseRoute(window.location.hash),
      stock: {
        loading: true,
        error: false,
        items: []
      },
      cart: []
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
            ...this.state.stock,
            items: data,
            loading: false
          }
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          stock: {
            ...this.state.stock,
            error: true
          }
        });
      });
  }

  addNewItem(newItem) {
    const newItems = [...this.state.stock.items];
    newItems.unshift(newItem);

    this.setState({
      stock: {
        ...this.state.stock,
        items: newItems
      }
    });
  }

  addCartItem(newItem) {
    const newCart = [...this.state.cart];
    const matchingItem = newCart.findIndex(item => isMatchingItem(item, newItem));

    if (matchingItem !== -1) {
      newCart[matchingItem].qty++;
    } else {
      newCart.push(newItem);
    }
    this.setState({ cart: newCart });
  }

  removeCartItem(itemIndex) {
    const newCart = [...this.state.cart];
    newCart.splice(itemIndex, 1);
    this.setState({ cart: newCart });
  }

  resetCart() {
    this.setState({ cart: [] });
  }

  renderPage() {

    const { route } = this.state;

    if (route.path === '') {
      return (
        <Home stock={this.state.stock}/>
      );
    }
    if (route.path === 'stock') {
      return <StockItems stock={this.state.stock}/>;
    }
    if (route.path === 'addStock') {
      return <AddItemForm handleNewItem={this.addNewItem}/>;
    }
    if (route.path === 'cart') {
      return <Cart cart={this.state.cart}
                   removeItem={this.removeCartItem}
                   resetCart={this.resetCart}/>;
    }
    if (route.path === 'items') {
      const itemId = route.params.get('itemId');
      return <Item itemId={itemId} addToCart={this.addCartItem}/>;
    }
    if (route.path === 'order') {
      const orderId = route.params.get('orderId');
      return <Order orderId={orderId}/>;
    }
  }

  render() {
    return (
      <>
        <Navbar cartNum={this.state.cart.length}/>
        { this.renderPage() }
      </>
    );
  }
}

function isMatchingItem(item, newItem) {
  if (item.itemId !== newItem.itemId) {
    return false;
  }
  if (!_.isEqual(item.vars, newItem.vars)) {
    return false;
  }
  return true;
}
