import React, { Component } from "react"

/* Helpers */
import { withRouter } from '../helpers'



/* Component Empty */
class Empty extends Component {

    render = () => {

        const { page, navigate, open } = this.props

        if (page === "address") {

            return (
                <div className="empty-page">

                    <img src="/images/empty/home.png" alt="Home" />

                    <h3>У вас нет адресов</h3>
                    <p>Добавьте адрес чтобы заказать еду на дом</p>

                    <div onClick={() => open()} className="empty-page-button">Добавить адрес</div>

                </div>
            )
        }

        if (page === "order") {
            return (
                <div className="empty-page">

                    <img src="/images/empty/bag.png" alt="Bag" />

                    <h3>У вас нет заказов</h3>
                    <p>Перейдите в главную страницу, чтобы выбрать и заказать нужный товар</p>

                    <div onClick={() => navigate("/")} className="empty-page-button">Посмотреть товары</div>

                </div>
            )
        }

        if (page === "cart") {
            return (
                <div className="empty-page">

                    <img src="/images/empty/cart.png" alt="Cart" />

                    <h3>В Корзине пока пусто</h3>
                    <p>Добавьте что-нибудь из меню</p>

                    <div onClick={() => navigate("/")} className="empty-page-button">Посмотреть товары</div>

                </div>
            )
        }
        
        if (page === "favourite") {
            return (
                <div className="empty-page">

                    <img src="/images/empty/heart.png" alt="Heart" />

                    <h3>В избранном пока ничего нет</h3>
                    <p>Добавляйте товары в Избранное с помощью ♡</p>

                    <div onClick={() => navigate("/")} className="empty-page-button">Посмотреть товары</div>

                </div>
            )
        }

        return <div />
    }

}

export default withRouter(Empty)