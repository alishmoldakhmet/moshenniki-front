import React, { Component } from "react"

/* Icons */
import { LoadingOutlined } from '@ant-design/icons'

/* Modal */
import Modal from 'react-modal'

/* Connect */
import { connect } from 'react-redux'

/* REST API */
import { login, register } from '../api/User'

/* Swal */
import Swal from 'sweetalert2'

/* Helpers */
import { withRouter } from '../helpers'


/* Default Settings */
Modal.setAppElement("#root")


/*
    Widget Authorization
*/
class Authorization extends Component {

    constructor() {
        super()

        this.state = {
            mode: "login",
            name: "",
            email: "",
            password: "",
            loading: false,
            secure: true
        }
    }


    /* LOGIN */
    login = () => {

        const { email, password } = this.state
        const { setToken, toggle, clear } = this.props

        if (email === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите Email', showConfirmButton: false, timer: 1500 })
            return
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Неправильный Email', showConfirmButton: false, timer: 1500 })
            return
        }

        if (password === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите пароль', showConfirmButton: false, timer: 1500 })
            return
        }

        if (password.length < 8) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите пароль больше 8 символов', showConfirmButton: false, timer: 1500 })
            return
        }

        this.setState({ loading: true })


        login({ email, password }).then(response => {
            if (response.status === 200) {
                setToken(response.data.token)
                toggle(false)
                clear()
                window.location.reload()
                Swal.fire({ icon: 'success', title: 'Авторизация прошла успешно', showConfirmButton: false, timer: 1500 })
            }
            else if (response.status === 404) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Неверный Email и(или) пароль', showConfirmButton: false, timer: 1500 })
            }
            else if (response.status === 401) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Неверный Email и(или) пароль', showConfirmButton: false, timer: 1500 })
            }
            else {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
            }
        }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
        }).finally(() => {
            this.setState({ loading: false })
        })
    }


    /* Registration */
    register = () => {

        const { name, email, password } = this.state
        const { setToken, toggle } = this.props

        if (name === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите свое имя', showConfirmButton: false, timer: 1500 })
            return
        }

        if (email === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите Email', showConfirmButton: false, timer: 1500 })
            return
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Неправильный Email', showConfirmButton: false, timer: 1500 })
            return
        }

        if (password === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите пароль', showConfirmButton: false, timer: 1500 })
            return
        }

        if (password.length < 8) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите пароль больше 8 символов', showConfirmButton: false, timer: 1500 })
            return
        }

        this.setState({ loading: true })

        register({ name, email, password }).then(response => {

            if (response.status === 200) {
                setToken(response.data.token)
                toggle(false)
                Swal.fire({ icon: 'success', title: 'Регистрация прошла успешно', showConfirmButton: false, timer: 1500 })
            }
            else if (response.status === 401) {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Пользователь с таким Email уже существует', showConfirmButton: false, timer: 1500 })
            }
            else {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
            }
        }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
        }).finally(() => {
            this.setState({ loading: false })
        })
    }


    /* Remind */
    remind = () => {
        const { email } = this.state

        if (email === "") {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите Email', showConfirmButton: false, timer: 1500 })
            return
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Неправильный Email', showConfirmButton: false, timer: 1500 })
            return
        }

        Swal.fire({ icon: 'success', title: 'На вашу почту отправлена ссылка с доступом!', showConfirmButton: false, timer: 1500 })
        this.setState({ mode: "login", name: "", email: "", password: "" })
    }


    /* Draw Login */
    _login = () => {

        const { mode, email, password, loading, secure } = this.state

        if (mode === "login") {
            return (
                <div className="auth-box">
                    <div className="auth-title">Вход</div>
                    <div className="auth-text">Войдите или зарегистрируйтесь, чтобы продолжить</div>

                    <div className="auth-form">
                        <input type="email" value={email} onChange={event => this.setState({ email: event.target.value })} placeholder="Email" />

                        <div className="auth-form-password">
                            <input type={secure ? "password" : "text"} value={password} onChange={event => this.setState({ password: event.target.value })} placeholder="Пароль" />
                            <div onClick={() => this.setState({ secure: !secure })} className="auth-form-secure">
                                {secure ? <img src="/images/show.png" alt="Show" /> : <img src="/images/hide.png" alt="Hide" />}
                            </div>
                        </div>

                        <div className="auth-link auth-forgot" onClick={() => this.setState({ mode: "remind", name: "", email: "", password: "", secure: true })}>Забыли пароль?</div>

                        <button disabled={loading} onClick={() => this.login()} className="auth-button">
                            {loading ? <LoadingOutlined /> : "Войти"}
                        </button>

                        <div className="auth-bottom">
                            <span>У вас нет аккаунта?</span>
                            <div onClick={() => this.setState({ mode: "register", name: "", email: "", password: "", secure: true })} className="auth-link">Создать аккаунт</div>
                        </div>

                    </div>
                </div>
            )
        }
    }


    /* Navigate to Privacy */
    toPrivary = () => {
        const { navigate, toggle } = this.props
        toggle(false)
        navigate("/privacy-policy")
    }


    /* Draw Registration */
    _register = () => {

        const { mode, name, email, password, loading, secure } = this.state

        if (mode === "register") {
            return (
                <div className="auth-box">

                    <div className="auth-header">
                        <div onClick={() => this.setState({ mode: "login", name: "", email: "", password: "" })} className="auth-back">
                            <img src="/images/back.png" alt="Back" />
                        </div>
                        <div className="auth-title">Регистрация</div>
                    </div>
                    <div className="auth-text">Войдите или зарегистрируйтесь, чтобы продолжить</div>

                    <div className="auth-form">

                        <input type="text" value={name} onChange={event => this.setState({ name: event.target.value })} placeholder="Имя" />
                        <input type="email" value={email} onChange={event => this.setState({ email: event.target.value })} placeholder="Email" />
                        <div className="auth-form-password">
                            <input type={secure ? "password" : "text"} value={password} onChange={event => this.setState({ password: event.target.value })} placeholder="Создайте пароль" />
                            <div onClick={() => this.setState({ secure: !secure })} className="auth-form-secure">
                                {secure ? <img src="/images/show.png" alt="Show" /> : <img src="/images/hide.png" alt="Hide" />}
                            </div>
                        </div>

                        <div onClick={() => this.register()} className="auth-button">
                            {loading ? <LoadingOutlined /> : "Зарегистрироваться"}
                        </div>
                        <div className="auth-term">
                            Нажимая  кнопку "Зарегистрироваться", вы принимаете условия <div className="auth-term-link" onClick={() => this.toPrivary()}>Пользовательского соглашения</div>
                        </div>

                        <div className="auth-bottom">
                            <span>У вас уже есть аккаунт?</span>
                            <div onClick={() => this.setState({ mode: "login", name: "", email: "", password: "", secure: true })} className="auth-link">Войти</div>
                        </div>

                    </div>
                </div>
            )
        }
    }


    /* Draw Remind */
    _remind = () => {
        const { mode, email } = this.state

        if (mode === "remind") {
            return (
                <div className="auth-box">
                    <div className="auth-header">
                        <div onClick={() => this.setState({ mode: "login", name: "", email: "", password: "" })} className="auth-back">
                            <img src="/images/back.png" alt="Back" />
                        </div>
                        <div className="auth-title">Восстановить пароль</div>
                    </div>

                    <div className="auth-text">Введите Email, чтобы восстановить пароль</div>

                    <div className="auth-form">

                        <input type="email" value={email} onChange={event => this.setState({ email: event.target.value })} placeholder="Email" />

                        <div onClick={() => this.remind()} className="auth-button">Восстановить</div>
                    </div>
                </div>
            )
        }
    }



    render = () => {

        const { modal, toggle } = this.props

        return (
            <Modal
                isOpen={modal}
                onRequestClose={() => toggle(false)}
                className="auth-modal"
                overlayClassName="auth-overlay"
            >

                <div onClick={() => toggle(false)} className="auth-close">
                    <img src="/images/x.png" alt="X" />
                </div>

                {/* AUTH LOGO */}
                <div className="auth-logo">
                    <img src="/images/logo.png" alt="T&N Group" />
                </div>

                {this._login()}
                {this._register()}
                {this._remind()}

            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        modal: state.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: data => dispatch({ type: 'TOGGLE_MODAL', payload: data }),
        setToken: data => dispatch({ type: 'ADD_TOKEN', payload: data }),
        clear: () => dispatch({ type: 'CLEAR_CART', payload: [] }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authorization))