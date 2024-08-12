import React, { Component } from "react"

/* Components */
import { Block } from "../components"

/* Widgets */
import { ChangePassword } from '../widgets/Profile'



/* Page Password */
class Password extends Component {

    render = () => {
        return (
            <Block>
                <ChangePassword />
            </Block>
        )
    }

}

export default Password