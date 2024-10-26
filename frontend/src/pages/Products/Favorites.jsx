import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice.js";
import Product from "./Product.jsx";

const Favorites = () => {
  
    const favorites = useSelector(selectFavoriteProduct);
    console.log(favorites)

    return (
    <div className="bg-opacity-0 z-1 pt-[2vh]">
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
                    }} 
        />
        <h1 className="text-lg font-bold ml-[3rem] mt-[3rem] text-center">
            FAVORITE PRODUCTS
        </h1>

        <div className="flex flex-wrap">
            {favorites.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default Favorites