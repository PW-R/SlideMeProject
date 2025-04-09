import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function DriverNavBar({tab, setTab}) {

    return(
        <div className="driverNavbar">

            <div className="driverNavbar_box">
                <Link to ='/HomeCustomize'>
                <i className="bi bi-house-door"></i>
                <button>Home</button>
                </Link>
                <Link to ='#'>
                <i className="bi bi-list"></i>
                <button>Menu</button>
                </Link>
                <Link to='#'>
                <i className="bi bi-bell"></i>
                <button>Noti</button>
                </Link>
                <Link>
                <i className="bi bi-person-circle"></i>
                <button>Profile</button>
                </Link>
            </div>
        </div>
    )
}
export default DriverNavBar