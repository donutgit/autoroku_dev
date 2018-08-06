import React from "react";
import Link from "react-router-dom/Link";
import Transition from "react-transition-group/Transition";
//mui
import IconButton from "@material-ui/core/IconButton";
// import Link from '@material-ui/icons/Link';
import Favorite from "@material-ui/icons/Favorite";
import Info from "@material-ui/icons/Info";

import classes from "./Gallery.css";

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

const GalleryImages = props => {
  console.log("[GalleryImages RETURN]");
  console.log(props);
  return (
    <div className={classes.Gallery}>
      {props.data.map((car, index) => {
        const duration = 650 + 150 * index;
        return (
          <Transition in={true} appear={true} timeout={duration} key={car.id}>
            {state => {
              return (
                <div
                  style={{
                    transition: `opacity ${duration}ms ease-in-out`,
                    opacity: 0,
                    ...transitionStyles[state]
                  }}
                  className={classes.ImageWrap}
                >
                  <div
                    className={classes.ImageBlock}
                    style={{
                      backgroundImage: `url(${car.imageUrl})`
                    }}
                  >
                    <div className={classes.TitleWrap}>
                      <h2>{car.mark + " " + car.model}</h2>
                      <p>
                        {car.nominations.map((nomination, index) => {
                          return index !== car.nominations.length - 1
                            ? nomination + " | "
                            : nomination;
                        })}
                      </p>

                      <div className={classes.Icons}>
                        <IconButton aria-label="Like" color="inherit">
                          <Favorite />
                        </IconButton>
                        <span> | </span>
                        <IconButton aria-label="Link" color="inherit">
                          {/* <Link /> */}
                        </IconButton>

                        <span> | </span>
                        <Link to={`/cars/${car.id}`} style={{ color: "#fff" }}>
                          <IconButton aria-label="Info" color="inherit">
                            <Info />
                          </IconButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Transition>
        );
      })}
    </div>
  );
};

export default GalleryImages;
