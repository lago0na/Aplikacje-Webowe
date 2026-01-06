interface ProductProps {
    name: string;
}

const Product =({name}:ProductProps) =>{
    return(
        <div>
            {name}
        </div>
    )
};

export default Product;