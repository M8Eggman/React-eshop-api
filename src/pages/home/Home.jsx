import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ProductCard from "../../components/productCard/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch(console.error);
  }, []);

  return (
    <>
      {products.map((item) => (
        <ProductCard product={item} />
      ))}
    </>
  );
}
