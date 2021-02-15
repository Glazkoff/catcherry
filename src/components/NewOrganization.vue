<template>
  <div class="container" v-if="!this.$apollo.loading">
    <div class="row">
      <div class="col-12">
      <!-- Хлебные крошки -->
        <breadcrumbs></breadcrumbs>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">

          <!-- форма добавления новой организации  -->
          <form @submit.prevent="CreateNewOrganizanion()">
            <label class="form-name white">{{
              $t("Organizations.nameOrganization")
            }}</label
            ><br />
            <div class="form-group">
              <input
                :disabled="signUpLoading"
                type="text"
                v-model.trim="$v.name.$model"
                placeholder="Название организации"
                class="form-control col-8 dark"
                :class="{ is_invalid: $v.name.$error }"
              />
              <div v-if="$v.name.$error" class="error">
                <span v-if="!$v.name.required">{{
                  $t("Organizations.requiredOrganization")
                }}</span>
                <span v-else-if="!$v.name.alpha">{{
                  $t("Organizations.alphabetСharactersOrganization")
                }}</span>
              </div>
            </div>
            <!-- тип орагизации должен выводиться из таблицы organizationTypes -->
            <div class="form-group">
              <label class="form-name white">{{
                $t("Organizations.typeOrganization")
              }}</label
              ><br />
              <select
                type="number"
                :disabled="signUpLoading"
                v-model.trim="$v.organizationTypeId.$model"
                placeholder="Organization type"
                class="form-control col-8 dark"
                :class="{ is_invalid: $v.organizationTypeId.$error }"
              >
                <option
                  v-for="type in organizationsTypes"
                  :key="type.id"
                  :value="type.id"
                >
                  {{ type.name }}
                </option>
              </select>
              <div v-if="$v.organizationTypeId.$error" class="error">
                <span v-if="!$v.organizationTypeId.required">{{
                  $t("Organizations.requiredOrganization")
                }}</span>
              </div>
            </div>
            <div class="form-group points_task">
              <label class="form-name white">{{
                $t("Organizations.countTeams")
              }}</label
              ><br />
              <input
                :disabled="signUpLoading"
                type="number"
                v-model.trim="$v.maxTeamsLimit.$model"
                placeholder="Limit"
                class="form-control white"
              />
              <div v-if="$v.maxTeamsLimit.$error" class="error">
                <span v-if="!$v.maxTeamsLimit.required">{{
                  $t("Organizations.limitTeams")
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <input
                :disabled="signUpLoading"
                type="submit"
                class="btn btn-primary col-8"
                value="Зарегистрировать организацию"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Информационное окно об успешном добавлении организации  -->
    <minialert v-if="isShowAlertAdd"
      ><p slot="title">
        {{ $t("Organizations.successCreateOrganization") }}
      </p></minialert
    >
  </div>
</template>

<script>
import minialert from "@/components/MiniAlert.vue";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import {
  ORGS_QUERY,
  CREATE_ORGANIZATION,
  TYPES_ORGANIZATIONS_QUERY
} from "@/graphql/queries";
import { required } from "vuelidate/lib/validators";
export default {
  name: "NewOrganization",
  components: { minialert, breadcrumbs },
  data() {
    return {
      nameOfOrganization: "",
      indexOrganizationTypeId: 1,
      isShowAlertAdd: false,
      isAddOrganization: false,
      name: "",
      ownerId: 1,
      organizationId: 1,
      organizationTypeId: 1,
      maxTeamsLimit: 1,
      signUpLoading: false
    };
  },
  apollo: {
    // Массив команд, находящихся в организации
    organizationsTypes: {
      query: TYPES_ORGANIZATIONS_QUERY
    }
  },
  // Валидация формы
  validations: {
    name: {
      required,
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    },
    ownerId: {
      required
    },
    organizationTypeId: {
      required
    },
    maxTeamsLimit: {
      required
    }
  },
  methods: {
    //Метод создания новой организации
    CreateNewOrganizanion() {
      
      // Запрос к серверу о создании новой организации
      this.$apollo
        .mutate({
          mutation: CREATE_ORGANIZATION,
          variables: {
            name: this.name,
            ownerId: +this.$store.getters.decodedToken.id,
            organizationTypeId: +this.organizationTypeId,
            maxTeamsLimit: +this.maxTeamsLimit
          },
          
          //Обновление кэша
          update: (cache, { data: { createOrganization } }) => {
            let data = cache.readQuery({ query: ORGS_QUERY });
            data.organizations.push(createOrganization);
            this.indexOrganizationTypeId = this.organizationsTypes.findIndex(
              el => el.id == this.organizationTypeId
            );

            cache.writeQuery({ query: ORGS_QUERY, data });
          },

          optimisticResponse: {
            __typename: "Mutation",

            createOrganization: {
              __typename: "Organization",
              id: -1,
              name: this.name,
              maxTeamsLimit: +this.maxTeamsLimit,
              organizationType: {
                id: +this.organizationTypeId,
                name: this.organizationsTypes[this.indexOrganizationTypeId]
                  .name,
                __typename: "organizationType"
              },
              owner: {
                id: this.ownerId,
                name: this.$store.getters.decodedToken.name,
                surname: this.$store.getters.decodedToken.surname,
                patricity: this.$store.getters.decodedToken.patricity,
                __typename: "User"
              }
            }
          }
        })
        .then(resp => {
          this.signUpLoading = false;
          this.isAddOrganization = false;
          console.log(resp);
        })
        .catch(error => {
          this.signUpLoading = false;
          console.error(error);
        });
      // Вывод инфомационного окошка об успешном создании организации
      this.isShowAlertAdd = true;
      setTimeout(() => {
        this.isShowAlertAdd = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_grid.scss";
textarea {
  resize: none;
  height: 10rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.points_task input {
  width: 10rem;
  height: 55px;
  background: $dark_blue !important;
  border: 0px solid $violet_2 !important;
  border-bottom: 1px solid $bright_violet !important;
  box-shadow: 0px 0px 0px 0px !important;
  border-radius: 0px !important;
}
</style>
