import _ from 'underscore';
import React from 'react';

const composerRef = React.createRef();
let focusCallback = null;
let focusMainComposerCallback = null;

function init(callback) {
    focusCallback = callback;
    focusMainComposerCallback = callback;
}

/**
 * Register a callback to be called when focus is requested.
 * Typical uses of this would be call the focus on the ReportActionComposer.
 *
 * @param {Function} callback callback to register
 */
function onComposerFocus(callback) {
    focusCallback = callback;
}

function onMainComposerFocus(callback) {
    focusMainComposerCallback = callback;
}

function focusMainComposer() {
    if (!_.isFunction(focusMainComposerCallback)) {
        return;
    }
    focusCallback = focusMainComposerCallback;
    focusMainComposerCallback();
}

/**
 * Request focus on the ReportActionComposer
 *
 */
function focus() {
    if (!_.isFunction(focusCallback)) {
        return;
    }

    focusCallback();
}

/**
 * Clear the registered focus callback
 *
 */
function clear() {
    focusCallback = null;
}

/**
 * Exposes the current focus state of the report action composer.
 * @return {Boolean} isFocused
 */
function isFocused() {
    return composerRef.current && composerRef.current.isFocused();
}

export default {
    init,
    composerRef,
    onComposerFocus,
    onMainComposerFocus,
    focus,
    focusMainComposer,
    clear,
    isFocused,
};
