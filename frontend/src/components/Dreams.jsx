import React from "react";

const Dreams = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-2xl text-[#004aad] mb-10 font-semibold">
       Confused about the first step? We’ll help you achieve your dreams step by step!
      </h2>
      <div className="flex flex-wrap justify-center gap-12">
        <img
          src="meta.jpg"
          alt="Meta"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg"
          alt="Netflix"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
          alt="Airbnb"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="Spotify"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg"
          alt="Tesla"
          className="h-10 hover:scale-110 transition"
        />
        <img
          src="/Bloomberg-Logo-500x281.jpg"
          alt="Bloomberg"
          className="h-12 hover:scale-110 transition"
        />
      </div>
    </section>
  );
};

export default Dreams;
