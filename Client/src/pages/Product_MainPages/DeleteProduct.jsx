// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct } from "../../toolkit/ProductSliceRoutes/UserDeleteRoute";
// // import GetProducts from "./GetProducts";


// const DeleteProduct = () => {
//   const dispatch = useDispatch();
//   const { data, status } = useSelector((state) => state.products);

//   useEffect(() => {
//     // dispatch(GetProducts());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       dispatch(deleteProduct(id));
//       alert("Product Deleted Successfully!");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Delete Products</h1>
//       {status === "loading" && <p>Loading...</p>}
//       {status === "succeeded" && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {data.map((product) => (
//             <div key={product._id} className="border p-4 rounded shadow relative">
//               <img src={product.image} alt={product.Title} className="h-40 object-cover w-full rounded mb-2" />
//               <h2 className="font-semibold">{product.Title}</h2>
//               <p>{product.Category}</p>
//               <button
//                 onClick={() => handleDelete(product._id)}
//                 className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeleteProduct;
