<template>
<div>
    <h1>Команда "Название"</h1>
    <div class="every">
        <NavBar class="navig" />
        <div class="partic">
            <h3>Участники</h3>
            <hr>
            <div v-for="userInTeam in usersInTeams" :key="userInTeam.id" class="member">
                <TeamMemberItem :userInTeam="userInTeam" @delete="toDeleteUser" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
import TeamMemberItem from "@/components/Manager/TeamMemberItem.vue";

import {
    USERS_IN_TEAMS_QUERY,
    DELETE_IN_TEAMS_QUERY
} from "@/graphql/queries";

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
    methods: {
        toDeleteUser(id) {
            this.$apollo
                .mutate({
                    mutation: DELETE_IN_TEAMS_QUERY,
                    variables: {
                        id,
                    },
                    update: (cache) => {
                        let data = cache.readQuery({
                            query: USERS_IN_TEAMS_QUERY
                        });
                        let index = data.usersInTeams.findIndex((el) => el.id == id);
                        data.usersInTeams.splice(index, 1);
                        cache.writeQuery({
                            query: USERS_IN_TEAMS_QUERY,
                            data
                        });
                    },
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
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
