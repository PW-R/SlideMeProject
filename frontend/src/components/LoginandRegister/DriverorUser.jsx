import { Link } from 'react-router-dom';

function DriverorUser() {
    return ( 
      <AppWrapper>
        <div className='flex flex-col justify-center items-center gap-5 mt-20'>
          
          <h3 className='text-[#18C338]'>Are You User or Driver ?</h3>

            <Link to="/LoginUser">
              <button className='rounded-full bg-[#2CD64B] w-[300px] h-[50px] text-white font-semibold'>
                <p className='text-white text-xl mb-1'>User</p>
              </button>
            </Link>
            <Link to="/LoginDriver">
              <button className='rounded-full bg-[#2CD64B] w-[300px] h-[50px] text-white font-semibold'>
                <p className='text-white text-xl mb-1'>Driver</p>
              </button>
            </Link>
        </div>
      </AppWrapper>
    );
}

function AppWrapper({ children }) {
  return (
    <div className="w-[390px] h-[844px] mx-auto border border-red-300 shadow-xl overflow-auto relative">
      {children}
    </div>
  );
}

export default DriverorUser;