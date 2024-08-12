import React, { Component } from "react"

/* Widgets */
import Menu from './Menu'

/* Icons */
import { LoadingOutlined } from '@ant-design/icons'

/* JWT */
import { isExpired } from "react-jwt"

/* REST API */
import { changePassword } from '../../api/User'

/* Swal */
import Swal from 'sweetalert2'

/* Helpers */
import { withRouter } from '../../helpers'

/* Redux */
import { connect } from 'react-redux'



/*
    Widget Change Password
*/
class Password extends Component {

    constructor() {
        super()

        this.state = {
            password: '',
            newPassword: '',
            repeatPassword: '',
            waiting: false
        }
    }

    componentDidMount = () => {
        const { token, navigate } = this.props

        if (!token || isExpired(token)) {
            navigate('/')
        }
    }

    save = () => {

        const { password, newPassword, repeatPassword } = this.state
        const { token } = this.props


        if (password === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите старый пароль', showConfirmButton: false, timer: 1500 })
            return
        }

        if (password.length < 8) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите старый пароль больше 8 символов', showConfirmButton: false, timer: 1500 })
            return
        }

        if (newPassword === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите новый пароль', showConfirmButton: false, timer: 1500 })
            return
        }

        if (newPassword.length < 8) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите новый пароль больше 8 символов', showConfirmButton: false, timer: 1500 })
            return
        }

        if (repeatPassword !== newPassword) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Пароли не совпадают', showConfirmButton: false, timer: 1500 })
            return
        }


        changePassword(token, { password, newPassword }).then(response => {
            if (response.status === 200) {
                this.setState({ password: "", newPassword: "", repeatPassword: "" })
                Swal.fire({ icon: 'success', title: 'Ваш пароль успешно изменен', showConfirmButton: false, timer: 1500 })
            }
            else if (response.status === 401) {
                Swal.fire({ icon: 'error', title: 'Неверный пароль', text: 'Старый пароль неверный', showConfirmButton: false, timer: 1500 })
            }
            else {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
            }
        }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
        })
    }

    render = () => {

        const { password, newPassword, repeatPassword, waiting } = this.state

        return (
            <div className="profile">
                <div className="profile-wrapper">
                    <div className="profile-container">

                        <Menu page="password" />

                        <div className="profile-box">
                            <div className="profile-form">

                                <h2>Изменить пароль</h2>

                                <div className="profile-form-row">
                                    <p>Старый пароль</p>
                                    <input value={password} onChange={event => this.setState({ password: event.target.value })} placeholder="Введите старый пароль" />
                                </div>

                                <div className="profile-space" />

                                <div className="profile-form-row">
                                    <p>Создайте новый пароль</p>
                                    <input value={newPassword} onChange={event => this.setState({ newPassword: event.target.value })} placeholder="Введите новый пароль" />
                                </div>

                                <div className="profile-form-row">
                                    <p>Повторите новый пароль</p>
                                    <input value={repeatPassword} onChange={event => this.setState({ repeatPassword: event.target.value })} placeholder="Повторите новый пароль" />
                                </div>

                                <div className="profile-space" />

                                <div onClick={() => this.save()} className="profile-form-button">
                                    {waiting ? <LoadingOutlined /> : "Сохранить"}
                                </div>

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

export default connect(mapStateToProps)(withRouter(Password))