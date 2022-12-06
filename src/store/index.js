import {createStore} from 'vuex'

const getDefaultState = () => {
    return {
        token: "",
        user: {},
    };
};

export default createStore({
    state: {
        isLoading: false,
        token: "",
        user: {},
    },
    mutations: {
        setLoading(state, payload) {
            state.isLoading = payload;
        },
        setToken: (state, token) => {
            state.token = token;
        },
        setUser: (state, user) => {
            state.user = user;
        },
        reset: (state) => {
            Object.assign(state, getDefaultState());
        },
    },
    actions: {
        login: ({commit, dispatch}, {token, user}) => {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            commit("setToken", token);
            commit("setUser", user);
        },
        logout: ({commit}) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            commit("reset", "");
        },
        loading: ({commit}, payload) => {
            commit("setLoading", payload);
        },
        insertUser: ({commit}, user) => {
            localStorage.setItem("user", JSON.stringify(user));
            commit("setUser", user);
        }
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        isLoggedIn(state) {
            return state.token !== "";
        },
        user(state) {
            return state.user;
        }
    },
})