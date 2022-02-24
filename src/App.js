import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
  FaCalendar,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    let response;
    try {
      response = await fetch(url);
      response = await response.json();
    } catch (error) {
      console.log(error);
    }

    const user = response.results[0];
    setUser(user);
    setLoading(false);
    setTitle("name");
    setTitleValue(`${user.name.title} ${user.name.first} ${user.name.last}`);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function handleMouseOver(e) {
    if (!e.target.classList.contains("icon")) {
      return;
    }

    const newValue = e.target.dataset.label;
    setTitle(newValue);

    switch (newValue) {
      case "name":
        setTitleValue(
          `${user.name.title} ${user.name.first} ${user.name.last}`
        );
        break;

      case "email":
        setTitleValue(`${user.email}`);
        break;

      case "street":
        setTitleValue(
          `${user.location.street.number} ${user.location.street.name}, ${user.location.state} - ${user.location.country}`
        );
        break;
      case "age":
        setTitleValue(`${user.dob.age}`);
        break;
      case "phone":
        setTitleValue(`${user.phone}`);
        break;
      case "password":
        setTitleValue(`${user.login.password}`);
        break;
      default:
        console.log("papaia");
    }
  }
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={user.picture.large} alt="teste" className="user-img" />

          <p className="user-title">My {title} is</p>
          <p className="user-value">{titleValue}</p>

          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleMouseOver}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleMouseOver}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={handleMouseOver}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleMouseOver}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleMouseOver}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleMouseOver}
            >
              <FaLock />
            </button>
          </div>
          <button
            className="btn"
            onClick={() => {
              setLoading(true);
              fetchUser();
            }}
          >
            {loading ? "Loading..." : "Random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
