import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { user } = useUser(); //take logged in user

  //if there is logged in user show the buttons
  return (
    <nav>
      <h3>Lost in translation</h3>

      {user !== null && (
        <div>
          <button>
            <NavLink to="/translator">Translator</NavLink>
          </button>
          <button>
            <NavLink to="/profile">Profile</NavLink>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
