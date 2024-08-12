import React, { Component } from "react"

/* Component Network */
class Network extends Component {

    render = () => {

        const { reload, error, notfound } = this.props

        if (error) {
            return (
                <div className="network">

                    <img src="/images/warning.png" alt="Warning" />

                    <h2>Внутренняя ошибка сервера</h2>
                    <p>Что-то пошло не так! Пожалуйста, попробуйте позднее!</p>

                    {reload && <div onClick={() => reload()} className="network-button">Обновить</div>}

                </div>
            )
        }

        if (notfound) {
            return (
                <div className="network">
                    <img src="/images/error-404.png" alt="Warning" />
                    <h2>Страница не найдена</h2>
                </div>
            )
        }

        return (
            <div className="network">

                <img src="/images/no-wifi.png" alt="NoWIFI" />

                <h2>Отсутсвует подключение к интернету</h2>
                <p>Проверьте подключение к интернету и проверьте еще раз</p>

                {reload && <div onClick={() => reload()} className="network-button">Обновить</div>}

            </div>
        )
    }

}

export default Network