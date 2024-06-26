import { useState, useEffect, useContext } from "react"
import useBasketActions from "../../Cart/BasketActions"
import { BasketContext } from "../../Cart/GlobalStateBasket"
import { Link } from "react-router-dom"

function PizzaElement({ item, style, sizeFilter }) {

    const [pizzaSize, setPizzaSize] = useState(sizeFilter)
    const [bortik, setBortik] = useState(false)
    const [ind, setInd] = useState(0)
    const cartContext = useContext(BasketContext)
    const { addToCart, plusElement, minusElement } = useBasketActions()
    let idiwka = item._id + ind + (bortik ? 'bortik' : '')
    const id = cartContext.cartData.find(prod => prod._id === idiwka)
    let updPizza = { ...item, price: item.price[ind] + (bortik ? item.bortyk[ind] : 0), weight: item.weight[ind], _id: idiwka, bortyk: bortik, size: pizzaSize }

    useEffect(() => {
        setPizzaSize(sizeFilter)
        indexHandler(sizeFilter)
        setBortik(false)
    }, [sizeFilter])

    function currentSize(size) {
        setBortik(false)
        setPizzaSize(size)
        indexHandler(size)
    }

    function toggleBortik() {
        setBortik(!bortik)
    }

    function indexHandler(size) {
        if (size === 22) {
            setInd(0)
        } else if (size === 30) {
            setInd(1)
        } else {
            setInd(2)
        }
    }

    return (
        <li className={style.pizza_element}>
            <div className={style.img_wrapper}><Link to={'/pizza/' + item._id}><img src={item.image} alt="" /></Link></div>
            <div className={style.product_description}>
                <p className={style.weight}>{item.weight[ind]} Г</p>
                <p className={style.title}><b><Link to={'/pizza/' + item._id}>{item.title}</Link></b></p>
                <div className={style.product_controls}>
                    <p><b>{bortik ? item.bortyk[ind] + item.price[ind] : item.price[ind]} грн</b></p>
                    {
                        id?.q > 0 ?
                            < div className="minus_plus">
                                <button onClick={() => minusElement(id)}>-</button>
                                <span>{id.q}</span>
                                <button onClick={() => plusElement(id)}>+</button>
                            </div>
                            :
                            <button onClick={() => addToCart(updPizza)} className="prod_buy_btn">КУПИТИ</button>
                    }
                </div>
                <ul className={style.pizza_size}>
                    <li id={pizzaSize === 22 ? style.current_pizza_size : ''} onClick={() => currentSize(22)}>22 см</li>
                    <li id={pizzaSize === 30 ? style.current_pizza_size : ''} onClick={() => currentSize(30)}>30 см</li>
                    <li id={pizzaSize === 40 ? style.current_pizza_size : ''} onClick={() => currentSize(40)}>40 см</li>
                </ul>
                {pizzaSize > 22 ? <button onClick={toggleBortik} className={`${style.bortik} ${bortik ? style.bortiktrue : ''}`}>{bortik ? 'Видалити сирний бортик' : 'Додати сирний бортик'}</button> : null}
                <p className={style.description}>{item.desription}</p>
            </div>
        </li >
    )
}

export default PizzaElement