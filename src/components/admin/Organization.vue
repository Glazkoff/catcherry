<template>
    <div class="main">
        <popup v-if="isShowModalEdit" @close="isShowModalEdit = false">
            <h3 slot="header">Редактировать организацию</h3>
        </popup>
        <popup v-if="isShowModalDelete" @close="isShowModalDelete = false">
            <h3 slot="header">Вы действительно хотите удалить организацию </h3>
        </popup>
        <h2>Список организаций</h2>
        <table>
            <tr v-for="organization in organizations" :key="organization.id">
                <td>{{ organization.id }}.</td>
                <td>{{ organization.name }}</td>
                <td>{{ organization.ownerId }}</td>
                <td>{{ organization.organizationType }}</td>
                <td><button @click="showModalEdit(user)">Редактировать</button></td>
                <td><button @click="showModalDelete(user)">Удалить</button></td>
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
            showModalDelete(user) {
                this.isShowModalDelete = true;
                this.$emit('ModalDelete', user);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>