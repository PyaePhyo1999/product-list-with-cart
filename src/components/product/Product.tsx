import data from '../../utils/data'
import { useState } from 'react'
import addToCart from '../../assets/images/icon-add-to-cart.svg'
import emptyCart from '../../assets/images/illustration-empty-cart.svg'
import iconInc from '../../assets/images/icon-increment-quantity.svg'
import iconDec from '../../assets/images/icon-decrement-quantity.svg'
import iconRemove from '../../assets/images/icon-remove-item.svg'
import iconCarbon from '../../assets/images/icon-carbon-neutral.svg'
import iconConfirm from '../../assets/images/icon-order-confirmed.svg'
import { useCart } from '../hooks/UseCart'

type ProductItem = (typeof data)[number];

const Product = () => {
    const [showModal, setShowModal] = useState(false);
    const {items, count, total, add, inc, dec, remove, qtyOf, clear } = useCart<ProductItem>();
    
  return (
    <div className='product'>
        <div className='product-container'>
            <div className='product-list'>
                <p className='product-title'>Desserts</p>
                 <div className='product-list-items'>
                 
                {
                    data.map(
                        (item)=>{
                            const key = item.name;
                            const qty = qtyOf(key);
                            return(
                            <div key={key} className='product-row'>
                                <div className="product-image-wrap">
                                    <img src={item.image.desktop} alt={item.name} />
                                   
                                    <div className="add-to-cart">
                                    {
                                        qty === 0 ?
                                        (
                                        <button onClick={()=>add(item)} className="btn-add-to-cart" type="button">
                                            <img src={addToCart} alt="" />
                                            <p>Add to Cart</p>
                                        </button>
                                        ):(
                                         <div className='qty-control'>
                                            <button id='btn-dec' type='button' onClick={()=>dec(key)}>
                                                <img src={iconDec} alt="" /></button>
                                            <span>{qty}</span>
                                            <button id='btn-inc' type='button' onClick={()=>inc(key)}>
                                                <img src={iconInc} alt="" />
                                            </button>
                                         </div>
                                        )
                                    }
                                    
                                    </div>
                                </div>
                                <h1 id='category'>{item.category}</h1>
                                <p id='name'>{item.name}</p>
                                <p id='price'>${item.price.toFixed(2)}</p>
                            </div>
                        )}
                    )
                }

            </div>
            </div>
           {/* product order */}
            <div className='product-order'>
                   <div className='product-order-container'>
                        <p id='card-title'>Your card ({count})</p>
                        {
                            items.length === 0 ?
                            (
                            <>
                            <div className='empty-cart'>
                                <img src={emptyCart} alt="" />
                            </div>
                             <p id='brief'>Your added items will appear here</p>
                            </>
                            
                            ) : (
                            <>
                            <div className='cart-info'>
                            {
                            items.map
                            (
                                (it) =>
                                    (
                                    <><div className='cart-list'>
                                        <div className='cart-order'>
                                            <p id='cart-title'>{it.name}</p>
                                            <div className='cart-order-pricing'>
                                                <p id='count'>{it.qty}x</p>
                                                <p id='amount'>@ {it.price.toFixed(2)}</p>
                                                <p id='total-amount'>${(it.price * it.qty).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <button onClick={()=>remove(it.name)} id='remove' type='button'> 
                                            <img src={iconRemove} alt="" />
                                            </button>
                                    </div><hr></hr>
                                    </>
                                    )
                                )
                             }   
                        
                            <div className='total-order'>
                                <p>Order Total</p>
                                <p id='total-order-amount'>${total.toFixed(2)}</p>
                            </div>
                            <div className='carbon-delivery'>
                                <img src={iconCarbon} alt="" />
                                <p>This is a <b>carbon-neutral</b> delievry</p>
                            </div>
                            <button onClick={()=>setShowModal(true)} id='confirm'>Confirm Order</button> 

                            </div>
                            {
                            showModal && (
                                <div className='modal-overlay'>
                                    <div className='modal'>
                                        <img src={iconConfirm} alt="" />
                                        <p id='modal-title'>Order Confirmed</p>
                                        <p id='modal-brief'>We hope you enjoy your food</p>
                               
                                        <div className='item-order'>
                                        {
                                        items.map(
                                            (it)=>(
                                                <>
                                        <div className='item-list'>
                                            <div className='item-list-left'>
                                                <img src={it.image.thumbnail} alt="" />
                                                <div className='item-list-brief'>
                                                    <p id='title'>{it.name}</p>
                                                    <div className='item-pricing'>
                                                        <p id='count'>{it.qty}x</p>
                                                        <p id='amount'>@{it.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='item-list-right'>
                                                <p id='total-amount'>${(it.price * it.qty).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        </>
                                        )
                                        )
                                        }
                                        
                                        <div className='modal-total-order'>
                                            <p>Order Total</p>
                                            <p id='total-order-amount'>${total.toFixed(2)}</p>
                                        </div>
                                        </div>     
                                        
                                         <button onClick={()=>{clear();setShowModal(false)}} id='new-order'>Start New Order</button> 
                                    </div>
                                </div>  
                                    
                                )
                            }
                            </>
                            )
                        }
                        
                       
                   </div>
            </div>
        </div>
    </div>
  )
}

export default Product