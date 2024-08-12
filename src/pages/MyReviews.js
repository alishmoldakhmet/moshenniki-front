import React, { Component } from "react"

/* Components */
import { Block } from "../components"

/* Widgets */
import { MyReviewsBlock } from '../widgets/Profile'



/* Page Password */
class MyReviews extends Component {

    render = () => {
        return (
            <Block>
                <MyReviewsBlock />
            </Block>
        )
    }

}

export default MyReviews