import { Link } from 'react-router-dom';

function DriverorUser() {
    return ( 
        <div>
        <Link to="/LoginDriver">
          <button>LOGINDRIVER</button>
        </Link>
  <br />
        <Link to="/LoginUser">
          <button>LOGINUSER</button>
        </Link>
      </div>
    );
}

export default DriverorUser;