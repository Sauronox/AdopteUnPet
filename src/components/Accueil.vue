<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="display-2 font-weight-thin mb-3">
          Ils attendent votre amour
        </h1>
        <h3 class="display-0 font-weight-thin mb-3">
         {{message1}}
        </h3>
      </v-flex>
      <v-flex xs6>
        <!-- <v-flex xs12 sm6 offset-sm3> -->
      <v-card>
        <v-img
          src="https://www.woopets.fr/assets/ckeditor/2016/aug/1106/originale/13721089_1097663826968942_1482932896_n.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Choupette</h3>
            <div>{{card_text}}</div>
          </div>
        </v-card-title>
      </v-card>
</v-flex>
<v-flex xs6 >
      <v-card>
        <v-img
          src="https://www.woopets.fr/assets/ckeditor/2016/aug/1106/originale/13694479_1242174552468301_1776905823_n.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Speck</h3>
            <div>{{card_text1}}</div>
          </div>
        </v-card-title>
      </v-card>
</v-flex>

<v-flex xs6>
        <!-- <v-flex xs12 sm6 offset-sm3> -->
      <v-card>
        <v-img
          src="https://www.woopets.fr/assets/ckeditor/2016/aug/1106/originale/13744054_596989223797709_2117722336_n.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Toufu</h3>
            <div>{{card_text2}}</div>
          </div>
        </v-card-title>
      </v-card>
</v-flex>
<v-flex xs6 mb-1>
      <v-card>
        <v-img
          src="https://www.woopets.fr/assets/ckeditor/2016/aug/1106/originale/13741108_1805961962974620_248009708_n.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Max</h3>
            <div>{{card_text3}}</div>
          </div>
        </v-card-title>

        
      </v-card>
</v-flex>
 <v-flex xs6 mb-1>
      <v-card>
        <v-img
          src="http://www.ayme-truffe.com/boutique/medias/img/img_88_4.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Yaco</h3>
            <div>{{card_text4}}</div>
          </div>
        </v-card-title>

       
      </v-card>
</v-flex>
<v-flex xs6 mb-1>
      <v-card>
        <v-img
          src="https://img.ohmymag.com/article/480/best-friends/les-chiens-et-leur-truffe-un-magnifique-chien-loup_714e3dd2e1e8f857037d7211ca90dfd162a1a7e6.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Hagrid</h3>
            <div>{{card_text5}}</div>
          </div>
        </v-card-title>

       
      </v-card>
</v-flex>
<v-flex xs6 mb-1>
      <v-card>
        <v-img
          src="https://mediasv6.truffaut.com/Articles/jpg/0691000/691519_001_1000.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Masca</h3>
            <div>{{card_text6}}</div>
          </div>
        </v-card-title>

        
      </v-card>
</v-flex>
<v-flex xs6 mb-1>
      <v-card>
        <v-img
          src="https://positivr.fr/wp-content/uploads/2018/05/fred-labrador-adoption-canetons-chateau-mountfichet-1-e1527241190708.jpg"
          aspect-ratio="1.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Neylia</h3>
            <div>{{card_text7}}</div>
          </div>
        </v-card-title>

        
      </v-card>
</v-flex>
<v-flex xs12>

<h1 class="display-2 font-weight-thin mb-3">
         {{adoption}}
        </h1>
        <h3 class="display-0 font-weight-thin mb-3">
         {{adoption2}}
        </h3>
        <v-flex mb-2>
        <v-form v-model="valid" v-on:submit.prevent="post">
          <v-text-field v-model="Nickname" :rules="nameRules" label="Prénom" required></v-text-field>
          <v-text-field v-model="name" :rules="nameRules" label="Nom" required></v-text-field>
          <v-text-field v-model="Email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field v-model="Address" :rules="addressRules" label="Address" required></v-text-field>
          <v-radio-group v-model="typeLogement" :rules="logeRules" :mandatory="false" required>
            <v-radio label="Appartement" value="appartement"></v-radio>
            <v-radio label="Maison" value="maison"></v-radio>
          </v-radio-group>
          <v-textarea v-model="Presentation" :rules="presRules" label="Présentation"  multi-line ></v-textarea>
          <v-btn round type="submit" color="primary" dark>Soumettre la demande</v-btn>
        </v-form>
        </v-flex>
  </v-flex>

</v-layout>
  </v-container>


        
      <!-- </v-flex> -->
      
   
</template>

<script>
import { store } from "../../store/index";
import { namesRef } from "../firebase";
export default {
  name: "accueil",
  data: () => ({
    card_text:"Chien plein de vie, dynamique. Un vériitable amour. Sa seule volonté trouver un maître qui l'aimera",
    card_text1:'Un jeune chien plein de fougue recherchant désespérément un maitre aimant.',
    card_text2:'Un peu timide au premier abord, une fois qu\'il aura appris à vous connaitre, vous ne connaitrez pas de chien plus affectueux',
    card_text3:'Ce jeune chien vient d\'une famille qui ne faisait pas attention à lui, il ne demande qu\'à découvrir ce qu\'est l\'attention d\'un maitre aimant',
    card_text4:'Jeune femelle à la recherche d\'une famille d\'accueil avec qui elle pourra jouer',
    card_text5:'Peut être pas aussi grand que dans les films mais il est beaucoup plus calin',
    card_text6:'Petite chienne femelle désirant de pouvoir gambader dans un grand jardin',
    card_text7:'Sorti de fourrière, je suis passé à l\'adoption.On ne connaît rien de mon passé. On dit de moi que je suis câlin, dynamique',
    Nickname: "",
    Name: "",
    Email: "",
    Address: "",
    Presentation: "",
    valid: false,
    nameRules: [v => !!v || "Name is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    addressRules: [v => !!v || "Adress is required"],
    presRules: [v => !!v || "Description is required"],
    logeRules: [v => !!v || "Description is required"],
    adoption:"Voici un formulaire d'adoption",
    adoption2:"Votre demande seras soummis aux administrateurs, qui évalueront votre dossier",
    message1:"Serez vous prêt à les acceuillir dans votre vie ?"
  }),
  computed: {
    name: {
      get: function() {
        return this.$store.getters.name;
      },
      set: function(value) {
        this.$store.commit("setName", value);
      }
    },
    nickname: {
      get: function() {
        return this.$store.getters.nickname;
      },
      set: function(value) {
        this.$store.commit("setNickname", value);
      }
    },
    email: {
      get: function() {
        return this.$store.getters.email;
      },
      set: function(value) {
        this.$store.commit("setEmail", value);
      }
    },
    address: {
      get: function() {
        return this.$store.getters.address;
      },
      set: function(value) {
        this.$store.commit("setAddress", value);
      }
    },
    typeLogement: {
      get: function() {
        return this.$store.getters.typeLogement;
      },
      set: function(value) {
        this.$store.commit("setTypelogement", value);
      }
    },
    presentation: {
      get: function() {
        return this.$store.getters.presentation;
      },
      set: function(value) {
        this.$store.commit("setPresentation", value);
      }
    }
  },
  methods: {
    post: function() {
      namesRef.push(
        {
          dbPrenom: this.Nickname,
          edit: false,
          dbNom: this.Name,
          dbEmail: this.Email,
          dbAdress: this.Address,
          dbPresentation: this.Presentation
        }
        //  {dbNom:this.Name, edit: false},
        //  {dbEmail:this.Email, edit: false},
        //  {dbAdress:this.Address, edit: false},
        //  {dbPresentation:this.Presentation, edit: false},
      );
    }
  }
};
</script>

<style>
</style>
