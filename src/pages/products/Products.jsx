import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard/ProductCard";
import "./Products.css";

export default function Products() {
  // toutes les catégories
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  const [products, setProducts] = useState(null);
  const [selectedCat, setSelectedCat] = useState("all");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredProducts = selectedCat === "all" ? products : products.filter((p) => p.category === selectedCat);

  return (
    <section className="products">
      <div className="products-div">
        <h1>Liste de tous les produits</h1>
        <div className="products-filter">
          <label>Catégorie : </label>
          <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
            <option value="all">Toutes</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="products-list">
          {products
            ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            : Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="card" aria-hidden="true" style={{ width: "220px" }}>
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
