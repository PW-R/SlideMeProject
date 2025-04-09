import { Link } from 'react-router-dom';

function UserHome() {
  return (
    <div>
      <Link to="/OrderInfoInputPage">
        <button>ค้นหาผู้ให้บริการใกล้ฉัน</button>
      </Link>

      <Link to="/ShopReccommend">
        <button>ร้านแนะนำ</button>
      </Link>
    </div>
  )
}

export default UserHome;