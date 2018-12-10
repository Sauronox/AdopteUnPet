<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" disable-resize-watcher fixed app>
      <v-list>
        <v-list-tile value="true" v-for="item in menuItems" :key="item.title" router :to="item.routerLink">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenicated && userIsAdmin" value="true" router to="/AdminPanel">
          <v-list-tile-action>
            <v-icon>security</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Administration</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenicated" value="true" @click="onLogout">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Deconnexion
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped" color="primary" :dark=true>
  
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" v-text="title"></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.routerLink">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-btn>
         <v-btn flat v-if="userIsAuthenicated && userIsAdmin" router to="/AdminPanel">
          <v-list-tile-action>
            <v-icon>security</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Administration</v-list-tile-content>
        </v-btn>
        <v-btn flat v-if="userIsAuthenicated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Deconnexion</v-list-tile-content>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-footer :fixed="fixed" app>
      <span>&copy; AdopteUnPet</span>
    </v-footer>
    <v-content>
      <router-view class="child"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./components/Home.vue";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Accueil from "./components/Accueil";
import toAdopt from "./components/toAdopt";
import Profile from "./components/Profile";

export default {
  name: "App",
  components: {
    Home,
    Signup,
    Accueil,
    toAdopt
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "AdopteUnPet",
      tokenApi: "",
      logged: false,
      loading: false,
      resultsIn: false
    };
  },
  computed: {
    menuItems() {
      let menuItems;
      if (this.userIsAuthenicated) {
        menuItems = [
          {
            icon: "all_inbox",
            title: "Formulaire d'adption",
            routerLink: "/Accueil"
          },

          {
            icon: "child_friendly",
            title: "à faire adopter",
            routerLink: "/toAdopt"
          },
          {
            icon: "face",
            title: "Profile",
            routerLink: "/Profile"
          }
        ];
      } else {
        menuItems = [
          {
            icon: "person_add",
            title: "Enregistrement",
            routerLink: "/Signup"
          },
          {
            icon: "person",
            title: "Connection",
            routerLink: "/Signin"
          }
        ];
      }
      return menuItems;
    },
    userIsAuthenicated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsAdmin() {
      return this.$store.getters.user.role === "admin";
    }
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    }
  },
  methods: {
    onLogout() {
      this.$router.push("/");
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
.buttonColor {
  color: lightblue;
}

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>



