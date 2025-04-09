import { Link } from 'react-router-dom';

function LoginDriver() {
    return ( 
        <div>
            <h1>Login driver</h1>
            <Link to="/HomeCustomize">
              <button>ไปฝั่งคนขับโว้ยยยยยยยย</button>
            </Link>
        </div>
     );
}

export default LoginDriver;