import React from 'react';
import './style.scss';
import iconfooter from "./image/cards.png";

export const FooterBot = () => {
    return (
        <div className="footer">
            <div className="footer-bottom">
                <div className="about">
                    <div className="s2">ABOUT</div>
                    <div className="s1">About Us</div>
                    <div className="s1">Introduce Your Friends</div>
                    <div className="s1">Why Choose Us?</div>
                    <div className="s1">How It Works?</div>
                    <div className="s1">Areas We Cover</div>
                    <div className="s1">Contact Us</div>
                </div>
                <div className="info">
                    <div className="s2">INFO</div>
                    <div className="s1">FAQs</div>
                    <div className="s1">Apply Online</div>
                    <div className="s1">Terms of Use</div>
                    <div className="s1">Privacy Notice</div>
                    <div className="s1">Cookies Policy</div>
                    <div className="s1">Why Rent?</div>
                    <div className="s1">Complaints Process</div>
                </div>
                <div className="follow">
                    <div className="s2">FOLLOW US</div>
                    <div >
                        <i className="fab fa-facebook custom"></i>
                        <i className="fab fa-twitter-square custom"></i>
                    </div>
                </div>
                <div className="logo-footer">
                    <img src={iconfooter} alt="icon" />
                </div>
            </div>
            <div className="footer-end">
                <div>
                    © Copyright 2020 | Rentalgoods.com is a trading name of Magman & Co. Ltd. |
                    Registered in England & Wales 10359147 | VAT Registration Number 278 1043 03
                </div>
                <div>
                    Registered office: 27 Old Gloucester Street, London, WC1N 3AX. | Authorised and
                    regulated by the Financial Conduct
                    Authority under Firm Reference Number 766537
                </div>
            </div>
        </div>
    )
}

