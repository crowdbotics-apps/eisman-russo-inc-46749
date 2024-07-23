import Signin from "../../components/auth/authentication";
import { connect } from "react-redux";
import { loginUserSlice } from "../../redux/slices/auth";

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    loginResponse: state.auth.loginResponse,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginResponse: (data) => {
    dispatch(loginUserSlice(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
