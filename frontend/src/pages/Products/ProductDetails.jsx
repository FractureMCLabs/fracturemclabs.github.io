import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice.js";
import Message from "../../components/Message.jsx";
import { FaBox, FaClock, FaPercent, FaShoppingCart, FaStar, FaStore, FaLock } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Loader from "../../components/Loader.jsx";
import Percentage from "../../components/Percentage.jsx";
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

const fallback = "/uploads/fallback.png";

const ProductDetails = () => {

    const {id: productId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const {userInfo} = useSelector(state => state.auth);

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId, rating, comment
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };

    const TBPLock = false; {/* <<< TBP logic goes here */}
    const cartDisabled = (product?.countInStock == 0 && !product.quantity == -1) || TBPLock;

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const addToCartHandler = () => {

        dispatch(addToCart({...product, qty}));
        navigate("/cart");
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <div className="bg-black" style={{
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
                    <br />
                    <div className="flex flex-wrap mt-[2rem] ml-[10rem]">
                        <div className="ml-[7rem]">
                            <Link to="/" className="text-white font-semibold hover:underline rounded-full bg-pink p-3">Go Back</Link>
                        </div>
                        <div className="flex flex-wrap relative items-between ml-[10rem] justify-center">
                            <div className="bg-black bg-opacity-30 rounded-lg shadow-lg backdrop-blur-[10px] p-4 align-center">
                                <div>
                                    <img 
                                        src={product.image || fallback} 
                                        alt={product.name} 
                                        className="w-full xl:w-[1000px] lg:w-[900] md:w-[600] sm:w-[400px] object-fit rounded pb-2"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallback;
                                        }}
                                    />
                                    <HeartIcon product={product} />
                                </div>
                                <div className="flex flex-col justify-between flex-wrap">
                                    <div className="flex flex-wrap">
                                        <div className="w-[45%] max-w-[30rem] pr-4">
                                        <h2 className="text-2xl font-semibold text-white">{product.name}</h2>
                                        <p className="my-4 w-[100%] text-white p-4 rounded-lg bg-black backdrop-blur-[10px] bg-opacity-30">{product.description}</p>
                                        <p className="text-5xl mt-4 mb-2 font-extrabold text-white">
                                            {!product.price > 0.02 ? Math.round(product.price * 1.21 * 100) / 100 : Math.round(product.price * 1.21 * 100) / 100 - 0.01} €
                                        </p>
                                        <p className="font-bold text-lightGray">
                                            {Math.round(((!product.price > 0.02 ? Math.round(product.price * 1.21 * 100) / 100 : Math.round(product.price * 1.21 * 100) / 100 -0.01) / 121 * 100) * 100) / 100} € without VAT
                                        </p>
                                        <p className="mb-4 text-md text-yellow">{"NOTE: Prices on this page serve as a design element, price of this product will be free until further notice"} </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="one">
                                                <h1 className="flex items-center mb-6 p-2">
                                                    <FaStore className="mr-2 text-white" title="Brand"/>
                                                    {product.brand === "labs" ? (
                                                        <>
                                                            <p className="text-white">{capitalize(product.brand)}</p>
                                                            <RiVerifiedBadgeFill className="text-pink ml-0.5 text-ml" title="This seller has been verified" />
                                                        </>
                                                    ) : capitalize(product.brand)}
                                                </h1>
                                                <h1 className="flex items-center mb-6 p-2">
                                                    <FaClock className="mr-2 text-white" title="Created At"/>
                                                    {moment(product.createdAt).fromNow()}
                                                </h1>
                                                <h1 className="flex items-center mb-6 p-2">
                                                    <FaStar className="mr-2 text-white" title="Reviews"/>
                                                    {product.numReviews}
                                                </h1>
                                            </div>
                                            <div className="two">
                                            <Ratings 
                                                value={product.rating}
                                                text={`${product.numReviews} reviews`}
                                                isComment={true}
                                            />
                                            <h1 className="flex items-center mb-6 p-2">
                                                <FaShoppingCart className="mr-2" /> {product.quantity === -1 ? "Unlimited" : product.quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 p-2">
                                                <FaBox className="mr-2" /> {product.quantity === -1 ? "Unlimited" : product.countInStock}
                                            </h1>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="grid grid-cols-1 w-[45%]">
                                        <div className="one flex justify-end w-full">
                                            <Ratings 
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                            isComment={true}
                                            />
                                        </div>
                                        <div className="two justify-center">

                                            <Ratings 
                                                value={product.rating}
                                                text={`${product.numReviews} reviews`}
                                            />
                                            <Percentage isComment={false}/>
                                            <h1 className="flex items-center mb-6 p-2">
                                                <FaShoppingCart className="mr-2" /> {product.quantity === -1 ? "Unlimited" : product.quantity}
                                            </h1>
                                            <h1 className="flex items-center mb-6 p-2">
                                                <FaBox className="mr-2" /> {product.quantity === -1 ? "Unlimited" : product.countInStock}
                                            </h1>
                                            <div className="flex justify-between flex-wrap">
                                        {product.countInStock > 0 && (
                                            <div>
                                                <select
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                    className="p-2 w-[6rem] rounded-lg text-black"
                                                >
                                                    {[...Array(product.quantity === -1 ? 10 : product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                    <div className="btn-container">
                                        <button
                                            onClick={cartDisabled ? null : addToCartHandler}
                                            id="addToCart"
                                            disabled={cartDisabled}
                                            className={`flex py-2 px-4 rounded-lg mt-4 md:mt-0 ${cartDisabled ? 'bg-gray cursor-not-allowed text-lightGray' : 'bg-pink text-white'} items-center`}
                                            title={`${(product?.countInStock == 0 && !product.quantity == -1) ? "You cannot put to cart right now because there aren't any items in stock" : TBPLock ? "You cannot put to cart right now because you haven't tried the free version yet" : null}`}
                                        >
                                            Add to Cart
                                            {TBPLock ? <FaLock className="text-lightGray ml-2 cursor-pointer" /> : null}
                                        </button>
                                    </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="mt-[5rem] ml-[10rem] container flex flex-wrap items-start justify-between">
                            <ProductTabs 
                                loadingProductReview={loadingProductReview}
                                userInfo={userInfo}
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetails;