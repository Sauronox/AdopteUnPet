import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import {
  auth,
  db,
  storage
} from "../src/firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    signinComponent: {
      name: "",
      nickname: "",
      email: "",
      address: "",
      typeLogement: "",
      presentation: ""
    },
    listAdoptAnimals: [],
    listOfAnimals: [{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Chien_errant.JPG",
        id: "001",
        name: "Aldo",
        age: "1",
        date: "2018-01-01"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/94/My_dog.jpg",
        id: "002",
        name: "Balou",
        age: 2,
        date: "2018-01-02"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chien_sportif.jpg",
        id: "003",
        name: "Chouqi",
        age: 2,
        date: "2018-01-03"
      },
      {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Bouvier_bernois_chien_de_montagne.jpg",
        id: "004",
        name: "Choupette",
        age: 2,
        date: "2018-01-04"
      }
    ],

    userPreference: {
      id: "002",
      animalsPrefered: ["002"]
    },
    user: null,
    loading: false,
    authError: null
  },
  mutations: {
    createAdoptionPet(state, payload) {
      state.listAdoptAnimals.push(payload)
      state.user.showcase.push(payload)
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setErrorAuth(state, payload) {
      state.authError = payload;
    },
    clearErrorAuth(state) {
      state.authError = null;
    },
    setErrorRegister(state, payload) {
      state.errorRegister = payload;
    },
    setName(state, payload) {
      state.signinComponent.name = payload;
    },
    setNickname(state, payload) {
      state.signinComponent.nickname = payload;
    },
    setEmail(state, payload) {
      state.signinComponent.email = payload;
    },
    setAddress(state, payload) {
      state.signinComponent.address = payload;
    },
    setTypelogement(state, payload) {
      state.signinComponent.typeLogement = payload;
    },
    setPresentation(state, payload) {
      state.signinComponent.presentation = payload;
    }
  },
  actions: {
    createAdoptionPet({
      commit,
      getters
    }, payload) {
      const adoption = {
        name: payload.name,
        age: payload.age,
        race: payload.race,
        imageUrl: "none",
        description: payload.presentation,
        creatorId: getters.user.id
      };
      let key;
      let imgUrl;
      db.ref()
        .child("adopted")
        .push(adoption)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return storage.ref("images/" + key + "." + ext).put(payload.image);
        })
        .then(fileData => {
          return storage.ref('images').child(fileData.metadata.name).getDownloadURL()
        })
        .then(imageUrl => {
          imgUrl = imageUrl;
          console.log('imgUrl :', imgUrl)
          console.log('key :', key)
          return db
            .ref("adopted")
            .child(key)
            .update({
              imageUrl: imageUrl
            });
        })
        .then(() => {
          commit("createAdopt", { ...adoption,
            imageUrl: imgUrl,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    signupUser({
      commit
    }, payload) {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", true);
          commit("clearErrorAuth");
          let fullname = payload.nickname + " " + payload.name;
          const newUser = {
            id: user.user.uid,
            email: user.user.email,
            emailVerified: user.user.emailVerified,
            name: fullname,
            phoneNumber: user.user.phoneNumber,
            photoURL: user.user.photoURL,
            presentation: "aucune présentation",
            role: "member",
            showcase: []
          };
          createUserInDB(newUser);
          console.log("user ", newUser);
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setErrorAuth", error);
        });
    },
    signinUser({
      commit
    }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", true);
          commit("clearErrorAuth");
          const newUser = {
            id: user.user.uid,
            email: user.user.email,
            emailVerified: user.user.emailVerified,
            name: user.user.displayName,
            phoneNumber: user.user.phoneNumber,
            photoURL: user.user.photoURL,
            presentation: "",
            role: "",
            showcase: []
          };
          let DataMember = db.ref("users/" + user.user.uid);
          DataMember.on("value", value => {
            newUser.name = value.val().nickname + " " + value.val().name;
            newUser.presentation = value.val().presentation;
            newUser.role = value.val().role;
          });
          console.log("user ", newUser);
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setErrorAuth", error);
        });
    },
    autoSignIn({
      commit
    }, payload) {
      console.log(payload);
      let user = {
        id: payload.uid,
        email: payload.email,
        emailVerified: payload.emailVerified,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL,
        presentation: "",
        showcase: []
      };
      let DataMember = db.ref("users/" + user.id);
      DataMember.on("value", value => {
        commit("setUser", {
          ...user,
          name: value.val().firstname + " " + value.val().name,
          presentation: value.val().presentation,
          role: value.val().role
        });
      });
    },
    fetchUserData({
      commit,
      getters
    }) {
      commit('setLoading', true)
      db.ref('users').child()
    },
    clearErrorAuth({
      commit
    }) {
      commit("clearErrorAuth");
    },
    logout({
      commit
    }) {
      auth.signOut();
      commit("setUser", null);
    }
  },
  getters: {
    // loadAdoptList(state){
    //   eturn
    // },
    user(state) {
      return state.user;
    },
    authError(state) {
      return state.authError;
    },
    loading(state) {
      return state.loading;
    }
  },
  name(state) {
    return state.signinComponent.name;
  },
  nickname(state) {
    return state.signinComponent.nickname;
  },
  email(state) {
    return state.signinComponent.email;
  },
  address(state) {
    return state.signinComponent.address;
  },
  typeLogement(state) {
    return state.signinComponent.typeLogement;
  },
  presentation(state) {
    return state.signinComponent.presentation;
  }
});

function createUserInDB(user) {
  console.log("Test in createUserInDB");
  let refUserCreated = db.ref("users");
  refUserCreated.child(user.id).set({
      id: user.id,
      fullname: user.name,
      name: user.name.split(" ")[1],
      firstname: user.name.split(" ")[0],
      presentation: null,
      role: user.role,
      email: user.email,
      emailVerified: user.emailVerified,
      showcaseId: []
    },
    error => {
      if (error) {
        console.log("Error push object ", error);
      } else {
        console.log("object et sauvgarder");
      }
    }
  );
}