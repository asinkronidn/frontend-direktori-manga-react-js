import { Link } from "react-router-dom";
import "./headerStyle.css";

const Heading = () => {
  return (
    <header className="header-container">
      <div className="header-title">Mangalists</div>
      <Link to={'/input'} className="button-wrapper">
        <div>
          <img src="/plus.svg" />
          Add Data
        </div>
      </Link>
    </header>
  );
};

export default Heading;
