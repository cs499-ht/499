import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Button text={showAdd ? "Close" : "Add"} onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = { title: "Habit Tracker" };

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
