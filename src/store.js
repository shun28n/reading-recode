import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import {UPDATE_CURRENT, UPDATE_BOOK} from './mutation_types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // review + bookinfo
    books:[],
    // edit / select
    current: null,
  },
  getters:{
    //stored reviewCount
    bookCount(state){
      return state.books.length
    },
    // all review info
    allBooks(state){
      return state.books
    },
    // select Page Review (payload: page number)
    getRangeByPage(state){
      return page => {
        // ページあたりの表示件数
        const SIZE = 3 
        // slice(startpoint, endpoint)
        return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
      }
    },
    // select review Info byID
    getBookById(state){
      // array(books) find by Id
      return id => {
        return state.books.find(book => book.id === id)
      }
    },
    // current Edit Book
    current(state){
      return state.current
    }
  },
    mutations: {
      // current update
      [UPDATE_CURRENT](state, payload){
        state.current = payload
      },
      // review update (payload: updated book info)
      [UPDATE_BOOK](state, payload){
        // stored review find by id(payload)
        let b = this.getters.getBookById(payload.id)
        if(b){
          // if review exist update
          Object.assign(b, payload) 
        }else {
          // not exist, new push
          state.books.push(payload)
        }
      }
  },
  // same name actions by mutation
  actions: {
    [UPDATE_CURRENT]({commit}, payload){
      commit(UPDATE_CURRENT, payload);
    },
    [UPDATE_BOOK]({ commit }, payload){
      commit(UPDATE_BOOK, payload);
    }
  },
  // active plugin for strage store
  plugins: [
    createPersistedState({
    key: 'reading-recorder',
    storage: localStorage,
    }),
  ]
});
