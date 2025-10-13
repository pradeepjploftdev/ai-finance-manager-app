import { combineReducers } from 'redux'

// Menu
import itemsReducer from './item/itemReducer'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
    items: itemsReducer,
    auth: authReducer,
})

export default rootReducer