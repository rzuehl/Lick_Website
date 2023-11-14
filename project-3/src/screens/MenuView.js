/* MenuView.js
 * React component rendering screen for customers
 * Uses the following external custom comopnents:
 * - General Button
 * - HamburgerButton
 * - ScreenTitle
 * - MenuTile
*/

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import GeneralButton from '../components/GeneralButton';
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
import beverages from '../assets/menu-pictures/beverages.png';

//image imports from toppings
import chocolateSauce from '../assets/menu-pictures/topping_chocolate.png';
import caramelSauce from '../assets/menu-pictures/topping_caramel.png';
import toastedPecans from '../assets/menu-pictures/topping_pecan.png';
import cookieCrumble from '../assets/menu-pictures/topping_chocolate_cookie.png';
import rainbowSprinkle from '../assets/menu-pictures/topping_rainbow_sprinkle.png';
import strawberry from '../assets/menu-pictures/topping_strawberry.png';
import whippedCream from '../assets/menu-pictures/topping_whipped_cream.png';


const MenuView = () => {
    //handling button state
    const [categoryIndex, setCategoryIndex] = useState(0);
    const categoryClick = (index) => {
        setCategoryIndex(index);
    };

    // handling items added to cart
    /* array of objects of the form
        {
            itemImage,
            itemPrice, 
            itemID,
            itemName,
        }
    */
    const [cartItems, setCart] = useState([]);


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
                            <MenuTile src={caramelSandwich} alt="Image depicting Caramel ice cream sandwich" header="Caramel Salt Lick" description="Salty and sweet make it official! House made caramel ice cream is elevated by just a hint of sea salt then slathered between two soft chocolate cake cookies." />
                            <MenuTile src={vanillaSandwich} alt="Image depicting Hill country Honey and Vanilla Bean ice cream sandwich" header="Vanilla Bean" description="Madagascar bourbon vanilla beans are enhanced by the sweet, complex notes of local Good Flow Honey in this classic ice cream sandwich." />
                            <MenuTile src={vanillaSandwich} alt="Image depicting Vegan Vanilla ice cream sandwich" header="Vegan Vanilla" description="Our creamy coconut milk ice cream is accented with vanilla and sandwiched between two vegan & gluten free soft chocolate cake cookies." />
                            <MenuTile src={chocolateSandwich} alt="Image depicting dark chocolate ice cream sandwich" header="Dark Chocolate" description="Buttery notes from SRSLY Chocolate and Texas Olive Ranch olive oil shine through our chocolate and sea salt ice cream which pair perfectly with decadent chocolate cake cookies" />
                        </div>
                    </div>
                )}
                {/*Section rendering Everyday items*/}
                {categoryIndex === 1 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            <MenuTile src={caramelSaltLick} alt="Image depicting caramel salt lick everyday icecream" header="Caramel Salt Lick" description="Salty and sweet make it official! House made caramel is elevated by just a hint of sea salt." />
                            <MenuTile src={coffeeCream} alt="Image depicting everyday icecream Coffee with cream" header="Coffee with Cream" description="Milk & cream steeped in locally roasted Third Coast Coffee, lightly sweetened with pure cane syrup and subtly accented with a touch of Mexican vanilla." />
                            <MenuTile src={darkChocolate} alt="Image depicting everyday icecream Dark Chocolate, olive oil, and sea salt" header="Dark Chocolate" description="Buttery notes from SRSLY Chocolate and Texas Olive Ranch olive oil shine through this dark chocolate and sea salt flavor." />
                            <MenuTile src={mintChocolate} alt="Image depicting everyday icecream Fresh Mint and Chocolate Chunk" header="Mint & Chocolate Chunk" description="Fresh local mint is joined by chunks of house made SRSLY Chocolate ganache to perfect this crips & refreshing classic!" />
                            <MenuTile src={goatCheese} alt="Image depicting everyday icecream Goat Cheese, Thyme and Honey" header="Goat Cheese" description="Fresh, local thyme and Good Flow honey pair perfectly with Austin's own creamy Pure Luck goat cheese." />
                            <MenuTile src={honeyVanillaBean} alt="Image depicting everyday icecream Hill Country Honey and Vanilla Bean" header="Honey & Vanilla Bean" description="Madagascar bourbon vanilla beans are enhanced by the sweet, complex notes of local Good Flow Honey." />
                            <MenuTile src={beetMint} alt="Image depicting everyday icecream Roasted Beet & Fresh Mint" header="Beets & Fresh Mint" description="Clean, crisp garden mint flawlessly complements the slightly sweet, earthy flavor of roasted Johnson's Backyard Garden beets." />
                            <MenuTile src={milkChocolate} alt="Image depicting everyday icecream Milk Chocolate" header="Milk Chocolate" description="Flecks of local SRSLY Chocolate and the finest milk and cream are churned to classic perfection!" />
                            <MenuTile src={sheetCake} alt="Image depicting everyday icecream Texas Sheet Cake" header="Texas Sheet Cake" description="Our interpretation of this classic cake combines a swirl of decadent chocolate-pecan icing with delicate chocolate ice cream." />
                        </div>
                    </div>
                )}
                {/*Section rendering seasonal items*/}
                {categoryIndex === 2 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            <MenuTile src={pumpkinPie} alt="Image depicting seasonal item Pumpkin Pie" header="Hazel's Pumpkin Pie" description="Roasted Texas pie pumpkins are enhanced by clove, a bit of cinnamon, and freshly ground nutmeg. Just like a slice of Granny Hazel's pie!" />
                            <MenuTile src={applePie} alt="Image depicting seasonal item Caramel Apple Cake" header="Caramel Apple Cake" description="Bites of our spice cake, studded with candied Texas apples, are folded into our Good Flow Honey caramel ice cream. (contains gluten & egg)" />
                            <MenuTile src={puddingCake} alt="Image depicting seasonal item Data Pudding Cake" header="Date Pudding Cake" description="Caramelized Texas date cake and velvety vanilla oat milk ice cream star in this vegan love story. Get two scoops, and it's a date! (vegan, contains gluten)" />
                        </div>
                    </div>                    
                )}
                {/*section rendering Dairy Free/vegan Items*/}
                {categoryIndex === 3 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            <MenuTile src={veganSunbutter} alt="Image depicting gluten free/vegan item sunbutter" header="Honey Sunbutter" description="This late summer flavor is the perfect blend of sunflower seed SunButter and local Good Flow Honey." />
                            <MenuTile src={veganVanillaPear} alt="Image depicting gluten free/vegan item vanilla pear" header="Vanilla Pear Cake" description="Smooth & creamy oat milk base is accented with vanilla, a silky swirl of our house made pear butter and bites of our luscious gluten free pear coffee cake." />
                        </div>
                    </div>   
                )}
                {/*Section rendering beverages*/}
                {categoryIndex === 4 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            <MenuTile src={beverages} alt="Image depicting all available beverage options" header="Beverages" description="Southside Craft Soda, Cold Brew High Brew Coffee, Nitro Coffee High Brew Coffee, Richard’s Rainwater" />
                        </div>
                    </div>  
                )}
                {/*Section rendering toppings*/}
                {categoryIndex === 5 && (
                    <div className="menu-section">
                        <div className="menu-grid">
                            <MenuTile src={chocolateSauce} alt="Image depicting chocolate sauce topping" header="Chocolate Sauce" description="Our dark chocolate sauce is made from scratch in our kitchen with only four ingredients! It's a great addition to any of our flavors. (vegan, dairy free, wheat free)" />
                            <MenuTile src={caramelSauce} alt="Image depicting caramel sauce topping" header="Caramel Sauce" description="Our rich caramel sauce is made from scratch in our kitchen with only four ingredients! It makes a great, sweet and salty addition to any flavor. (wheat free)" />
                            <MenuTile src={toastedPecans} alt="Image depicting texas toasted pecan topping" header="Texas Toasted Pecans" description="exas pecans are the best pecans! We toast and chop local San Saba, TX pecans in our Northwest Austin kitchen. (vegan, wheat free)" />
                            <MenuTile src={cookieCrumble} alt="Image depicting Chocolate Cookie Crumbles" header="Chocolate Cookie Crumble" description="Our take on our favorite crunchy chocolate cookies! This chocolatey, buttery crumble in made from scratch by our team. (non GMO)" />
                            <MenuTile src={rainbowSprinkle} alt="Image depicting rainbow sprinkles" header="Rainbow Sprinkles" description="Classic sprinkles made with vibrant, plant-based colors by Color Kitchen! (non-GMO, wheat free)" />
                            <MenuTile src={strawberry} alt="Image depicting the strawberry topping" header="Strawberry" description="Our fresh strawberry sauce is made from scratch in our kitchen only three ingredients including sweet local Texas strawberries!" />
                            <MenuTile src={whippedCream} alt="Image depicting the whipped cream topping" header="Whipped Cream" description="Take your favorite ice cream to the next level with our sweet, whipped cream!" />
                        </div>
                    </div>                      
                )}

            </div>
        </div>
    );
}

export default MenuView;