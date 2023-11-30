import { useEffect, useState } from "react";
import axios from "axios";
import { links, contacts } from "./data";
import Logo from "../../assets/images/anonymous_person.png";
import "./footer.css";
const Footer = () => {
  const [feedback, setFeedback] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popUpContent, setPopupContent] = useState("");
  const handleInputChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3001/api/v1/feedback", feedback)
      .then((res) => {
        setShowPopup(true);
        setPopupContent(
          `Success! Your message has been received,${res.data.data.userName}`
        );
        setFeedback({});
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    let timeout;
    if (showPopup) {
      timeout = setTimeout(() => {
        setShowPopup(false);
        setPopupContent("");
        setFeedback({});
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [showPopup]);
  return (
    <footer>
      <div className="container footer__container">
        <div className="footer__items nav__cont">
          <a href="index.html">
            <img src={Logo} alt="Logo" className="nav__logo" />
          </a>
          <ul className="nav__menu nav__menu__footer">
            {links.map((fLink) => (
              <li key={fLink.id}>
                <a href={fLink.link}>{fLink.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__items contact">
          <h2>Get In touch </h2>
          <div className="contact__message">
            <form>
              <div className="form__section">
                <label>Name</label>
                <br />
                <input
                  // onChange={handleInputChange}
                  type="text"
                  name="userName"
                  required
                  className="take__input"
                />
              </div>
              <div className="form__section">
                <label>Email</label>
                <br />
                <input
                  // onChange={handleInputChange}
                  type="text"
                  name="email"
                  required
                  className="take__input"
                />
              </div>

              <div className="form__section">
                <label>Message</label>
                <br />
                <textarea
                  // onChange={handleInputChange}
                  type="text"
                  name="message"
                  required
                  className="take__input"
                  width="320px"
                />
              </div>
              <div className="success__message">
                {showPopup && <p>{popUpContent}</p>}
              </div>
              <button
                // onClick={handleSubmit}
                type="submit"
                className="btn primary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="footer__items footer__follow">
          <h3>Follow Us</h3>
          <div className="footer__socials">
            {contacts.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <small>2023 Lalisa Bula &copy; All Rights Reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
