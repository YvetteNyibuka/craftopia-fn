const ManageDecors = () => {
    const decorList = [
      { id: 1, name: "Wooden Vase", price: "$25", stock: 10 },
      { id: 2, name: "Ceramic Pot", price: "$40", stock: 5 },
      // Add more decors here
    ];
  
    return (
      <div className="ml-64 mt-16 p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Decors</h1>
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorList.map((decor) => (
              <tr key={decor.id}>
                <td className="p-4">{decor.name}</td>
                <td className="p-4">{decor.price}</td>
                <td className="p-4">{decor.stock}</td>
                <td className="p-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default ManageDecors;
  