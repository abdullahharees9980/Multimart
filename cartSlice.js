import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload
      state.cartItems.push({
        id: newItem.id,
        itmid : newItem.itmid,
        productName: newItem.productName,
        imgUrl: newItem.imgUrl,
        price: newItem.price,
        quantity: newItem.quantity,
        totallPrice: newItem.price,
        uid: newItem.uid
      })

      state.totalQuantity = state.cartItems.length

      state.totalAmount = state.cartItems.reduce((total, item) => total +
        Number(item.price) * Number(item.quantity), 0
      );
    },

    deleteItem: (state, action) => {
      const id = action.payload
      const existingItem = state.cartItems.find(item => item.id === id)

      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id)
        state.totalQuantity = state.totalQuantity - existingItem.quantity
      }
      state.totalAmount = state.cartItems.reduce((total, item) => total +
        Number(item.price) * Number(item.quantity), 0
      );
    },

    clearCart: (state, action) => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalAmount = 0
    }
  },


});

export const cartActions = cartSlice.actions

export default cartSlice.reducer