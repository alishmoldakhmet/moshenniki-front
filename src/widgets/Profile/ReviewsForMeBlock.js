import React, { Component } from "react"

/* Widgets */
import Menu from './Menu'


class ReviewsForMeBlock extends Component {
    constructor() {
        super()
    }

    render = () => {

        return (
            <div className="profile">
                <div className="profile-wrapper">
                    <div className="profile-container">
                        <Menu page="reviews-for-me" />

                        <div className="profile-box">
                            <div className="profile-form">
                                <h2>Отзывы обо мне</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )

    }
}

export default ReviewsForMeBlock