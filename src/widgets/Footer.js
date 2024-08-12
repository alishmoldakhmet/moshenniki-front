import React, { Component } from "react"

class Footer extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render = () => {

        return (
            <div className="footer">
                <div className="footer-wrapper">
                    <div className="footer-box">
                        <div className="footer-item footer-main">
                            <div className="footer-logo">
                                <a href="/">
                                    <img src="/images/logo.png" alt="logo" />
                                </a>
                            </div>
                            <p>В современном мире каждый из нас может столкнуться с мошенничеством. Наша цель - создать безопасное пространство, где люди могут делиться информацией о мошенниках, предупреждать других и объединяться в борьбе против обмана.</p>
                            <div className="footer-info">
                                <img src="/images/home.png" alt="Home" />
                                <b>Казахстан, г. Алматы, ​Рубинштейна 50​</b>
                            </div>
                            <div className="footer-info">
                                <img src="/images/mail.png" alt="Mail" />
                                <b>murat.ntk@gmail.com</b>
                            </div>
                        </div>
                        <div className="footer-item">
                            <span>Example 1</span>
                            <a href="/">Example 2</a>
                            <a href="/">Example 3</a>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="footer-item">
                            <span>Example 1</span>
                            <a href="/">Example 2</a>
                            <a href="/">Example 3</a>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="footer-item">
                            <span>Example 1</span>
                            <a href="/">Example 2</a>
                            <a href="/">Example 3</a>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="copy">
                        <p>© 2023 «Sary group» Все права защищены.</p>
                        <img src="/images/footer/visa.png" alt="Visa" />
                        <div className="social-network">
                            <p>Оставайся на связи:</p>
                            <div className="social-network-box">
                                <a target="_blank" rel="noreferrer" href="/">
                                    <img src="/images/footer/2gis.png" alt="2GIS" />
                                </a>
                                <a target="_blank" rel="noreferrer" href="/">
                                    <img src="/images/footer/instagram.png" alt="Instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }

}

export default Footer