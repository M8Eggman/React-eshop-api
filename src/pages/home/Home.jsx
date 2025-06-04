import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [bestProducts, setBestProducts] = useState(null);

  // import de l'api
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch(console.error);
  }, []);
  // sélectionne les 4 premiers produits avec 4 étoiles ou plus
  useEffect(() => {
    if (!products) {
      return;
    }
    setBestProducts(products.filter((product) => product.rating.rate >= 4).slice(0, 4));
  }, [products]);
  // carrousel automatique sur les images des meilleurs produits
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % bestProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bestProducts]);

  return (
    <section className="home">
      <div className="homeDiv">
        <div className="home-carousel">
          {bestProducts ? <img src={bestProducts[carouselIndex].image} alt="" /> : <></>}
          <div onClick={() => navigate(`/products/${bestProducts[carouselIndex].id}`)}>
            <p>Aller voir le produit</p>
          </div>
        </div>
        <h1>Nos produits les mieux notés</h1>
        <div className="home-products">{bestProducts ? bestProducts.map((product) => <ProductCard key={product.id} product={product} />) : <></>}</div>
      </div>
    </section>
  );
}
