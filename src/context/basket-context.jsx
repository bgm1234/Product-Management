import React, { useMemo, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";

const initinalData = {
    products: []
}
const BasketContext = React.createContext(initinalData);

export const BasketContextProvider = ({ children }) => {
    const [basketContents, setBasketContents] = useState(initinalData);
    const [products, setProducts] = useState([]);

    const loadProducts = useCallback(() => {
        axios.get("http://localhost:1337/api/products").then((response) => {
            setProducts(response.data.data);
        });
    }, []);

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    console.log(products);
    const basketCount = useMemo(() => basketContents.products.reduce((prev, curr) => prev + curr.count, 0), [basketContents]);

    console.log(basketContents);

    const completeOrder = useCallback(() => {

        basketContents.products.forEach((basketProduct) => {
            const productIndex = products.findIndex((product) => product.id === basketProduct.id);
            console.log(basketProduct);
            if (productIndex !== -1) {
                const newStock= products[productIndex].attributes.stock-basketProduct.count;
                console.log(newStock);

                axios.put("http://localhost:1337/api/products/" + products[productIndex].id , {
                   data: {
                    stock :newStock,
                   }
                }
                 )
                    .then((response) => {
                        console.log("Ürün güncellendi:", response.data);
                    })
                    .catch((error) => {
                        console.error("Ürün güncelleme hatası:", error);
                    });
            }
        });
        setBasketContents(initinalData);
    }, [basketContents, products])

    const insertToCart = useCallback((selectedProduct) => {
        setBasketContents(prev => {
            const control = prev.products.find(u => u.id === selectedProduct.id)
            if (control) {
                const updatedProducts = prev.products.map((product) =>
                    product.id === selectedProduct.id
                        ? { ...product, count: product.count + 1 }
                        : product
                );
                return {
                    ...prev,
                    products: updatedProducts,
                };
            } else {
                return {
                    ...prev,
                    products: [...prev.products, selectedProduct],
                }
            }

        })
    }, []);

    const removeFromBasket = useCallback((deleteProduct) => {
        setBasketContents(prev => {
            const updatedProducts = prev.products.filter(u => u.id !== deleteProduct.id)
            return {
                ...prev,
                products: updatedProducts,
            }
        })
    }, [])

    const increaseProductCount = useCallback((selectedProduct) => {
        setBasketContents((prev) => {
            const updatedProduct = prev.products.map((product) =>
                product.id === selectedProduct.id
                    ? { ...product, count: product.count + 1 }
                    : product
            );
            return {
                ...prev,
                products: updatedProduct
            }
        })
    }, []);

    const decreaseProductCount = useCallback((selectedProduct) => {
        if (selectedProduct.count === 1) {
            return;
        } else {
            setBasketContents((prev) => {
                const updatedProduct = prev.products.map((product) =>
                    product.id === selectedProduct.id
                        ? { ...product, count: product.count - 1 }
                        : product
                );
                return {
                    ...prev,
                    products: updatedProduct
                }
            })
        }
    }, [])

    const value = useMemo(() => ({
        products: basketContents.products,
        insertToCart,
        basketCount,
        removeFromBasket,
        increaseProductCount,
        decreaseProductCount,
        completeOrder,
    }), [
        basketContents, insertToCart, basketCount, completeOrder,
        removeFromBasket, increaseProductCount, decreaseProductCount
    ])

    return (
        <BasketContext.Provider value={value}>
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = () => useContext(BasketContext);