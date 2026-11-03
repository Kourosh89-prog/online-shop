import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({products,selectProduct,addToCart}){
    return (
        <ul className="product-grid">
        {products.map(product => (
            <li key={product.id}><ProductCard product={product} addToCart={addToCart} onClick={() => selectProduct(product.id)}/></li>
        ))}
        </ul>
    )
}