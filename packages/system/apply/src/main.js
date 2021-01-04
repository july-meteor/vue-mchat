import Vue from 'vue';
import appBoxVue from './main.vue';

import merge from '../../../util/merge';
import { isVNode } from '../../../util/vdom';

const defaults = {
    uid: 1,
    title: undefined,
    // 最小化
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
    focusAfterClosed: null,
    distinguishCancelAndClose: false,
    closeOnClickModal: true,
};



const AppBoxConstructor = Vue.extend(appBoxVue);

let currentMsg, instance;
let msgQueue = [];

const defaultCallback = action => {
    if (currentMsg) {
        let callback = currentMsg.callback;
        if (typeof callback === 'function') {
            if (instance.showInput) {
                currentMsg.resolve({ value: instance.inputValue, selected: instance.selected , action });
            } else {
                callback(action);
            }
        }
        if (currentMsg.resolve) {
            if (action === 'confirm') {
                if (instance.showInput) {
                    currentMsg.resolve({ value: instance.inputValue, selected: instance.selected , action });
                } else {
                    currentMsg.resolve(action);
                }
            } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {

                currentMsg.reject(action);
            }
        }
    }
};

const initInstance = () => {
    instance = new AppBoxConstructor({
        el: document.createElement('div')
    });
    instance.callback = defaultCallback;
};

const showNextMsg = () => {
    if (!instance) {
        initInstance();
    }
    instance.action = '';

    if (!instance.visible || instance.closeTimer) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();
            let options = currentMsg.options;
            for (let prop in options) {
                if (options.hasOwnProperty(prop)) {
                    instance[prop] = options[prop];
                }
            }
            if (options.callback === undefined) {
                instance.callback = defaultCallback;
            }
            let oldCb = instance.callback;
            instance.callback = (action, instance) => {
                oldCb(action, instance);
                showNextMsg();
            };

            ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
                if (instance[prop] === undefined) {
                    instance[prop] = true;
                }
            });
            document.body.appendChild(instance.$el);

            Vue.nextTick(() => {
                instance.visible = true;
            });
        }
    }
};

const AppBox = function(options, callback) {
    if (Vue.prototype.$isServer) return;
    if (options.callback && !callback) {
        callback = options.callback;
    }
    if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => { // eslint-disable-line
            msgQueue.push({
                options: merge({}, defaults, AppBox.defaults, options),
                callback: callback,
                resolve: resolve,
                reject: reject
            });
            showNextMsg();
        });
    } else {
        msgQueue.push({
            options: merge({}, defaults, AppBox.defaults, options),
            callback: callback
        });
        showNextMsg();
    }
};




AppBox.setDefaults = defaults => {
    AppBox.defaults = defaults;
};


/**
 *  申请加好友
 * @param title
 * @param options
 */
AppBox.applyFriend = ( title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return AppBox(merge({
        title: title,
        type: 'applyFriend',
        cancelButtonText:'取消',
        confirmButtonText:'确认',
        showCancelButton:true,
        showInput:true,
        selectedPlaceholder:'请选择分组',
        closeOnPressEscape: false,
        closeOnClickModal: false
    }, options));
};

/**
 *  申请加群组
 * @param title
 * @param options
 */
AppBox.applyGroup = ( title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return AppBox(merge({
        title: title,
        type: 'applyGroup',
        cancelButtonText:'取消',
        confirmButtonText:'确认',
        showCancelButton:true,
        showInput:true,
        closeOnPressEscape: false,
        closeOnClickModal: false
    }, options));
};

/**
 *  确认是否添加好友
 * @param title
 * @param options
 */
AppBox.confirmFriend = ( title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return AppBox(merge({
        title: title,
        type: 'confirmFriend',
        cancelButtonText:'取消',
        confirmButtonText:'确认',
        showCancelButton:true,
        showInput:true,
        inputPlaceholder:'请选择分组',
        closeOnPressEscape: false,
        closeOnClickModal: false
    }, options));
};

AppBox.confirmGroup = ( title, options) => {
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }
    return AppBox(merge({
        title: title,
        type: 'confirmGroup',
        cancelButtonText:'取消',
        confirmButtonText:'确认',
        showCancelButton:true,
        closeOnPressEscape: false,
        closeOnClickModal: false
    }, options));
};



// 强制关闭
AppBox.close = () => {
    instance.doClose();
    instance.visible = false;
    msgQueue = [];
    currentMsg = null;
};


export default AppBox;
export { AppBox };
