import { Header } from "../Header";
import PropTypes from "prop-types";

export const PageBanner = ({ title }) => {
  return (
    <section id="banner">
      <Header />
      <div className="overlay"></div>
      <div className="title">{title}</div>
      <div className="icon">
        <span>
          <img src="../../assets/icons/arrow-down.svg" alt="Arrow down" />
        </span>
      </div>
    </section>
  );
};

PageBanner.propTypes = {
  title: PropTypes.string.isRequired,
};
