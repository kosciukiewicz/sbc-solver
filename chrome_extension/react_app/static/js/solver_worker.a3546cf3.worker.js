/*! For license information please see solver_worker.a3546cf3.worker.js.LICENSE.txt */
!function(){"use strict";var t={564:function(t,n,e){function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(){o=function(){return t};var t={},n=Object.prototype,e=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function f(t,n,e){return Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{f({},"")}catch(k){f=function(t,n,e){return t[n]=e}}function s(t,n,e,r){var o=n&&n.prototype instanceof b?n:b,i=Object.create(o.prototype),a=new O(r||[]);return i._invoke=function(t,n,e){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return j()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var u=x(a,e);if(u){if(u===d)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===r)throw r="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r="executing";var c=l(t,n,e);if("normal"===c.type){if(r=e.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(r="completed",e.method="throw",e.arg=c.arg)}}}(t,e,a),i}function l(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(k){return{type:"throw",arg:k}}}t.wrap=s;var d={};function b(){}function h(){}function _(){}var g={};f(g,a,(function(){return this}));var p=Object.getPrototypeOf,w=p&&p(p(S([])));w&&w!==n&&e.call(w,a)&&(g=w);var y=_.prototype=b.prototype=Object.create(g);function v(t){["next","throw","return"].forEach((function(n){f(t,n,(function(t){return this._invoke(n,t)}))}))}function m(t,n){function o(i,a,u,c){var f=l(t[i],t,a);if("throw"!==f.type){var s=f.arg,d=s.value;return d&&"object"==r(d)&&e.call(d,"__await")?n.resolve(d.__await).then((function(t){o("next",t,u,c)}),(function(t){o("throw",t,u,c)})):n.resolve(d).then((function(t){s.value=t,u(s)}),(function(t){return o("throw",t,u,c)}))}c(f.arg)}var i;this._invoke=function(t,e){function r(){return new n((function(n,r){o(t,e,n,r)}))}return i=i?i.then(r,r):r()}}function x(t,n){var e=t.iterator[n.method];if(void 0===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=void 0,x(t,n),"throw"===n.method))return d;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var r=l(e,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,d;var o=r.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),n.delegate=null,d):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,d)}function L(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function E(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function S(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function n(){for(;++r<t.length;)if(e.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=void 0,n.done=!0,n};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return h.prototype=_,f(y,"constructor",_),f(_,"constructor",h),h.displayName=f(_,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===h||"GeneratorFunction"===(n.displayName||n.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,f(t,c,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},v(m.prototype),f(m.prototype,u,(function(){return this})),t.AsyncIterator=m,t.async=function(n,e,r,o,i){void 0===i&&(i=Promise);var a=new m(s(n,e,r,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},v(y),f(y,c,"Generator"),f(y,a,(function(){return this})),f(y,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=S,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var n in this)"t"===n.charAt(0)&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(e,r){return a.type="throw",a.arg=t,n.next=e,r&&(n.method="next",n.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=e.call(i,"catchLoc"),c=e.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=n,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),d},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),E(e),d}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;E(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:S(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=void 0),d}},t}function i(t,n,e,r,o,i,a){try{var u=t[i](a),c=u.value}catch(f){return void e(f)}u.done?n(c):Promise.resolve(c).then(r,o)}function a(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var a=t.apply(n,e);function u(t){i(a,r,o,u,c,"next",t)}function c(t){i(a,r,o,u,c,"throw",t)}u(void 0)}))}}var u;e.d(n,{ZP:function(){return T},Vu:function(){return L}}),t=e.hmd(t);var c=new Array(32).fill(void 0);function f(t){return c[t]}c.push(void 0,null,!0,!1);var s=c.length;function l(t){var n=f(t);return function(t){t<36||(c[t]=s,s=t)}(t),n}function d(t){s===c.length&&c.push(c.length+1);var n=s;return s=c[n],c[n]=t,n}var b,h=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});function _(){return 0===b.byteLength&&(b=new Uint8Array(u.memory.buffer)),b}function g(t,n){return h.decode(_().subarray(t,t+n))}h.decode();var p,w=0,y=new TextEncoder("utf-8"),v="function"===typeof y.encodeInto?function(t,n){return y.encodeInto(t,n)}:function(t,n){var e=y.encode(t);return n.set(e),{read:t.length,written:e.length}};function m(t,n,e){if(void 0===e){var r=y.encode(t),o=n(r.length);return _().subarray(o,o+r.length).set(r),w=r.length,o}for(var i=t.length,a=n(i),u=_(),c=0;c<i;c++){var f=t.charCodeAt(c);if(f>127)break;u[a+c]=f}if(c!==i){0!==c&&(t=t.slice(c)),a=e(a,i,i=c+3*t.length);var s=_().subarray(a+c,a+i);c+=v(t,s).written}return w=c,a}function x(){return 0===p.byteLength&&(p=new Int32Array(u.memory.buffer)),p}function L(t,n,e){try{var r=u.__wbindgen_add_to_stack_pointer(-16),o=m(t,u.__wbindgen_malloc,u.__wbindgen_realloc),i=w,a=m(n,u.__wbindgen_malloc,u.__wbindgen_realloc),c=w,f=m(e,u.__wbindgen_malloc,u.__wbindgen_realloc),s=w;u.run_optimization(r,o,i,a,c,f,s);var l=x()[r/4+0],d=x()[r/4+1];return g(l,d)}finally{u.__wbindgen_add_to_stack_pointer(16),u.__wbindgen_free(l,d)}}function E(t,n){try{return t.apply(this,n)}catch(e){u.__wbindgen_exn_store(d(e))}}function O(t,n){return _().subarray(t/1,t/1+n)}function S(t,n){return j.apply(this,arguments)}function j(){return j=a(o().mark((function t(n,e){var r,i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!("function"===typeof Response&&n instanceof Response)){t.next=23;break}if("function"!==typeof WebAssembly.instantiateStreaming){t.next=15;break}return t.prev=2,t.next=5,WebAssembly.instantiateStreaming(n,e);case 5:case 20:return t.abrupt("return",t.sent);case 8:if(t.prev=8,t.t0=t.catch(2),"application/wasm"==n.headers.get("Content-Type")){t.next=14;break}console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t.t0),t.next=15;break;case 14:throw t.t0;case 15:return t.next=17,n.arrayBuffer();case 17:return r=t.sent,t.next=20,WebAssembly.instantiate(r,e);case 23:return t.next=25,WebAssembly.instantiate(n,e);case 25:if(!((i=t.sent)instanceof WebAssembly.Instance)){t.next=30;break}return t.abrupt("return",{instance:i,module:n});case 30:return t.abrupt("return",i);case 31:case"end":return t.stop()}}),t,null,[[2,8]])}))),j.apply(this,arguments)}function k(){var n={wbg:{}};return n.wbg.__wbg_process_e56fd54cf6319b6c=function(t){return d(f(t).process)},n.wbg.__wbindgen_is_object=function(t){var n=f(t);return"object"===typeof n&&null!==n},n.wbg.__wbg_versions_77e21455908dad33=function(t){return d(f(t).versions)},n.wbg.__wbg_node_0dd25d832e4785d5=function(t){return d(f(t).node)},n.wbg.__wbindgen_is_string=function(t){return"string"===typeof f(t)},n.wbg.__wbindgen_object_drop_ref=function(t){l(t)},n.wbg.__wbg_crypto_b95d7173266618a9=function(t){return d(f(t).crypto)},n.wbg.__wbg_msCrypto_5a86d77a66230f81=function(t){return d(f(t).msCrypto)},n.wbg.__wbg_static_accessor_NODE_MODULE_26b231378c1be7dd=function(){return d(t)},n.wbg.__wbg_require_0db1598d9ccecb30=function(){return E((function(t,n,e){return d(f(t).require(g(n,e)))}),arguments)},n.wbg.__wbg_randomFillSync_91e2b39becca6147=function(){return E((function(t,n,e){f(t).randomFillSync(O(n,e))}),arguments)},n.wbg.__wbg_getRandomValues_b14734aa289bc356=function(){return E((function(t,n){f(t).getRandomValues(f(n))}),arguments)},n.wbg.__wbg_newnoargs_e23b458e372830de=function(t,n){return d(new Function(g(t,n)))},n.wbg.__wbg_call_ae78342adc33730a=function(){return E((function(t,n){return d(f(t).call(f(n)))}),arguments)},n.wbg.__wbindgen_object_clone_ref=function(t){return d(f(t))},n.wbg.__wbg_self_99737b4dcdf6f0d8=function(){return E((function(){return d(self.self)}),arguments)},n.wbg.__wbg_window_9b61fbbf3564c4fb=function(){return E((function(){return d(window.window)}),arguments)},n.wbg.__wbg_globalThis_8e275ef40caea3a3=function(){return E((function(){return d(globalThis.globalThis)}),arguments)},n.wbg.__wbg_global_5de1e0f82bddcd27=function(){return E((function(){return d(e.g.global)}),arguments)},n.wbg.__wbindgen_is_undefined=function(t){return void 0===f(t)},n.wbg.__wbg_now_04bcd3bf9fb6165e=function(){return Date.now()},n.wbg.__wbg_buffer_7af23f65f6c64548=function(t){return d(f(t).buffer)},n.wbg.__wbg_new_cc9018bd6f283b6f=function(t){return d(new Uint8Array(f(t)))},n.wbg.__wbg_set_f25e869e4565d2a2=function(t,n,e){f(t).set(f(n),e>>>0)},n.wbg.__wbg_length_0acb1cf9bbaf8519=function(t){return f(t).length},n.wbg.__wbg_newwithlength_8f0657faca9f1422=function(t){return d(new Uint8Array(t>>>0))},n.wbg.__wbg_subarray_da527dbd24eafb6b=function(t,n,e){return d(f(t).subarray(n>>>0,e>>>0))},n.wbg.__wbindgen_throw=function(t,n){throw new Error(g(t,n))},n.wbg.__wbindgen_memory=function(){return d(u.memory)},n}function A(t,n){return u=t.exports,P.__wbindgen_wasm_module=n,p=new Int32Array(u.memory.buffer),b=new Uint8Array(u.memory.buffer),u}function P(t){return N.apply(this,arguments)}function N(){return N=a(o().mark((function t(n){var r,i,a,u;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"undefined"===typeof n&&(n=new URL(e(582),e.b)),r=k(),("string"===typeof n||"function"===typeof Request&&n instanceof Request||"function"===typeof URL&&n instanceof URL)&&(n=fetch(n)),t.t0=S,t.next=7,n;case 7:return t.t1=t.sent,t.t2=r,t.next=11,(0,t.t0)(t.t1,t.t2);case 11:return i=t.sent,a=i.instance,u=i.module,t.abrupt("return",A(a,u));case 15:case"end":return t.stop()}}),t)}))),N.apply(this,arguments)}var T=P},582:function(t,n,e){t.exports=e.p+"static/media/sbc_optimization_engine_bg.5b35fbd9ead7097f7d54.wasm"}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,loaded:!1,exports:{}};return t[r](i,i.exports,e),i.loaded=!0,i.exports}e.m=t,e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}(),e.hmd=function(t){return(t=Object.create(t)).children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/",e.b=self.location+"/../../../",function(){var t=e(564),n=self;n.addEventListener("message",(function(e){var r=e.data,o=r.challenge,i=r.clubPlayerCards,a=r.solverConfig;console.log(a),(0,t.ZP)().then((function(){var e=JSON.parse((0,t.Vu)(JSON.stringify(o),JSON.stringify(i),JSON.stringify(a))),r={clubPlayerCards:i,challenge:o,solutions:e.map((function(t){return t.invalid_requirements_count=t.requirements.reduce((function(t,n){return n.is_implemented&&n.is_valid||(t+=1),t}),0),t}))};console.log(r),n.postMessage({solverResult:r})}))}),!1)}()}();
//# sourceMappingURL=solver_worker.a3546cf3.worker.js.map