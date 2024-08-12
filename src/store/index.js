import { configureStore } from '@reduxjs/toolkit'

/* Reducers */
import token from './token'
import modal from './modal'

const store = configureStore({
    reducer: {
        token,
        modal,
    }
})

export { store }