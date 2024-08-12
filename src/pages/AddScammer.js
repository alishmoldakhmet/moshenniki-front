import React, { Component } from "react"

/* Components */
import { Block } from "../components"

/* Widgets */
import { AddScammerBlock } from "../widgets/Main"


/* Page AddScammer */
class AddScammer extends Component {

    render = () => {
        return (
            <Block>
                <AddScammerBlock />
            </Block>
        )
    }

}

export default AddScammer