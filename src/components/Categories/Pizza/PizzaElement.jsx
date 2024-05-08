import { useState, useEffect, useContext } from "react"
import useBasketActions from "../../Cart/BasketActions"
import { BasketContext } from "../../Cart/GlobalStateBasket"

function PizzaElement({ item, style, sizeFilter }) {

    const [pizzaSize, setPizzaSize] = useState(sizeFilter)
    const [bortik, setBortik] = useState(false)
    const cartContext = useContext(BasketContext)
    const { addToCart, plusElement, minusElement } = useBasketActions()
    const id = cartContext.cartData.find(prod => prod._id === item._id)

    useEffect(() => {
        setPizzaSize(sizeFilter)
        setBortik(false)
    }, [sizeFilter])

    function currentSize(size) {
        setBortik(false)
        setPizzaSize(size)
    }

    function toggleBortik() {
        setBortik(!bortik)
    }

    return (
        <li className={style.pizza_element}>
            <div><img src={item.image} alt="" /></div>
            <div className={style.product_description}>
                <p className={style.weight}>{item.weight} Г</p>
                <p className={style.title}><b>{item.title}</b></p>
                <div className={style.product_controls}>
                    <p><b>{item.price} грн</b></p>
                    {
                        id?.q > 0 ?
                            <div className="minus_plus">
                                <button onClick={() => minusElement(id)}>-</button>
                                <span>{id.q}</span>
                                <button onClick={() => plusElement(id)}>+</button>
                            </div>
                            :
                            <button onClick={() => addToCart(item)} className="prod_buy_btn">КУПИТИ</button>
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