import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="index-content">
        <h1 className="">Welcome to Bus ticket booking system demo</h1>
        <div className="btn-group mt-4">
          <Link to="/book-ticket" className="btn btn-success">
            Ticket Booking
          </Link>
          <Link to="/dashboard" className="btn btn-warning">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
