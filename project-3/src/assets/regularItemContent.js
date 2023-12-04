// regularItemContent.js
// This file declares and exports a javascript object containing data required to render the regular items in the menu board

//image imports for ice cream sanwiches
import caramelSandwich from './menu-pictures/sandwich_caramel.png';
import vanillaSandwich from './menu-pictures/sandwich_honey_vanilla.png';
import chocolateSandwich from './menu-pictures/sandwich_dark_chocolate.png';

//image imports for everyday items
import caramelSaltLick from './menu-pictures/everyday_caramel_salt.png';
import coffeeCream from './menu-pictures/everyday_coffee_cream.png';
import darkChocolate from './menu-pictures/everyday_dark_chocolate.png';
import mintChocolate from './menu-pictures/everyday_mint_chocolate_chunk.png';
import goatCheese from './menu-pictures/everyday_goat_cheese.png';
import honeyVanillaBean from './menu-pictures/everyday_honey_vanilla_bean.png';
import beetMint from './menu-pictures/everyday_roasted_beans.png';
import milkChocolate from './menu-pictures/everyday_milk_chocolate.png';
import sheetCake from './menu-pictures/everyday_texas_sheet_cake.png';

//image imports for seasonal items
import applePie from './menu-pictures/seasonal_apple_pie.png';
import puddingCake from './menu-pictures/seasonal_pudding_cake.png';
import pumpkinPie from './menu-pictures/seasonal_pumpkin_pie.png';

//image imports from dairy free/vegan items
import veganSunbutter from './menu-pictures/vegan_sunbutter.png';
import veganVanillaPear from './menu-pictures/vegan_vanilla_pear.png';

//image imports from beverages
import rootBexarImage from './menu-pictures/rootBexar.png';
import texaColaImage from './menu-pictures/texaCola.png';
import lemoncitoImage from './menu-pictures/lemoncitoImage.png';
import coldBrewCoffeeImage from './menu-pictures/coldBrewImage.png';
import nitroCoffeeImage from './menu-pictures/nitroColdBrew.png';
import richardWaterImage from './menu-pictures/richardsRainWater.jpg';
import ryanWaterImage from './menu-pictures/ryanWater.jpg';
import chocolateMilk from './menu-pictures/chocolateMilk.jpg';
import cokeImage from './menu-pictures/cokeImage.jpg';

//image imports from toppings
import chocolateSauce from './menu-pictures/topping_chocolate.png';
import caramelSauce from './menu-pictures/topping_caramel.png';
import toastedPecans from './menu-pictures/topping_pecan.png';
import cookieCrumble from './menu-pictures/topping_chocolate_cookie.png';
import rainbowSprinkle from './menu-pictures/topping_rainbow_sprinkle.png';
import strawberry from './menu-pictures/topping_strawberry.png';
import whippedCream from './menu-pictures/topping_whipped_cream.png';

// image import for new product
import newProduct from './menu-pictures/newProduct.jpg';

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

export default regularItemContent;