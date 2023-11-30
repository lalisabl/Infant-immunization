import "./card.css";

const card = ({ children, className }) => {
  return <article className={`card ${className}`}>{children}</article>;
};

export default card;
