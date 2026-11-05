export default function OrderModal({order,onClose}){
  return (
        <div id="order-modal" className="modal">
            <div className="modal-content order-content">
                <div className="order-check">✅</div>
                <h2>سفارش شما ثبت شد</h2>
                <p id="order-id">شماره سفارش : {order.id}</p>
                <p id="order-total">جمع سفارش : {order.total.toLocaleString("fa-IR")} تومان</p>
                <button id="order-close" className="checkout-btn" onClick={onClose}>بستن</button>
            </div>
        </div>
    )
}