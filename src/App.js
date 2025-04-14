import { Form } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThankYou from "./components/thank-you";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Form />}></Route>
          <Route exact path="/thankyou" element={<ThankYou />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
