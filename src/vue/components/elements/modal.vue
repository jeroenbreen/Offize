<script>
    export default {
        name: 'modal',
        data() {
            return {
                message: 'Hello'
            }
        },
        methods: {
            close() {
                this.$store.commit('modal/closeModal');
            },
            getModalData() {
                return this.$store.state.modal;
            },
            confirm() {
                if (this.$store.state.modal.callback && typeof this.$store.state.modal.callback === 'function') {
                    this.$store.state.modal.callback();
                }
                this.close();
            },
            deny() {
                this.close();
            }
        }
    }
</script>


<template>
    <div class="cover" @click="close()">
        <div class="modal">
            <div
                v-html="getModalData().message"
                class="modal__body">
            </div>

            <div class="modal__footer">
                <div v-if="getModalData().type === 'confirm'" class="modal__confirm">
                    <md-button @click="confirm()" class="md-primary">{{getModalData().buttons.yes}}</md-button>
                    <md-button @click="deny()" class="md-primary">{{getModalData().buttons.no}}</md-button>
                </div>
            </div>

            <div @click="close()" class="modal__close"></div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .modal {
        background-color: #fff;
        position: absolute;
        width: 500px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        top: 60px;
        transition: top 1s ease;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.40);


        .modal__body {
            padding: 30px 50px;
            font-size: 16px;
        }

        .modal__footer {
            position: relative;
            padding: 8px 30px 30px 30px;
            text-align: right;
        }

        .modal__close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            cursor: pointer;
            width: 24px;
            height: 24px;
            opacity: 0.8;
            text-align: center;
            border: 1px solid rgba(0, 0, 0,0.4);
            border-radius: 3px;

            &:before, &:after {
                position: absolute;
                left: 11px;
                top: 2px;
                content: ' ';
                height: 18px;
                width: 1px;
                background-color: #000;
            }

            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }

            &:hover {
                opacity: 1;
            }
        }
    }
</style>


