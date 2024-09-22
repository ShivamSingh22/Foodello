import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";

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
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurantsList =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log(restaurantsList);
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
            return <RestaurantCard {...item.info} key={item.info.id} />;
          })
        )}
      </div>
    </>
  );
};

export default Body;
