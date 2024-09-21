import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

function filterData(restaurants, searchText) {
  const filteredData = restaurants.filter((restaurant) => {
    return restaurant.info.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });
  return filteredData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    const restaurantsList =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setFilteredRestaurants(restaurantsList);
    setAllRestaurants(restaurantsList);
  }

  if (!allRestaurants) return null; //not rendered anything(early return)

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search food, restaurant or cuisine"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            const filteredData = filterData(allRestaurants, searchText);
            setFilteredRestaurants(filteredData);
          }}
        >
          Search
        </button>
      </div>

      <div className="restaurant-list">
        {filteredRestaurants?.length === 0 ? (
          <h3>NOT FOUND</h3>
        ) : (
          filteredRestaurants.map((item) => {
            return <RestaurantCard {...item.info} />;
          })
        )}
      </div>
    </>
  );
};

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  costForTwo,
  avgRatingString,
}) => {
  return (
    <div className="card">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt="card-img"
      />
      <h2>{name}</h2>
      <h3>{costForTwo}</h3>
      <h4>{avgRatingString} stars</h4>
    </div>
  );
};

export default Body;
