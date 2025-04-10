import React from "react";
import { Link } from "react-router-dom";

function ShopReccommend() {
    return (
        <div>
            {/* header */}
            <div className="fixed w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
                <Link to="/UserHome">
                    <i className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4"></i>
                </Link>
                <h1 className="text-white">ร้านแนะนำ</h1>
            </div>

            <div className="pt-[140px] px-4 space-y-6">
                <img
                    src="./advert_car1.svg"
                    alt="car1"
                    className="w-full object-contain rounded-xl"
                />
                <img
                    src="./advert_car2.svg"
                    alt="car2"
                    className="w-full object-contain rounded-xl"
                />
                <img
                    src="./advert_car3.svg"
                    alt="car3"
                    className="w-full object-contain rounded-xl"
                />
                <img
                    src="./advert_car4.svg"
                    alt="car4"
                    className="w-full object-contain rounded-xl"
                />
            </div>
        </div>
    );
}

export default ShopReccommend;