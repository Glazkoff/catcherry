<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <button class="modal-default-button" @click="$emit('close')">
                    &times;
                </button>
                <div class="modal-header">
                    <slot name="header">
                        <h3>Удаление участника</h3>
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        <p>{{userInTeam.status}}</p>
                        <img src="" alt="photo">
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button type="submit" class="modal-avtive-button" @click="$emit('del')">Удалить</button>
                        <button type="submit" class="modal-default-button" @click="$emit('close')">Отмена</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props: ['userInTeam'],
};
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 30%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    margin-bottom: 50px;
}

.modal-default-button {
    float: right;
}

.modal-avtive-button {
    float: left;
}
</style>
