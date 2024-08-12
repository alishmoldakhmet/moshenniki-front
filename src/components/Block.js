import React, { Component } from "react"

/* Widgets */
import { Header, Footer, Menu } from '../widgets'

/* 
    Component Block
*/
class Block extends Component {

    render = () => {

        const { children, text, search } = this.props

        return (
            <div className="app">

                {/* Draw Header */}
                <Header text={text} isSearchPage={search ? true : false} />

                {/* Draw Content */}
                <div className="container">
                    {children}
                </div>

                {/* Draw Footer */}
                <Footer />
                
                {/* Draw Mobile Menu */}
                {/* <Menu /> */}

            </div>
        )
    }
}


export default Block