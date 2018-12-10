<template>
  <v-container>
    <v-form class="login" v-on:submit.prevent="sendData">
      <v-text-field id="adoptName" name="adoptName" v-model="adoptName" :counter="15" label="Name" :error-messages="adaoptNameErrors" @input="$v.adoptName.$touch()" @blur="$v.adoptName.$touch()" required></v-text-field>
      <v-slider id="adoptAge" name="adoptAge" v-model="adoptAge" label="Age" min="0" max="40" thumb-label :error-messages="adoptAgeErrors" @input="$v.adoptAge.$touch()" @blur="$v.adoptAge.$touch()"></v-slider>
      <v-textarea
        id="adoptPresentation" 
          name="adoptPresentation"
          v-model="adoptPresentation"
          label="Prensentation"
          counter="10000"
          :error-messages="adoptPresentationErrors" 
          @input="$v.adoptPresentation.$touch()" 
          @blur="$v.adoptPresentation.$touch()" 
          required
      ></v-textarea>
      <v-text-field id="adoptRace" name="adoptRace" v-model="adoptRace" label="Race Animal" :error-messages="adoptRaceErrors" @input="$v.adoptRace.$touch()" @blur="$v.adoptRace.$touch()" required></v-text-field>
      <v-btn class="primary" @click="onPickFile">Upload Image</v-btn>
      <input type="file" style="display: none;" ref="fileInput" accept="image/*" @change="onFilePicked">
      <img :src="imageUrl" height="150">
      <v-btn type="submit">Send Request</v-btn>
    </v-form>
    <!-- <v-layout row wrap class="mb-2">
                  <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                    <v-btn large> View Animals</v-btn>
                  </v-flex>
                  <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                    <v-btn large> View Animals</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="mt-2">
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="animal in animals"
              :key="animal.id"
              :src="animal.imageUrl"
            >
            <div class="title">
              {{animal.name}}
            </div>
            </v-carousel-item>
          </v-carousel>
                  </v-flex>
                </v-layout>
                 <v-layout row wrap class="mt-2">
                  <v-flex xs12 class="text-xs-center">
                   <p>Venez adoptez un de nos animaux</p>
                  </v-flex>
                </v-layout> -->
  
  </v-container>
</template>

<script>
import { store } from "../../store/index";
import { namesRef, namesRef2, fbStorage, app } from "../firebase";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  between
} from "vuelidate/lib/validators";
export default {
  name: "toAdopt",
  mixins: [validationMixin],
  validations: {
    adoptName: {
      required,
      minLength: minLength(4)
    },
    adoptAge: {
      between: between(1, 40)
    },
    adoptPresentation: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(10000)
    },
    adoptRace: {
      required
    }
  },
  data: () => ({
    valid: false,
    adoptName: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    adoptAge: 0,
    adoptPresentation: "",
    adoptRace: "",
    imageUrl: "",
    image: null,
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  computed: {
    adaoptNameErrors() {
      const errors = [];
      if (!this.$v.adoptName.$dirty) return errors;
      !this.$v.adoptName.minLength &&
        errors.push(
          "Le nom de l'animal doit être supérieur a " +
            this.$v.adoptName.$params.minLength.min
        );
      !this.$v.adoptName.required && errors.push("Le champs et obligatoire");
      return errors;
    },
    adoptAgeErrors() {
      const errors = [];
      if (!this.$v.adoptAge.$dirty) return errors;
      !this.$v.adoptAge.between &&
        errors.push(
          "Vous devez être entre " +
            this.$v.adoptAge.$params.between.min +
            " ans et " +
            this.$v.adoptAge.$params.between.max +
            " ans."
        );
      return errors;
    },
    adoptPresentationErrors() {
      const errors = [];
      if (!this.$v.adoptPresentation.$dirty) return errors;
      !this.$v.adoptPresentation.maxLength &&
        errors.push(
          "Le maximum et de " +
            this.$v.adoptPresentation.$params.maxLength.max +
            " caractère"
        );
      !this.$v.adoptPresentation.minLength &&
        errors.push(
          "Le minimum et de " +
            this.$v.adoptPresentation.$params.minLength.min +
            " caractère"
        );
      !this.$v.adoptPresentation.required &&
        errors.push("Le champs et obligatoire");
      return errors;
    },
    adoptRaceErrors() {
      const errors = [];
      if (!this.$v.adoptRace.$dirty) return errors;
      !this.$v.adoptRace.required && errors.push("Le champs et obligatoire");
      return errors;
    },
    animals() {
      return this.$store.getters.animauxCaroussel;
    }
  },
  methods: {
    sendData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log({
          name: this.adoptName,
          age: this.adoptAge,
          race: this.adoptRace,
          presentation: this.adoptPresentation,
          image: this.image
        });
        const adoptData = {
          name: this.adoptName,
          age: this.adoptAge,
          race: this.adoptRace,
          presentation: this.adoptPresentation,
          image: this.image
        };
        this.$router.push("/");
        this.$store.dispatch("createAdoptionPet", adoptData);
      }
      // namesRef2.push({
      //   dbAdoptName: this.adoptName,
      //   dbAdress: this.adoptAge,
      //   dbPresentation: this.adoptPresentation
      // });
    },
    onPickFile() {
      console.log(this.$refs);
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Veuiller mettre une image");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>


