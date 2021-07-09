export const state = () => ({
    amount:0,
})
  
export const getters = {

    getCartAmount(state){
        return state.amount
    }
}

export const actions = {

    storeCartAmount({commit}, {amount}){
        console.log("called from another mutation", {amount}, amount)
        commit('storeAmount', {amount})
    },

}

export const mutations = {

    storeAmount(state, value){
        console.log("called from another mutation", value)
        state.amount = value
      
    }

}