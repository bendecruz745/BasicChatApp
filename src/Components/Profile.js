import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../Reducers/loggedInSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  // console.log("rendering Profile component");
  return (
    <div>
      <Button className="logout-button" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
