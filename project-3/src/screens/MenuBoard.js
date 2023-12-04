/* MenuBoard.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - ScreenTitle
*/

import React, { Component } from 'react';
import GeneralButton from '../components/GeneralButton';
import OptionsDropdown from '../components/OptionsDropdown';
// import HamburgerButton from '../components/HamburgerButton';
// import ImageSlider from '../components/ImageSlider';
import ScreenTitle from '../components/ScreenTitle';
// import weatherLogo from '../assets/weather-icon.png';
import WeatherIcon from '../components/WeatherIcon.js';
import TranslateWindow from '../components/TranslateWindow';

// import * as imgs from "../assets/menu-pictures";
import beverages from '../assets/menu-pictures/beverages.png';
import everydayCaramelSalt from '../assets/menu-pictures/everyday_caramel_salt.png';
import everydayCoffeeCream from '../assets/menu-pictures/everyday_coffee_cream.png';
import everydayDarkChocolate from '../assets/menu-pictures/everyday_dark_chocolate.png';
import everydayGoatCheese from '../assets/menu-pictures/everyday_goat_cheese.png';
import everydayHoneyVanillaBean from '../assets/menu-pictures/everyday_honey_vanilla_bean.png';
import everydayMilkChocolate from '../assets/menu-pictures/everyday_milk_chocolate.png';
import everydayMintChocolateChunk from '../assets/menu-pictures/everyday_mint_chocolate_chunk.png';
import everydayRoastedBeans from '../assets/menu-pictures/everyday_roasted_beans.png';
import everydayTexasSheetCake from '../assets/menu-pictures/everyday_texas_sheet_cake.png';
import sandwichCaramel from '../assets/menu-pictures/sandwich_caramel.png';
import sandwichDarkChocolate from '../assets/menu-pictures/sandwich_dark_chocolate.png';
import sandwichHoneyVanilla from '../assets/menu-pictures/sandwich_honey_vanilla.png';
import sandwichVeganVanilla from '../assets/menu-pictures/sandwich_vegan_vanilla.png';
import seasonalPumpkinPie from '../assets/menu-pictures/seasonal_pumpkin_pie.png';
import seasonalPuddingCake from '../assets/menu-pictures/seasonal_pudding_cake.png';
import seasonalAppliePie from '../assets/menu-pictures/seasonal_apple_pie.png';
import toppingWhippedCream from '../assets/menu-pictures/topping_whipped_cream.png';
import toppingStrawberry from '../assets/menu-pictures/topping_strawberry.png';
import toppingRainbowSprinkles from '../assets/menu-pictures/topping_rainbow_sprinkle.png';
import toppingPecan from '../assets/menu-pictures/topping_pecan.png';
import toppingChocolate from '../assets/menu-pictures/topping_chocolate.png';
import toppingChocolateCookie from '../assets/menu-pictures/topping_chocolate_cookie.png';
import toppingCaramel from '../assets/menu-pictures/topping_caramel.png';
import veganVanillaPear from '../assets/menu-pictures/vegan_vanilla_pear.png';
import veganSunbutter from '../assets/menu-pictures/vegan_sunbutter.png';

import { Grid } from '@mui/material';

