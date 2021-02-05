<template>
  <div class="container" v-if="!this.$apollo.loading">
    <div class="row">
      <div class="col-12">
        <breadcrumbs></breadcrumbs>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <!-- форма добавления новой организации  -->
          <form @submit.prevent="submit()">
            <label class="form-name white">Название организации</label><br />
            <div class="form-group">
              <input
                :disabled="signUpLoading"
                type="text"
                v-model.trim="$v.name.$model"
                placeholder="Организация 'Техностек'"
                class="form-control col-8 dark"
                :class="{ is_invalid: $v.name.$error }"
              />
              <div v-if="$v.name.$error" class="error">
                <span v-if="!$v.name.required"
                  >Organization name is required</span
                >
                <span v-else-if="!$v.name.alpha"
                  >Organization name accepts only alphabet characters.</span
                >
              </div>
            </div>
            <!-- тип орагизации должен выводиться из таблицы organizationTypes -->
            <div class="form-group">
              <label class="form-name white">Тип организации</label><br />
              <select
                type="number"
                :disabled="signUpLoading"
                v-model.trim="$v.organizationTypeId.$model"
                placeholder="Organization type"
                class="form-control col-8 dark"
                :class="{ is_invalid: $v.organizationTypeId.$error }"
              >
                <option value="1">ИТ-компания</option>
                <option value="2">Образовательная организация</option></select
              >
              <div v-if="$v.organizationTypeId.$error" class="error">
                <span v-if="!$v.organizationTypeId.required"
                  >Type of organization is required</span
                >
              </div>
            </div>
            <div class="form-group points_task">
              <label class="form-name white">Количество команд</label><br />
              <input
                :disabled="signUpLoading"
                type="number"
                v-model.trim="$v.maxTeamsLimit.$model"
                placeholder="Limit"
                class="form-control white"
              />
              <div v-if="$v.maxTeamsLimit.$error" class="error">
                <span v-if="!$v.maxTeamsLimit.required"
                  >Limit of teams is required</span
                >
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
    <!-- окошко информации о добавлении организации  -->
    <minialert v-if="isShowAlertAdd"
      ><p slot="title">Вы успешно добавили организацию</p></minialert
    >
  </div>
</template>

<script>
import minialert from "@/components/MiniAlert.vue";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import { ORGS_QUERY, CREATE_ORGANIZATION } from "@/graphql/queries";
import { required } from "vuelidate/lib/validators";
export default {
  name: "NewOrganization",
  components: { minialert, breadcrumbs },
  data() {
    return {
      nameOfOrganization: "",

      isShowAlertAdd: false,
      isAddOrganization: false,
      name: "",
      ownerId: 124,
      organizationId: 7,
      organizationTypeId: 1,
      maxTeamsLimit: 1,
      signUpLoading: false
    };
  },
  // валидация формы
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
    submit() {
      // создание новой организации
      this.$apollo
        .mutate({
          mutation: CREATE_ORGANIZATION,
          variables: {
            name: this.name,
            ownerId: this.$store.getters.decodedToken.id,
            organizationTypeId: +this.organizationTypeId,
            maxTeamsLimit: +this.maxTeamsLimit
          },
          update: (cache, { data: { createOrganization } }) => {
            let data = cache.readQuery({ query: ORGS_QUERY });
            data.organizations.push(createOrganization);
            cache.writeQuery({ query: ORGS_QUERY, data });
          },
          optimisticResponse: {
            __typename: "Mutation",
            createOrganization: {
              __typename: "Organization",
              id: -1,
              name: this.name,
              ownerId: this.ownerId,
              organizationTypeId: this.organizationTypeId,
              maxTeamsLimit: this.maxTeamsLimit
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
      // вывод инфомационного окошка о создании организации
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
