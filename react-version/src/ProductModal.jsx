export default function ProductModal({product,onClose}) {
    function handleBackdropClick(e) {
        if( e.target === e.currentTarget) {
            onClose();
        }
    }
    
    return (
        <div id="modal" className="modal" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button id="modal-close" className="modal-close" onClick={onClose}>X</button>
                <img id="modal-img" src={`/${product.image}`} alt={product.name}></img>
                <h2 id="modal-name">{product.name}</h2>
                <p id="modal-price" className="price" >{product.price.toLocaleString("fa-IR")} تومان</p>
                <div id="modal-specs">
                <ModalSpecs product={product}></ModalSpecs>
                </div>
            </div>
        </div>
        

    )

}

function ModalSpecs({ product }) {
  return (
    <ul className="specs">
      {Object.entries(product.description).map(([key, value]) => (
        <li key={key}>
          <span>{key}</span>: <span>{value}</span>
        </li>
      ))}
    </ul>
  );
}