const state = {
    tab: 'startGame',
    menu: {
      startGame: [
      ],
      playGame: [
        {
          name: 'home'
        },
        {
          name: 'save'
        },
        {
          name: 'load'
        },
        {
          name: 'quit'
        }
      ],
      saveGame: [
        {
          name: 'home'
        },
        {
          name: 'play'
        },
        {
          name: 'quit'
        }
      ]
    }
  }
  
  const mutations = {
    INCREMENT_SET_TAB (state, tab) {
      state.tab = tab
    }
  }
  
  const actions = {
    setTab ({ commit }, tab) {
      // do something async
      commit('INCREMENT_SET_TAB', tab)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  