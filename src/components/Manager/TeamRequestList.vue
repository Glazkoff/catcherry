<template>
<div class="requests">
    <h1>Заявки на вхождение</h1>
    <div v-for="request in requests" :key="request.id" class="request">
        <TeamRequestItem :request="request" />
    </div>
</div>
</template>

<script>
import TeamRequestItem from "./TeamRequestItem";
export default {
    data() {
        return {
            requests: [{
                    id: 1,
                    img: "",
                    name: "Иван Иванов",
                    email: "ivan@gmail.com",
                    phone: "89345385749",
                    mobile: "8-(847)-90",
                    department: ""

                },
                {
                    id: 2,
                    img: " ",
                    name: "Иван Иванов",
                    email: "ivan@gmail.com",
                    phone: "89345385749",
                    mobile: "8-(847)-90",
                    department: ""
                },
                {
                    id: 3,
                    img: " ",
                    name: "Иван Иванов",
                    email: "ivan@gmail.com",
                    phone: "89345385749",
                    mobile: "8-(847)-90",
                    department: ""
                },
            ],
        }
    },
    components: {
        TeamRequestItem
    }
}
</script>

<style lang="scss" scoped>
.requests {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;
}
</style>
