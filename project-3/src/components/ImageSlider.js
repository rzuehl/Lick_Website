/* ImageSlider.js
 * Custom react component responsible for rendering slider carousel of images
*/

import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
/**
 * ImageSlider renders an image carousel
 * @param {object} props 
 * @property {array} props.slides - array of javascript objects containing slide data 
 */
function ImageSlider(props) {
    console.log(`I am the best: ${props.slides}`);
    return (
        <Carousel 
        className="carousel" 
        interval={3000} 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showArrows={true} 
        >
            {
                props.slides.map((slide) => <img src={slide.image} alt={slide.altText} />)
            }
        </Carousel>
    );
}

export default ImageSlider;