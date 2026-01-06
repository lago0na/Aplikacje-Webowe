import Product from "./Product.tsx";

const Cart = () => {
    const Products = ["jabłko", "gruszka", "kiwi", "jagoda", "banan"];
    return (
        <div>
            {Products.map((item) => (
                <Product key={item} name={item}/>
            ))}
        </div>
    )
};
export default Cart;