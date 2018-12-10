import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Accueil from "../components/Accueil";
import Profile from "../components/Profile";
import AdminPanel from "../components/AdminPanel";
import toAdopt from "../components/toAdopt";
import listOfAnimals from "../components/listOfAnimals"
import AdoptedAnimal from "../components/AdoptedAnimal"
import AuthGard from "./guard";
import AdminGard from "./adminGuard";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/", // index
            component: Home, // Composant HOME,
            name: 'homePage'

        },
        {
            path: "/Signup",
            component: Signup,
            name: "SingUp"

        },
        {
            path: "/Signin",
            component: Signin,
            name: "SingIn"
        },
        {
            path: '/Accueil',
            component: Accueil,
            name: 'accueil',
            beforeEnter: AuthGard
        },
        {
            path: '/Profile',
            component: Profile,
            name: 'profile',
            beforeEnter: AuthGard
        },
        {
            path: "/AdminPanel",
            component: AdminPanel,
            name: "AdminPanel",
            beforeEnter: AdminGard
        },
        {
            path: "/toAdopt",
            component: toAdopt,
            name: "toAdopt",
            beforeEnter: AuthGard
        },
        {
            path: "/toListOfAnimals",
            component: listOfAnimals,
            name: "listOfAnimals",
            beforeEnter: AuthGard
        },
        {
            path: "/toAdoptedAnimal/:id",
            component: AdoptedAnimal,
            name: "adoptedAnimal",
            beforeEnter: AuthGard
        }
    ]
});