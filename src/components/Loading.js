import React, { Component } from "react";

/* Icons */
import { LoadingOutlined } from '@ant-design/icons'

class Loading extends Component {

    render = () => {

        return (
            <div className="loading-outer">
                <LoadingOutlined />
            </div>
        )

    }

}

export default Loading 