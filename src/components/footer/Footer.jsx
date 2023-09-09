import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";
import whatsaap from "../../assets/whatsaap.png";
import email from "../../assets/email.png";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.divLeft}>
        © 2023 Challenge Encuesta EDCastillo - Henrry. All Rights Reserved.
      </div>

      <div className={styles.divRight}>
        <Link to="https://github.com/edcastillob/" target="_blank">
          <img className={styles.logo} src={github} alt="Github" />
        </Link>
        <Link to="https://wa.me/5804145994073" target="_blank">
          <img className={styles.logo} src={whatsaap} alt="WhatsApp" />
        </Link>
        <Link to="mailto:edwar.castillo@gmail.com">
          <img className={styles.logo} src={email} alt="Email" />
        </Link>
        <Link to="https://www.linkedin.com/in/edcastillob/" target="_blank">
          <img className={styles.logo} src={linkedin} alt="LinkedIn" />
        </Link>
      </div>
    </footer>
  );
};
