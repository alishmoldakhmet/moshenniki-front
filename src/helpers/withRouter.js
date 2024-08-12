import React from "react"

/* Router */
import { useNavigate, useParams } from "react-router-dom"


/*
    Helper withRouter
*/
const withRouter = Component => {

    const Wrapper = props => {

        const navigate = useNavigate()
        const params = useParams()

        return (
            <Component
                navigate={navigate}
                params={params}
                {...props}
            />
        )
    }

    return Wrapper
}


export default withRouter