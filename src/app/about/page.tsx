import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-12 gap-8">
      {/* About Us Section */}
      <div className="md:w-1/2 bg-white text-blue-800 p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">About Us</h1>

        <p className="text-lg mb-4">
          Welcome to <span className="font-semibold text-blue-700">La Muncheria</span> – your home for fresh, healthy, and delicious food since 2009.
        </p>

        <p className="text-lg mb-4">
          For over <span className="font-semibold text-blue-700">15 years</span>, we&apos;ve been passionately serving a wide variety of food made with the finest ingredients, authentic recipes, and a dash of innovation. From classic mac and cheese to modern fusion twists, our menu is designed to satisfy every food lover.
        </p>

        <p className="text-lg mb-4">
          What makes us special? It’s our <span className="font-semibold text-blue-700">commitment to health and quality</span>. We use minimal oil, fresh vegetables, and no preservatives - just clean, wholesome food prepared with love.
        </p>

        <p className="text-lg mb-4">
          Over the years, our little La Muncheria joint has grown into a <span className="font-semibold text-blue-700">beloved neighborhood favorite</span>. Whether you’re a first-time visitor or a loyal regular, we’re grateful for your support and thrilled to serve you.
        </p>

        <p className="text-lg">
          Come taste the tradition, enjoy the freshness, and be part of our food-loving family!
        </p>
      </div>

      {/* Who We Are Section */}
      <div className="md:w-1/2 bg-blue-50 text-blue-900 p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">Who We Are</h2>

        <p className="text-lg mb-4">
          We are a team of food lovers, chefs, and hospitality professionals driven by one mission - to make your food experience delightful, healthy, and memorable. Our founders started this journey with a simple idea: bring authentic flavors to every plate, while caring for our customers like family.
        </p>

        <p className="text-lg mb-4">
          Every item we serve carries a story - of tradition, care, and continuous improvement. Behind the scenes, our kitchen runs with hygiene, love, and the smell of sizzling batter, while our team greets each guest with a warm smile and a generous spirit.
        </p>

        <p className="text-lg mb-4">
          Whether you&apos;re here for a quick bite or a family feast, we’re here to serve with heart.
        </p>

        <p className="text-lg mt-8 font-semibold text-center text-blue-600">
          La Muncheria – Fresh. Healthy. Loved.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
