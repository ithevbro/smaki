import style from './drinks.module.css'
import DrinkElement from './DrinkElement'
import SelectFilter from '../../SelectFilter/SelectFilter'
import LoaderMain from '../../Loaders/Loader-main'
import { getProds } from '../../../service/services'
import ArticleDrinks from './Article'

function Drinks() {
    let { products, loading } = getProds('drinks')

    return (
        <section className={style.section_wrapper}>
            <div className={style.prods_wrapper}>
                <h1>Доставка напоїв у Львові</h1>
                {loading ? <LoaderMain /> :
                    <>
                        <h3>Напої</h3>
                        <aside className={style.filters_wrapper}>
                            <SelectFilter />
                        </aside>
                        <ul className={style.prod_list}>
                            {products.map(item => (
                                <DrinkElement key={item._id} item={item} style={style} />
                            ))}
                        </ul>
                    </>
                }
            </div>

            <ArticleDrinks />
        </section>
    )
}

export default Drinks