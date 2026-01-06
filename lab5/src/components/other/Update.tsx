import {useState} from "react";

const Update = () => {
    const [product, setProduct] = useState({name: "Pomidor", price: 50});

    const changePrice = () => {
        setProduct(prev => ({
            ...prev,
            price: 100
        }));
    };

    return (
        <div>
            <div>
                {product.name} kosztuje {product.price}
            </div>
            <button onClick={changePrice}>Zmień cenę</button>
        </div>
    );
}
export default Update;