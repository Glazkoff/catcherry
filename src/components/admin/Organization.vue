<template>
    <div class="main">
        <popup v-if="isShowModalEdit" @close="isShowModalEdit = false">
            <h3 slot="header">Редактировать организацию</h3>
            <p slot="action">Сохранить изменения</p>
        </popup>
        <popup @answer="closePopup" :organization='organizations[index]' v-if="isShowModalDelete" @close="isShowModalDelete = false">
            <h3 slot="header">Вы действительно хотите удалить организацию "{{ nameOfDeleteOrganization }}"?</h3>
            <p slot="action">Удалить</p>
        </popup>
        <h2>Список организаций</h2>
        <h6 v-if="organizations.length==0">К сожалению, пока пользователей нет</h6>
        <table v-if="organizations.length>0">
            <tr v-for="organization in organizations" :key="organization.id">
                <td>{{ organization.id }}.</td>
                <td>{{ organization.name }}</td>
                <td>{{ organization.ownerId }}</td>
                <td>{{ organization.organizationType }}</td>
                <td><button @click="showModalEdit(organization)">Редактировать</button></td>
                <td><button @click="showModalDelete(organization)">Удалить</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import popup from '@/components/admin/Popup.vue'
    export default {
        components: { popup },
        data() {
            return {
                index: 0,
                oneOrganization: {},
                nameOfDeleteOrganization: '',
                isShowModalEdit: false,
                isShowModalDelete: false,
                organizations: [{
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
                }]
            }
        },
        methods: {
            showModalDelete(organization) {
                this.nameOfDeleteOrganization = organization.name,
                this.isShowModalDelete = true;
                this.index = this.organizations.findIndex(el => el.id === organization.id);
                this.oneOrganization = organization;
            },
            closePopup(ans) {
                this.isShowModalDelete = false;
                if (ans.ans) {
                    this.index = this.organizations.findIndex(el => el.id === this.oneOrganization.id);
                    this.organizations.splice(this.index, 1);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>