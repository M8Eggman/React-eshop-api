import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard/ProductCard";
import "./Products.css";

export default function Products() {
  // toutes les catégories
  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  const [products, setProducts] = useState([]);
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
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
