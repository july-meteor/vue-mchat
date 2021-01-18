<template >
    <transition
            name="dialog-fade">
        <div
                v-show="visible"
                tabindex="-1"
                class="dialog__wrapper"
                role="dialog"
                @click.self="handleWrapperClick"
                :aria-label="title || 'applyBox'">
            <div
                    ref="dialog"
                    class="dialog"  >
                <div
                        class="dialog_head"
                        style="cursor: move;"
                        @mousedown="handPageDrag"
                       >

                        <span class="dialog_title">{{ title }}</span>

                    <div class="dialog_header_group">
                        <button
                                type="button"
                                v-if="shrink"
                                @click="handleShrink"
                                aria-label="shrink"
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
                <div class="dialog_body dialog_content" v-show="isShrink">

                    <div class="apply-friend-box">
                        <div class="apply-img">
                            <img  :src="info.avatar">
                            <p>{{info.name}}</p>
                        </div>

                        <div class="apply-remark"  v-show="type=='applyFriend'">
                            <span>请选择分组</span>
                            <select   v-model="selected" :placeholder="selectedPlaceholder">
                                <option v-for="(item,k)  in  info.options" :value="item.value">
                                    {{item.label}}
                                </option>
                            </select>

                            <span>请输入验证信息:</span>
                            <textarea
                                    v-model="inputValue"
                                    @keydown.enter="handleInputEnter"
                                    :placeholder="inputPlaceholder"
                                    ref="input"
                            ></textarea>
                        </div>

                        <div class="apply-remark"  v-show="type=='applyGroup'">
                            <span>请输入验证信息:</span>
                            <textarea
                                    v-model="inputValue"
                                    @keydown.enter="handleInputEnter"
                                    :placeholder="inputPlaceholder"
                                    ref="input"
                            ></textarea>
                        </div>

                        <div class="accept-box"  v-show="type=='confirmGroup'">
                                <span>附言消息</span>
                                <p>您好！</p>
                        </div>

                        <div class="accept-box"  v-show="type=='confirmFriend'">
                            <span>请选择分组</span>
                            <select   v-model="selected" :placeholder="selectedPlaceholder">
                                <option v-for="(item,k)  in  info.options" :value="item.value"  >
                                    {{item.label}}
                                </option>
                            </select>
                            <span>附言消息</span>
                            <p>您好！</p>
                        </div>
                    </div>

                </div>
                <div class="dialog_foote " v-show="isShrink">
            <span class="dialog-footer">

                        <button
                                type="button"
                                v-if="showCancelButton"
                                @click="handleClose"
                                aria-label="Close"
                                class="m-button"
                                @keydown.enter="handleAction('cancel')"
                        >{{cancelButtonText}}
                        </button>

                    <button
                            loading="true"
                            ref="confirm"
                            v-show="showConfirmButton"
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
    import {layerPosition,layerDrag} from '../../../util/layer'
    import { addClass, removeClass } from '../../../util/dom'




    let applyBox;


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
            // 圆角按钮
            roundButton: {
                default: false,
                type: Boolean
            }
        },


        computed: {
            iconMaxClass() {
                return !this.isShrink ? "m-icon-maxus" : "m-icon-minus";
            }
        },

        methods: {
            resetDialogPosition(flag) {
                let el = this.$refs.dialog;
                if (flag) {
                    layerPosition(el,"center")
                } else {
                    layerPosition(el,"lt")
                }
            },
            handPageDrag(e) {
                let el = this.$refs.dialog;
                layerDrag(e,el);
            },
            handleShrink() {
                this.isShrink = !this.isShrink;
                this.$nextTick(() => {
                    this.resetDialogPosition(this.isShrink);
                })
            },
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
                applyBox.closeDialog(); // 解绑
                if (this.lockScroll) {
                    setTimeout(this.restoreBodyStyle, 200);
                }
                this.opened = false;
                this.doAfterClose();
                setTimeout(() => {
                    if (this.action) this.callback(this.action, this);
                });
            },
            // 点击wrap  就关掉
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
            // 类型判断
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
            // 验证数据
            validate() {

                if (this.$type === 'addFriend') {
                    // 正则验证
                    const inputPattern = this.inputPattern;
                    if (inputPattern && !inputPattern.test(this.inputValue || '')) {
                        this.editorErrorMessage = this.inputErrorMessage ;
                        addClass(this.getInputElement(), 'invalid');
                        return false;
                    }
                    // 回调方法验证
                    const inputValidator = this.inputValidator;
                    if (typeof inputValidator === 'function') {
                        const validateResult = inputValidator(this.inputValue);
                        if (validateResult === false) {
                            this.editorErrorMessage = this.inputErrorMessage ;
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
            // 获取初始焦点
            getFirstFocus() {
                const btn = this.$el.querySelector('.dialog .m-button');
                const title = this.$el.querySelector('.dialog .dialog_title');
                return btn || title;
            },
            //
            getInputElement() {
                const inputRefs = this.$refs.input;
                return inputRefs.input || inputRefs.textarea;
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
                        if (this.$ype === 'prompt' && val !== null) {
                            this.validate();
                        }
                    });
                }
            },

            visible(val) {
                if (val) {
                    this.uid++;
                    if (this.type === 'confirmGroup' || this.type === 'confirmFriend') {
                        this.$nextTick(() => {
                            // 获取焦点
                            this.$refs.confirm.focus();
                        });
                        if (this.info.options.length>0){
                            this.selected = this.info.options[0].value
                        }

                    }
                    this.focusAfterClosed = document.activeElement;

                    applyBox = new Dialog(this.$el, this.focusAfterClosed, this.getFirstFocus());
                }

                // prompt
                if (this.type !== 'applyGroup'|| this.type !== 'applyFriend') return;
                if (val) {
                    setTimeout(() => {
                        if (this.$refs.input && this.$refs.input.$el) {
                            this.getInputElement().focus();
                        }
                    }, 500);
                    if (this.info.options.length>0){
                        this.selected = this.info.options[0].value
                    }
                } else {
                    // this.editorErrorMessage = '';
                    // removeClass(this.getInputElement(), 'invalid');
                }
            }
        },

        mounted() {
            this.$nextTick(() => {
                if (this.closeOnHashChange) {
                    window.addEventListener('hashchange', this.close);
                }
                //延迟下
                setTimeout(()=>{
                    this.resetDialogPosition(true)
                },100)
            });
        },

        beforeDestroy() {
            if (this.closeOnHashChange) {
                window.removeEventListener('hashchange', this.close);
            }
            setTimeout(() => {
                applyBox.closeDialog();
            });
        },

        data() {
            return {
                uid: 1,
                title: undefined,
                info:{
                    avatar:'https://tva1.sinaimg.cn/crop.0.0.720.720.180/005JKVuPjw8ers4osyzhaj30k00k075e.jpg',
                    name:'未知用户',
                    options:[
                        {
                            label:"分组1",
                            key:'',
                            value:'xxx'
                        }
                    ],
                },
                shrink:true,
                // 最小化
                isShrink:true,
                type: '',
                showInput:false,
                inputValue: null,
                inputType: 'text',
                inputPattern: null,
                inputValidator: null,
                inputErrorMessage: '',
                inputPlaceholder:'',
                selected:null,
                selectedPlaceholder:'',
                action: '',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: '',
                cancelButtonText: '',
                editorErrorMessage: null,
                callback: null,
                focusAfterClosed: null,
                distinguishCancelAndClose: false
            };
        }
    };
</script>



