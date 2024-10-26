import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings.jsx";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader.jsx";
import SmallProduct from "./SmallProduct.jsx"
const ProductTabs = ({
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product
}) => {

    const {data, isLoading} = useGetTopProductsQuery();
    const [activeTab, setActiveTab] = useState(1)

    if (isLoading) {

        return <Loader />;
    }

    const handleTabClick = (tabNumber) => {

        setActiveTab(tabNumber)
    }

  return (
    <div className="flex flex-col md:flex-row ">
        <section className="mr-[5rem]">
            <div 
                className={`flex-1 p-4 cursor-pointer text-lg ${activeTab == 1 ? "font-bold" : ""}`}
                onClick={() => handleTabClick(1)}
            >
                Write Review
            </div>
            <div 
                className={`flex-1 p-4 cursor-pointer text-lg ${activeTab == 2 ? "font-bold" : ""}`}
                onClick={() => handleTabClick(2)}
            >
                All Reviews
            </div>
            <div 
                className={`flex-1 p-4 cursor-pointer text-lg ${activeTab == 3 ? "font-bold" : ""}`}
                onClick={() => handleTabClick(3)}
            >
                Related Products
            </div>
        </section>
        {/*Second*/}
        <section>
            {activeTab == 1 && (
                <div className="mt-4">
                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className="my-2">
                                <label htmlFor="rating" className="black text-xl mb-2">
                                    Rating
                                </label>
                                <input 
                                    id="rating" 
                                    type="number" 
                                    required 
                                    value={rating} 
                                    onChange={e => setRating(e.target.value)}
                                    className="mt-1 p-2 rounded w-full bg-black backdrop-blur-[10px] bg-opacity-30 text-white"
                                    min={0}
                                    max={100}
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="comment" className="block text-xl mb-2">
                                    Comment
                                </label>
                                <textarea
                                    id="comment"
                                    value={comment}
                                    rows="3"
                                    required
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Comment"
                                    className="mt-1 p-2 rounded xl:w-[40rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] bg-black backdrop-blur-[10px] bg-opacity-30 text-white resize-none placeholder-gray"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={loadingProductReview} 
                                className="bg-pink text-white py-2 px-4 rounded-lg"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p>Please <Link to="/login">sign in</Link> to review</p>
                    )}
                </div>
            )}
        </section>
        <section>
            {activeTab == 2 && (
                <>
                    <div>{product.reviews.length == 0 && <p>No Reviews</p>}</div>
                    <div className="mt-4">
                        {product.reviews.map((review) => (
                            
                            <div
                                key={review._id}
                                className="p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5 bg-black backdrop-blur-[10px] bg-opacity-30"
                            >
                                <div className="flex justify-between">
                                    <strong className="text-[#b0b0b0]">
                                        {review.name}
                                    </strong>
                                    <p className="text-[#b0b0b0]">
                                        {review.createdAt.substring(0, 10)}
                                    </p>
                                </div>
                                <p className="my-4 text-white">{review.comment}</p>
                                <Ratings value={review.rating} isComment={true} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
        <section>
            {activeTab == 3 && (
                <section className="ml-[4rem] flex flex-wrap">
                    {!data ? (
                        <Loader />
                    ) : (
                        data.map((product) => (
                            <div key={product._id}>
                                <SmallProduct product={product}/>
                            </div>
                        ))
                    )}
                </section>
            )}
        </section>
    </div>
  );
};

export default ProductTabs;