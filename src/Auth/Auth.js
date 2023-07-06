import { useEffect, useCallback, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, signUp, signIn, handleImageUpload } from "./Firebasejs";
import styles from "./Auth.module.css";
import ErrorBoundary from "../Components/ErrorBoundary";

const initialState = {
  newUser: false,
  name: "",
  email: "",
  password: "",
  profileImg: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_USER":
      return { ...state, newUser: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_PROFILE_IMG":
      return { ...state, profileImg: action.payload };
    default:
      return state;
  }
};

const Auth = () => {
  const [authButtonText, setAuthButtonText] = useState("Sign In");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { newUser, name, email, password, profileImg } = state;
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState(null);

  const navigateCallback = useCallback(navigate, [navigate]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigateCallback("/app");
    }
  }, [user, loading, navigateCallback]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "profileImg") {
      handleImageUpload(files[0])
        .then((data) => {
          dispatch({
            type: `SET_${name.replace(/([A-Z])/g, "_$1").toUpperCase()}`,
            payload: data,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      dispatch({
        type: `SET_${name.replace(/([A-Z])/g, "_$1").toUpperCase()}`,
        payload: value,
      });
    }
  };

  const completeSignInOrSignUp = async (event) => {
    event.preventDefault();
    const result = newUser
      ? await signUp(name, email, password, profileImg)
      : await signIn(email, password);
    if (result?.error) {
      setError(result);
    }
  };

  const toggleForm = () => {
    if (authButtonText === "Sign In") {
      setAuthButtonText("Sign Up");
      dispatch({ type: "SET_NEW_USER", payload: true });
    } else {
      setAuthButtonText("Sign In");
      dispatch({ type: "SET_NEW_USER", payload: false });
    }
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <div className={styles.boxauth}>
      <div className={styles.boxauthcontainer}>
        <span className={styles.linkauth} onClick={toggleForm}>
          Now in {authButtonText} toggle to switch
        </span>
        <label className={styles.title}>Just Food Online Shop</label>

        <ErrorBoundary
          errorInfo={error?.error}
          isError={error?.error ? true : false}
          closeError={closeError}
        >
          <form onSubmit={completeSignInOrSignUp}>
            {newUser && (
              <>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label>
                  Profile Image:
                  <input
                    type="file"
                    name="profileImg"
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <button type="submit">Register</button>
              </>
            )}
            {!newUser && (
              <>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </label>
                <br />

                <button type="submit">Sign In</button>
              </>
            )}
          </form>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Auth;
