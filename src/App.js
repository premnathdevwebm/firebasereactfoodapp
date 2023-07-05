import { useState, useContext } from "react";
import "./App.scss";
import { FoodItemsContext } from "./store/food-context";
import MenuItems from "./Components/MenuItems";
import OrderItem from "./Components/OrderItem";

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(0);
  const [foodChoosed, setFoodChoosed] = useState({});
  const { menuItems } = useContext(FoodItemsContext);
  
  const chooseFood = (food) => {
    if (food) {
      setIsChooseFoodPage(food.id);
      setFoodChoosed(food);
    }
  };

  const backToApp = ()=>{
    setIsChooseFoodPage(0);
    setFoodChoosed({});
  }
 
  return (
    <div className="App">
      <h3 className="title">Just Food Online Shop</h3>

      {Object.keys(foodChoosed).length < 0 && (
        <h4 className="subTitle">Menu Availability</h4>
      )}
      {!isChooseFoodPage && menuItems.length <= 0 && <>Menu will open later</>}
      {!isChooseFoodPage && menuItems.length > 0 && (
        <MenuItems menuItems={menuItems} chooseFood={chooseFood} />
      )}
      {Object.keys(foodChoosed).length > 0 && (
        <OrderItem foodChoosed={foodChoosed} backToApp={backToApp} />
      )}
    </div>
  );
}

export default App;
