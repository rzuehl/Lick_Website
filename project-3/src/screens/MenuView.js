/* MenuView.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - MenuTile
 */

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../api/posts";
import GeneralButton from '../components/GeneralButton';
import Badge from '@mui/material/Badge';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OptionsDropdown from '../components/OptionsDropdown';
import ScreenTitle from '../components/ScreenTitle';
import MenuTile from '../components/MenuTile';
import WeatherIcon from '../components/WeatherIcon';
import regularItemContent from "../assets/regularItemContent";
import CartItem from '../components/CartItem';
import { BsCartXFill } from "react-icons/bs";

function arraysAreEqual(arr1, arr2) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if each element is equal
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If all elements are equal, the arrays are equal
  return true;
}

const MenuView = () => {
  //handling button state
  const [categoryIndex, setCategoryIndex] = useState(0);
  const categoryClick = (index) => {
    setCategoryIndex(index);
  };

  // use state utilized to hold all values pressed by user
  const [userSelectedItems, setUserSelectedItems] = useState([]);

  // initializing use history state and handling state change to cart
  const history = useHistory();
  const onCartClick = () => {
    history.push({ pathname: '/cart', state: userSelectedItems});
  };


  // function responsible for adding items to userSelectedItems when item added by user
  // if food item already within userSelectedItems, quantity of item is incremented
  // else, new entry is created all together
  const addSelectedItem = (itemEntry) => {
    handleSnackbarOpen();
    setLastAddedItem(itemEntry.name);
    const index = userSelectedItems.findIndex(
      (item) => item.name === itemEntry.name && arraysAreEqual(item.itemToppings, itemEntry.itemToppings)
    );
    // action if item already within list of selected items
    if (index !== -1) {
      setUserSelectedItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1,
        };
        return newItems;
      });
    } else {
      setUserSelectedItems((prevItems) => [...prevItems, itemEntry]);
    }
  };

  // use state arrays responsible for holding fetched menu items from database
  const [sandwichItems, setSandwichItems] = useState([]);
  const [everydayItems, setEverydayItems] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [dairyFreeVeganItems, setDairyFreeVeganItems] = useState([]);
  const [beverageItems, setBeverageItems] = useState([]);
  const [toppingItems, setToppingItems] = useState([]);

  const fetchInventoryData = async () => {
    try {
      const everydayData = [];
      const dairyFreeVeganData = [];
      const seasonalData = [];
      const sandwichData = [];
      const toppingData = [];
      const beverageData = [];

      //response returns a JSON format which can be accessed by response.data
      const response = await api.get("/inventory");
      for (let entry of response.data) {
        if (entry.food_type === "Ice Cream") {
          everydayData.push(entry);
        } else if (entry.food_type === "Dairy Free/Vegan") {
          dairyFreeVeganData.push(entry);
        } else if (entry.food_type === "Seasonal Ice Cream") {
          seasonalData.push(entry);
        } else if (entry.food_type === "Sandwich") {
          sandwichData.push(entry);
        } else if (
          entry.food_type === "Topping" ||
          entry.food_type === "Seasonal Topping"
        ) {
          toppingData.push(entry);
        } else if (entry.food_type === "Beverage") {
          beverageData.push(entry);
        } else {
          throw new Error(
            "Error: inventory item does not belong to defined food type"
          );
        }
      }
      // setting values using useState
      setEverydayItems(everydayData);
      setDairyFreeVeganItems(dairyFreeVeganData);
      setSeasonalItems(seasonalData);
      setSandwichItems(sandwichData);
      setToppingItems(toppingData);
      setBeverageItems(beverageData);
    } catch (err) {
      console.log(
        "Error: Failed to query database to populate menu board",
        err
      );
    }
  };

  // const alterCartItems = (cartItemName, newCartItemQuantity) => {
  //   const newCartItemArray = [...userSelectedItems];
  //   const index = newCartItemArray.findIndex((item) => item.name === cartItemName);
  //   if (index !== -1) {
  //       newCartItemArray[index].quantity = newCartItemQuantity;
  //     setUserSelectedItems(newCartItemArray);
  //   }
  //   else {
  //     console.log("Error: array element not found when altering cart Items function is executed");
  //   }
  // };

  const q_sum = () => {
    var total = 0;
    userSelectedItems.forEach(item => {
      total += item.quantity;
    })
    return total;
  }

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  }
  
  // upon mounting component, calling fetchInventory data using useEffect
  useEffect(() => {
    fetchInventoryData();
  }, [])

  return (
    <div>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical:'bottom', horizontal:'center'}}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {lastAddedItem === null ? "Item" : lastAddedItem} added to cart!
        </Alert>
      </Snackbar>
      <div className="customer-header">
        <WeatherIcon />
        <GeneralButton content="Login" sidePadding={20} route="/login" />
        <ScreenTitle />
        <Badge badgeContent={q_sum()} color="primary" overlap="circular" showZero>
          <div className="cart-button">
            <GeneralButton content="Cart" sidePadding={20} onClick={onCartClick} />
            <div className="cart-preview">
              {/* {userSelectedItems.length > 0 &&
                userSelectedItems.map((item, index) => {
                  return (
                    <CartItem
                    key={index}
                    src={item.image}
                    alt={item.description}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    />
                    );
                  })}
              {userSelectedItems.length === 0 && (
                <div className='cart-item empty-cart-container'>
                    <div className='empty-cart-message'>
                      <BsCartXFill style={{color: 'black', fontSize: '3rem'}} />
                      <h1>Your Cart is Currently Empty!</h1>
                    </div>
                </div>
              )} */}
            </div>
          </div>
        </Badge>
        <OptionsDropdown sidePadding={20}/>
      </div>
      <div className="menu-categories">
        <h2
          id="sandwich-category"
          style={categoryIndex === 0 ? { textDecoration: "underline" } : null}
          onClick={() => categoryClick(0)}
        >
          Sandwiches
        </h2>
        <h2
          id="everyday-category"
          style={categoryIndex === 1 ? { textDecoration: "underline" } : null}
          onClick={() => categoryClick(1)}
        >
          Everyday
        </h2>
        <h2
          id="seasonal-category"
          style={categoryIndex === 2 ? { textDecoration: "underline" } : null}
          onClick={() => categoryClick(2)}
        >
          Seasonal
        </h2>
        <h2
          id="dairy-free-vegan-category"
          style={categoryIndex === 3 ? { textDecoration: "underline" } : null}
          onClick={() => categoryClick(3)}
        >
          Dairy Free/Vegan
        </h2>
        <h2
          id="beverages-category"
          style={categoryIndex === 4 ? { textDecoration: "underline" } : null}
          onClick={() => categoryClick(4)}
        >
          Beverages
        </h2>
        <h2
          id="toppings-category"
          style={categoryIndex === 5 ? { textDecoration: "underline" } : null}
          onClick={() => categoryClick(5)}
        >
          Toppings
        </h2>
      </div>
      <div className="menu-background">
        {/*Section rendering Sandwich Items*/}
        {categoryIndex === 0 && (
          <div className="menu-section">
            <div className="menu-grid">
              {sandwichItems.map((item, index) => {
                if (item.food_name in regularItemContent[item.food_type]) {
                  return (
                    <MenuTile
                      key={index}
                      src={
                        regularItemContent[item.food_type][item.food_name][
                          "image"
                        ]
                      }
                      alt={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      header={item.food_name}
                      description={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                } else {
                  return (
                    <MenuTile
                      key={index}
                      src={regularItemContent["Not Found"]["image"]}
                      alt={regularItemContent["Not Found"]["description"]}
                      header={item.food_name}
                      description={
                        regularItemContent["Not Found"]["description"]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        {/*Section rendering Everyday items*/}
        {categoryIndex === 1 && (
          <div className="menu-section">
            <div className="menu-grid">
              {everydayItems.map((item, index) => {
                if (item.food_name in regularItemContent[item.food_type]) {
                  return (
                    <MenuTile
                      key={index}
                      src={
                        regularItemContent[item.food_type][item.food_name][
                          "image"
                        ]
                      }
                      alt={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      header={item.food_name}
                      description={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                } else {
                  return (
                    <MenuTile
                      key={index}
                      src={regularItemContent["Not Found"]["image"]}
                      alt={regularItemContent["Not Found"]["description"]}
                      header={item.food_name}
                      description={
                        regularItemContent["Not Found"]["description"]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        {/*Section rendering seasonal items*/}
        {categoryIndex === 2 && (
          <div className="menu-section">
            <div className="menu-grid">
              {seasonalItems.map((item, index) => {
                if (item.food_name in regularItemContent[item.food_type]) {
                  return (
                    <MenuTile
                      key={index}
                      src={
                        regularItemContent[item.food_type][item.food_name][
                          "image"
                        ]
                      }
                      alt={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      header={item.food_name}
                      description={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                } else {
                  return (
                    <MenuTile
                      key={index}
                      src={regularItemContent["Not Found"]["image"]}
                      alt={regularItemContent["Not Found"]["description"]}
                      header={item.food_name}
                      description={
                        regularItemContent["Not Found"]["description"]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        {/*section rendering Dairy Free/vegan Items*/}
        {categoryIndex === 3 && (
          <div className="menu-section">
            <div className="menu-grid">
              {dairyFreeVeganItems.map((item, index) => {
                if (item.food_name in regularItemContent[item.food_type]) {
                  return (
                    <MenuTile
                      key={index}
                      src={
                        regularItemContent[item.food_type][item.food_name][
                          "image"
                        ]
                      }
                      alt={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      header={item.food_name}
                      description={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                } else {
                  return (
                    <MenuTile
                      key={index}
                      src={regularItemContent["Not Found"]["image"]}
                      alt={regularItemContent["Not Found"]["description"]}
                      header={item.food_name}
                      description={
                        regularItemContent["Not Found"]["description"]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                      toppingsArray={toppingItems}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        {/*Section rendering beverages*/}
        {categoryIndex === 4 && (
          <div className="menu-section">
            <div className="menu-grid">
              {beverageItems.map((item, index) => {
                if (item.food_name in regularItemContent[item.food_type]) {
                  return (
                    <MenuTile
                      key={index}
                      src={
                        regularItemContent[item.food_type][item.food_name][
                          "image"
                        ]
                      }
                      alt={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      header={item.food_name}
                      description={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                    />
                  );
                } else {
                  return (
                    <MenuTile
                      key={index}
                      src={regularItemContent["Not Found"]["image"]}
                      alt={regularItemContent["Not Found"]["description"]}
                      header={item.food_name}
                      description={
                        regularItemContent["Not Found"]["description"]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
        {/*Section rendering toppings*/}
        {categoryIndex === 5 && (
          <div className="menu-section">
            <div className="menu-grid">
              {toppingItems.map((item, index) => {
                if (item.food_name in regularItemContent[item.food_type]) {
                  return (
                    <MenuTile
                      key={index}
                      src={
                        regularItemContent[item.food_type][item.food_name][
                          "image"
                        ]
                      }
                      alt={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      header={item.food_name}
                      description={
                        regularItemContent[item.food_type][item.food_name][
                          "description"
                        ]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                    />
                  );
                } else {
                  return (
                    <MenuTile
                      key={index}
                      src={regularItemContent["Not Found"]["image"]}
                      alt={regularItemContent["Not Found"]["description"]}
                      header={item.food_name}
                      description={
                        regularItemContent["Not Found"]["description"]
                      }
                      itemPrice={item.food_price}
                      buttonFunction={addSelectedItem}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuView;
