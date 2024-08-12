
/* PRICE CONVERTOR */
export const convertor = price => {

    /* Check the price for the void */
    if (price === null || price === undefined)
        return ""

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₸"
}



/* CHECK DATA */
export const check = value => {

    /* Check the value for the void */
    if (value === null || value === undefined)
        return ""

    return value
}

export const get_numbers = value => {
    return value.replace(/\D/g, "")
}


/* EMPTY */
export const empty = value => {

    /* Check the value for the void */
    if (value === null || value === undefined)
        return null

    return value
}

/* GET BLACK AND WHITE IMAGES */
export const get_black_and_white_img = (src1, src2, text) => {
    return [
        <img className="black" src={src1} alt={text} />,
        <img className="white" src={src2} alt={text} />
    ]
}