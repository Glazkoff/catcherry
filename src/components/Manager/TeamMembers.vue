<template>
<div>
    <h1>Команда ""</h1>
    <div class="every">
        <NavBar class="navig" />
        <div class="partic">
            <h3>Участники</h3>
            <hr>
            <div v-for="userInTeam in usersInTeams" :key="userInTeam.id" class="member">
                <TeamMemberItem :userInTeam="userInTeam" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
import TeamMemberItem from "@/components/Manager/TeamMemberItem.vue";

import USERS_IN_TEAMS_QUERY from "@/graphql/queries";

export default {

    apollo: {
        usersInTeams: {
            query: USERS_IN_TEAMS_QUERY,
        },
    },

    data() {
        return {}
    },
    components: {
        TeamMemberItem,
        NavBar,
    },

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
