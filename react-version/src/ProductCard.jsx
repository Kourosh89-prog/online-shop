
export default function ProductCard({product,onClick,addToCart}) {
    return (
    <div className="product-card" data-id={product.id} onClick={onClick}>
    <img src={`/${product.image}`} alt={product.name}></img>
    <h3>{product.name}</h3>
    <p className="price">{product.price.toLocaleString("fa-IR")} تومان</p>
    <p className="supplier">{product.supplier}</p>
    <button className="add-btn" onClick={(e) =>{
        e.stopPropagation();
        addToCart(product);}}> افزودن به سبد خرید</button>
    </div>
    )
}