function MenuBoard() {
    return (
        <div>
            <div className="customer-header">
            <WeatherIcon />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <OptionsDropdown sidePadding={20}/>
            </div>

            
            <div className='menu-board'>
                <Grid container direction="column">
                    {/* Everyday menu items
                    Caramel Salt Lick
                    Coffee with Cream
                    Dark Chocolate, Olive Oil & Sea Salt
                    Fresh Mint & Chocolate Chunk
                    Goat Cheese, Thyme & Honey
                    Hill Country Honey & Vanilla Bean
                    Roasted Beets & Fresh Mint
                    Milk Chocolate
                    Texas Sheet Cake
                    */}
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayCaramelSalt} alt="Caramel Salt Lick" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Caramel Salt Lick
                                </h1>
                                <p1 className='menu-body'>
                                    Salty and sweet make it official! House made caramel is elevated by just a hint of sea salt.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayCoffeeCream} alt="Coffee Cream" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Coffee with Cream
                                </h1>
                                <p1 className='menu-body'>
                                    Milk & cream steeped in locally roasted Third Coast Coffee, lightly sweetened with pure cane syrup and subtly accented with a touch of Mexican vanilla.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayDarkChocolate} alt="Dark Chocolate, Olive Oil & Sea Salt" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Dark Chocolate, Olive Oil & Sea Salt
                                </h1>
                                <p1 className='menu-body'>
                                    Buttery notes from SRSLY Chocolate and Texas Olive Ranch olive oil shine through this dark chocolate and sea salt flavor.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayMintChocolateChunk} alt="Fresh Mint & Chocolate Chunk" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Goat Cheese, Thyme & Honey
                                </h1>
                                <p1 className='menu-body'>
                                    Fresh local mint is joined by chunks of house made SRSLY Chocolate ganache to perfect this crips & refreshing classic!
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayGoatCheese} alt="Goat Cheese, Thyme & Honey" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Goat Cheese, Thyme & Honey
                                </h1>
                                <p1 className='menu-body'>
                                    Fresh, local thyme and Good Flow honey pair perfectly with Austin's own creamy Pure Luck goat cheese.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayHoneyVanillaBean} alt="Hill Country Honey & Vanilla Bean" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Hill Country Honey & Vanilla Bean
                                </h1>
                                <p1 className='menu-body'>
                                    Madagascar bourbon vanilla beans are enhanced by the sweet, complex notes of local Good Flow Honey.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayRoastedBeans} alt="Roasted Beets & Fresh Mint" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Roasted Beets & Fresh Mint
                                </h1>
                                <p1 className='menu-body'>
                                    Clean, crisp garden mint flawlessly complements the slightly sweet, earthy flavor of roasted Johnson's Backyard Garden beets.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayMilkChocolate} alt="Milk Chocolate" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Milk Chocolate
                                </h1>
                                <p1 className='menu-body'>
                                    Flecks of local SRSLY Chocolate and the finest milk and cream are churned to classic perfection!
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={everydayTexasSheetCake} alt="Texas Sheet Cake" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Texas Sheet Cake
                                </h1>
                                <p1 className='menu-body'>
                                    Our interpretation of this classic cake combines a swirl of decadent chocolate-pecan icing with delicate chocolate ice cream.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>


                    {/* Seasonal Menu Items
                        Pumpkin Pie
                        Apple Pie
                        Pudding Cake
                    */}
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={seasonalPumpkinPie} alt="Seasonal Pumpkin Pie Ice Cream" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Hazel's Pumpkin Pie
                                </h1>
                                <p1 className='menu-body'>
                                    Roasted Texas pie pumpkins are enhanced by clove, a bit of cinnamon, and freshly ground nutmeg. Just like a slice of Granny Hazel's pie!
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={seasonalAppliePie} alt="Seasonal Apple Cake" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Caramel Apple Cake
                                </h1>
                                <p1 className='menu-body'>
                                    Bites of our spice cake, studded with candied Texas apples, are folded into our Good Flow Honey caramel ice cream. (contains gluten & egg)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={seasonalPuddingCake} alt="Seasonal Pudding Cake" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Date Pudding Cake
                                </h1>
                                <p1 className='menu-body'>
                                    Caramelized Texas date cake and velvety vanilla oat milk ice cream star in this vegan love story. Get two scoops, and it's a date! (vegan, contains gluten)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>


                    {/* Dairy Free/Vegan
                        Honey Sunbutter
                        Vanilla Pear Cake
                    */}
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={veganSunbutter} alt="Vegan Honey Sunbutter" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Honey Sunbutter
                                </h1>
                                <p1 className='menu-body'>
                                This late summer flavor is the perfect blend of sunflower seed SunButter and local Good Flow Honey.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={veganVanillaPear} alt="Vegan Vanilla Pear Cake" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Vanilla Pear Cake
                                </h1>
                                <p1 className='menu-body'>
                                    Smooth & creamy oat milk base is accented with vanilla, a silky swirl of our house made pear butter and bites of our luscious gluten free pear coffee cake.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    

                    {/* Sandwiches
                        Caramel Salt Lick
                        Hill Country Honey & Vanilla Bean
                        Vegan Vanilla
                        Dark Chocolate, Olive Oil & Sea Salt
                    */}

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={sandwichCaramel} alt="Caramel Salt Lick Sandwich" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Caramel Salt Lick
                                </h1>
                                <p1 className='menu-body'>
                                Salty and sweet make it official! House made caramel ice cream is elevated by just a hint of sea salt then slathered between two soft chocolate cake cookies.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={sandwichHoneyVanilla} alt="Hill Country Honey and Vanilla Bean Sandwich" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Hill Country Honey & Vanilla Bean
                                </h1>
                                <p1 className='menu-body'>
                                    Madagascar bourbon vanilla beans are enhanced by the sweet, complex notes of local Good Flow Honey in this classic ice cream sandwich.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={sandwichVeganVanilla} alt="Vegan Vanilla Sandwich" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Vegan Vanilla
                                </h1>
                                <p1 className='menu-body'>
                                    Our creamy coconut milk ice cream is accented with vanilla and sandwiched between two vegan & gluten free soft chocolate cake cookies.
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={sandwichDarkChocolate} alt="Dark Chocolate, Olive Oil and Sea Salt Sandwich" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Dark Chocolate, Olive Oil & Sea Salt
                                </h1>
                                <p1 className='menu-body'>
                                    Buttery notes from SRSLY Chocolate and Texas Olive Ranch olive oil shine through our chocolate and sea salt ice cream and pair perfectly with decadent chocolate cake cookies
                                </p1>
                            </div>
                        </Grid>
                    </Grid>


                    {/* Toppings
                        Chocolate Sauce
                        Caramel Sauce
                        Toasted Texas Pecans
                        Chocolate Cookie Crumbles
                        Rainbow Sprinkles
                        Strawberry
                        Whipped Cream
                    */}
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingChocolate} alt="Chocolate Sauce" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Chocolate Sauce
                                </h1>
                                <p1 className='menu-body'>
                                    Our dark chocolate sauce is made from scratch in our kitchen with only four ingredients! It's a great addition to any of our flavors. (vegan, dairy free, wheat free)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingCaramel} alt="Caramel Sauce" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Caramel Sauce
                                </h1>
                                <p1 className='menu-body'>
                                    Our rich caramel sauce is made from scratch in our kitchen with only four ingredients! It makes a great, sweet and salty addition to any flavor. (wheat free)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingPecan} alt="Pecans" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Toasted Texas Pecans
                                </h1>
                                <p1 className='menu-body'>
                                    Texas pecans are the best pecans! We toast and chop local San Saba, TX pecans in our Northwest Austin kitchen. (vegan, wheat free)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingChocolateCookie} alt="Chocolate Cookie Crumble" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Chocolate Cookie Crumble
                                </h1>
                                <p1 className='menu-body'>
                                    Our take on our favorite crunchy chocolate cookies! This chocolatey, buttery crumble in made from scratch by our team. (non GMO)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingRainbowSprinkles} alt="Rainbow Sprinkles" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Rainbow Sprinkles
                                </h1>
                                <p1 className='menu-body'>
                                    Classic sprinkles made with vibrant, plant-based colors by Color Kitchen! (non-GMO, wheat free)
                                </p1>
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingStrawberry} alt="Strawberry" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Strawberry
                                </h1>
                                <p1 className='menu-body'>
                                    Our fresh strawberry sauce is made from scratch in our kitchen only three ingredients including sweet local Texas strawberries!
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={toppingWhippedCream} alt="Whipped Cream" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Whipped Cream
                                </h1>
                                <p1 className='menu-body'>
                                    Take your favorite ice cream to the next level with our sweet, whipped cream!
                                </p1>
                            </div>
                        </Grid>
                    </Grid>

                    {/* Beverages
                        Southside Craft Soda
                        Cold Brew High Brew Coffee
                        Nitro Coffee High Brew Coffee
                        Richard’s Rainwate
                    */}

                    <Grid item container spacing={30} justifyContent="center">
                        <Grid item>
                            <img className="menu-picture" src={beverages} alt="Image Beverages" />
                        </Grid>
                        <Grid item>
                            <div className='menu-description'>
                                <h1 className='menu-header'>
                                    Beverages
                                </h1>
                                <p1 className='menu-body'>
                                    Southside Craft Soda <br />
                                </p1>
                                <p1 className='menu-body'>
                                    Cold Brew High Brew Coffee <br />
                                </p1>
                                <p1 className='menu-body'>
                                    Nitro Coffee High Brew Coffee <br />
                                </p1>
                                <p1 className='menu-body'>
                                    Richard’s Rainwater
                                </p1>
                            </div>
                        </Grid>
                    </Grid>


                </Grid>

            </div>
        </div>
    );
};

export default MenuBoard;