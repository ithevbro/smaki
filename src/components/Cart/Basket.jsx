import style from './basket.module.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalOverlayState } from '../../global-state/GlobalOverlay'
import { BasketContext } from './GlobalStateBasket'
import useBasketActions from './BasketActions'
import { NavLink } from 'react-router-dom'
import FreeSouses from '../FreeSouses/FreeSouses'
import { SouseContext } from '../FreeSouses/GlobalStateSouse'

function Basket() {

    const setGlobalOverlayData = useContext(GlobalOverlayState).setGlobalOverlayData
    const dataCart = useContext(BasketContext)
    const souseData = useContext(SouseContext)
    const { plusElement, minusElement, removeFromCart } = useBasketActions()
    const [dispaySouses, setDisplaySouse] = useState(false)


    function sum() {
        let sum = 0

        for (let i = 0; i < dataCart.cartData.length; i++) {
            sum += dataCart.cartData[i].price * dataCart.cartData[i].q
        }

        if (dispaySouses) {
            sum += souseData.souseData.totalSoy
            sum += souseData.souseData.totalSet
        }

        sum += 45
        if (sum === 45) return 0
        return sum
    }


    useEffect(() => {
        const hasSushi = dataCart.cartData.some(item => item.productType === 'sushi')
        setDisplaySouse(hasSushi)
    }, [dataCart])


    useEffect(() => {
        if (!dispaySouses) {
            const timeoutId = setTimeout(() => {

                souseData.setSouseData({
                    type: 'remove',
                    elem: { isVisible: false, usual: 0, study: 0, soy: 0, totalSet: 0, totalSoy: 0 }
                })
            }, 50)

            return () => clearTimeout(timeoutId)
        }
    }, [dispaySouses, souseData])


    return (
        <div className={style.bs2}>
            <div className={style.basket_container}>
                <h5 className={style.basket_title}>Кошик</h5>
                <form>
                    {dataCart.cartData && dataCart.cartData?.map((item) => {
                        return (
                            <div key={item._id} className={style.basket_element_in_list}>
                                <div className={style.basket_element_in_list_image}><img src={item.image} alt="" /></div>
                                <div className={style.basket_element_info}>
                                    <div className={style.basket_element_weight}>{item.weight} г</div>
                                    <div className={style.basket_element_title}>{item.title}</div>
                                    {item.bortyk && <div className={style.basket_element_weight}>Сирний бортик {item.size} x 1</div>}
                                </div>
                                <div className={style.bottom_info}>
                                    <div className={style.btn_cont}>
                                        <button id={style.btn} onClick={(e) => {
                                            e.preventDefault()
                                            minusElement(item)
                                        }}>
                                            -
                                        </button>
                                        <span className={style.item_quantity}>{item.q}</span>
                                        <button className={style.plus_minus_btn} id={style.btn} onClick={(e) => {
                                            e.preventDefault()
                                            plusElement(item)
                                        }}>
                                            +
                                        </button>
                                    </div>
                                    <div className={style.prive_quant}>{item.price * item.q}<span> грн</span></div>
                                </div>
                                <div className={style.btn_delete_from_cart} onClick={(e) => {
                                    e.preventDefault()
                                    removeFromCart(item)
                                }}></div>
                            </div>
                        )
                    })}
                    {dispaySouses && <FreeSouses />}
                    <hr className={style.border_bottom_basket} />
                    <div className={style.cont_payment_basket}>
                        <div className={style.basket_summary}>
                            {sum() > 0 && <div className={style.basket_display_info_sum}>
                                <div className={style.sum_info}>
                                    <div>Загальна вартість:</div>
                                    <div><b className={style.color_digit}>{sum()} грн</b></div>
                                </div>
                                <div className={style.sum_info}>
                                    <div>Вартість упакування:</div>
                                    <div><b className={style.color_digit}>45 грн</b></div>
                                </div>
                                <div className={style.sum_info}>
                                    <div><b>Знижка:</b></div>
                                    <div><b className={style.color_digit}>0 грн</b></div>
                                </div>
                            </div>}
                            <div className={style.basket_payment}>
                                <div>До оплати:</div>
                                <div>{sum()} грн</div>
                            </div>
                        </div>
                        <div className={style.delivery_text}>Сума мінімального замовлення в Зеленій зоні - 400 грн, у Жовтій зоні - 700 грн. В суму мінімального замовлення не входять напої</div>
                        {
                            sum() - 45 >= 400 ? <NavLink to={'/order'} onClick={() => setGlobalOverlayData({ type: 'main' })}><button className={style.basket_buy_button}>ОФОРМИТИ ЗАМОВЛЕННЯ</button></NavLink> : <button className={style.basket_buy_button_disabled} disabled>ОФОРМИТИ ЗАМОВЛЕННЯ</button>
                        }
                    </div>
                </form>
                <a className={style.enter_in_account} onClick={(e) => {
                    e.preventDefault()
                    setGlobalOverlayData({ type: 'login' })
                }} href="">Увійти в особистий кабінет</a>
                <div className={style.close_busket_btn} onClick={() => setGlobalOverlayData({ type: 'main' })}></div>
            </div>
        </div>
    )
}

export default Basket
