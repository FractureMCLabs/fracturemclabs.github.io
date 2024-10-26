import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
    FaPercent
} from "react-icons/fa";

// SVG color array based on the color gradient
const svgColors = [
    "#5A0900", "#620B02", "#6B0E03", "#731005", "#7B1207", "#831509", "#8C170A", "#94190C",
    "#9C1B0E", "#A41E0F", "#AD2011", "#B52213", "#BD2514", "#C52716", "#CE2918", "#D62C1A",
    "#DE2E1B", "#E6301D", "#EF321F", "#F73520", "#FF3722", "#FF3B22", "#FF3F22", "#FF4322",
    "#FF4722", "#FF4B22", "#FF4F22", "#FF5322", "#FF5722", "#FF5B22", "#FF5F22", "#FF6222",
    "#FF6622", "#FF6A22", "#FF6E22", "#FF7222", "#FF7622", "#FF7A22", "#FF7E22", "#FF8222",
    "#FF8622", "#FF8A20", "#FF8D1F", "#FF911D", "#FF941B", "#FF981A", "#FF9C18", "#FF9F16",
    "#FFA314", "#FFA613", "#FFAA11", "#FFAE0F", "#FFB10E", "#FFB50C", "#FFB80A", "#FFBC09",
    "#FFC007", "#FFC305", "#FFC703", "#FFCA02", "#FFCE00", "#F8CE01", "#F1CE02", "#EACE03",
    "#E3CE03", "#DCCE04", "#D5CE05", "#CECE06", "#C7CE07", "#C0CE08", "#B9CF09", "#B2CF09",
    "#ABCF0A", "#A4CF0B", "#9DCF0C", "#96CF0D", "#8FCF0E", "#88CF0E", "#81CF0F", "#7ACF10",
    "#73CF11", "#6DCE16", "#68CD1C", "#62CB21", "#5CCA26", "#56C92B", "#51C831", "#4BC636",
    "#45C53B", "#3FC440", "#3AC346", "#34C14B", "#2EC050", "#28BF55", "#22BE5B", "#1DBC60",
    "#17BB65", "#11BA6A", "#0CB970", "#06B775", "#00B67A"
];

const fallback = "/uploads/fallback.png";

// Function to get color based on the rating percentage
const getColorFromSVG = (rating) => {
    const percentage = Math.round(rating); // Converts 0-5 rating to 0-100 scale
    return svgColors[percentage] || svgColors[svgColors.length]; // Default to last color if out of range
}

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        prevArrow: <button type="button" className="slick-prev bg-pink">Previous</button>
    };

    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <Slider
                    {...settings}
                    className="xl:w-[50rem] lg:w-[50rem] md:w-[46rem] sm:w-[40rem] sm:block"
                >
                    {products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                        <div key={_id}>
                            <img
                                src={image || fallback}
                                alt={name}
                                className="max-h-full w-full object-cover rounded"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = fallback;
                                  }}
                            />
                            <div className="flex justify-between w-[20rem]">
                                <div className="one">
                                    <h2>{name}</h2>
                                    <p>{price} €</p><br /><br />
                                    <p className="w-[25rem]">{description.substring(0, 170)}...</p>
                                </div>
                                <div className="flex justify-between w-[20rem]">
                                    <div className="one">
                                        <h1 className="flex items-center mb-6 w-[8rem]">
                                            <FaStore className="mr-2 text-white" />Brand: {brand}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaClock className="mr-2 text-white" />Added: {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[8rem]">
                                            <FaStar className="mr-2 text-white" />Reviews: {numReviews}
                                        </h1>
                                    </div>
                                    <div className="two">
                                        <h1 className="flex items-center mb-6 p-2 rounded w-[10rem]"
                                            style={{ backgroundColor: getColorFromSVG(rating) }}
                                        >
                                            <FaPercent className="mr-2 text-white" /> Ratings: {Math.round(rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6 p-2 rounded w-[10rem]">
                                            <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity == -1 ? "Unlimited" : quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6 p-2 rounded w-[10rem]">
                                            <FaBox className="mr-2 text-white" /> In Stock: {quantity == -1 ? "Unlimited" : countInStock}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    )
}

export default ProductCarousel;
