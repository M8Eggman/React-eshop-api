import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProduct(response.data.find((item) => item.id === parseInt(id)));
      })
      .catch((error) => console.error(error));
  }, [id]);

  return product ? (
    <section className="details">
      <button className="details-back-btn" onClick={() => navigate("/products")}>
        &larr; Retour
      </button>
      <div className="details-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="details-info">
        <h1>{product.title}</h1>
        <p className="details-price">{product.price} €</p>
        <p className="details-category">{product.category}</p>
        <p className="details-description">{product.description}</p>
        <div className="details-rating">
          Note : {product.rating.rate} / 5 ({product.rating.count} avis)
        </div>
      </div>
    </section>
  ) : (
    <div className="details-loading">Chargement...</div>
  );
}
