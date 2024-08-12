import React, { Component } from "react"

/* Components */
import { Block } from "../components"

/* Widgets */
import { ReviewsForMeBlock } from '../widgets/Profile'



/* Page Password */
class ReviewsForMe extends Component {

    render = () => {
        return (
            <Block>
                <ReviewsForMeBlock />
            </Block>
        )
    }

}

export default ReviewsForMe