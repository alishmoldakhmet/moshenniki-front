import React, { Component } from "react"

/* Helpers */
import { withRouter } from '../helpers'

/* Redux */
import { connect } from 'react-redux'

/* Router */
import { NavLink } from "react-router-dom"

/* JWT */
import { isExpired, decodeToken } from "react-jwt"

/* Constants */
import { env } from "../constants"


/*
    Widget Menu
*/
class Menu extends Component {


    /* Draw User */
    _user = () => {

        const { token, toggle } = this.props

        if (!token || isExpired(token)) {
            return (
                <div onClick={() => toggle(true)} className="mobile-menu-user">
                    <div className="menu-active-menu-image-box">
                        <img src="/images/mobile/profile.png" alt="Профиль" />
                    </div>
                    <p>Профиль</p>
                </div>
            )
        }

        const user = token ? decodeToken(token) : null

        return (
            <NavLink to="/account" className="mobile-menu-item">

                {(user && user.image)
                    ? <div className="menu-active-menu-image-box">
                        <img className="menu-active-menu-image ava" src={`${env.mediapoint}users/${user.image}`} alt="Профиль" />
                    </div>
                    : <div className="menu-active-menu-image-box">
                        <img src="/images/mobile/profile.png" alt="Профиль" />
                        <img className="menu-active-menu-image" src="/images/mobile/profile-active.png" alt="Профиль" />
                    </div>
                }

                <p>{(user && user.name) ? user.name : "Профиль"}</p>

            </NavLink>
        )


    }


    _favourite = () => {
        const { token, toggle } = this.props

        if (!token || isExpired(token)) {
            return (
                <div onClick={() => toggle(true)} className="mobile-menu-item">
                    <img src="/images/mobile/heart.png" alt="Избранное" />
                    <img className="menu-active-menu-image" src="/images/mobile/heart-active.png" alt="Профиль" />
                    <p>Избранное</p>
                </div>
            )
        }

        return (
            <NavLink to="/favourite/mobile" className="mobile-menu-item">
                <img src="/images/mobile/heart.png" alt="Избранное" />
                <img className="menu-active-menu-image" src="/images/mobile/heart-active.png" alt="Профиль" />
                <p>Избранное</p>
            </NavLink>
        )
    }



    render = () => {

        const { cart } = this.props

        return (
            <div className="mobile-menu">

                <NavLink to="/" className="mobile-menu-item">
                    <img src="/images/mobile/home.png" alt="Главная" />
                    <img className="menu-active-menu-image" src="/images/mobile/home-active.png" alt="Профиль" />
                    <p>Главная</p>
                </NavLink>

                <NavLink to="/category/mobile" className="mobile-menu-item">
                    <img src="/images/mobile/category.png" alt="Категория" />
                    <img className="menu-active-menu-image" src="/images/mobile/category-active.png" alt="Профиль" />
                    <p>Категория</p>
                </NavLink>

                <NavLink to="/cart/mobile" className="mobile-menu-item">
                    <img src="/images/mobile/cart.png" alt="Корзина" />
                    <img className="menu-active-menu-image" src="/images/mobile/cart-active.png" alt="Профиль" />
                    <p>Корзина</p>
                    {cart.length > 0 && <div className="mobile-menu-item-cart">{cart.length}</div>}
                </NavLink>


                {this._favourite()}
                {this._user()}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: data => dispatch({ type: 'TOGGLE_MODAL', payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))