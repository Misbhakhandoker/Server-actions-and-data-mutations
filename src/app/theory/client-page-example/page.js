"use client";

import { fetchListOfProducts } from "@/app/actions/page";
import { useEffect, useState } from "react";

function ClientPageExample() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getListOfProducts() {
    setLoading(true);
    const data = await fetchListOfProducts();
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  }
 
  useEffect(() => {
    getListOfProducts();
  }, []);
  console.log(products);
  if(loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1>Client page server action example</h1>
      <ul>
        {products && products.length > 0
          ? products.map((item) => <li key={item.id}>{item.title}</li>)
          : null}
      </ul>
    </div>
  );
}

export default ClientPageExample;
