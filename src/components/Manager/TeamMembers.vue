<template>
<div>
    <h3>Участники</h3>
    <hr>
    <div v-for="member in members" :key="member.id" class="member">
        <TeamMemberItem :member="member" />
    </div>
</div>
</template>

<script>
import TeamMemberItem from "./TeamMemberItem.vue";
export default {
    data() {
        return {
            members: [{
                    id: 1,
                    img: "",
                    name: "Иван Иванов",
                },
                {
                    id: 2,
                    img: " ",
                    name: "Иван Иванов",
                },
                {
                    id: 3,
                    img: " ",
                    name: "Иван Иванов",
                },
            ],
        }
    },
    components: {
        TeamMemberItem,
    }

}
</script>

<style lang="scss" scoped>
.member {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
}
</style>
