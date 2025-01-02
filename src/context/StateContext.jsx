import { CreateContext } from "./CreateContext";
import PropTypes from "prop-types";

const StateContext = ({ children }) => {
  return <CreateContext.Provider value={{}}>{children}</CreateContext.Provider>;
};

export default StateContext;

StateContext.propTypes = {
  children: PropTypes.node.isRequired,
};
