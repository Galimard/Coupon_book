!function(t,e){var i={};"function"==typeof i&&i.amd?i([],e):"object"==typeof exports&&"object"==typeof module?module.exports=e():"object"==typeof exports?exports.FormValidator=e():t.FormValidator=e()}(this,function(){var t=new RegExp("^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[/?#]\\S*)?$","i");function e(t,e){this.data={},this.DOM={scope:e},this.settings=this.extend({},this.defaults,t||{}),this.texts=this.extend({},this.texts,this.settings.texts||{}),this.settings.events&&this.events()}return e.prototype={texts:{invalid:"input is not as expected",short:"input is too short",long:"input is too long",checked:"must be checked",empty:"please put something here",select:"Please select an option",number_min:"too low",number_max:"too high",url:"invalid URL",number:"not a number",email:"email address is invalid",email_repeat:"emails do not match",date:"invalid date",time:"invalid time",password_repeat:"passwords do not match",no_match:"no match",complete:"input is not complete"},defaults:{alerts:!0,events:!1,regex:{url:t,phone:/^\+?([0-9]|[-|' '])+$/i,numeric:/^[0-9]+$/i,alphanumeric:/^[a-zA-Z0-9]+$/i,time:/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,email:{illegalChars:/[\(\)\<\>\,\;\:\\\/\"\[\]]/,filter:/^.+@.+\..{2,24}$/}},classes:{item:"field",alert:"alert",bad:"bad"},commonError:!1},tests:{sameAsPlaceholder:function(t,e){return!t.getAttribute("placeholder")||(e.value!=t.getAttribute("placeholder")||this.texts.empty)},hasValue:function(t){var e=t.invaildtext||this.texts.empty;return!!t.value||e},linked:function(t,e,i){return e==t||(this.texts[i+"_repeat"]||this.texts.no_match)},email:function(t,e){var i=e.value.trim().split(" ");if(!t.multiple&&1<i.length)return this.texts.email;for(var a=0;a<i.length;a++)if(!this.settings.regex.email.filter.test(i[a])||i[a].match(this.settings.regex.email.illegalChars))return this.texts.email;return!0},text:function(e,t){var i,a=this;if(t.validateWords)return!((i=t.value.split(" ")).length<t.validateWords||!function(t){for(var e=i.length;e--;)if(i[e].length<t)return a.texts.short;return!0}(2))||this.texts.complete;if(t.lengthRange&&t.value.length<t.lengthRange[0])return this.texts.short;if(t.lengthRange&&t.lengthRange[1]&&t.value.length>t.lengthRange[1])return this.texts.long;if(t.lengthLimit&&t.lengthLimit.length){for(;t.lengthLimit.length;)if(t.lengthLimit.pop()==t.value.length)return!0;return this.texts.complete}if(t.pattern){var n=(n=this.settings.regex[t.pattern])||t.pattern;try{var s=new RegExp(n).test(t.value);if(t.value&&!s)return t.invaildtext||this.texts[e.name]||this.texts.invalid}catch(t){return console.warn(t,e,"regex is invalid"),this.texts.invalid}}return!0},number:function(t,e){var i=e.value;return isNaN(parseFloat(i))&&!isFinite(i)?this.texts.number:e.lengthRange&&i.length<e.lengthRange[0]?this.texts.short:e.lengthRange&&e.lengthRange[1]&&i.length>e.lengthRange[1]?this.texts.long:e.minmax[0]&&(0|i)<e.minmax[0]?this.texts.number_min:!(e.minmax[1]&&(0|i)>e.minmax[1])||this.texts.number_max},date:function(t,e){var i,a,n=e.value.split(/[-./]/g);if(t.valueAsNumber)return!0;for(a=n.length;a--;)if(isNaN(parseFloat(e.value))&&!isFinite(e.value))return this.texts.date;try{return(i=new Date(n[2],n[1]-1,n[0])).getMonth()+1==n[1]&&i.getDate()==n[0]?!0:this.texts.date}catch(t){return this.texts.date}},time:function(t,e){return!!this.settings.regex.time.test(e.value)||this.texts.time},tel:function(t,e){const i=this.settings.regex.tel;for(var a=e.value.trim(),e=e.invaildtext||this.texts.empty,n=0;n<a.length;n++)if(i.test(a[n]))return this.texts.phone;return!i.test(a)||e},url:function(t,e){return!!this.settings.regex.url.test(e.value)||this.texts.url},hidden:function(t,e){return e.lengthRange&&e.value.length<e.lengthRange[0]?this.texts.short:!(e.pattern&&"alphanumeric"==e.pattern&&!this.settings.regex.alphanumeric.test(e.value))||this.texts.invalid},select:function(t,e){var i=e.invaildtext||this.texts.select;return!!e.value||i},checkbox:function(t,e){return!!t.checked||(e.invaildtext||this.texts.checked)}},events:function(t,e){var i=this;function a(t){e.addEventListener(t,function(t){setTimeout(i.checkField.bind(i),0,t.target)},!0)}t=t||this.settings.events,(e=e||this.DOM.scope)&&t&&(t instanceof Array?t.forEach(a):"string"==typeof t&&a(t))},mark:function(t,e){if(!e||!t)return!1;var i,a=this,n=this.closest(t,"."+this.settings.classes.item)||t,t=n.querySelector("."+this.settings.classes.alert);return this.settings.alerts&&(t?t.innerHTML=e:(i='<div class="'+this.settings.classes.alert+'">'+e+"</div>",n.insertAdjacentHTML("beforeend",i))),n.classList.remove(this.settings.classes.bad),setTimeout(function(){n.classList.add(a.settings.classes.bad)}),i},unmark:function(t){var e;if(!t)return console.warn('no "field" argument, null or DOM object not found'),!1;t=this.closest(t,"."+this.settings.classes.item);t&&(e=t.querySelector("."+this.settings.classes.alert),t.classList.remove(this.settings.classes.bad)),e&&e.parentNode.removeChild(e)},reset:function(t){var e=this;t=t||this.DOM.scope,this.filterFormElements(t.elements).forEach(function(t){e.unmark(t)})},testByType:function(t,e){var i=(e=this.extend({},e)).type;return"tel"==i&&(e.pattern=e.pattern||"phone"),!this.tests[i=i&&"password"!=i&&"search"!=i&&"file"!=i?i:"text"]||this.tests[i].call(this,t,e)},prepareFieldData:function(t){var e=t.nodeName.toLowerCase(),i=Math.random().toString(36).substr(2,9);return t._validatorId=i,this.data[i]={},this.data[i].value=t.value.replace(/^\s+|\s+$/g,""),this.data[i].valid=!0,this.data[i].type=t.type,this.data[i].pattern=t.pattern,"select"===e?this.data[i].type="select":"textarea"===e&&(this.data[i].type="text"),this.data[i].validateWords=t.getAttribute("data-validate-words")||0,this.data[i].lengthRange=t.getAttribute("data-validate-length-range")?(t.getAttribute("data-validate-length-range")+"").split(","):[1],this.data[i].lengthLimit=!!t.getAttribute("data-validate-length")&&(t.getAttribute("data-validate-length")+"").split(","),this.data[i].minmax=!!t.getAttribute("data-validate-minmax")&&(t.getAttribute("data-validate-minmax")+"").split(","),this.data[i].validateLinked=t.getAttribute("data-validate-linked"),this.data[i].invaildtext=t.getAttribute("data-validate-text-invalid"),this.data[i]},closest:function(t,e){var i;for(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(t){return"function"==typeof document.body[t]&&(i=t,!0)});t;){if(t&&t[i](e))return t;t=t.parentElement}return null},extend:function(t,e){if(!t)throw new TypeError("Cannot convert undefined or null to object");for(var i,a,n=Object(t),s=1;s<arguments.length;s++)if(null!=(a=arguments[s]))for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(n[i]=a[i]);return n},checkField:function(t,e){if("hidden"!=t.type&&!t.clientWidth)return{valid:!0,error:""};if(!(t=this.filterFormElements([t])[0]))return{valid:!0,error:""};var i=-1!=t.className.indexOf("optional"),a=this.prepareFieldData(t),n=this.closest(t,"form"),s=this.tests.hasValue.call(this,a);return a.valid=i||!0===s,i&&!a.value?{valid:!0,error:""}:(!0!==s&&(a.valid=!1),a.valid&&(s=this.testByType(t,a),a.valid=!0===s),a.valid&&a.validateLinked&&(i=0==a.validateLinked.indexOf("#")?document.body.querySelector(a.validateLinked):(n.length?n:document.body).querySelector("[name="+a.validateLinked+"]"),s=this.tests.linked.call(this,t.value,i.value,a.type),a.valid=!0===s),e||this[a.valid?"unmark":"mark"](t,s),{valid:a.valid,error:!0===a.valid?"":s})},filterFormElements:function(t){for(var e=[],i=t.length;i--;){var a=t[i].nodeName.match(/input|textarea|select/gi),n=t[i].hasAttribute("required"),s=t[i].hasAttribute("disabled"),r=-1!=t[i].className.indexOf("optional");a&&(n||r)&&!s&&e.push(t[i])}return e},checkAll:function(t){if(!t)return console.warn("element not found"),!1;var a=this,n={valid:!0,fields:[]};return this.filterFormElements(t.elements).forEach(function(t,e){var i=a.checkField(t);n.valid=!!(n.valid*i.valid),n.fields.push({field:t,error:i.error,valid:!!i.valid})}),n}},e});