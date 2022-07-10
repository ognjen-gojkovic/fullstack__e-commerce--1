import React from "react";

const Footer = () => {
  let date = new Date();

  return (
    <>
      <footer className="py-1">
        <p className="text-center mt-1">
          Shopping Cart - {date.getFullYear()}, All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;
