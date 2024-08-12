import React, { Component } from "react"

/* Helpers */
import { withRouter } from '../../helpers'

/* React Router */
import { Link } from "react-router-dom"

/* Connect */
import { connect } from 'react-redux'

/* Swal */
import Swal from 'sweetalert2'



/*
    Widget Menu
*/
class Menu extends Component {


    logout = () => {

        const { navigate, removeToken } = this.props

        Swal.fire({
            title: 'Выйти из аккаунта?',
            text: 'Вы дейсвительно хотите выйти?',
            icon: 'warning',
            confirmButtonText: 'Да, выйти!',
            cancelButtonText: 'Отменить',
            showCancelButton: true,
            confirmButtonColor: '#FF4F4F',
            reverseButtons: true
        }).then(result => {
            if (result.isConfirmed) {
                removeToken()
                navigate("/")
            }
        })
    }



    render = () => {

        const { page } = this.props

        return (
            <div className="profile-menu">
                <Link className={page === "profile" ? "active" : ""} to="/profile">Профиль</Link>
                <Link className={page === "my-reviews" ? "active" : ""} to="/my-reviews">Мои отзывы</Link>
                <Link className={page === "reviews-for-me" ? "active" : ""} to="/reviews-for-me">Отзывы обо мне</Link>
                <Link className={page === "password" ? "active" : ""} to="/change-password">Изменить пароль</Link>
                <div onClick={() => this.logout()} className="profile-menu-logout" to="/address">Выйти</div>
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
        removeToken: () => dispatch({ type: 'REMOVE_TOKEN', payload: null })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))