import { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import "./OrderItem.scss";
import { FoodItemsContext } from "../store/food-context";
import { OrderItemsContext } from "../store/order-context";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return { ...state, [type]: payload };
  }
};

const OrderItem = (props) => {
  const initialState = {
    quantity: 1,
    name: "",
    address: "",
    phone: "",
  };
  const [orderItem] = useState(props.foodChoosed);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setMenuItems } = useContext(FoodItemsContext);
  const { setOrderItems } = useContext(OrderItemsContext);
  const navigate = useNavigate();

  const handleChange = (type, e) => {
    if (type === "quantity") {
      dispatch({ type: type, payload: parseInt(e.target.value) });
    } else {
      dispatch({ type: type, payload: e.target.value });
    }
  };
  const cancelOrder = () => {
    props.backToApp();
    navigate("/");
  };
  const placeOrder = () => {
    setMenuItems((items) =>
      items.map((ele) => {
        if (ele.id === props.foodChoosed.id) {
          return {
            ...ele,
            quantity:
              ele.quantity - state.quantity > 0
                ? ele.quantity - state.quantity
                : 0,
          };
        }
        return ele;
      })
    );
    setOrderItems((order) => {
      const existingOrderIndex = order.findIndex(
        (item) => item.foodName === props.foodChoosed.name
      );
      if (existingOrderIndex !== -1) {
        const updatedOrder = [...order];
        updatedOrder[existingOrderIndex] = {
          ...updatedOrder[existingOrderIndex],
          foodPrice:
            updatedOrder[existingOrderIndex].foodPrice +
            state.quantity * parseInt(props.foodChoosed.price),
          foodQuantity:
            updatedOrder[existingOrderIndex].foodQuantity + state.quantity,
        };
        return updatedOrder;
      } else {
        return [
          ...order,
          {
            foodName: props.foodChoosed.name,
            foodImage: props.foodChoosed.image,
            foodPrice: state.quantity * parseInt(props.foodChoosed.price),
            foodQuantity: state.quantity,
          },
        ];
      }
    });
    props.backToApp();
    navigate("/");
  };
  return (
    <div className="ordercontainer">
      <div className="row1">
        <div className="itemcol">
          <h4 className="ordername">{orderItem.name}</h4>
          <img
            src={require(`../images/${orderItem.image}`)}
            alt={orderItem.name}
          />
          <p>{orderItem.desc}</p>
          <p>Price: ${orderItem.price}</p>
        </div>
        <div className="ordercol">
          <div className="ordercol1">
            <label className="inputlabel" htmlFor="quantity">
              Quantity:
            </label>
            <input
              type="number"
              className="inputtype"
              id="quantity"
              value={state.quantity}
              onChange={(e) => handleChange("quantity", e)}
            />
          </div>
          <div className="ordercol1">
            <label className="inputlabel" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              className="inputtype"
              id="name"
              value={state.name}
              onChange={(e) => handleChange("name", e)}
            />
          </div>
          <div className="ordercol1">
            <label className="inputlabel" htmlFor="address">
              Address:
            </label>
            <input
              type="text"
              className="inputtype"
              id="address"
              value={state.address}
              onChange={(e) => handleChange("address", e)}
            />
          </div>
          <div className="ordercol1">
            <label className="inputlabel" htmlFor="phone">
              Phone:
            </label>
            <input
              type="text"
              className="inputtype"
              id="phone"
              value={state.phone}
              onChange={(e) => handleChange("phone", e)}
            />
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="purchase">
          <button onClick={placeOrder}>Order Place</button>
          <button onClick={cancelOrder}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
