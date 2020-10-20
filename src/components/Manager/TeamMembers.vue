<template>
<div class="every">
    <NavBar class="navig" />
    <div class="partic">
        <h3>Участники</h3>
        <hr>
        <div v-for="member in members" :key="member.id" class="member">
            <TeamMemberItem :member="member" />
        </div>
    </div>
</div>
</template>

<script>
import NavBar from "./NavBar";
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
        NavBar,
    }

}
</script>

<style lang="scss" scoped>
.member {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
}

.every {
    display: flex;
    justify-content: baseline;
}

.navig {
    width: 15%;
}

.partic {
    width: 50%;
}
</style>
