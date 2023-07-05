import { createContext, useState } from "react";

export const OrderItemsContext = createContext();

const OrderItemsContextProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([ ]);
  return (
    <OrderItemsContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </OrderItemsContext.Provider>
  );
};

export default OrderItemsContextProvider;