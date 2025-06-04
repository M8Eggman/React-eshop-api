import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) {
    return <></>;
  }
  return (
    <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <h2>{product.title}</h2>
      <p>{product.price} €</p>
      <div className="product-rating">
        <span>{product.rating.rate}</span>
        <FontAwesomeIcon icon={faStar} />
        <span>/ {product.rating.count} avis</span>
      </div>
    </div>
  );
}
