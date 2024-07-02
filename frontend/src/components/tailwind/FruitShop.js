import React from "react";

const FruitShop = () => {
  return (
    <nav className="mt-4">
      <div className="flex justify-between max-w-7xl mx-auto">
        <div>
          <span className="text-4xl font-bold text-green-500">Fruit</span>
          <span className="text-3xl font-thin">Shop</span>
        </div>
        <div>
          <ul className="flex space-x-8">
            <li className="menu border-b-4">
              <a className="font-body no-underline  hover:text-white" href="#">
                Fruits
              </a>
            </li>
            <li className="menu">
            <a className="font-body no-underline  hover:text-white" href="#">
                Vegetables
              </a>
            </li>
            <li className="menu">
              <a className="font-body no-underline  hover:text-white" href="#">
                More
              </a>
            </li>
            <li className="px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 text-green-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default FruitShop;
