<template>
  <div class="main">
    <popup @answer="closePopup" v-if="isShowModalEdit">
      <h3 slot="header">
        Редактирование организации "{{ nameOfOrganization }}"
      </h3>
      <div slot="body">
        <form>
          <label for="name">Название</label>
          <input
            name="name"
            v-model="oneOrganization.name"
            placeholder="Название"
            required
          />
        </form>
      </div>
      <button
        slot="action"
        class="modal-default-button"
        @click="
          closePopup({
            ans: true,
            action: 'edit',
            organization: oneOrganization
          })
        "
      >
        Сохранить
      </button>
    </popup>
    <popup
      @answer="closePopup"
      :organization="organizations[index]"
      v-if="isShowModalDelete"
    >
      <h3 slot="header">
        Вы действительно хотите удалить организацию "{{ nameOfOrganization }}"?
      </h3>
      <button
        slot="action"
        class="modal-default-button"
        @click="closePopup({ ans: true, action: 'delete' })"
      >
        Удалить
      </button>
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
        <p>{{ organization.id }}.</p>
        <p>{{ organization.name }}</p>
        <p>{{ organization.ownerId }}</p>
        <p>{{ organization.organizationType }}</p>
        <button @click="showModalEdit(organization)">Редактировать</button>
        <button @click="showModalDelete(organization)">Удалить</button>
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
    showModalDelete(organization) {
      (this.nameOfOrganization = organization.name),
        (this.isShowModalDelete = true);
      this.index = this.organizations.findIndex(
        el => el.id === organization.id
      );
      this.oneOrganization = organization;
    },
    showModalEdit(organization) {
      (this.nameOfOrganization = organization.name),
        (this.isShowModalEdit = true);
      this.index = this.organizations.findIndex(
        el => el.id === organization.id
      );
      this.oneOrganization = Object.assign(this.oneOrganization, organization);
    },
    closePopup(ans) {
      this.isShowModalDelete = false;
      this.isShowModalEdit = false;
      if (ans.ans && ans.action == "delete") {
        this.index = this.organizations.findIndex(
          el => el.id === this.oneOrganization.id
        );
        this.organizations.splice(this.index, 1);
        this.isShowAlertDelete = true;
        setTimeout(() => {
          this.isShowAlertDelete = false;
        }, 3000);
      } else if (ans.ans && ans.action === "edit") {
        this.index = this.organizations.findIndex(
          el => el.id === this.oneOrganization.id
        );
        this.organizations.splice(this.index, 1, ans.organization);
        this.isShowAlertEdit = true;
        setTimeout(() => {
          this.isShowAlertEdit = false;
        }, 3000);
      }
    }
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
button {
  width: 100%;
  margin: 0 5%;
}
.oneOrganization {
  display: grid;
  grid-template-columns: 5% 25% 20% 20% 15% 15%;
  grid-template-rows: 1fr;
}
</style>
