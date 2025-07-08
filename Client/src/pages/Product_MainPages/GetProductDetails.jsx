import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../toolkit/ProductSliceRoutes/GetIdRoute';
import Navbar from '../../components/Navbar/Navbar';


const GetProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.getProductById);
    // console.log(data)

    useEffect(() => {
        if (id) {
            dispatch(getProductById(id));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-center mt-10">No product found.</div>;
    }

    return (
        <div>
            <Navbar/>
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
            
            {data?.image && (
                <img
                    src={data.image}
                    alt={data.title}
                    className="mt-4 rounded w-full h-100 object-cover"
                />
            )}
            <p className="mb-2"><strong>Title:</strong> {data?.Title}</p>
            <p className="mb-2"><strong>Category:</strong> {data?.Category}</p>
            <p className="mb-2"><strong>Description:</strong> {data?.Description}</p>
            <p className="mb-2"><strong>Cost:</strong> ₹{data?.Cost}</p>
        </div>
        </div>
    );
};

export default GetProductDetails;
