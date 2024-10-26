import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import cartSlice, { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const fallback = "/uploads/fallback.png";

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="bg-opacity-0 z-1 pt-[2vh]">
      <>
        <div className="bg-black pt-[2vh]" style={{
          background: "url(https://media.istockphoto.com/id/1038727610/cs/fotografie/tekut%C3%A9-tvary-abstraktn%C3%AD-holografick%C3%A9-3d-vlnit%C3%A9-pozad%C3%AD.webp?s=2048x2048&w=is&k=20&c=Z3sNKJsAlcJ9G3ac6RuXCdfZjY405ff7DGHFZ5Otifs=)",
          backgroundSize: "cover", // Ensures the image covers the entire screen
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundAttachment: "fixed", // Keeps the background in place while scrolling
          position: "fixed", // Ensures the background stays in place as the page scrolls
          top: 0,
          left: 0,
          width: "100vw", // Sets the width to the full viewport width
          height: "100vh", // Sets the height to the full viewport height
          zIndex: -1, // Places the background behind other elements
        }} />
        <div className="container flex justify-around items-start flex wrap mx-auto mt-8">
          {cartItems.length == 0 ? (
            <div className="text-white">
              Your cart is empty! {" "}
              <Link to="/shop" className="text-pink hover:underline font-bold">Go To Shop</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col w-[75%] mb-[1rem] bg-black bg-opacity-30 rounded-lg shadow-lg backdrop-blur-[10px] p-4 align-center">
                <h1 className="text-2xl font-semibold mb-4 text-white">Shopping Cart</h1>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center mb-[1rem] p-4 rounded-lg bg-black backdrop-blur-[10px] bg-opacity-30">
                    <div className="w-[9rem] h-[5rem]">
                      <img 
                        src={item.image || fallback } 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded" 
                      />
                    </div>

                    <div className="flex-1 ml-4">
                      <Link to={`/product/${item._id}`} className="text-white font-bold hover:underline">
                        {item.name}
                      </Link>
                      <div className="mt-2 text-white">{capitalize(item.brand)}</div>
                      <div className="mt-2 text-white font-bold">{item.price} €</div>
                    </div>

                    <div>
                      <select className="w-full p-1 border rounded text-black" value={item.qty} onChange={e => addToCartHandler(item, Number(e.target.value))}>
                        {[...Array(item.quantity >= 0 ? item.countInStock : 10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <button className="text-pink mr-[2rem]" onClick={() => removeFromCartHandler(item._id)}>
                        <FaTrash className="ml-[2rem]" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-8 w-[40rem]">
                  <div className="p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-white">
                      Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}items)
                    </h2>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </div>
    
  )
}

export default Cart