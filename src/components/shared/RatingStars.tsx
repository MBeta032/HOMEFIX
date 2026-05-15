import type { RatingStarsProps } from "../../interfaces/Interfacecomponents"
import "../../styles/Services.css"

function RatingStars({value, onChange}: RatingStarsProps){
    return(
        <div className="rating-stars">
            <label className="select-label">Valoracion Minima</label>
            <div className="stars-container">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                    key={star}
                    className={`star ${star <= value ? "star-active" : ""}`}
                    onClick={() => onChange(star === value ? 0 : star)}>
                       ⭐ 
                    </span>
                ))}
                {value > 0 && (
                    <span className="star-clear" onClick={() => onChange(0)}>x</span>
                )}

            </div>

        </div>
    )
}

export default RatingStars