import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Loader from "../../components/Loader";

const fallback = "/uploads/fallback.png";

const SmallProduct = ({ product }) => {
    return (
            <div className="relative w-[20rem] ml-[2rem] bg-black bg-opacity-30 p-4 rounded-lg shadow-lg backdrop-blur-[10px] m-4">
                <img
                    src={product.image || fallback}
                    alt={product.name}
                    className="max-h-[270px] w-full object-fit rounded pb-2"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallback;
                      }}
                /> 
                <HeartIcon product={product} />
                <div className="p-54">
                    <Link to={`/product/${product._id}`}>
                        <h2 className="flex justify-between items-center text-white">
                            <div>{product.name}</div>
                            <span className="bg-pink text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                                {product.price} €
                            </span>
                        </h2>
                    </Link>
                </div>
            </div>
    );
};

export default SmallProduct;