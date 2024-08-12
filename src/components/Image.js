import React, { Component } from "react"





/* Component Image */
class Image extends Component {

    constructor() {
        super()

        this.state = {
            loaded: false
        }
    }


    render = () => {

        const { uri } = this.props
        const { loaded } = this.state

        if (!uri) {
            return (
                <div className={`product-image`}>
                    <img src="/images/spare-parts.png" alt="Spare parts" className="food" />
                </div>
            )
        }

        return (
            <div className={`product-image ${loaded ? 'product-image-loaded' : ''}`}>
                <img
                    src={uri}
                    alt="Product"
                    onLoad={() => this.setState({ loaded: true })}
                    onError={() => this.setState({ loaded: false })}
                />
                <img src="/images/spare-parts.png" alt="Spare parts" className="food" />
            </div>
        )
    }

}

export default Image