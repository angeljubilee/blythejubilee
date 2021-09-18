import React from 'react';
import parseRoute from './lib/parse-route';
import NavHeader from './components/navHeader';
import AddItemForm from './pages/addStock';
import Home from './pages/home';
import StockItems from './pages/stockItems';
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
        isLoading: true,
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

  addCartItem(item) {
    this.setState({ cart: [...this.state.cart, item] });
  }

  removeCartItem(itemId) {
    this.setState({
      cart: this.state.cart.filter(item => item.itemId !== itemId)
    });
  }

  resetCart() {
    this.setState({ cart: [] });
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
        <NavHeader cartNum={this.state.cart.length}/>
        { this.renderPage() }
      </>
    );
  }
}
