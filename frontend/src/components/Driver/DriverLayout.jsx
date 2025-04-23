import { Outlet } from 'react-router';
import DriverNavBar from './DriverNavBar';


function DriverLayout() {
    return ( 
        <AppWrapper>
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-auto">
            <Outlet />
          </div>
          <DriverNavBar />
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

export default DriverLayout;