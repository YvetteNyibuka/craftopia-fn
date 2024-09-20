const DashboardContent = () => {
    return (
      <div className="p-4 bg-red-200 w-full">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Total Decors</h2>
            <p className="mt-2 text-3xl">120</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Orders Today</h2>
            <p className="mt-2 text-3xl">24</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="mt-2 text-3xl">$2,540</p>
          </div>
        </div>
      </div>
    );
  };

export default DashboardContent;
  