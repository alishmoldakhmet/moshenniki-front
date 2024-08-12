import React, { Component } from "react"

/* Components */
import { Search, Loading, Block } from "../components"

import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

/* Constants */
import { env, examples } from "../constants";

/* Helpers */
import { utils } from "../helpers";

/* React Router */
import { Link } from "react-router-dom"

/* Api */
import { get } from "../api/Review";


/* Images */
const user_img = utils.get_black_and_white_img('/images/main/author.png', '/images/main/author-white.png', 'author')
// const star_img = utils.get_black_and_white_img('/images/main/star.png', '/images/main/star-white.png', 'author')

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            searchType: "iin",
            searchText: "",
            userinfo: null,
            reviews: [],
        }
    }

    componentDidMount = () => {

    }

    search = () => {

        const { searchType, searchText, loading } = this.state

        if (loading) {
            return
        }

        if (searchType === 'iin') {
            if (searchText.length < 12) {
                NotificationManager.error('Неправильный ИИН', 'Ошибка', 4000, () => { alert('callback'); });
                return
            }
        } else {
            if (searchText.length < 16) {
                NotificationManager.error('Неправильный номер телефона', 'Ошибка', 4000, () => { alert('callback'); });
                return
            }
        }

        this.setState({ loading: true, userinfo: null, reviews: [] })


        get({ type: searchType, text: searchText.replace(/\D/g, "") }).then(response => {
            console.log(response.status)
            console.log(response.data)
            if (response.status === 200) {
                const data = response.data
                this.setState({ userinfo: data.scammer, reviews: data.reviews })
            }
        }).finally(() => {
            this.setState({ loading: false })
        })

        // setTimeout(() => {
        //     this.setState({ loading: false, userinfo: examples.data.user, reviews: examples.data.reviews })
        // }, 2000)

    }

    render = () => {

        const { loading, searchType, searchText, userinfo, reviews } = this.state

        return (
            <Block>

                <div className="page">

                    <div className="page-title">Поиск</div>

                    <div className="switch-selector">
                        <div className={`select ${searchType === 'iin' ? "selected" : ""}`} onClick={() => this.setState({ searchType: "iin", searchText: "" })}>
                            <p>По ИИН</p>
                        </div>
                        <div className={`select ${searchType === 'phone' ? "selected" : ""}`} onClick={() => this.setState({ searchType: "phone", searchText: "" })}>
                            <p>По номеру телефона</p>

                        </div>
                    </div>

                    <Link to="/add-scammer">
                        <div className="add-scammer-button-box">
                            <div className="add-button">Добавить мошенника</div>
                        </div>
                    </Link>

                    <Search type={searchType} searchText={searchText} setSearchText={value => this.setState({ searchText: value })} submit={() => this.search()} />

                    {loading ? <Loading /> : null}

                    {
                        userinfo ?
                            <div className="information">

                                <p className="title">Информация</p>

                                <div className="userinfo">
                                    <p className="mb-5">Фио: <span>
                                        {userinfo.names.map((item, index) => {
                                            return <span className="name-item" key={`name-${index}`}>{item.name} </span>
                                        })}</span></p>
                                    <p className="mb-5">ИИН: <span>{userinfo.iin}</span></p>
                                    <p className="mb-5">Номер телефона: <span>
                                        {userinfo.phones.map((item, index) => {
                                            return <span className="name-item" key={`phone-${index}`}>+{item.phone} </span>
                                        })}
                                    </span></p>
                                    {/* <p>Рейтинг: <span>{userinfo.rating}</span></p> */}
                                </div>

                                <p className="review-title">Отзывы: {userinfo.reviewLength}</p>

                                <div className="reviews">
                                    {
                                        reviews.map((item, index) => {
                                            return (
                                                <div className="review-item" key={`r-${index}`}>
                                                    <p className="title">{item.title}</p>
                                                    <div className="inform">
                                                        <div className="description">{item.description}</div>
                                                    </div>
                                                    <div className="images">
                                                        {
                                                            item.images.map((image, ind) => {
                                                                return <img src={env.mediapoint + 'reviews/' + image.image} alt='review' key={`review-${index}-${ind}`} />
                                                            })
                                                        }
                                                    </div>
                                                    {!item.anonymously ? <p className="author">{item.author ? item.author.name : ""}{user_img[0]}{user_img[1]}</p> : <p className="author anonymously">Анонимно</p>}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            : null
                    }

                    <NotificationContainer />
                </div>
            </Block>
        )

    }

}

export default Main