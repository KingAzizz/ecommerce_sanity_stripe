import React,{createContext,useContext,useState,useEffect,useRef} from 'react'
import { toast } from 'react-hot-toast'


const Context = createContext()



export const StateContext = ({children}) => {
   
const [showCart, setShowCart] = useState(false)
const [cartItems, setCartItems] = useState([])
const [totalPrice, setTotalPrice] = useState(0)
const [totalQuantities, setTotalQuantities] = useState(0)
const [qty, setQty] = useState(1)
let foundProduct;
let index;
let prevTotalPrice = useRef()
let prevTotalQuantities = useRef()

useEffect(() => {
    prevTotalPrice.current = totalPrice;
    prevTotalQuantities.current = totalQuantities;
},[totalPrice,totalQuantities])
useEffect(() => {
    // localStorage.clear()         
    
    if(localStorage.getItem("cartItems") != null && localStorage.getItem("totalPrice") != null && localStorage.getItem("totalQuantities") != null){
        
        
        
            let retrievedCart = localStorage.getItem("cartItems")
            setCartItems(JSON.parse(retrievedCart))
            setTotalPrice(parseFloat(localStorage.getItem("totalPrice")))
            setTotalQuantities(parseInt(localStorage.getItem("totalQuantities")))
           
            
        }
    setQty(1)
},[])
const handleLocalStorgePriceQuantities = (productPrice,Quantity) => {
    
            localStorage.setItem('totalPrice', prevTotalPrice.current + productPrice * Quantity)
            localStorage.setItem('totalQuantities', prevTotalQuantities.current + Quantity)
     
    

}
const onAdd = (product,quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevQuantites) => prevQuantites + quantity )

  
    if(checkProductInCart){
        const updatedCartItems = cartItems.map((cartProduct) => {
            if( cartProduct._id === product._id) {
            return{
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            };
        }else{
            return{...cartProduct}
        }
           
        })
      
        setCartItems(updatedCartItems)
        
        localStorage.setItem('cartItems',JSON.stringify(updatedCartItems))
    }
    else{
        product.quantity = quantity
        setCartItems([...cartItems,{...product}])
        localStorage.setItem('cartItems',JSON.stringify([...cartItems,{...product}]))

    }
    toast.success(`${qty} ${product.name} added to the cart.`)
    handleLocalStorgePriceQuantities(product.price,qty)
    setQty(1)
}

const onRemove = (product) => {
  
    foundProduct = cartItems.find((item) => item._id === product._id)
    let newCartItems = cartItems.filter((item,i)=> item._id !== product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
    localStorage.setItem('cartItems',JSON.stringify(newCartItems))
    const localStorgeTotalPrice = totalPrice - foundProduct.price * foundProduct.quantity
    const localStrogeTotalQuantities = totalQuantities - foundProduct.quantity
    localStorage.setItem('totalPrice', localStorgeTotalPrice)
    localStorage.setItem('totalQuantities', localStrogeTotalQuantities)

}
const toggleCartItemQuanitity = (id,value) =>{

    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    let newCartItems = cartItems.filter((item,i)=> item._id !== id)

    if(value === 'inc'){
        newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity + 1 });
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        localStorage.setItem('cartItems',JSON.stringify(newCartItems))

        const localStorgeTotalPrice = totalPrice + foundProduct.price * foundProduct.quantity
        const localStrogeTotalQuantities = totalQuantities + 1
        localStorage.setItem('totalPrice', localStorgeTotalPrice)
        localStorage.setItem('totalQuantities', localStrogeTotalQuantities)
    }else if(value === 'dec'){
        if(foundProduct.quantity > 1){

            newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity - 1 });
            setCartItems(newCartItems);
            console.log(cartItems[0].price);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            localStorage.setItem('cartItems',JSON.stringify(newCartItems))
           
            const localStorgeTotalPrice = totalPrice - foundProduct.price
            const localStrogeTotalQuantities = totalQuantities - 1
            localStorage.setItem('totalPrice', localStorgeTotalPrice)
            localStorage.setItem('totalQuantities', localStrogeTotalQuantities)
    }
    }
}
const incQty = () => {
    setQty((prevQty) => prevQty + 1);
}

const decQty = () => {
    setQty((prevQty) =>
    { 
        if(prevQty - 1 < 1) return 1;

       return prevQty - 1
    });
}

return (
    <Context.Provider
    value={{
     showCart,
     setShowCart,
     cartItems,
     setCartItems,
     totalPrice,
     setTotalPrice,
     totalQuantities,
     setTotalQuantities,
     qty,
     incQty,
     decQty,
     onAdd,
     toggleCartItemQuanitity,
     onRemove
    }}
    >
        {children}
    </Context.Provider>
)
}

export const useStateContext = () => useContext(Context)