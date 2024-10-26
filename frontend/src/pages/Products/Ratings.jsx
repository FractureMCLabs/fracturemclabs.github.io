import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"
import Percentage, { svgColors } from "../../components/Percentage";

const Ratings = ({value, text, isComment}) => {

    const fullStars = Math.floor(value/20)
    const halfStars = value/20 - fullStars > 0.5 ? 1 : 0;
    const emptyStar = 5 - fullStars - halfStars
    const color = svgColors[Math.round(value)];

  return (
    <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (

            <FaStar key={index} className={`ml-1`} style={{color: color}}/>
        ))}
        {halfStars == 1 && <FaStarHalfAlt className={`ml-1`} style={{color: color}}/>}
        {[...Array(emptyStar)].map((_, index) => (
            <FaRegStar key={index} className={`ml-1`} style={{color: color}}/>
        ))}
        {isComment ? <Percentage value={value} isComment={isComment} /> : null}

        <span className={`rating-text ml-[2rem]`} style={{textColor: color}}>{text && text}</span>
    </div>
  )
}

export default Ratings;