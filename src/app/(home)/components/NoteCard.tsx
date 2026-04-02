import React from "react";

const NoteCard = () => {
  return (
    <div className="flex flex-col justify-between p-4 bg-white border border-stone-300 rounded-lg min-h-full">
      <a href="https://lqrs.com/brands/bushmills/">
        <img
          className="p-8 rounded-t-lg"
          src="https://jumpichiban.com/cdn/shop/files/one-piece-figure-king-of-artist-monkey-d-luffy-gear-5_3.jpg?v=1738181253&width=2000"
          alt="Monkey D. Luffy Gear 5"
        />
      </a>
      <div className="grow mb-5">
        <a href="https://lqrs.com/brands/bushmills/">
          <h5 className="text-sm sm:text-lg leading-5 sm:leading-6 font-medium text-stone-900">
            ONE PIECE FIGURE KING OF ARTIST - MONKEY D LUFFY GEAR 5
          </h5>
        </a>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-stone-900">Rs. 8900/-</span>
      </div>
    </div>
  );
};

export default NoteCard;