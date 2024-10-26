import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const fallback = "/uploads/fallback.png";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
        <div className="relative">
            <img 
              src={product.image || fallback} 
              alt={product.name} 
              className="w-[30rem] rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallback;
              }}
            />
            <HeartIcon product={product} />
        </div>
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div className="text-lg text-white">{product.name}</div>
              <span className="bg-pink text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">{product.price} €</span>
            </h2>
          </Link>
        </div>
    </div>
  )
}

export default Product