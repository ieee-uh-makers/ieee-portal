<template>
    <div>
        <b-alert :variant="alertVariant"
                 v-show="alertText && alertText.length"
                 :show="alertTimer"
                 dismissible
                 @dismissed="alertTimer = 0"
                 @dismiss-count-down="onTimerChanged"
                 fade
                 class="mt-1">{{ alertText }}</b-alert>
        <div v-show="isAlertLoading" class="text-center my-3">
            <b-spinner variant="success" type="grow" label="Spinning"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlertBox",
        data() {
            return {
                isAlertLoading: false,
                alertVariant: 'success',
                alertText: null,
                alertTimer: 0
            }
        },
        methods: {
            update(variant, text = '') {
                if (variant === 'loading') {
                    this.isAlertLoading = true;
                    this.alertVariant = 'success';
                    this.alertText = '';
                } else {
                    this.isAlertLoading = false;

                    if (text && text.length) {
                        if (this.alertVariant === 'danger') {
                            console.error(text);
                        } else {
                            let hourSeconds = 3600;

                            this.alertText = text;
                            this.alertVariant = variant;
                            this.alertTimer = variant === 'danger' ? hourSeconds : 5;
                        }
                    }
                }
            },
            reset() {
                this.isAlertLoading = false;
                this.alertVariant = 'success';
                this.alertText = '';
                this.alertTimer = 0;
            },
            onTimerChanged(val) {
                this.alertTimer = val;
            }
        }
    }
</script>

<style scoped>

</style>