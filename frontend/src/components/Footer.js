import React from "react";

function Footer() {
  const currentDate = new Date();

  return (
    <footer className="footer">
      <p className="footer__cooperait">
        &copy; {currentDate.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
