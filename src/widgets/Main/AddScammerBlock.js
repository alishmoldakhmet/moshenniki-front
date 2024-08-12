import React, { Component } from "react"

/* Components */
import { Loading, Network } from '../../components'

/* Helpers */
import { withRouter, utils } from '../../helpers'

/* Redux */
import { connect } from 'react-redux'

/* JWT */
import { isExpired } from "react-jwt"

/* REST API */
import { create } from '../../api/Review'
/* Mask */
import InputMask from 'react-input-mask'

/* Modal */
import Modal from 'react-modal'

/* Swal */
import Swal from 'sweetalert2'

/* Widget Checkout */
class AddScammerBlock extends Component {

    constructor() {
        super()

        this.state = {
            name: '',
            iin: '',
            phone: '',
            email: '',

            loading: false,
            network: false,
            error: false,

            title: '',
            description: '',

            images: [],
            gallery: [],

            anonimously: 0,

            modal: false,
            width: 0
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }


    componentDidMount = () => {
        this.load()
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    }



    /* Load */
    load = () => {
    }

    create = () => {

        const { name, iin, phone, email, title, description, anonimously, images, width } = this.state
        const { token, navigate } = this.props


        if (name === '') {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите имя', showConfirmButton: false, timer: 1500 })
            return
        }

        if (iin === '' && phone === '') {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите иин или телефон', showConfirmButton: false, timer: 1500 })
            return
        }

        if (iin.length > 0 && utils.get_numbers(iin).length < 12) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Неправильный ИИН/БИН', showConfirmButton: false, timer: 1500 })
            return
        }

        if (phone.length > 0 && phone.length !== 18) {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите телефон', showConfirmButton: false, timer: 1500 })
            return
        }

        if (title === '') {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите заголовок', showConfirmButton: false, timer: 1500 })
            return
        }

        if (description === '') {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Введите описание', showConfirmButton: false, timer: 1500 })
            return
        }

        const data = new FormData()
        data.append('name', name)
        data.append('iin', iin)
        data.append('phone', utils.get_numbers(phone))
        data.append('email', email)
        data.append('title', title)
        data.append('description', description)
        data.append('anonymously', anonimously)

        if (images.length > 0) {
            images.forEach((picture) => {
                data.append(`images`, picture)
            })
        }

        // for (var pair of data.entries()) {
        // }

        create(token, data).then(response => {
            console.log(response.status)
            console.log(response.data)
            if (response.status === 200) {
                navigate(width > 768 ? `/my-reviews` : `/my-reviews`)
                Swal.fire({ icon: 'success', title: 'Отзыв отправлен', text: 'Ждите одобрения администратора', showConfirmButton: false, timer: 1500 })
            }
            else {
                Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
            }
        }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Ошибка!', text: 'Что-по пошло не так! Попробуйте позднее', showConfirmButton: false, timer: 1500 })
        })
    }


    /* Upload to Gallery */
    uploadGallery = event => {

        const { gallery, images } = this.state

        for (let file of event.target.files) {
            images.push(file)
            gallery.push(URL.createObjectURL(file))
        }

        this.setState({ gallery, images })
    }


    /* Remove from gallery */
    removeGallery = index => {
        const { gallery, images } = this.state

        gallery.splice(index, 1)
        images.splice(index, 1)

        this.setState({ gallery, images })
    }

    render = () => {

        const { loading, network, error, name, iin, phone, title, description, gallery, anonimously } = this.state
        const { navigate } = this.props

        if (loading) {
            return <Loading />
        }

        if (error) {
            return <Network error reload={() => this.load()} />
        }

        if (network) {
            return <Network reload={() => this.load()} />
        }


        return (
            <div className="add-scammer">
                <div className="add-scammer-wrapper">

                    <div className="add-scammer-title">
                        <div onClick={() => navigate(-1)} className="add-scammer-back">
                            <img src="/images/back.png" alt="Back" />
                        </div>
                        <h2>Добавление мошенника</h2>
                    </div>

                    <div className="add-scammer-box">

                        <div className="add-scammer-form">

                            <div className="add-scammer-form-box">

                                <div className="add-scammer-form-row">
                                    <p>Имя</p>
                                    <input type="text" value={name} onChange={event => this.setState({ name: event.target.value })} placeholder="Введите имя" />
                                </div>

                                <div className="add-scammer-form-row">
                                    <p>ИИН/БИН</p>
                                    <input type="text" value={iin} onChange={event => utils.get_numbers(event.target.value).length <= 12 && this.setState({ iin: utils.get_numbers(event.target.value) })} placeholder="Введите ИИН/БИН" />
                                </div>

                                <div className="add-scammer-form-row">
                                    <p>Номер телефона</p>
                                    <InputMask value={phone} onChange={event => this.setState({ phone: event.target.value })} mask="+7 (999) 999-99-99" placeholder="Введите номер телефона" />
                                </div>
                            </div>

                            <div className="add-scammer-form-box">

                                <div className="add-scammer-form-row">
                                    <p>Заголовок</p>
                                    <input type="text" value={title} onChange={event => this.setState({ title: event.target.value })} placeholder="Введите заголовок" />
                                </div>

                                <div className="add-scammer-form-row">
                                    <p>Описание</p>
                                    <textarea value={description} onChange={event => this.setState({ description: event.target.value })} placeholder="Ваше комментарии"></textarea>
                                </div>

                            </div>


                            <p>Доказательства</p>

                            <div className="content-gallery-box">

                                <label className="content-gallery-file">
                                    <input multiple={true} onChange={event => this.uploadGallery(event)} type="file" name="file" accept="image/png, image/jpeg" />
                                    <div className="content-gallery-button">
                                        <img src="/images/main/image.png" alt="Add" />
                                    </div>
                                </label>

                                {gallery.map((item, index) =>
                                    <div key={`${index}`} className="content-gallery-item">
                                        <img src={item} alt="Gallery" />
                                        <div onClick={() => this.removeGallery(index)} className="content-gallery-remove">
                                            <img alt="Minus" src="/images/main/minus.png" />
                                        </div>
                                    </div>
                                )}

                            </div>


                            <div className="add-scammer-form-box">
                                <div className="add-scammer-anonimously">
                                    <div className={anonimously ? `anonimously` : `anonimously-disabled`} onClick={() => this.setState({ anonimously: anonimously ? 0 : 1 })}>
                                        {anonimously ? <div className="checked"><div className="checked-inner" /></div> : <div className="unchecked" />}
                                        <span>Анонимно</span>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => this.create()} className="add-scammer-box-button">Отправить</div>

                        </div>
                    </div>

                </div>

                <div className="add-scammer-box-mobile-bottom">
                    <div onClick={() => this.create()} className="add-scammer-box-mobile-button">Отправить</div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddScammerBlock))