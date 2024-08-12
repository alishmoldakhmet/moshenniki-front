import React, { Component } from "react"

/* Components */
import { Loading, Network } from '../../components'

/* Constants */
import { env } from '../../constants'

/* Helpers */
import { withRouter, utils } from '../../helpers'

/* Redux */
import { connect } from 'react-redux'

/* Widgets */
import Menu from "./Menu"

/* Mask */
import InputMask from 'react-input-mask'

/* REST API */
import { get, edit } from '../../api/User'

/* Swal */
import Swal from 'sweetalert2'

/* JWT */
import { isExpired } from "react-jwt"

/* Icons */
import { LoadingOutlined } from '@ant-design/icons'



/*
    Widget Settings
*/
class Profile extends Component {


    constructor() {
        super()

        this.state = {
            name: '',
            birthday: '',
            phone: '',
            email: '',
            iin: '',


            loading: true,
            network: false,
            error: false,
            waiting: false
        }
    }


    componentDidMount = () => {
        this.load()
    }


    /* Load Data */
    load = () => {

        const { token, navigate } = this.props

        if (!token || isExpired(token)) {
            navigate('/')
        }
        else {
            get(token).then(response => {
                if (response.status === 200) {

                    const data = response.data

                    this.setState({
                        name: utils.check(data.name),
                        iin: utils.check(data.iin),
                        phone: utils.check(data.phone),
                        email: utils.check(data.email),
                        error: false,
                        network: false
                    })
                }
                else {
                    this.setState({ error: true })
                }
            }).catch(() => {
                this.setState({ network: true })
            }).finally(() => {
                this.setState({ loading: false })
            })
        }

    }


    /* Save Data */
    save = () => {

        const { name, iin, phone } = this.state
        const { token, setToken } = this.props

        if (name === '') {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите свое имя', showConfirmButton: false, timer: 1500 })
            return
        }

        this.setState({ waiting: true })

        const data = {
            name: utils.empty(name),
            iin: utils.empty(iin),
            phone: utils.empty(phone),
        }

        edit(token, data).then(response => {
            if (response.status === 200) {
                setToken(response.data.token)
                Swal.fire({ icon: 'success', title: 'Данные успешно сохранены', showConfirmButton: false, timer: 1500 })
            }
            else {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
            }
        }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
        }).finally(() => {
            this.setState({ waiting: false })
        })
    }



    render = () => {

        const { name, iin, phone, email, loading, network, error, waiting } = this.state

        if (loading) {
            return (
                <div className="profile">
                    <div className="profile-wrapper">
                        <div className="profile-container">
                            <Menu page="profile" />
                            <div className="profile-box">
                                <Loading />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (network) {
            return (
                <div className="profile">
                    <div className="profile-wrapper">
                        <div className="profile-container">
                            <Menu page="profile" />
                            <div className="profile-box">
                                <Network reload={() => this.load()} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (error) {
            return (
                <div className="profile">
                    <div className="profile-wrapper">
                        <div className="profile-container">
                            <Menu page="profile" />
                            <div className="profile-box">
                                <Network error reload={() => this.load()} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div className="profile">
                <div className="profile-wrapper">
                    <div className="profile-container">

                        <Menu page="profile" />

                        <div className="profile-box">

                            <div className="profile-form">

                                <h2>Личные данные</h2>
                                {/* 
                                <div className="profile-form-row ava">
                                    <p>Ава</p>

                                    {image
                                        ? <label className="profile-form-image">
                                            <input onChange={event => this.uploadFile(event)} type="file" name="file" accept="image/png, image/jpeg" />
                                            <div className="profile-form-edit-button">
                                                <img src="/images/image.png" alt="Add" />
                                            </div>
                                            <div className="profile-form-image-box">
                                                <img alt="User" src={`${env.mediapoint}users/${image}`} />
                                            </div>
                                        </label> :
                                        <label className="profile-form-image">
                                            <input onChange={event => this.uploadFile(event)} type="file" name="file" accept="image/png, image/jpeg" />
                                            <div className="profile-form-image-button">
                                                <img src="/images/image.png" alt="Add" />
                                            </div>
                                        </label>
                                    }

                                </div> */}

                                <div className="profile-form-row">
                                    <p>Имя</p>
                                    <input value={name} onChange={event => this.setState({ name: event.target.value })} placeholder="Введите свое имя" />
                                </div>

                                <div className="profile-form-row">
                                    <p>ИИН/БИН</p>
                                    <input value={iin} onChange={event => this.setState({ iin: event.target.value })} placeholder="Введите ИИН/БИН" />
                                </div>

                                <div className="profile-form-row">
                                    <p>Номер телефона</p>
                                    <InputMask mask="+7 (999) 999-99-99" value={phone} onChange={event => this.setState({ phone: event.target.value })} placeholder="Введите телефон номер" />
                                </div>

                                <div className="profile-form-row">
                                    <p>Эл. Почта</p>
                                    <div className="profile-form-email">
                                        {email}
                                        <img src="/images/lock.png" alt="Lock" />
                                    </div>
                                </div>

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

const mapDispatchToProps = dispatch => {
    return {
        setToken: data => dispatch({ type: 'ADD_TOKEN', payload: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))