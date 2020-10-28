<template>
  <div class="main">
    <popup v-if="isShowFullInformation">
      <h3 v-if="!isShowModalDelete && !isShowModalEdit" slot="header">
        Организация "{{ oneOrganization.name }}"
      </h3>
      <h3 v-if="isShowModalDelete" slot="header">
        Вы действительно хотите удалить организацию "{{
          oneOrganization.name
        }}"?
      </h3>
      <h3 v-if="isShowModalEdit" slot="header">
        Редактировать организацию "{{ oneOrganization.name }}"?
      </h3>
      <div slot="body" v-if="!isShowModalDelete && !isShowModalEdit">
        <p>{{ oneOrganization.organizationType }}</p>
        <p>{{ oneOrganization.maxTeamsLimit }}</p>
        <p>{{ oneOrganization.createAt }}</p>
        <div class="btn-group">
          <button @click="showModalEdit()">Редактировать</button>
          <button @click="showModalDelete()">Удалить</button>
          <button @click="cancelFullInformation()">
            <i18n path="cancel"
              ><span place="title">{{ $t("cancel") }}</span></i18n
            >
          </button>
        </div>
      </div>
      <div slot="body" v-if="isShowModalEdit">
        <form>
          <label for="name">Название</label>
          <input
            name="name"
            v-model="oneOrganization.name"
            placeholder="Название"
            required
          />
          <div class="btn-group" v-if="!isShowModalDelete && !isShowModalEdit">
            <button @click="showModalEdit()">Редактировать</button>
            <button @click="showModalDelete()">Удалить</button>
            <button @click="cancelFullInformation()">
              <i18n path="cancel"
                ><span place="title">{{ $t("cancel") }}</span></i18n
              >
            </button>
          </div>
        </form>
        <div class="btn-group" v-if="isShowModalDelete">
          <button @click="deleteOrganization()">Удалить</button>
          <button @click="cancelModalDelete()">Отменить</button>
        </div>
        <div class="btn-group" v-if="isShowModalEdit">
          <button @click="editOrganization()">Сохранить</button>
          <button @click="cancelModalEdit()">Отменить</button>
        </div>
      </div>
    </popup>
    <h2>Список организаций</h2>
    <h6 v-if="organizations.length == 0">
      К сожалению, пока пользователей нет
    </h6>
    <div v-if="organizations.length > 0">
      <input
        v-model="findString"
        type="text"
        placeholder="Поиск по организациям"
      />
      <div
        class="oneOrganization"
        v-for="organization in filterOrganization"
        :key="organization.id"
      >
        <div>
          <p>{{ organization.name }}</p>
          <p>№ {{ organization.id }}</p>
        </div>
        <a @click="showFullInformation(organization)">Подробнее</a>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">Вы успешно изменили орагнизацию</p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">Вы успешно удалили организацию</p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/admin/Popup.vue";
import minialert from "@/components/admin/MiniAlert.vue";
export default {
  components: { minialert, popup },
  data() {
    return {
      index: 0,
      oneOrganization: {},
      nameOfOrganization: "",
      isShowModalEdit: false,
      isShowModalDelete: false,
      isShowAlertEdit: false,
      isShowAlertDelete: false,
      isShowFullInformation: false,
      findString: "",
      organizations: [
        {
          id: 1,
          name: "Малькина и Ко",
          ownerId: 1,
          organizationType: "Обычная",
          maxTeamsLimit: 10,
          createAt: new Date(),
          updateAt: new Date()
        },
        {
          id: 2,
          name: "Поливеб",
          ownerId: 2,
          organizationType: "Обычная",
          maxTeamsLimit: 23,
          createAt: new Date(),
          updateAt: new Date()
        }
      ]
    };
  },
  methods: {
    cancelFullInformation() {
      this.isShowFullInformation = false;
    },
    showFullInformation(organization) {
      this.oneOrganization = Object.assign(this.oneOrganization, organization);
      this.isShowFullInformation = true;
    },
    showModalDelete() {
      this.isShowModalDelete = true;
    },
    cancelModalDelete() {
      this.isShowModalDelete = false;
    },
    deleteOrganization() {
      this.isShowFullInformation = false;
      this.isShowModalDelete = false;
      this.index = this.organizations.findIndex(
        el => el.id === this.oneOrganization.id
      );
      this.organizations.splice(this.index, 1);
      this.isShowAlertDelete = true;
      setTimeout(() => {
        this.isShowAlertDelete = false;
      }, 3000);
    },
    showModalEdit() {
      this.isShowModalEdit = true;
    },
    cancelModalEdit() {
      this.isShowModalEdit = false;
    },
    editOrganization() {
      this.isShowModalEdit = false;
      this.index = this.organizations.findIndex(
        el => el.id === this.oneOrganization.id
      );
      this.organizations.splice(this.index, 1, this.oneOrganization);
      this.isShowAlertEdit = true;
      setTimeout(() => {
        this.isShowAlertEdit = false;
      }, 3000);
    }
    // closePopup(ans) {
    //   this.isShowModalDelete = false;
    //   this.isShowModalEdit = false;
    //   if (ans.ans && ans.action === "edit") {
    //     this.index = this.organizations.findIndex(
    //       el => el.id === this.oneOrganization.id
    //     );
    //     this.organizations.splice(this.index, 1, ans.organization);
    //     this.isShowAlertEdit = true;
    //     setTimeout(() => {
    //       this.isShowAlertEdit = false;
    //     }, 3000);
    //   }
    // }
  },
  computed: {
    filterOrganization() {
      if (this.findString !== "") {
        return this.organizations.filter(el => {
          return (
            el.name.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 && el.name !== ""
          );
        });
      } else {
        return this.organizations;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// button {
//   width: 100%;
//   margin: 0 5%;
// }
.oneOrganization {
  display: flex;
  justify-content: space-between;
  padding: 1%;
  border: 1px solid black;
  margin-bottom: 1%;
  div {
    width: 70%;
    p {
      margin: 0;
      padding: 0;
    }
  }
  a {
    color: grey;
    text-decoration: underline;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    button {
      width: 100%;
    }
  }
}
</style>
