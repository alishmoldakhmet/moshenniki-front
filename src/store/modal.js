/* Cart MODAL */
const modal = (state = false, action) => {

    switch (action.type) {

        case 'TOGGLE_MODAL':
            return action.payload

        default:
            return state
    }
}

export default modal