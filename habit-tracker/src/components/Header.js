import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAddHabit }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Button
        id="show-add-habit-form"
        text={showAddHabit ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = { title: "Habit Tracker" };

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
