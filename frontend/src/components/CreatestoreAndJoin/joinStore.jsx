function JoinStore() {
    return ( 
        <AppWrapper>
        <div>
            <h1>JoinStore</h1>
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

export default JoinStore;