import {Link, useParams} from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {

    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({keyword});

  return (
    <div className="bg-opacity-0 z-1 pt-[2vh]" >
        {!keyword ? <Header /> : null}
        {isLoading ? (<Loader />) : isError ? (<Message variant="danger">
            {isError?.data.message || isError.error}
        </Message>) : (
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
                <div className="flex justify-between items-center">
                    <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                        Special Products
                    </h1>
                    <Link to="/shop" className="bg-pink font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
                        Shop
                    </Link>
                </div>
                <div>
                    <div className="flex justify-center flex-wrap mt-[2rem]">
                        {data.products.map((product) => (
                            <div key={product._id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )}
    </div>
  );
};

export default Home;