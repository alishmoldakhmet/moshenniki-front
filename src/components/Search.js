import React, { Component } from "react"

class Search extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount = () => {

    }

    change = (text) => {
        const { type, setSearchText } = this.props
        let tempText = text.replace(/\D/g, "")
        if (type === 'iin') {
            if (text.length <= 12) {
                setSearchText(tempText)
            }
        } else {
            let val = tempText.replace(/ /gm, '');
            if (val !== '7' && val.length === 1) {
                val = '7'
            }
            if (val !== '77' && val.length === 2) {
                val = '77'
            }

            let num = `${val.substring(0, 1)} ${val.substring(1, 4)} ${val.substring(4, 7)} ${val.substring(7, 9)} ${val.substring(9, 11)}`;
            num = num.trim();
            setSearchText("+" + num)
        }
    }

    submit = event => {
        const { submit } = this.props
        event.preventDefault()
        submit()
    }

    render = () => {

        const { type, searchText } = this.props

        const text = type === 'phone' ? "номеру телефона" : "ИИН"

        return (
            <div className="search">
                <form onSubmit={this.submit}>
                    <input id="search" placeholder={`Поиск по ${text}`} value={searchText} onChange={event => this.change(event.target.value)} />
                    <div className="search-button" onClick={this.submit}>
                        <img src="/images/search.png" alt="Search" />
                    </div>
                </form>
            </div>
        )

    }

}

export default Search