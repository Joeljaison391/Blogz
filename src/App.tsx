import "./App.css";
import Routes from "./Routes/ReactRoutes";
import { AuthProvider } from "./Context/AuthContext";
import { Provider } from "react-redux";
import store from "./Context/store";

function App() {
  return (
    <>
      <AuthProvider>
        <Provider store={store} >
          <Routes />
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
