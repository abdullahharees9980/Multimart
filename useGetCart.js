
import { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'


const useGetCart = () => {

    const uid = useSelector(state => state.user.uid)
    const dispatch = useDispatch()
    const [loadingCart, setLoadingCart] = useState(true)
    const collectionRef = collection(db, 'cart')
    const queryRef = query(collectionRef, where("uid", "==", uid));

    useEffect(() => {

        if (uid.length > 0) {
            const getData = async () => {

                //=====firebase firestore realtime data update ==========
                await onSnapshot(queryRef, (snapshot) => {
                    dispatch(cartActions.clearCart())
                    snapshot.docs.map(doc=>{dispatch(cartActions.addItem({...doc.data(), id: doc.id}))});
                    setLoadingCart(false)
                })

            }

            getData()
        }

    }, [uid])

    return {}
}

export default useGetCart