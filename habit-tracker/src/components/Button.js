import PropTypes from "prop-types";
import "./css/Button.css"; 

const Button = ({ text, onClick }) => {
  return <button class="ripple" onClick={onClick}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
