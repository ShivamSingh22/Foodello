import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const RestaurantDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    fetchRestaurant();
  }, []);
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  async function fetchRestaurant() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${id}`
    );
    const json = await data?.json();
    const menuData =
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards;
    const dataRestaurant = json?.data?.cards[2]?.card?.card?.info;

    setRestaurant(dataRestaurant);
    setMenu(menuData);
    console.log(menuData);
    console.log(dataRestaurant);
  }

  return (!restaurant) ? <Shimmer /> : (
    <div>
      <h1>Restaurant Detail</h1>
      <div style={{ display: "flex" }}>
        <div>
          <h2>{restaurant.name}</h2>
          <img
            style={{ width: "500px", height: "400px" }}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.cloudinaryImageId}`}
          />
          <h3>{restaurant?.costForTwoMessage}</h3>
          <h3>{restaurant?.avgRatingString} stars</h3>
          <h3>{restaurant?.cuisines?.join(", ")}</h3>
        </div>
        <div>
          <h2>Menu</h2>
          {menu?.map((item) => {
            return (
              <p key={item.card.info.id}>
                {item.card.info.name} : Rs. {item.card.info.price / 100}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
