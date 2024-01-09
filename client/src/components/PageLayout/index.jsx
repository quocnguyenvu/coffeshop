import { Footer } from "../Footer";
import { PageBanner } from "../PageBanner";
import PropTypes from "prop-types";

export const PageLayout = ({ children }) => {
  return (
    <>
      <PageBanner title="Welcome to the store" />
      {children}
      <Footer />
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
