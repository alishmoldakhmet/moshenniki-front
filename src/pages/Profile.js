import React, { Component } from "react"

/* Components */
import { Block } from "../components"

/* Widgets */
import { Settings } from '../widgets/Profile'



/* Page Profile */
class Profile extends Component {

    render = () => {
        return (
            <Block>
                <Settings />
            </Block>
        )
    }

}

export default Profile