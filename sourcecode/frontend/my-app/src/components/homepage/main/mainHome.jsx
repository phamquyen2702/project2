import React from 'react';
import './style.scss';
import RentalGoods from './image/RentalGoods.png';
import approval from './image/approval.png';
import calendar from './image/calendar.png';
import costs from './image/costs.png';
import freedelivery from './image/freedelivery.png';
import home from './image/home.png';
import insurance from './image/insurance.png';
import local from './image/local.png';
import payments from './image/payments.png';
import repairs from './image/repairs.png';
import tv from './image/tv.png';

function MainHome(props) {
    return (
        <div className="homeContent">
            <div className="homeLogo">
                <img className="background" src={RentalGoods} alt="RentalGoods" />
            </div>
            <div className="choose">
                <div className="choosetop">
                    Why choose us?
                </div>
                <div className="choosebottom">
                    10 Good reasons & exceptional service with a smile!
                </div>
            </div>
            <div className="service">
                <div>
                    <img className="imgservice" src={local} alt="local" />
                    <div>Local independent company</div>
                </div>
                <div>
                    <img className="imgservice" src={approval} alt="approval" />
                    <div>Pay weekly, fortnightly or monthly</div>
                </div>
                <div>
                    <img className="imgservice" src={calendar} alt="calendar" />
                    <div>Free delivery, as quick as 24 hours</div>
                </div>
                <div>
                    <img className="imgservice" src={costs} alt="costs" />
                    <div>Guaranteed lowest weekly payments</div>
                </div>
                <div>
                    <img className="imgservice" src={freedelivery} alt="freedelivery" />
                    <div>No expensive insurance or warranties</div>
                </div>
                <div>
                    <img className="imgservice" src={home} alt="home" />
                    <div>We come to you</div>
                </div>
                <div>
                    <img className="imgservice" src={insurance} alt="insurance" />
                    <div>Fast approval & no set-up fees</div>
                </div>
                <div>
                    <img className="imgservice" src={payments} alt="payments" />
                    <div>Local independent company</div>
                </div>
                <div>
                    <img className="imgservice" src={tv} alt="tv" />
                    <div>Local independent company</div>
                </div>
                <div>
                    <img className="imgservice" src={repairs} alt="repairs" />
                    <div>Local independent company</div>
                </div>
            </div>

        </div>
    );
}

export default MainHome;