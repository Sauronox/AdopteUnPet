<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="info">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md4>
                                <v-img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/50/Bouvier_bernois_chien_de_montagne.jpg"
                                height="130px"
                                >
                                </v-img>
                            </v-flex>
                            <v-flex xs7 sm7 md9>
            <v-card-title primary-title>
                <div>
                  <h5 class="white--text mb0">Choupette</h5>
                  <div>Adopter le 17/12/2018</div>
                </div>
              </v-card-title>
              <v-card-actions>
                  <v-btn flat to="/toAdoptedAnimal/1">
                      <v-icon>arrow_forward</v-icon>
                      View Animal
                  </v-btn>
              </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
