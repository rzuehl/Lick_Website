/* MenuView.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - MenuTile
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/posts';
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
import ScreenTitle from '../components/ScreenTitle';
import MenuTile from '../components/MenuTile';
import weatherLogo from '../assets/weather-icon.png';
import lickLogo from '../assets/lick-honest-logo.png';

//image imports for ice cream sanwiches
import caramelSandwich from '../assets/menu-pictures/sandwich_caramel.png';
import vanillaSandwich from '../assets/menu-pictures/sandwich_honey_vanilla.png';
import chocolateSandwich from '../assets/menu-pictures/sandwich_dark_chocolate.png';

//image imports for everyday items
import caramelSaltLick from '../assets/menu-pictures/everyday_caramel_salt.png';
import coffeeCream from '../assets/menu-pictures/everyday_coffee_cream.png';
import darkChocolate from '../assets/menu-pictures/everyday_dark_chocolate.png';
import mintChocolate from '../assets/menu-pictures/everyday_mint_chocolate_chunk.png';
import goatCheese from '../assets/menu-pictures/everyday_goat_cheese.png';
import honeyVanillaBean from '../assets/menu-pictures/everyday_honey_vanilla_bean.png';
import beetMint from '../assets/menu-pictures/everyday_roasted_beans.png';
import milkChocolate from '../assets/menu-pictures/everyday_milk_chocolate.png';
import sheetCake from '../assets/menu-pictures/everyday_texas_sheet_cake.png';

//image imports for seasonal items
import applePie from '../assets/menu-pictures/seasonal_apple_pie.png';
import puddingCake from '../assets/menu-pictures/seasonal_pudding_cake.png';
import pumpkinPie from '../assets/menu-pictures/seasonal_pumpkin_pie.png';

//image imports from dairy free/vegan items
import veganSunbutter from '../assets/menu-pictures/vegan_sunbutter.png';
import veganVanillaPear from '../assets/menu-pictures/vegan_vanilla_pear.png';

//image imports from beverages
import rootBexarImage from '../assets/menu-pictures/rootBexar.png';
import texaColaImage from '../assets/menu-pictures/texaCola.png';
import lemoncitoImage from '../assets/menu-pictures/lemoncitoImage.png';
import coldBrewCoffeeImage from '../assets/menu-pictures/coldBrewImage.png';
import nitroCoffeeImage from '../assets/menu-pictures/nitroColdBrew.png';
import richardWaterImage from '../assets/menu-pictures/richardsRainWater.jpg';
import ryanWaterImage from '../assets/menu-pictures/ryanWater.jpg';
import chocolateMilk from '../assets/menu-pictures/chocolateMilk.jpg';
import cokeImage from '../assets/menu-pictures/cokeImage.jpg';

//image imports from toppings
import chocolateSauce from '../assets/menu-pictures/topping_chocolate.png';
import caramelSauce from '../assets/menu-pictures/topping_caramel.png';
import toastedPecans from '../assets/menu-pictures/topping_pecan.png';
import cookieCrumble from '../assets/menu-pictures/topping_chocolate_cookie.png';
import rainbowSprinkle from '../assets/menu-pictures/topping_rainbow_sprinkle.png';
import strawberry from '../assets/menu-pictures/topping_strawberry.png';
import whippedCream from '../assets/menu-pictures/topping_whipped_cream.png';

// image import for new product
import newProduct from '../assets/menu-pictures/newProduct.jpg';

// creating object containing descriptions for standard items
const regularItemContent = {
    "Ice Cream": {
        "Caramel Salt Lick": {
            "description": "Salty and sweet make it official! House made caramel is elevated by just a hint of sea salt.",
            "image": caramelSaltLick,
        },
        "Coffee with Cream": {
            "description": "Milk & cream steeped in locally roasted Third Coast Coffee, lightly sweetened with pure cane syrup and subtly accented with a touch of Mexican vanilla.",
            "image": coffeeCream,
        },
        "Dark Chocolate, Olive Oil & Sea Salt": {
            "description": "Buttery notes from SRSLY Chocolate and Texas Olive Ranch olive oil shine through this dark chocolate and sea salt flavor.",
            "image": darkChocolate,
        },
        "Fresh Mint & Chocolate Chunk": {
            "description": "Fresh local mint is joined by chunks of house made SRSLY Chocolate ganache to perfect this crips & refreshing classic!",
            "image": mintChocolate,
        },
        "Goat Cheese, Thyme & Honey": {
            "description": "Fresh, local thyme and Good Flow honey pair perfectly with Austin's own creamy Pure Luck goat cheese.",
            "image": goatCheese,
        },
        "Hill Country Honey & Vanilla Bean": {
            "description": "Madagascar bourbon vanilla beans are enhanced by the sweet, complex notes of local Good Flow Honey.",
            "image": honeyVanillaBean,
        },
        "Roasted Beets & Fresh Mint": {
            "description": "Clean, crisp garden mint flawlessly complements the slightly sweet, earthy flavor of roasted Johnson's Backyard Garden beets.",
            "image": beetMint,
        },
        "Milk Chocolate": {
            "description": "Flecks of local SRSLY Chocolate and the finest milk and cream are churned to classic perfection!",
            "image": milkChocolate,
        },
        "Texas Sheet Cake": {
            "description": "Our interpretation of this classic cake combines a swirl of decadent chocolate-pecan icing with delicate chocolate ice cream.",
            "image": sheetCake,
        },
    },
    "Dairy Free/Vegan": {
        "Honey Sunbutter": {
            "description": "This late summer flavor is the perfect blend of sunflower seed SunButter and local Good Flow Honey.",
            "image": veganSunbutter,
        },
        "Vanilla Pear Cake": {
            "description": "Smooth & creamy oat milk base is accented with vanilla, a silky swirl of our house made pear butter and bites of our luscious gluten free pear coffee cake.",
            "image": veganVanillaPear,
        },
    },
    "Sandwich": {
        "Caramel Salt Lick": {
            "description": "Salty and sweet make it official! House made caramel ice cream is elevated by just a hint of sea salt then slathered between two soft chocolate cake cookies.",
            "image": caramelSandwich,
        },
        "Hill Country Honey & Vanilla Bean": {
            "description": "Madagascar bourbon vanilla beans are enhanced by the sweet, complex notes of local Good Flow Honey in this classic ice cream sandwich.",
            "image": vanillaSandwich,
        },
        "Vegan Vanilla": {
            "description": "Our creamy coconut milk ice cream is accented with vanilla and sandwiched between two vegan & gluten free soft chocolate cake cookies.",
            "image": vanillaSandwich,
        },
        "Dark Chocolate, Olive Oil & Sea Salt": {
            "description": "Buttery notes from SRSLY Chocolate and Texas Olive Ranch olive oil shine through our chocolate and sea salt ice cream which pair perfectly with decadent chocolate cake cookies",
            "image": chocolateSandwich,
        },
    },
    "Topping": {
        "Chocolate Sauce": {
            "description": "Our dark chocolate sauce is made from scratch in our kitchen with only four ingredients! It's a great addition to any of our flavors. (vegan, dairy free, wheat free)",
            "image": chocolateSauce,
        },
        "Caramel Sauce": {
            "description": "Our rich caramel sauce is made from scratch in our kitchen with only four ingredients! It makes a great, sweet and salty addition to any flavor. (wheat free)",
            "image": caramelSauce,
        },
        "Toasted Texas Pecans": {
            "description": "Texas pecans are the best pecans! We toast and chop local San Saba, TX pecans in our Northwest Austin kitchen. (vegan, wheat free)",
            "image": toastedPecans,
        },
        "Chocolate Cookie Crumble": {
            "description": "Our take on our favorite crunchy chocolate cookies! This chocolatey, buttery crumble in made from scratch by our team. (non GMO)",
            "image": cookieCrumble,
        },
        "Rainbow Sprinkles": {
            "description": "Classic sprinkles made with vibrant, plant-based colors by Color Kitchen! (non-GMO, wheat free)",
            "image": rainbowSprinkle,
        },
    },
    "Seasonal Topping": {
        "Strawberry": {
            "description": "Our fresh strawberry sauce is made from scratch in our kitchen only three ingredients including sweet local Texas strawberries!",
            "image": strawberry,
        },
        "Whipped Cream": {
            "description": "Take your favorite ice cream to the next level with our sweet, whipped cream!",
            "image": whippedCream,
        },
    },
    "Seasonal Ice Cream": {
        "Hazel's Pumpkin Pie": {
            "description": "Roasted Texas pie pumpkins are enhanced by clove, a bit of cinnamon, and freshly ground nutmeg. Just like a slice of Granny Hazel's pie!",
            "image": pumpkinPie,
        },
        "Caramel Apple Cake": {
            "description": "Bites of our spice cake, studded with candied Texas apples, are folded into our Good Flow Honey caramel ice cream. (contains gluten & egg)",
            "image": applePie,
        },
        "Date Pudding Cake": {
            "description": "Caramelized Texas date cake and velvety vanilla oat milk ice cream star in this vegan love story. Get two scoops, and it's a date! (vegan, contains gluten)",
            "image": puddingCake,
        }
    },
    "Beverage": {
        "Root Bexar": {
            "description": "Enjoy our refreshing take on Root Beer, Root Bexar!",
            "image": rootBexarImage,
        },
        "Texa-Cola": {
            "description": "Enjoy our refreshing Texa-Cola!",
            "image": texaColaImage,
        },
        "Lemoncito": {
            "description": "Enjoy our refreshing Lemoncito!",
            "image": lemoncitoImage,
        },
        "Cold Brew Coffee": {
            "description": "Enjoy our refreshing Cold Brew Coffee!",
            "image": coldBrewCoffeeImage,
        },
        "Nitro Coffee": {
            "description": "Enjoy our refreshing Nitro Coffee!",
            "image": nitroCoffeeImage,
        },
        "Richard's Rainwater": {
            "description": "Enjoy our refreshing Richard's Rainwater!",
            "image": richardWaterImage,
        },
        "RyanWater": {
            "description": "Enjoy our refreshing RyanWater!",
            "image": ryanWaterImage,
        },
        "Chocolate Milk": {
            "description": "Enjoy our refreshing Chocolate Milk!",
            "image": chocolateMilk,
        },
        "Coke": {
            "description": "Enjoy our refreshing Coke!",
            "image": cokeImage,
        },
    },
    "Not Found": {
        "description": "Enjoy our newly added item!",
        "image": newProduct,
    },
};


const MenuView = () => {
    //handling button state
    const [categoryIndex, setCategoryIndex] = useState(0);
    const categoryClick = (index) => {
        setCategoryIndex(index);
    };

    const [sandwichItems, setSandwichItems] = useState([]);
    const [everydayItems, setEverydayItems] = useState([]);
    const [seasonalItems, setSeasonalItems] = useState([]);
    const [dairyFreeVeganItems, setDairyFreeVeganItems] = useState([]);
    const [beverageItems, setBeverageItems] = useState([]);
    const [toppingItems, setToppingItems] = useState([]);

    const fetchInventoryData = async () => {
        try {
            const everydayData = [];
            const dairyFreeVeganData =  [];
            const seasonalData = [];
            const sandwichData = [];
            const toppingData = []
            const beverageData = [];

            //response returns a JSON format which can be accessed by response.data
            const response = await api.get('/inventory');
            for(let entry of response.data) {
                if (entry.food_type === "Ice Cream") {
                    everydayData.push(entry);
                }
                else if (entry.food_type === "Dairy Free/Vegan") {
                    dairyFreeVeganData.push(entry);
                }
                else if (entry.food_type === "Seasonal Ice Cream") {
                    seasonalData.push(entry);
                }
                else if (entry.food_type === "Sandwich") {
                    sandwichData.push(entry);
                }
                else if (entry.food_type === "Topping" || entry.food_type === "Seasonal Topping") {
                    toppingData.push(entry);
                }
                else if (entry.food_type === "Beverage") {
                    beverageData.push(entry);
                }
                else {
                    throw new Error("Error: inventory item does not belong to defined food type");
                }
            }
            // setting values using useState
            setEverydayItems(everydayData);
            setDairyFreeVeganItems(dairyFreeVeganData);
            setSeasonalItems(seasonalData);
            setSandwichItems(sandwichData);
            setToppingItems(toppingData);
            setBeverageItems(beverageData);
        } 
        catch (err) {
            console.log("Error: Failed to query database to populate menu board", err);
        }
    };

    // upon mounting component, calling fetchInventory data using useEffect
    useEffect(() => {
        fetchInventoryData();
    }, []);

    return (
        <div>
            <div className="customer-header">
                <Link to="/">
                    <img className="lick-logo" src={lickLogo} alt="Representing Lick Honest Icecream Customer Logo" />                
                </Link>
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather" />
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <GeneralButton content="Cart" sidePadding={20} route="/cart" />
                <GeneralButton content="Options" sidePadding={20} />
            </div>
            <div className="menu-categories">
                <h2 id="sandwich-category" style={categoryIndex === 0 ? {textDecoration: 'underline'} : null} onClick={() => categoryClick(0)}>Sandwiches</h2>
                <h2 id="everyday-category" style={categoryIndex === 1 ? {textDecoration: 'underline'} : null} onClick={() => categoryClick(1)}>Everyday</h2>
                <h2 id="seasonal-category" style={categoryIndex === 2 ? {textDecoration: 'underline'} : null} onClick={() =>categoryClick(2)}>Seasonal</h2>
                <h2 id="dairy-free-vegan-category" style={categoryIndex === 3 ? {textDecoration: 'underline'} : null} onClick={() => categoryClick(3)}>Dairy Free/Vegan</h2>
                <h2 id="beverages-category" style={categoryIndex === 4 ? {textDecoration: 'underline'} : null} onClick={() => categoryClick(4)}>Beverages</h2>
                <h2 id="toppings-category" style={categoryIndex === 5 ? {textDecoration: 'underline'} : null} onClick={() => categoryClick(5)}>Toppings</h2>
            </div>
            <div className="menu-background">
                {/*Section rendering Sandwich Items*/}
                {categoryIndex === 0 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            {
                                sandwichItems.map((item) => {
                                    if (item.food_name in regularItemContent[item.food_type]) {
                                        return (
                                            <MenuTile 
                                            src={regularItemContent[item.food_type][item.food_name]["image"]} 
                                            alt={regularItemContent[item.food_type][item.food_name]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent[item.food_type][item.food_name]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                    else {
                                        return(
                                            <MenuTile 
                                            src={regularItemContent["Not Found"]["image"]} 
                                            alt={regularItemContent["Not Found"]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent["Not Found"]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                )}
                {/*Section rendering Everyday items*/}
                {categoryIndex === 1 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            {
                                everydayItems.map((item) => {
                                    if (item.food_name in regularItemContent[item.food_type]) {
                                        return (
                                            <MenuTile 
                                            src={regularItemContent[item.food_type][item.food_name]["image"]} 
                                            alt={regularItemContent[item.food_type][item.food_name]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent[item.food_type][item.food_name]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                    else {
                                        return(
                                            <MenuTile 
                                            src={regularItemContent["Not Found"]["image"]} 
                                            alt={regularItemContent["Not Found"]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent["Not Found"]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                )}
                {/*Section rendering seasonal items*/}
                {categoryIndex === 2 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            {
                                    seasonalItems.map((item) => {
                                        if (item.food_name in regularItemContent[item.food_type]) {
                                            return (
                                                <MenuTile 
                                                src={regularItemContent[item.food_type][item.food_name]["image"]} 
                                                alt={regularItemContent[item.food_type][item.food_name]["description"]}
                                                header={item.food_name}
                                                description={regularItemContent[item.food_type][item.food_name]["description"]}
                                                itemPrice={item.food_price}
                                                />
                                            )
                                        }
                                        else {
                                            return(
                                                <MenuTile 
                                                src={regularItemContent["Not Found"]["image"]} 
                                                alt={regularItemContent["Not Found"]["description"]}
                                                header={item.food_name}
                                                description={regularItemContent["Not Found"]["description"]}
                                                itemPrice={item.food_price}
                                                />
                                            )
                                        }
                                    })
                            }
                        </div>
                    </div>                    
                )}
                {/*section rendering Dairy Free/vegan Items*/}
                {categoryIndex === 3 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            {
                                dairyFreeVeganItems.map((item) => {
                                    if (item.food_name in regularItemContent[item.food_type]) {
                                        return (
                                            <MenuTile 
                                            src={regularItemContent[item.food_type][item.food_name]["image"]} 
                                            alt={regularItemContent[item.food_type][item.food_name]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent[item.food_type][item.food_name]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                    else {
                                        return(
                                            <MenuTile 
                                            src={regularItemContent["Not Found"]["image"]} 
                                            alt={regularItemContent["Not Found"]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent["Not Found"]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>   
                )}
                {/*Section rendering beverages*/}
                {categoryIndex === 4 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            {
                                beverageItems.map((item) => {
                                    if (item.food_name in regularItemContent[item.food_type]) {
                                        return (
                                            <MenuTile 
                                            src={regularItemContent[item.food_type][item.food_name]["image"]} 
                                            alt={regularItemContent[item.food_type][item.food_name]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent[item.food_type][item.food_name]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                    else {
                                        return(
                                            <MenuTile 
                                            src={regularItemContent["Not Found"]["image"]} 
                                            alt={regularItemContent["Not Found"]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent["Not Found"]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                })
                            }                        </div>
                    </div>  
                )}
                {/*Section rendering toppings*/}
                {categoryIndex === 5 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            {
                                toppingItems.map((item) => {
                                    if (item.food_name in regularItemContent[item.food_type]) {
                                        return (
                                            <MenuTile 
                                            src={regularItemContent[item.food_type][item.food_name]["image"]} 
                                            alt={regularItemContent[item.food_type][item.food_name]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent[item.food_type][item.food_name]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                    else {
                                        return(
                                            <MenuTile 
                                            src={regularItemContent["Not Found"]["image"]} 
                                            alt={regularItemContent["Not Found"]["description"]}
                                            header={item.food_name}
                                            description={regularItemContent["Not Found"]["description"]}
                                            itemPrice={item.food_price}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>                      
                )}

            </div>
        </div>
    );
}

export default MenuView;