import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, SET_USER, LOGIN_MODAL, PLANT_TYPE } from "../actions/action";
import { fromJS, List as iList } from 'immutable';
import {countValues} from '../utils';

const initialState = fromJS({
    user: {},
    count: 0,
    cart: {}
});

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_ITEM: {       
            console.log('Payload after deletion is:-', action.payload)     
            return state.withMutations((stateMap)=>{
                 stateMap.set('cart', fromJS(action.payload))
                 .set('count', countValues(Object.keys(stateMap.get('cart').toJS()), stateMap.get('cart').toJS()))
            })
        };

        // case REMOVE_ITEM: {
        //     return state.withMutations((stateMap)=>{
        //         console.log('Value in reducer is:-', action.payload)
        //         return stateMap.update('items', (items) => {
        //             if (items.getIn([Object.keys(action.payload)[0], 'quantity']) === 1) {
        //                 return items.delete(Object.keys(action.payload)[0])
        //             } else {
        //                 return items.set(Object.keys(action.payload)[0], { ...action.payload[Object.keys(action.payload)[0]]})
        //             }
        //         })
        //         .update('count', val => val-1)
        //     })
        // };

        case CLEAR_CART: {
            return state.update('cart', (cart) => {
                return cart.clear()
            }).set('count',0);
        }

        case SET_USER: {
            console.log('Trying to add the user:-', action)
            return state.set('user', fromJS(action.payload))
        }

        case LOGIN_MODAL: {
            console.log('Trying to add the user:-', action)
            return state.set('modal', true)
        }

        case PLANT_TYPE: {
            console.log('Trying to add the plants data in reducer:-', action)
            return state.set('plantSearchResult', fromJS(action.payload))
        }


        default:
            return state;
    }
}

export default rootReducer;