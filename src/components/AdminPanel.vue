<template>
    <v-container>
        <v-navigation-drawer v-model="drawer" :mini-variant="mini" permanent absolute dark>
                <v-list class="pa-1">
                    <v-list-tile v-if="mini" @click.stop="mini = !mini">
                            <v-list-tile-action>
                                <v-icon>chevron_right</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
    
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg">
                        </v-list-tile-avatar>
    
                        <v-list-tile-content>
                            <v-list-tile-title>{{user.email}}</v-list-tile-title>
                        </v-list-tile-content>
    
                        <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
    
            <v-list class="pt-0" dense>
                <v-divider light></v-divider>
    
                <v-list-tile v-for="item in items" :key="item.title" router :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
    
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-container fluid fill-height>
            <v-layout justify-center align-center> -->
                <v-flex shrink>
                    <span>{{UserData}}</span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Dashboard",
          icon: "dashboard",
          link: "/Dashboard"
        },
        {
          title: "Formulaire",
          icon: "question_answer",
          link: "/Formulaire"
        }
      ],
      mini: true,
      right: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    UserData() {
      return auth.currentUser;
    }
  }
};
</script>
