import styles from "./Landing.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import hp from "../../assets/hp.png";
import xiaomi from "../../assets/xiaomi.png";
import apple from "../../assets/puma.png";
import samsung from "../../assets/samsung.png";

export const Landing = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Número de imágenes a mostrar por slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const companyLogos = [hp, xiaomi, apple, samsung];
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="ECastillo" />
      </div>

      <div className={styles.content}>
        <div className={styles.divLeft}>
          <h1 className={styles.title}>Bienvenidos Encuesta Interactivas</h1>
          <h4 style={{ color: "#cacaca", fontFamily: "Poppins" }}>
            Challenge - Henry
          </h4>

          <div className={styles.button}>
            <Link to="/home" className={styles.link}>
              <div>Continuar</div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
