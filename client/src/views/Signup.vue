<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="green" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="register" id="register"> 
                  <v-text-field v-model="email" label="Email" name="email" prepend-icon="email" type="text"></v-text-field>
                  <v-text-field v-model="username" label="Username" name="login" prepend-icon="person" type="text"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" form="register"  color="green">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    username : "",
    password : "",
    email: ""
  }),
  methods : {
    register(){
      this.$store.dispatch('register',{
        username : this.username,
        password : this.password,
        email : this.email
      })
      this.username = ""
      this.password = ""
      this.email = ""
    }
  }
};
</script>
