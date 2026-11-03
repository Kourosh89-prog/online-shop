import {products} from "./data.js";

export default function CartView({cart,onClose,onIncrease,onDecrease,onRemove}){
    function handleBackdropClick(e){
        if (e.target===e.currentTarget) onClose();
    }
        if(cart.length===0){
            return(
                <div className="cart-view" onClick={handleBackdropClick}>
                <div className="cart-content">
                    <button id="cart-close" className="modal-close" onClick={onClose}>X</button>
                <h4 className="cart-empty">سبد خرید خالی است</h4>
                </div>
                </div>
            )
        }
        const total= cart.reduce((sum,item)=>{
            const product = products.find(p=> p.id ===item.id);
            return sum + product.price * item.quantity;
        },0);
            
            return(
                <div id="cart-view" className="cart-view" onClick={handleBackdropClick}>
                    <div className="cart-content">
                        <button id="cart-close" className="modal-close" onClick={onClose}>X</button>
                        <h2>سبد حرید</h2>
                        <div id="cart-items">
                {cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return (
              <div className="cart-row" key={item.id}>
                <img src={`/${product.image}`} alt={product.name} />
                <div className="cart-row-info">
                  <h4>{product.name}</h4>
                  <p className="unit-price">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                </div>
                <div className="cart-row-controls">
                  <button className="increment-quantity" onClick={() => onIncrease(item.id)}>+</button>
                  <span className="qty">{item.quantity}</span>
                  <button className="decrement-quantity" onClick={() => onDecrease(item.id)}>−</button>
                </div>
                <div className="cart-row-total">
                  {(product.price * item.quantity).toLocaleString("fa-IR")}
                </div>
                <button className="delete-item" onClick={() => onRemove(item.id)}>X</button>
              </div>
            );
          })}
        </div>

        <div id="cart-total">
          جمع کل: {total.toLocaleString("fa-IR")} تومان
        </div>
      </div>
    </div>
  );
}
                        
                            
                            
                                              

    
