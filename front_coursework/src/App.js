import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, Form, RouterProvider} from "react-router-dom";
import First from "./First";
import Main from "./Main";

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <First/>},
    {
    path: "main",
    element: <Main/>
  }
  ]);

  return (
      <div className="App">
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
