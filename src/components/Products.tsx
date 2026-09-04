import { useEffect, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}


const Products = () => {
    const [productList, setProductList] = useState<Product[]>([])
    const [loading, setLoaging] = useState<boolean>(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products")
                const data: Product[] = await response.json();
                setProductList(data);
            } catch (error) {
                console.error("Error ao buscar produtos:", error)
            } finally {
                setLoaging(false)
            }

        };

        fetchProducts();

    }, [])

    if (loading) {
        return <p>Carregando produtos...</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">

            {productList.map((product) => (
                <div key={product.id} className="bg-[#e7ebef] border border-gray-200 rounded-lg shadow-sm hover:shadow-lg p-4">
                    <h1 className="text-gray-900 font-semibold">{product.title}</h1>
                    <p className="text-green-600 font-bold">${product.price}</p>
                    <p>Categoria: {product.category}</p>
                    <img src={product.image}alt={product.title} className="w-full object-contain h-40 sm:h-48 md:h-56" />
                    <p className="text-gray-500 text-sm">{product.description}</p>
                    <p className="text-purple-500 text-sm font-semibold">{product.rating.rate}</p>
                    <p className="text-purple-500 text-sm font-semibold">⭐{product.rating.count} avaliações</p>
                </div>
            ))}


        </div>
    )

}

export default Products;






