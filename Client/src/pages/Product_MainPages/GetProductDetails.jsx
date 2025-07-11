import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../toolkit/ProductSliceRoutes/GetIdRoute';
import Navbar from '../../components/Navbar/Navbar';

const GetProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.getProductById);

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
            <div className="max-w-lg mx-auto mt-17 mb-4 p-6 bg-white rounded-2xl shadow-2xl transition hover:shadow-2xl">
                {data?.image && (
                    <div className="w-full aspect-[4/2] rounded-xl overflow-hidden">
                        <img
                            src={data.image}
                            alt={data.Title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}

                <h1 className="text-xl md:text-2xl font-bold m-4 text-gray-800 text-center">{data?.Title}</h1>

                <div className="space-y-2">
                    <p>
                        <span className="inline-block bg-blue-100 text-blue-950 text-base md:text-xl font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Category:
                        </span>
                        <span className="text-black font-semibold text-sm md:text-lg">{data?.Category}</span>
                    </p>
                    <p>
                        <span className="inline-block bg-blue-100 text-blue-950 text-base md:text-xl font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Description:
                        </span>
                        <span className="text-black text-sm md:text-lg">{data?.Description}</span>
                    </p>
                    <p>
                        <span className="inline-block bg-blue-100 text-blue-950 text-base md:text-xl font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Cost:
                        </span>
                        <span className="text-black font-semibold text-sm md:text-lg">₹{data?.Cost}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GetProductDetails;
