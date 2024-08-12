import React, { Component } from "react";

/* Helpers */
import { withRouter } from "../helpers";

/* JWT */
import { isExpired, decodeToken } from "react-jwt"

/* React Router */
import { Link } from "react-router-dom"

/* Redux */
import { connect } from 'react-redux'


class Header extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount = () => {
        // localStorage.removeItem("token")
    }

    /* Go To User */
    goUser = () => {
        const { token, toggle, navigate } = this.props

        if (!token || isExpired(token)) {
            toggle(true)
        }
        else {
            navigate('/profile')
        }
    }


    render = () => {

        const { token } = this.props

        const user = token ? decodeToken(token) : null

        return (
            <div className="header">
                <div className="header-top">
                    <div className="header-top-wrapper">
                        <div className="mobile-logo">
                            <img src="/images/logo.png" alt="Logo" />
                        </div>
                        <div className="header-top-text">Поиск мошенников по всему Казахстану</div>
                        <div className="header-top-language">
                            <img src="/images/language.png" alt="Language" />
                            <span>Русский</span>
                        </div>
                    </div>
                </div>
                <div className="header-box">
                    <div className="header-wrapper">
                        <div className="header-left-box">
                            <div className="header-logo">
                                <Link to="/">
                                    <img src="/images/logo.png" alt="logo" />
                                    <span>Мошенники.kz</span>
                                </Link>
                            </div>
                        </div>
                        <div className="header-right-box" onClick={() => this.goUser()}>

                            <div className="header-user">
                                <img src="/images/user.png" alt="user" />
                                {
                                    user ?
                                        <div className="header-user-text">
                                            <span>Привет</span>
                                            <p>{user.name}</p>
                                        </div>
                                        :
                                        <div className="header-user-text">
                                            <span>Мой аккаунт</span>
                                            <p>Войти</p>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}


const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: data => dispatch({ type: 'TOGGLE_MODAL', payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))