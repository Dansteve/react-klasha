import React, { useState, useEffect, createContext, forwardRef, useContext } from 'react';

var cachedScripts = [];
function useKlashaScript(isTestMode) {
    if (isTestMode === void 0) { isTestMode = false; }
    var src = '';
    if (isTestMode) {
        src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    }
    else {
        src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    }
    var src1 = '';
    if (isTestMode) {
        src1 = 'https://klastatic.fra1.digitaloceanspaces.com/test/js/klasha-integration.js';
    }
    else {
        src1 = 'https://klastatic.fra1.digitaloceanspaces.com/prod/js/klasha-integration.js';
    }
    var _a = useState({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        if (cachedScripts.includes(src) || cachedScripts.includes(src1)) {
            setState({
                loaded: true,
                error: false,
            });
        }
        else {
            var divScript = window.document.createElement('div');
            divScript.id = 'ktest';
            window.document.body.appendChild(divScript);
            cachedScripts.push(src);
            var script_1 = document.createElement('script');
            script_1.src = src;
            script_1.async = true;
            var script1_1 = document.createElement('script');
            script1_1.src = src1;
            script1_1.async = true;
            var onScriptLoad_1 = function () {
                setState({
                    loaded: true,
                    error: false,
                });
            };
            var onScriptError_1 = function () {
                var index = cachedScripts.indexOf(src);
                if (index >= 0)
                    cachedScripts.splice(index, 1);
                script_1.remove();
                var index1 = cachedScripts.indexOf(src1);
                if (index1 >= 0)
                    cachedScripts.splice(index1, 1);
                script1_1.remove();
                setState({
                    loaded: true,
                    error: true,
                });
            };
            script_1.addEventListener('load', onScriptLoad_1);
            script_1.addEventListener('complete', onScriptLoad_1);
            script_1.addEventListener('error', onScriptError_1);
            script1_1.addEventListener('load', onScriptLoad_1);
            script1_1.addEventListener('complete', onScriptLoad_1);
            script1_1.addEventListener('error', onScriptError_1);
            document.body.appendChild(script_1);
            document.body.appendChild(script1_1);
            console.log(document, window, divScript, script_1, script1_1);
            return function () {
                script_1.removeEventListener('load', onScriptLoad_1);
                script_1.removeEventListener('error', onScriptError_1);
                script1_1.removeEventListener('load', onScriptLoad_1);
                script1_1.removeEventListener('error', onScriptError_1);
            };
        }
    }, [src]);
    return [state.loaded, state.error];
}

var callKlashaClient = function (klashaArgs) {
    console.log('callKlashaClient', klashaArgs);
    //@ts-ignore
    // const handler = window.KlashaSDK && window.KlashaSDK.initialize(klashaArgs);
    var handler = new window.KlashaClient(klashaArgs.merchantKey, klashaArgs.businessId || 1, klashaArgs.amount, 'ktest', klashaArgs.callbackUrl, klashaArgs.destinationCurrency, klashaArgs.sourceCurrency, klashaArgs.kit);
    handler.init();
    console.log('handler', window);
    // handler && handler.loadIframe(klashaArgs);
};

function useKlashaPayment(options) {
    var _a = useKlashaScript(options.isTestMode), scriptLoaded = _a[0], scriptError = _a[1];
    var isTestMode = options.isTestMode, merchantKey = options.merchantKey, businessId = options.businessId, amount = options.amount, tx_ref = options.tx_ref, sourceCurrency = options.sourceCurrency, destinationCurrency = options.destinationCurrency, fullname = options.fullname, email = options.email, phone_number = options.phone_number, paymentDescription = options.paymentDescription, callbackUrl = options.callbackUrl, metadata = options.metadata, kit = options.kit;
    function clean(obj) {
        // tslint:disable-next-line:prefer-const
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return obj;
    }
    function initializePayment(callBack) {
        if (scriptError) {
            throw new Error('Unable to load klasha inline script');
        }
        if (scriptLoaded) {
            var klashaArgs = {
                callBack: callBack ? callBack : function () { return null; },
                isTestMode: isTestMode,
                merchantKey: merchantKey,
                businessId: businessId,
                amount: amount,
                tx_ref: tx_ref,
                destinationCurrency: destinationCurrency || 'NGN',
                sourceCurrency: sourceCurrency || 'NGN',
                fullname: fullname || '',
                email: email || '',
                phone_number: phone_number || '',
                paymentDescription: paymentDescription || '',
                callbackUrl: callbackUrl || '',
                metadata: metadata || {},
                kit: kit || null,
                'data-custom-button': options['data-custom-button'] || '',
            };
            callKlashaClient(clean(klashaArgs));
        }
    }
    useEffect(function () {
        if (scriptError) {
            throw new Error('Unable to load klasha inline script');
        }
    }, [scriptError]);
    return initializePayment;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var KlashaButton = function (_a) {
    var text = _a.text, className = _a.className, children = _a.children, callBack = _a.callBack, others = __rest(_a, ["text", "className", "children", "callBack"]);
    var initializePayment = useKlashaPayment(others);
    return (React.createElement("button", { className: className, onClick: function () { return initializePayment(callBack); } }, text || children));
};

var KlashaContext = createContext({
    initializePayment: function () { return null; },
    callBack: function () { return null; },
});

var KlashaProvider = function (_a) {
    var children = _a.children, callBack = _a.callBack, others = __rest(_a, ["children", "callBack"]);
    var initializePayment = useKlashaPayment(others);
    return (React.createElement(KlashaContext.Provider, { value: { initializePayment: initializePayment, callBack: callBack } }, children));
};

var KlashaConsumerChild = function (_a) {
    var children = _a.children, ref = _a.ref;
    var _b = useContext(KlashaContext), initializePayment = _b.initializePayment, callBack = _b.callBack;
    var completeInitializePayment = function () { return initializePayment(callBack); };
    return children({ initializePayment: completeInitializePayment, ref: ref });
};
var KlashaConsumer = forwardRef(function (_a, ref) {
    var children = _a.children, paraSuccess = _a.callBack, others = __rest(_a, ["children", "callBack"]);
    var callBack = paraSuccess ? paraSuccess : function () { return null; };
    return (React.createElement(KlashaProvider, __assign({}, others, { callBack: callBack }),
        React.createElement(KlashaConsumerChild, { ref: ref }, children)));
});

export { KlashaButton, KlashaConsumer, useKlashaPayment };
//# sourceMappingURL=index.es.js.map
