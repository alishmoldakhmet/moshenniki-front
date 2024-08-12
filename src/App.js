import React, { Component } from "react"

/* Components */
import { } from "./components"

/* Redux */
import { Provider } from 'react-redux'
import { store } from "./store"

/* Widgets */
import { Layout, Header, Footer, Authorization } from "./widgets"


class App extends Component {

    constructor() {
        super()

        this.state = {
            token: null,
            loading: false
        }

    }

    componentDidMount = () => {
    }

    render = () => {

        const { token, loading } = this.state

        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        )
    }

}

export default App