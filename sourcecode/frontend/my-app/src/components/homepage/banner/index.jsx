import React from 'react';
import './style.scss';
import banner1 from './image/gaming-800x534.jpg';

export const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-left">
                <span className="title">Gaming</span>
            </div>
            <div className="banner-right">
                <img className="banner-img" src={banner1} alt="gaming" />
            </div>
        </div>
    )
}