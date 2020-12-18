<template>
    <transition
            name="dialog-fade"
            @after-enter="afterEnter"
            @after-leave="afterLeave">
        <div
                v-show="visible"
                :class="{dialog__wrapper:wrapper}">
            <div
                    role="dialog"
                    :key="key"
                    ref="dialog"
                    :class="['dialog', {'is_fullScreen': isFullScreen,'dialog__center': center }, customClass]"
            >
                <div
                        class="dialog_head"
                        style="cursor: move;"
                        @mousedown="handPageDrag">
                    <slot name="title">
                        <span class="dialog_title">{{ title }}</span>
                    </slot>
                    <div class="dialog_header_group">
                        <button
                                type="button"
                                v-if="fullScreen"
                                @click="handleFullScreen"
                                aria-label="fullScreen"
                                class="dialog_header_btn">
                            <i :class="iconMaxClass"></i>
                        </button>
                        <button
                                type="button"
                                v-if="showClose"
                                @click="handleClose"
                                aria-label="Close"
                                class="dialog_header_btn">
                            <i class="m-icon-close"></i>
                        </button>

                    </div>

                </div>
                <div class="dialog_body dialog_content">
                    <slot></slot>
                </div>
                <div class="dialog_foote ">
            <span class="dialog-footer">
                 <slot name="footer"></slot>
            </span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Popup from '../../util/popup/index'
    import emitter from '../../mixins/emitter'

    export default {
        name: "m-dialog",
        //插槽
        mixins: [Popup, emitter],
        props: {
            title: {
                type: String,
                default: ''
            },
            appendToBody: {
                type: Boolean,
                default: false
            },
            showClose: {
                type: Boolean,
                default: true
            },
            //是否全屏
            fullScreen: {
                type: Boolean,
                default: false,
            },
            customClass: {
                type: String,
                default: ''
            },
            beforeClose: Function,
            center: {
                type: Boolean,
                default: true
            },
            destroyOnClose: Boolean
        },
        data() {
            return {
                wrapper: false,
                closed: false,
                isFullScreen: false,
                key: 0
            };
        },
        computed: {
            iconMaxClass() {
                return !this.isFullScreen ? "m-icon-maxus" : "m-icon-minus";
            }
        },
        watch: {
            // 是否可见
            visible(val) {
                if (val) {
                    this.closed = false;
                    this.$emit('open');
                    this.$el.addEventListener('scroll', this.updatePopper);
                    this.$nextTick(() => {
                        this.resetDialogPosition(true);
                        this.$refs.dialog.scrollTop = 0;
                    });
                    if (this.appendToBody) {
                        document.body.appendChild(this.$el);
                    }
                } else {
                    this.$el.removeEventListener('scroll', this.updatePopper);
                    if (!this.closed) this.$emit('close');
                    if (this.destroyOnClose) {
                        this.$nextTick(() => {
                            this.key++;
                        });
                    }
                }
            }
        },

        methods: {
            resetDialogPosition(flag) {
                let el = this.$refs.dialog;
                if (flag) {
                    el.style.left = (document.body.clientWidth - 10 - el.clientWidth) / 2 + "px";
                    el.style.top = (document.body.clientHeight - 70 - el.clientHeight) / 2 + "px";
                } else {
                    el.style.left = 0;
                    el.style.top = 0;
                }
            },
            handPageDrag(e) {
                let el = this.$refs.dialog;
                let X = e.clientX - el.offsetLeft;
                let Y = e.clientY - el.offsetTop;
                let _this = this;
                document.onmousemove = function (e) {
                    e.preventDefault();
                    if (!_this.isFullScreen) {
                        let l = e.clientX - X;
                        let t = e.clientY - Y;
                        el.style.left = l + "px";
                        el.style.top = t + "px";
                    }
                };
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            handleFullScreen() {
                this.isFullScreen = !this.isFullScreen;
                this.$nextTick(() => {
                    this.resetDialogPosition(!this.isFullScreen);
                })
            },
            handleClose() {
                if (typeof this.beforeClose === 'function') {
                    this.beforeClose(this.hide);
                } else {
                    this.hide();
                }
            },
            // 隐藏
            hide(cancel) {
                if (cancel !== false) {
                    this.$emit('update:visible', false);
                    this.$emit('close');
                    this.closed = true;
                }
            },
            // 通知接下来的弹窗要比目前这个z-index 更高
            updatePopper() {
                /*        this.broadcast('ElSelectDropdown', 'updatePopper');
                        this.broadcast('ElDropdownMenu', 'updatePopper');*/
            },
            afterEnter() {
                this.$emit('opened');
            },
            afterLeave() {
                this.$emit('closed');
            },
        },
        mounted() {
            this.resetDialogPosition(true)
        },
    }
</script>

