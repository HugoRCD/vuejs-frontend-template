import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'flowbite';
import './assets/style/main.scss';
import i18n from './plugins/i18n';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import clickOutside from "./plugins/directives.js";

import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { concat } from '@apollo/client/link/core'

const httpLink = createHttpLink({
    uri: process.env.VUE_APP_API_URL || 'http://localhost:3000/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: store.state.user.token ? `Bearer ${store.state.user.token}` : null
        }
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

const apolloProvider = createApolloProvider({
    defaultClient: client,
})

createApp(App)
    .use(i18n)
    .use(store)
    .use(router)
    .use(i18n)
    .use(VueSweetalert2)
    .use(apolloProvider)
    .use(clickOutside)
    .mount('#app')
