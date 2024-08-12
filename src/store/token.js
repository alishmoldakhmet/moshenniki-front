/* Cart TOKEN */

const tokenJSON = localStorage.getItem("token")
const DEFAULT = tokenJSON ? tokenJSON : null

const token = (state = DEFAULT, action) => {

    switch (action.type) {

        case 'ADD_TOKEN':
            const token = action.payload
            localStorage.setItem("token", token)
            return token

        case 'REMOVE_TOKEN':
            localStorage.removeItem("token")
            return null

        default:
            return state
    }
}

export default token