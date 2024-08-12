import React, { Component } from "react"





/* Component Picture */
class Picture extends Component {

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
                <img src="/images/spare-parts.png" alt="Spare parts" className="food" />
            )
        }

        return (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>

                <img
                    style={{ opacity: loaded ? 1 : 0 }}
                    src={uri}
                    alt="Product"
                    onLoad={() => this.setState({ loaded: true })}
                    onError={() => this.setState({ loaded: false })}
                />

                <img src="/images/spare-parts.png" alt="Spare parts" style={{ opacity: loaded ? 0 : 1, position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }} />

            </div>
        )
    }

}

export default Picture