import React, { Component, Fragment } from "react";
import bread1 from "../../../static/img/carousel/bread1.jpg";
import bread2 from "../../../static/img/carousel/bread2.jpg";
import croissant1 from "../../../static/img/carousel/croissant1.jpg";
import croissant2 from "../../../static/img/carousel/croissant2.jpg";
import croissant3 from "../../../static/img/carousel/croissant3.jpg";
import special1 from "../../../static/img/carousel/special1.jpg";
import special2 from "../../../static/img/carousel/special2.jpg";
import special3 from "../../../static/img/carousel/special3.jpg";
import icoBaguette from "../../../static/img/icon-baguette.svg";
import icoCroissant from "../../../static/img/icon-croissant.svg";
import icoSpecial from "../../../static/img/icon-special.svg";

export class Carousel extends Component {
  render() {
    return (
      <Fragment>
        <div className="body-menu">
          <img src={icoBaguette} alt="" className="icon-home" />
          <div id="carousel1" className="carousel slide" data-ride="carousel">
            <p className="text-menu">"The Best Baguette in Town..."</p>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={bread1} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={bread2}
                  alt="Second slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel1"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel1"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="body-menu menu2">
          <img src={icoCroissant} alt="" className="icon-home" />
          <div id="carousel2" className="carousel slide" data-ride="carousel">
            <p className="text-menu">"Every kind of delicious Croissants!"</p>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={croissant1}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={croissant2}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={croissant3}
                  alt="Second slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel2"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel2"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="body-menu">
          <img src={icoSpecial} alt="" className="icon-home" />
          <div id="carousel3" className="carousel slide" data-ride="carousel">
            <p className="text-menu">"... Some French specialities :-)"</p>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={special1}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={special2}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={special3}
                  alt="Second slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel3"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel3"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Carousel;
