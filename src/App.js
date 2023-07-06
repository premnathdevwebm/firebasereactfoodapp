import { useState, useEffect, useCallback, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import "./App.scss";
import { auth, signOutFun } from "./Auth/Firebasejs";
import { FoodItemsContext } from "./store/food-context";
import MenuItems from "./Components/MenuItems";
import OrderItem from "./Components/OrderItem";

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(0);
  const [foodChoosed, setFoodChoosed] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { menuItems } = useContext(FoodItemsContext);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const navigateCallback = useCallback(navigate, [navigate]);



  useEffect(() => {
    if (user) {
      const user = auth.currentUser;
      setUserEmail(user.email);
      if (user.email === "admin@justfood.com") {
        setIsAdmin(true);
      }
    } else {
      navigateCallback("/");
    }
  }, [user, loading, navigateCallback]);
  
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
      <button onClick={signOutFun}>SignOut</button>
      {isAdmin && <>Admin Account</>}
      {userEmail}
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
