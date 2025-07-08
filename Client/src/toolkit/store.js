import { configureStore } from '@reduxjs/toolkit';
import userGetSlice from './ProductSliceRoutes/UserGetRoute';
import userPostSlice from './ProductSliceRoutes/UserPostRoute';
import userPutSlice from './ProductSliceRoutes/UserPutRoute';
import userDeleteSlice from './ProductSliceRoutes/UserDeleteRoute';
import getIdSlice from './ProductSliceRoutes/GetIdRoute';

import loginSlice from './AuthSliceRoutes/Login';
import signupSlice from './AuthSliceRoutes/Signup';




const store = configureStore({
    reducer: {
        getProducts:userGetSlice,
        postProduct:userPostSlice,
        updateProduct:userPutSlice,
        deleteProduct:userDeleteSlice,
        getProductById:getIdSlice,
        login:loginSlice,
        signup:signupSlice

    },
});

export default store;
