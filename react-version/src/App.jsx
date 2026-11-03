import ProductGrid from "./ProductGrid.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductModal from "./ProductModal.jsx";
import CartView from "./CartView.jsx";
import {useState} from "react";
import {products} from "./data.js";
import "./style.css";

export default function App(){
  const [selectedProduct,setSelectedProduct] = useState(null);
  const [cart,setCart ] = useState([]);
  const [isCartOpen,setIsCartOpen] = useState(false);
  function handleSelectProduct(productId) {
    const product = products.find(p => p.id === Number(productId));
    setSelectedProduct(product);
  }
  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => product.id === item.id)
      if (existing) {
       return prev.map(item => item.id === product.id
        ? {...item, quantity: item.quantity + 1}
        : item
        );
      }
      return [...prev, {id: product.id, quantity: 1}];
    });
  }
  function increaseQuantity(id){
    setCart(prev => prev.map(item =>
      item.id === id ? {...item ,quantity:item.quantity+1} :
      item
    ));
  }

  function decreaseQuantity(id) {
    setCart(prev => prev.map(item => 
      item.id === id ? {...item,quantity:item.quantity-1} :
      item
    ).filter(item=>item.quantity>0)
  );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }


  return (
  <>
  <header>
        <h1>فروشگاه من</h1>
        <button id="cart-btn" onClick={() =>setIsCartOpen(true)}> سبد خرید (<span id="cart-count">{cart.reduce((sum, item)=> sum+ item.quantity,0)}</span>)</button>
  </header>
  <ProductGrid products={products} selectProduct={handleSelectProduct} addToCart={addToCart} />
  {selectedProduct ? <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}></ProductModal> : null}
  {isCartOpen && (
    <CartView 
    cart={cart}
    onClose={() => setIsCartOpen(false)}
    onIncrease={increaseQuantity}
    onDecrease={decreaseQuantity}
    onRemove={removeItem}/>
  )}
  </>
  )
}

