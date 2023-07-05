import { useContext } from "react";
import "./OrderPage.scss";
import { OrderItemsContext } from "../store/order-context";

const OrderPage = () => {
  const { orderItems, setOrderItems } = useContext(OrderItemsContext);

  const onBuy = (order) => {
    setOrderItems((orders) =>
      orders.filter((ele) => ele.foodName !== order.foodName)
    );
  };
  const onCancelOrder = (order) => {
    setOrderItems((orders) =>
      orders.filter((ele) => ele.foodName !== order.foodName)
    );
  };

  return (
    <div className="containerorder">
      {orderItems.length > 0 && (
        <>
          {orderItems.map((order) => (
            <div className="orderitem" key={order.foodName}>
              <>
                <div className="food-info">
                  <img
                    src={require(`../images/${order.foodImage}`)}
                    alt={order.foodName}
                    className="food-image"
                  />
                  <div>
                    <h3>{order.foodName}</h3>
                    <p>Price: ${order.foodPrice}</p>
                    <p>Quantity: {order.foodQuantity}</p>
                  </div>
                </div>
                <div className="order-actions">
                  <button className="buy-button" onClick={() => onBuy(order)}>
                    Buy
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => onCancelOrder(order)}
                  >
                    Cancel Order
                  </button>
                </div>
              </>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderPage;
