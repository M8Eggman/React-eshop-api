import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [products, setProducts] = useState(null);
  const [bestProducts, setBestProducts] = useState(null);

  // import de l'api
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
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
          {bestProducts ? (
            <img src={bestProducts[carouselIndex].image} alt="" />
          ) : (
            <img src="https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png" alt="" />
          )}
          <div onClick={() => navigate(`/products/${bestProducts[carouselIndex].id}`)}>
            <p>Aller voir le produit</p>
          </div>
        </div>
        <h1>Nos produits les mieux notés</h1>
        <div className="home-products">
          {bestProducts
            ? bestProducts.map((product) => <ProductCard key={product.id} product={product} />)
            : Array.from({ length: 4 }).map((item) => (
                <div className="card" aria-hidden="true" style={{ width: "220px" }}>
                  <img src="https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png" alt="" />{" "}
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6" />
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-6" />
                      <span className="placeholder col-8" />
                    </p>
                    <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
