<template>
  <v-container>
    <v-layout
      align-center column
    >
     <v-flex xs12>
        <h1 class="display-2 font-weight-thin mb-3">
          {{message}}
        </h1>
      </v-flex>
      <v-flex xs12>
        <h3 class="display-0 font-weight-thin mb-3">
         {{promotion}}
        </h3>
      </v-flex>
      
  
      <v-carousel hide-controls>
    <v-carousel-item xs12
      v-for="(item,i) in items"
      :key="i"
      :src="item"
    ></v-carousel-item>
  </v-carousel>
 
 <v-flex>
 <h1 class="display-1 font-weight-thin mb-3">
         {{message4}}
        </h1>
        </v-flex>
<v-timeline>
    <v-timeline-item
      color="purple lighten-2"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <v-icon
            dark
            size="42"
            class="mr-3"
          >
            mdi-magnify
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">Inscription</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs10>
              Vous pouvez cliquez sur le bouton du menu de navigation et accédez sur la rubrique inscription             
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="amber lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Connexion</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs10>
              Dans le menu de navigation rapide, rentrez vos identifiants 
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <h2 class="display-1 white--text font-weight-light">Choisissez votre animal</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs10>
              Parcourez notre catalogue à la recherche de l'amour de votre vie
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Formulaire</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs10>
              Remplissez notre formulaire, nos services vérifieront si vous êtes âptes à adopter un de nos amours
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="green lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="green lighten-1">
          <h2 class="display-1 white--text font-weight-light">Validation</h2>
        </v-card-title>
        <v-container>
          <v-layout >
            <v-flex xs10 >
              Nous vous contacterons afin de prendre rendez-vous. Il vous suffira
               de venir à l'un de nos refuges afin de le récupérer et de commencez une nouvelle vie
            </v-flex>
          </v-layout >
        </v-container>
      </v-card >
    </v-timeline-item > 
  </v-timeline>
  <h1 class="display-1 font-weight-thin mb-4">
         {{message5}}
        </h1>
  <v-container fluid grid-list-sm>
    <v-layout>
      
      <v-flex xs6 sm4>
        <v-img
          src="https://www.topofthetop.top/wp-content/uploads/2017/12/chien-mignon-topofthetop-768x480.jpg"
        ></v-img>
        <h4>Bibidi</h4>
      </v-flex>

      <v-flex xs6 sm4>   
        <v-img src='https://www.topofthetop.top/wp-content/uploads/2017/12/chien-mignon-berger-australien-topofthetop.jpg'>
        </v-img>
        <h4>Babidi</h4>
      </v-flex>

      <v-flex xs6 sm4>   
        <v-img src="https://www.topofthetop.top/wp-content/uploads/2017/12/berger-allemand-chien-mignon-topofthetop.jpg">
        </v-img>
        <h4 >Buu</h4>
      </v-flex >
    </v-layout >


  </v-container>

    <h1 class="display-1 font-weight-thin mb-4">{{adoptForm}}</h1>
      <v-btn @click="toFormPage" color="primary">Formulaire d'adoption</v-btn>
    </v-layout >
  </v-container>
  
</template>

<script>
import axios from "axios";
import * as firebase from 'firebase'
export default {
  name: "homePage",
  data: () => ({
    items: [],
    message: " Bienvenu chez AdopteUnPet",
    promotion: "Des animaux en attente d'amour",
    carousselMessage:"Voici certains de nos réseidents, vous pouvez naviguer sur  notre afin de pouvoir trouver l'amour de votre vie",
    message4:'Voici les étapes pour adopter un de nos animaux',
    message5: 'Voici quelques un de nos amours',
    adoptForm:"Cliquez pour commencer l'aventure"
  }),
  beforeMount: function() {
    axios
      .get(`https://dog.ceo/api/breeds/image/random/4`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data.message;
        this.items = response.data.message;
        console.log(this.items);
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    gettingPhoto: function() {
      axios
        .get(`https://dog.ceo/api/breeds/image/random/5`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data.message;
          var dogs = response.data.message;
          console.log(dogs);
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    toFormPage:function(){
      this.$router.push({
          name: "accueil"
        });
    }
  }
};
</script>

<style>
</style>
