import React, { Component } from "react"

/* Widgets */
import Menu from './Menu'


class MyReviewsBlock extends Component {
    constructor() {
        super()
    }

    componentDidMount = () => {
        
    }

    render = () => {

        return (
            <div className="profile">
                <div className="profile-wrapper">
                    <div className="profile-container">
                        <Menu page="my-reviews" />

                        <div className="profile-box">
                            <div className="profile-form">
                                <h2>Мои отзывы</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )

    }
}

export default MyReviewsBlock