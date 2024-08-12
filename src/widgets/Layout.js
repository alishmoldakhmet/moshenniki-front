import React, { Component } from "react";

/* Router */
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

/* Pages */
import { Main, Profile, Password, MyReviews, ReviewsForMe, AddScammer } from "../pages"

/* Widgets */
import Authorization from "./Authorization";

class Layout extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount = () => {

    }


    render = () => {

        return (
            <Router>
                <Routes>
                    <Route path="*" element={<div />} />
                    <Route path="/" element={<Main />} />

                    {/* Profile */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<Password />} />
                    <Route path="/my-reviews" element={<MyReviews />} />
                    <Route path="/reviews-for-me" element={<ReviewsForMe />} />

                    <Route path="/add-scammer" element={<AddScammer />} />

                </Routes>
                <Authorization />
            </Router>
        )

    }

}

export default Layout