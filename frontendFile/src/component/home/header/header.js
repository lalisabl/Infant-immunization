/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import coverPhoto from "../../../assets/images/infantIm.png";
import "./header.css";

const header = () => {
  return (
    <section id="immunization-header">
      <div className="immunization-header__CoverPhoto">
        <img src={coverPhoto} alt="infantImage" />
      </div>
      <div className="container immunization-header__container">
        <h2>Welcome to Infant Immunization System</h2>
        <p>
          Ensure the health and well-being of your child through our
          comprehensive infant immunization program. We prioritize safety and
          follow recommended vaccination schedules to protect your child from
          preventable diseases.
        </p>
        <div className="immunization-header__cta">
          <a href="#appointments" className="btn primary">
            Schedule Immunization
          </a>
          <a href="#vaccines" className="btn light">
            Learn About Vaccines
          </a>
        </div>
      </div>
    </section>
  );
};

export default header;
