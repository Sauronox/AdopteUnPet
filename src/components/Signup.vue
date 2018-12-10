<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs11 sm5>
          <v-layout row v-if="authError">
            <v-alert :value="true" type="error" dismissible @click="dimissError">{{authError.message}}</v-alert>
          </v-layout>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Enregistrement</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip right>
                <v-btn slot="activator" icon large @click="goBack" target="_blank">
                  <v-icon large>arrow_back</v-icon>
                </v-btn>
                <span>Codepen</span>
              </v-tooltip>
            </v-toolbar>
            <v-form @submit.prevent="onSignup" v-model="valid" lazy-validation>
              <v-card-text>
                <v-text-field id="nickname" prepend-icon="person" v-model="nickname" label="Prénom" :error-messages="nicknameErrors" @input="$v.nickname.$touch()" @blur="$v.nickname.$touch()" required></v-text-field>
                <v-text-field id="name" prepend-icon="person" v-model="name" label="Nom" :error-messages="nameErrors" @input="$v.name.$touch()" @blur="$v.name.$touch()" required></v-text-field>
                <v-text-field id="email" prepend-icon="email" name="email" v-model="email" label="Email" type="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required>
                </v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" v-model="password" label="Password" type="password" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" required>
                </v-text-field>
                <v-text-field id="confirmPassword" prepend-icon="lock" name="confirmPassword" v-model="confirmPassword" label="confirm Password" type="password" :error-messages="confirmPasswordError" @input="$v.confirmPassword.$touch()" @blur="$v.confirmPassword.$touch()"
                  required>
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" router to="/Signin">Connexion</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" :disabled="loading" :loading="loading" color="primary">S'enregistrer
                  <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
          <p>{{user}}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  between
} from "vuelidate/lib/validators";
import { store } from "../../store/index";
import Signin from "./Signin";

export default {
  mixins: [validationMixin],
  validations: {
    nickname: { required, minLength: minLength(3), maxLength: maxLength(15) },
    name: { required, minLength: minLength(3), maxLength: maxLength(15) },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  name: "SignUp",
  data() {
    return {
      valid: false,
      submitStatus: null,
      nickname: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loader: null
    };
  },
  computed: {
    nicknameErrors() {
      const errors = [];
      if (!this.$v.nickname.$dirty) return errors;
      !this.$v.nickname.maxLength &&
        errors.push(
          "Le maximum et de " +
            this.$v.nickname.$params.maxLength.max +
            " caractère"
        );
      !this.$v.nickname.minLength &&
        errors.push(
          "Le minimum et de " +
            this.$v.nickname.$params.minLength.min +
            " caractère"
        );
      !this.$v.nickname.required && errors.push("Le champs et obligatoire");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push(
          "Le maximum et de " +
            this.$v.name.$params.maxLength.max +
            " caractère"
        );
      !this.$v.name.minLength &&
        errors.push(
          "Le minimum et de " +
            this.$v.name.$params.minLength.min +
            " caractère"
        );
      !this.$v.name.required && errors.push("Le champs et obligatoire");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Ce n'est pas un email valide");
      !this.$v.email.required && errors.push("Le champs et obligatoire");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Vous devez avoir un minium de 6 caractère.");
      !this.$v.password.required && errors.push("Le champs et obligatoire");
      return errors;
    },
    confirmPasswordError() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Le mot de passe ne correspond pas");
      return errors;
    },
    user() {
      return this.$store.getters.user;
    },
    authError() {
      return this.$store.getters.authError;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("signupUser", {
          name: this.name,
          nickname: this.nickname,
          email: this.email,
          password: this.password
        });
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    dimissError() {
      this.$store.dispatch("clearErrorAuth");
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>