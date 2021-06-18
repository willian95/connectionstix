export const state = () => ({
    amount:"",
})
  
export const getters = {

    getCartAmount(state){
        return state.amount
    }
}

export const actions = {

    storeCartAmount({commit}, {amount}){
        commit('storeSearch', {amount})
    },

}

export const mutations = {

    storeCartAmount(state, {value}){
        state.amount = value
    }

}