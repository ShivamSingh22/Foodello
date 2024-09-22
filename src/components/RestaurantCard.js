import { Link } from "react-router-dom";

const RestaurantCard = ({
    id,
    cloudinaryImageId,
    name,
    costForTwo,
    avgRatingString,
  }) => {
    return (
      <div className="card">
        <Link to={`/restaurant/${id}`}>
        <img style={{width:240, height:150}}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
          alt="card-img"
        />
        <h2>{name}</h2>
        </Link>
        <h3>{costForTwo}</h3>
        <h4>{avgRatingString} stars</h4>
      </div>
    );
  };

  export default RestaurantCard;