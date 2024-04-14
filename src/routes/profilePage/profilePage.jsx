import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useContext, useEffect, useState } from "react";
import { logout } from "../../api";
import { AuthContext } from "../../context/authContext";

function ProfilePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    setError("");
    const result = await logout();
    if (result === "OK") {
      updateUser(null);
      navigate("/");
    } else {
      setError("Logout Failed");
    }
  };
  return (
    user && (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <button>Update Profile</button>
            </div>
            <div className="info">
              <span>
                Avatar:
                <img
                  src={user.avatar || "https://avatar.iran.liara.run/public"}
                  alt=""
                />
              </span>
              <span>
                Username: <b>{user.username}</b>
              </span>
              <span>
                E-mail: <b>{user.email}</b>
              </span>
              <button onClick={handleLogout}>Logout</button>
              {error && <span className="error">{error}</span>}
            </div>
            <div className="title">
              <h1>My List</h1>
              <button>Create New Post</button>
            </div>
            <List />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
