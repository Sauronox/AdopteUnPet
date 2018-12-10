<template>
    <v-container fluid>
     <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://media.dizinga.com/artwork/danilitus/kid-goku-dragon-ball-super/thumbs/thumbnail-42a303c240cf4891927126fdb9b6a7f1_thumb-600-600.png"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{userInfo.name}}</h3>
            <div>Contact: {{userInfo.email}}</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import { store } from "../../store/index";

 export default {
    data () {

      return {
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    },
    computed:{
      userInfo:{
        get:function(){
          return this.$store.getters.user
        }
      }
    }
  }

</script>

<style>
.v-navigation-drawer {
  transition: none !important;
}

.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>


