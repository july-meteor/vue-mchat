<template >
    <transition name="message-box-fade">
        <div
                class="message-box__wrapper"
                tabindex="-1"
                v-show="visible"
                @click.self="handleWrapperClick"
                role="dialog"
                aria-modal="true"
                :aria-label="title || 'dialog'">
            <div class="message-box">
                <div class="message-box_head" v-if="title !== null">
                    <!--<div-->
                            <!--:class="['status', icon]"-->
                           <!--&gt;-->
                    <!--</div>-->

                    <span class="message-box_title">{{ title }}</span>
                    <div class="message-box_header_group">
                        <button
                                type="button"
                                v-if="showClose"
                                @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                                @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                                aria-label="Close"
                                class="message-box_header_btn">
                            <i class="m-icon-close"></i>
                        </button>
                    </div>


                </div>
                <div class="message-box_body">
                    <div class="message-box_content"  v-if="message !== ''">
                        <div
                                :class="['status', icon]"
                                v-if="icon && !center && message !== ''">
                        </div>
                        <div class="message-box_message">
                            <slot>
                                <p v-if="!dangerouslyUseHTMLString">  {{ message }}</p>
                                <p v-else v-html="message"></p>
                            </slot>
                        </div>
                        <div  class="message-box_input" v-if="showInput">
                            <input v-model="inputValue"   :placeholder="inputPlaceholder"  @keydown.enter="handleInputEnter"  ref="input" />
                            <div class="message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
                        </div>
                    </div>


                </div>
                <div class="message-box_footer">
                    <span class="message-box-footer">
                           <button
                                   type="button"
                                   :loading="cancelButtonLoading"
                                   v-if="showCancelButton"
                                   :round="roundButton"
                                   @click="handleClose"
                                   aria-label="Close"
                                   class="m-button"

                                   @keydown.enter="handleAction('cancel')"
                           >{{cancelButtonText}}
                        </button>

                    <button
                            :loading="confirmButtonLoading"
                            ref="confirm"
                            v-show="showConfirmButton"
                            :round="roundButton"
                            class="m-button m-button-primary"
                            @click="handleAction('confirm')"
                            @keydown.enter="handleAction('confirm')"
                    >
                        {{confirmButtonText}}
                    </button>
                      </span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/babel">
    import Popup from '../../../util/popup/index'
    import Dialog from '../../../util/aria-dialog'
    import { addClass, removeClass } from '../../../util/dom'

    let messageBox;
    let typeMap = {
        success: 'success',
        info: 'info',
        warning: 'prompt',
        error: 'error'
    };

    export default {
        mixins: [Popup],

        props: {
            modal: {
                default: true
            },
            lockScroll: {
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            closeOnClickModal: {
                default: true
            },
            closeOnPressEscape: {
                default: true
            },
            closeOnHashChange: {
                default: true
            },
            center: {
                default: false,
                type: Boolean
            },
            roundButton: {
                default: false,
                type: Boolean
            }
        },


        computed: {
            icon() {
                const {type, iconClass} = this;
                return iconClass || (type && typeMap[type] ? `m-icon-${ typeMap[type] }` : '');
            },
        },

        methods: {
            getSafeClose() {
                const currentId = this.uid;
                return () => {
                    this.$nextTick(() => {
                        if (currentId === this.uid) this.doClose();
                    });
                };
            },
            doClose() {
                if (!this.visible) return;
                this.visible = false;
                this._closing = true;

                this.onClose && this.onClose();
                messageBox.closeDialog(); // 解绑
                if (this.lockScroll) {
                    setTimeout(this.restoreBodyStyle, 200);
                }
                this.opened = false;
                this.doAfterClose();
                setTimeout(() => {
                    if (this.action) this.callback(this.action, this);
                });
            },

            handleWrapperClick() {
                if (this.closeOnClickModal) {
                    this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel');
                }
            },

            handleInputEnter() {
                if (this.inputType !== 'textarea') {
                    return this.handleAction('confirm');
                }
            },

            handleAction(action) {
                if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
                    return;
                }
                this.action = action;
                if (typeof this.beforeClose === 'function') {
                    this.close = this.getSafeClose();
                    this.beforeClose(action, this, this.close);
                } else {
                    this.doClose();
                }
            },

            validate() {
                if (this.$type === 'prompt') {
                    const inputPattern = this.inputPattern;
                    if (inputPattern && !inputPattern.test(this.inputValue || '')) {
                        this.editorErrorMessage = this.inputErrorMessage || '';
                        addClass(this.getInputElement(), 'invalid');
                        return false;
                    }
                    const inputValidator = this.inputValidator;
                    if (typeof inputValidator === 'function') {
                        const validateResult = inputValidator(this.inputValue);
                        if (validateResult === false) {
                            this.editorErrorMessage = this.inputErrorMessage || '';
                            addClass(this.getInputElement(), 'invalid');
                            return false;
                        }
                        if (typeof validateResult === 'string') {
                            this.editorErrorMessage = validateResult;
                            addClass(this.getInputElement(), 'invalid');
                            return false;
                        }
                    }
                }
                this.editorErrorMessage = '';
                removeClass(this.getInputElement(), 'invalid');
                return true;
            },
            getFirstFocus() {
                const btn = this.$el.querySelector('.message-box .m-button');
                const title = this.$el.querySelector('.message-box .message-box_title');
                return btn || title;
            },
            getInputElement() {
                const inputRefs = this.$refs.input;
                return inputRefs ;
            },
            handleClose() {
                this.handleAction('close');
            }
        },

        watch: {
            inputValue: {
                immediate: true,
                handler(val) {
                    this.$nextTick(_ => {
                        if (this.$type === 'prompt' && val !== null) {
                            this.validate();
                        }
                    });
                }
            },

            visible(val) {
                if (val) {
                    this.uid++;
                    if (this.$type === 'alert' || this.$type === 'confirm') {
                        this.$nextTick(() => {
                            // 获取焦点
                            this.$refs.confirm.focus();
                        });
                    }
                    this.focusAfterClosed = document.activeElement;
                    messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
                }

                // prompt
                if (this.$type !== 'prompt') return;
                if (val) {
                    setTimeout(() => {
                        if (this.$refs.input ) {
                            this.getInputElement() .focus();
                        }
                    }, 500);
                } else {
                    this.editorErrorMessage = '';
                    removeClass(this.getInputElement(), 'invalid');
                }
            }
        },

        mounted() {
            this.$nextTick(() => {
                if (this.closeOnHashChange) {
                    window.addEventListener('hashchange', this.close);
                }
            });
        },

        beforeDestroy() {
            if (this.closeOnHashChange) {
                window.removeEventListener('hashchange', this.close);
            }
            setTimeout(() => {
                messageBox.closeDialog();
            });
        },

        data() {
            return {
                uid: 1,
                title: undefined,
                message: '',
                type: '',
                iconClass: '',
                customClass: '',
                showInput: false,
                inputValue: null,
                inputPlaceholder: '',
                inputType: 'text',
                inputPattern: null,
                inputValidator: null,
                inputErrorMessage: '',
                showConfirmButton: true,
                showCancelButton: false,
                action: '',
                confirmButtonText: '',
                cancelButtonText: '',
                confirmButtonLoading: false,
                cancelButtonLoading: false,
                confirmButtonClass: '',
                confirmButtonDisabled: false,
                cancelButtonClass: '',
                editorErrorMessage: null,
                callback: null,
                dangerouslyUseHTMLString: false,
                focusAfterClosed: null,
                isOnComposition: false,
                distinguishCancelAndClose: false
            };
        }
    };
</script>
