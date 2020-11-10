<template>
    <transition name="alert">
        <div class="alert">
            <div class="alert-container">
                <slot name="title"></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .alert {
        width: 15vw;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        border-radius: 10px;
        padding: 1%;
        text-align: center;
        position: fixed;
        bottom: 2%;
        right: 1%;
        transition: all 0.3s ease;
    }

    .alert-enter .alert, .alert-leave-active .alert {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>