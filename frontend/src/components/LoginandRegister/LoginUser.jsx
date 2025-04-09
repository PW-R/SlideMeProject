import { Link } from "react-router-dom";

function LoginUser() {
  return (
    <div>
      <h1>Login User</h1>
      <Link to="/UserHome">
        <button>ไปฝั่งคนใช้โว้ยยยยยยยยย</button>
      </Link>
    </div>
  );
}

export default LoginUser;
