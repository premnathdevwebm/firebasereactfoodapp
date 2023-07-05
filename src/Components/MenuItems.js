import "./MenuItems.scss"
const Menu = ({ menuItems, chooseFood }) => {
    return (
      <div className="menu">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} data-id={menuItem.id} className="menu-item" onClick={()=>chooseFood(menuItem)} >
            <h4>{menuItem.name}</h4>
            <img src={require(`../images/${menuItem.image}`)} alt={menuItem.name} />
            <p>{menuItem.desc}</p>
            <p>Price: ${menuItem.price}</p>
            <p>Quantity: {menuItem.quantity}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Menu;