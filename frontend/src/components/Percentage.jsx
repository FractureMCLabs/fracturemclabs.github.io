import React from 'react';
import { useParams } from 'react-router-dom';
import { FaPercent } from "react-icons/fa";
import { useGetProductDetailsQuery } from "../redux/api/productApiSlice";

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

const getColorFromSVG = (rating) => {
    const percentage = Math.round(rating);
    return svgColors[percentage] || svgColors[0];
}

const Percentage = ({isComment, value}) => {
    const { id: productId } = useParams(); // Get the productId from the URL
    const { data, error, isLoading } = useGetProductDetailsQuery(productId); // Fetch product details

    // Handle loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product details</p>;

    // Get the rating from the fetched product data
    const rating = data?.rating || 0;

    if (isComment) {

        return (
            <h1 className="ml-3 flex items-center p-1 rounded text-white font-bold text-sm" style={{ backgroundColor: getColorFromSVG(value) }}>
                {value}
                {""}
                <FaPercent className="text-white text-xs" />
            </h1>
        );
    } else {

        return (
            <h1 className="flex items-center mb-6 p-2 rounded text-white font-bold" style={{ backgroundColor: getColorFromSVG(rating) }}>
                <FaPercent className="mr-2 text-white" /> {Math.round(rating)}
            </h1>
        );
    }
  
}

export default Percentage;
export {svgColors};
