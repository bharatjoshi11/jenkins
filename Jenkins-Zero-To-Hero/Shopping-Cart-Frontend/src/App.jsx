import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Layout from "./Components/Layout";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';  // Importing uuid library for generating correlation ID
import { getToCart } from "./redux/Slices/shoppingSlice";
import { generateToken, logoutUser } from "./redux/Slices/authSlice";
import { userDetails } from "./redux/Slices/userSlice";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (auth.userLoaded && user) { 
      const userIdString = user.userId ? String(user.userId) : "";
      const userEmailString = user.email ? String(user.email) : "";
      const userFirstNameString = user.firstName ? String(user.firstName) : "";
      const correlationId = uuidv4();  // Generating correlation ID

      if (userIdString) {
        newrelic.setCustomAttribute("email", userEmailString);
        newrelic.setUserId(userIdString);
        newrelic.setCustomAttribute("Name", userFirstNameString);
        newrelic.setCustomAttribute("correlationId", correlationId); // Setting correlation ID
        console.log("User ID and Correlation ID set in New Relic:", userIdString, correlationId);
      }

      dispatch(generateToken(auth.refreshToken));
      dispatch(userDetails());
      dispatch(getToCart({ userId: user.userId })); 
    }
  }, [auth.userLoaded, auth.refreshToken, dispatch, JSON.stringify(user)]);

  useEffect(() => {
    const tokenRefreshInterval = setInterval(() => {
      if (auth.refreshToken) {
        dispatch(generateToken(auth.refreshToken));
      } else {
        localStorage.clear();
        dispatch(logoutUser());
        
        // Uncomment if you want to clear New Relic attributes on logout
        // newrelic.setUserId(null);
        // newrelic.setCustomAttribute("email", null);
        // newrelic.setCustomAttribute("Name", null);
      }
    }, 1800000); // 30 minutes

    return () => clearInterval(tokenRefreshInterval); 
  }, [auth.refreshToken, dispatch]);

  return (
    <div className="min-h-screen font-sans">
      <Layout />
    </div>
  );
}

export default App;
