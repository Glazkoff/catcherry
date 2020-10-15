<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <!-- <h1>{{user.name}}</h1> -->
              <div class="modal-header">
                <h2><slot name="header"></slot></h2>
              </div>

              <div class="modal-body">
                <slot name="body">
                </slot>
              </div>

              <div class="modal-footer">
                <button class="modal-default-button" @click="onDelete()"><slot name="action"></slot></button>
                <button class="modal-default-button" @click="onCancel()">Отменить</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
    export default {
        props: ['user'],
        methods: {
          onCancel() {
            this.$emit('answer', {ans: false});
          },
          onDelete() {
            this.$emit('answer', {ans: true});
          }
        }
    }
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
        width: 50vw;
        margin: 0px auto;
        padding: 2%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
    }

    .modal-header {
        margin-top: 0;
        h2 {
          text-align: center;
        }
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-footer {
      display: flex;
      justify-content: space-between;
      button {
        width: 100%;
        margin: 0 5%;
      }
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container, .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>