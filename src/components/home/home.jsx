import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import reactImage from "../../assets/react.svg";
import postgresqlImage from "../../assets/Postgresql.png";
import reduxImage from "../../assets/redux.png";
import bootstrapImage from "../../assets/bootstrap.svg";
import styles from "./home.module.css";

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      src: reactImage,
      altText: "React",
      caption: "React",
    },
    {
      src: postgresqlImage,
      altText: "PostgreSQL",
      caption: "PostgreSQL",
    },
    {
      src: reduxImage,
      altText: "Redux",
      caption: "Redux",
    },
    {
      src: bootstrapImage,
      altText: "Bootstrap",
      caption: "Bootstrap",
    },
  ];

  const next = () => {
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
  };

  const textDivStyle = {
    width: "60%",
    float: "left",
    paddingTop: "20px", 
    paddingLeft: "20px", 
  };

  const imageDivStyle = {
    width: "40%",
    float: "left",
  };

  return (
    <div className={styles.homeContainer}>
      <div style={textDivStyle}>
        <h1 className="text-center">Descripción del Proyecto</h1>
        <div className={styles.formattedText}>
          <p>
            Este proyecto consiste en desarrollar una aplicación utilizando
            tecnologías de vanguardia como JavaScript, ReactJs, Redux, HTML,
            CSS, NodeJs, ExpressJs y Sequelize. La aplicación tiene la capacidad
            de leer un archivo JSON proporcionado y generar interfaces de
            encuestas únicas para cada ítem en el archivo.
          </p>
          <p>Requisitos del Proyecto:</p>
          <ul>
            <li>
              Desarrollar una aplicación que lea el archivo JSON proporcionado y
              muestre interfaces de encuestas personalizadas.
            </li>
            <li>
              Implementar el envío de respuestas de las encuestas a una base de
              datos propiedad del proyecto, garantizando que no se comparta el
              acceso a la misma.
            </li>
            <li>
              Diseñar una ruta adicional en la aplicación para mostrar las
              respuestas almacenadas en la base de datos. Cuando los usuarios
              presionen el botón "Enviar/Send" en el formulario de encuesta,
              aparecerá un mensaje y se proporcionará acceso a una nueva
              ruta/vista con las respuestas. Además, los usuarios podrán
              actualizar sus respuestas.
            </li>
          </ul>
        </div>
      </div>
      <div style={imageDivStyle}>
        {/* Slider de imágenes */}
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <img
                className={styles.carouselImage}
                src={item.src}
                alt={item.altText}
              />
              <CarouselCaption
                captionText={item.caption}
                captionHeader={item.caption}
              />
            </CarouselItem>
          ))}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
    </div>
  );
};
