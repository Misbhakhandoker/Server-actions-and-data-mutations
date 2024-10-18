import { fetchListOfProducts } from "@/app/actions/page";





async function ServerPageExample() {
    const products = await fetchListOfProducts()
    console.log(products);
    
    return ( 
        <div>
        <h1>Server action example - server components</h1>
        <ul>
            {
                products && products.length > 0 ? products.map((item) => 
                (
                    <li key={item.id}>{item.title}</li>
                )) : <h2>No products fount</h2>
            }
        </ul>
        </div>
     );
}

export default ServerPageExample;