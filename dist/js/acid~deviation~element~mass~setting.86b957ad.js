(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["acid~deviation~element~mass~setting"],{"41f4":function(t,e,i){"use strict";i("94a7");var n=i("9d26"),s=i("5368"),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},o={name:"v-checkbox",mixins:[s["a"]],props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$vuetify.icons.checkboxIndeterminate"},onIcon:{type:String,default:"$vuetify.icons.checkboxOn"},offIcon:{type:String,default:"$vuetify.icons.checkboxOff"}},data:function(t){return{inputIndeterminate:t.indeterminate}},computed:{classes:function(){return{"v-input--selection-controls":!0,"v-input--checkbox":!0}},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon}},watch:{indeterminate:function(t){this.inputIndeterminate=t}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",a({},this.$attrs,{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(n["a"],this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}};e["a"]=o},"4c94":function(t,e,i){},"58db":function(t,e,i){},"60e6":function(t,e,i){"use strict";var n=i("2b0e");e["a"]=n["a"].extend({name:"filterable",props:{noDataText:{type:String,default:"$vuetify.noDataText"}}})},8038:function(t,e,i){},"90bd":function(t,e,i){},b3df:function(t,e,i){},b56d:function(t,e,i){"use strict";i("da37"),i("b847"),i("bf5a");var n=i("58df"),s=i("9d26"),a=i("b64a"),o=i("6a18"),l=i("98a1"),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},c=Object(n["a"])(a["a"],o["a"],l["a"]).extend({name:"v-chip",props:{close:Boolean,disabled:Boolean,label:Boolean,outline:Boolean,selected:Boolean,small:Boolean,textColor:String,value:{type:Boolean,default:!0}},computed:{classes:function(){return r({"v-chip--disabled":this.disabled,"v-chip--selected":this.selected&&!this.disabled,"v-chip--label":this.label,"v-chip--outline":this.outline,"v-chip--small":this.small,"v-chip--removable":this.close},this.themeClasses)}},methods:{genClose:function(t){var e=this,i={staticClass:"v-chip__close",on:{click:function(t){t.stopPropagation(),e.$emit("input",!1)}}};return t("div",i,[t(s["a"],"$vuetify.icons.delete")])},genContent:function(t){return t("span",{staticClass:"v-chip__content"},[this.$slots.default,this.close&&this.genClose(t)])}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-chip",class:this.classes,attrs:{tabindex:this.disabled?-1:0},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),i=this.textColor||this.outline&&this.color;return t("span",this.setTextColor(i,e),[this.genContent(t)])}}),h=c,u=i("e449"),d=u["a"],p=(i("4c94"),i("41f4")),m=i("ce7e"),f=m["a"],v=i("e0c7"),g=v["a"],b=i("ba95"),I=i("40fe"),x=i("5d23"),S=i("8860"),y=i("80d2"),$={name:"v-select-list",mixins:[a["a"],o["a"]],props:{action:Boolean,dense:Boolean,hideSelected:Boolean,items:{type:Array,default:function(){return[]}},itemAvatar:{type:[String,Array,Function],default:"avatar"},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},noDataText:String,noFilter:Boolean,searchInput:{default:null},selectedItems:{type:Array,default:function(){return[]}}},computed:{parsedItems:function(){var t=this;return this.selectedItems.map(function(e){return t.getValue(e)})},tileActiveClass:function(){return Object.keys(this.setTextColor(this.color).class||{}).join(" ")},staticNoDataTile:function(){var t={on:{mousedown:function(t){return t.preventDefault()}}};return this.$createElement(b["a"],t,[this.genTileContent(this.noDataText)])}},methods:{genAction:function(t,e){var i=this,n={on:{click:function(e){e.stopPropagation(),i.$emit("select",t)}}};return this.$createElement(I["a"],n,[this.$createElement(p["a"],{props:{color:this.color,inputValue:e}})])},genDivider:function(t){return this.$createElement(f,{props:t})},genFilteredText:function(t){if(t=(t||"").toString(),!this.searchInput||this.noFilter)return Object(y["h"])(t);var e=this.getMaskedCharacters(t),i=e.start,n=e.middle,s=e.end;return""+Object(y["h"])(i)+this.genHighlight(n)+Object(y["h"])(s)},genHeader:function(t){return this.$createElement(g,{props:t},t.header)},genHighlight:function(t){return'<span class="v-list__tile__mask">'+Object(y["h"])(t)+"</span>"},getMaskedCharacters:function(t){var e=(this.searchInput||"").toString().toLocaleLowerCase(),i=t.toLocaleLowerCase().indexOf(e);if(i<0)return{start:"",middle:t,end:""};var n=t.slice(0,i),s=t.slice(i,i+e.length),a=t.slice(i+e.length);return{start:n,middle:s,end:a}},genTile:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.hasItem(t);t===Object(t)&&(n=this.getAvatar(t),e=null!==e?e:this.getDisabled(t));var a={on:{mousedown:function(t){t.preventDefault()},click:function(){return e||i.$emit("select",t)}},props:{activeClass:this.tileActiveClass,avatar:n,disabled:e,ripple:!0,value:s,color:this.color}};if(!this.$scopedSlots.item)return this.$createElement(b["a"],a,[this.action&&!this.hideSelected&&this.items.length>0?this.genAction(t,s):null,this.genTileContent(t)]);var o=this,l=this.$scopedSlots.item({parent:o,item:t,tile:a});return this.needsTile(l)?this.$createElement(b["a"],a,l):l},genTileContent:function(t){var e=this.genFilteredText(this.getText(t));return this.$createElement(x["a"],[this.$createElement(x["b"],{domProps:{innerHTML:e}})])},hasItem:function(t){return this.parsedItems.indexOf(this.getValue(t))>-1},needsTile:function(t){return 1!==t.length||null==t[0].componentOptions||"v-list-tile"!==t[0].componentOptions.Ctor.options.name},getAvatar:function(t){return Boolean(Object(y["k"])(t,this.itemAvatar,!1))},getDisabled:function(t){return Boolean(Object(y["k"])(t,this.itemDisabled,!1))},getText:function(t){return String(Object(y["k"])(t,this.itemText,t))},getValue:function(t){return Object(y["k"])(t,this.itemValue,this.getText(t))}},render:function(){var t=[],e=!0,i=!1,n=void 0;try{for(var s,a=this.items[Symbol.iterator]();!(e=(s=a.next()).done);e=!0){var o=s.value;this.hideSelected&&this.hasItem(o)||(null==o?t.push(this.genTile(o)):o.header?t.push(this.genHeader(o)):o.divider?t.push(this.genDivider(o)):t.push(this.genTile(o)))}}catch(l){i=!0,n=l}finally{try{!e&&a.return&&a.return()}finally{if(i)throw n}}return t.length||t.push(this.$slots["no-data"]||this.staticNoDataTile),this.$slots["prepend-item"]&&t.unshift(this.$slots["prepend-item"]),this.$slots["append-item"]&&t.push(this.$slots["append-item"]),this.$createElement("div",{staticClass:"v-select-list v-card",class:this.themeClasses},[this.$createElement(S["a"],{props:{dense:this.dense}},t)])}},C=i("8654"),D=i("5e28"),w=i("60e6"),A=i("c584"),O=i("d9bd"),k=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};function V(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var T={closeOnClick:!1,closeOnContentClick:!1,openOnClick:!1,maxHeight:300},B=C["a"].extend({name:"v-select",directives:{ClickOutside:A["a"]},mixins:[D["a"],w["a"]],props:{appendIcon:{type:String,default:"$vuetify.icons.dropdown"},appendIconCb:Function,attach:{type:null,default:!1},browserAutocomplete:{type:String,default:"on"},cacheItems:Boolean,chips:Boolean,clearable:Boolean,deletableChips:Boolean,dense:Boolean,hideSelected:Boolean,items:{type:Array,default:function(){return[]}},itemAvatar:{type:[String,Array,Function],default:"avatar"},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},menuProps:{type:[String,Array,Object],default:function(){return T}},multiple:Boolean,openOnClear:Boolean,returnObject:Boolean,searchInput:{default:null},smallChips:Boolean},data:function(t){return{attrsInput:{role:"combobox"},cachedItems:t.cacheItems?t.items:[],content:null,isBooted:!1,isMenuActive:!1,lastItem:20,lazyValue:void 0!==t.value?t.value:t.multiple?[]:void 0,selectedIndex:-1,selectedItems:[],keyboardLookupPrefix:"",keyboardLookupLastTime:0}},computed:{allItems:function(){return this.filterDuplicates(this.cachedItems.concat(this.items))},classes:function(){return Object.assign({},C["a"].options.computed.classes.call(this),{"v-select":!0,"v-select--chips":this.hasChips,"v-select--chips--small":this.smallChips,"v-select--is-menu-active":this.isMenuActive})},computedItems:function(){return this.allItems},counterValue:function(){return this.multiple?this.selectedItems.length:(this.getText(this.selectedItems[0])||"").toString().length},directives:function(){return this.isFocused?[{name:"click-outside",value:this.blur,args:{closeConditional:this.closeConditional}}]:void 0},dynamicHeight:function(){return"auto"},hasChips:function(){return this.chips||this.smallChips},hasSlot:function(){return Boolean(this.hasChips||this.$scopedSlots.selection)},isDirty:function(){return this.selectedItems.length>0},listData:function(){var t=this.$vnode&&this.$vnode.context.$options._scopeId;return{attrs:t?V({},t,!0):null,props:{action:this.multiple&&!this.isHidingSelected,color:this.color,dense:this.dense,hideSelected:this.hideSelected,items:this.virtualizedItems,noDataText:this.$vuetify.t(this.noDataText),selectedItems:this.selectedItems,itemAvatar:this.itemAvatar,itemDisabled:this.itemDisabled,itemValue:this.itemValue,itemText:this.itemText},on:{select:this.selectItem},scopedSlots:{item:this.$scopedSlots.item}}},staticList:function(){return(this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"])&&Object(O["a"])("assert: staticList should not be called if slots are used"),this.$createElement($,this.listData)},virtualizedItems:function(){return this.$_menuProps.auto?this.computedItems:this.computedItems.slice(0,this.lastItem)},menuCanShow:function(){return!0},$_menuProps:function(){var t=void 0;return t="string"===typeof this.menuProps?this.menuProps.split(","):this.menuProps,Array.isArray(t)&&(t=t.reduce(function(t,e){return t[e.trim()]=!0,t},{})),k({},T,{value:this.menuCanShow&&this.isMenuActive,nudgeBottom:this.nudgeBottom?this.nudgeBottom:t.offsetY?1:0},t)}},watch:{internalValue:function(t){this.initialValue=t,this.setSelectedItems()},isBooted:function(){var t=this;this.$nextTick(function(){t.content&&t.content.addEventListener&&t.content.addEventListener("scroll",t.onScroll,!1)})},isMenuActive:function(t){t&&(this.isBooted=!0)},items:{immediate:!0,handler:function(t){this.cacheItems&&(this.cachedItems=this.filterDuplicates(this.cachedItems.concat(t))),this.setSelectedItems()}}},mounted:function(){this.content=this.$refs.menu&&this.$refs.menu.$refs.content},methods:{blur:function(t){this.isMenuActive=!1,this.isFocused=!1,this.$refs.input&&this.$refs.input.blur(),this.selectedIndex=-1,this.onBlur(t)},activateMenu:function(){this.isMenuActive=!0},clearableCallback:function(){var t=this;this.setValue(this.multiple?[]:void 0),this.$nextTick(function(){return t.$refs.input.focus()}),this.openOnClear&&(this.isMenuActive=!0)},closeConditional:function(t){return!!this.content&&!this.content.contains(t.target)&&!!this.$el&&!this.$el.contains(t.target)&&t.target!==this.$el},filterDuplicates:function(t){for(var e=new Map,i=0;i<t.length;++i){var n=t[i],s=this.getValue(n);!e.has(s)&&e.set(s,n)}return Array.from(e.values())},findExistingIndex:function(t){var e=this,i=this.getValue(t);return(this.internalValue||[]).findIndex(function(t){return e.valueComparator(e.getValue(t),i)})},genChipSelection:function(t,e){var i=this,n=this.disabled||this.readonly||this.getDisabled(t);return this.$createElement(h,{staticClass:"v-chip--select-multi",attrs:{tabindex:-1},props:{close:this.deletableChips&&!n,disabled:n,selected:e===this.selectedIndex,small:this.smallChips},on:{click:function(t){n||(t.stopPropagation(),i.selectedIndex=e)},input:function(){return i.onChipInput(t)}},key:this.getValue(t)},this.getText(t))},genCommaSelection:function(t,e,i){var n=JSON.stringify(this.getValue(t)),s=e===this.selectedIndex&&this.color,a=this.disabled||this.getDisabled(t);return this.$createElement("div",this.setTextColor(s,{staticClass:"v-select__selection v-select__selection--comma",class:{"v-select__selection--disabled":a},key:n}),this.getText(t)+(i?"":", "))},genDefaultSlot:function(){var t=this.genSelections(),e=this.genInput();return Array.isArray(t)?t.push(e):(t.children=t.children||[],t.children.push(e)),[this.$createElement("div",{staticClass:"v-select__slot",directives:this.directives},[this.genLabel(),this.prefix?this.genAffix("prefix"):null,t,this.suffix?this.genAffix("suffix"):null,this.genClearIcon(),this.genIconSlot()]),this.genMenu(),this.genProgress()]},genInput:function(){var t=C["a"].options.methods.genInput.call(this);return t.data.domProps.value=null,t.data.attrs.readonly=!0,t.data.attrs["aria-readonly"]=String(this.readonly),t.data.on.keypress=this.onKeyPress,t},genList:function(){return this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"]?this.genListWithSlot():this.staticList},genListWithSlot:function(){var t=this,e=["prepend-item","no-data","append-item"].filter(function(e){return t.$slots[e]}).map(function(e){return t.$createElement("template",{slot:e},t.$slots[e])});return this.$createElement($,k({},this.listData),e)},genMenu:function(){var t=this,e=this.$_menuProps;e.activator=this.$refs["input-slot"];var i=Object.keys(d.options.props),n=Object.keys(this.$attrs).reduce(function(t,e){return i.includes(Object(y["b"])(e))&&t.push(e),t},[]),s=!0,a=!1,o=void 0;try{for(var l,r=n[Symbol.iterator]();!(s=(l=r.next()).done);s=!0){var c=l.value;e[Object(y["b"])(c)]=this.$attrs[c]}}catch(h){a=!0,o=h}finally{try{!s&&r.return&&r.return()}finally{if(a)throw o}}return""===this.attach||!0===this.attach||"attach"===this.attach?e.attach=this.$el:e.attach=this.attach,this.$createElement(d,{props:e,on:{input:function(e){t.isMenuActive=e,t.isFocused=e}},ref:"menu"},[this.genList()])},genSelections:function(){var t=this.selectedItems.length,e=new Array(t),i=void 0;i=this.$scopedSlots.selection?this.genSlotSelection:this.hasChips?this.genChipSelection:this.genCommaSelection;while(t--)e[t]=i(this.selectedItems[t],t,t===e.length-1);return this.$createElement("div",{staticClass:"v-select__selections"},e)},genSlotSelection:function(t,e){return this.$scopedSlots.selection({parent:this,item:t,index:e,selected:e===this.selectedIndex,disabled:this.disabled||this.readonly})},getMenuIndex:function(){return this.$refs.menu?this.$refs.menu.listIndex:-1},getDisabled:function(t){return Object(y["k"])(t,this.itemDisabled,!1)},getText:function(t){return Object(y["k"])(t,this.itemText,t)},getValue:function(t){return Object(y["k"])(t,this.itemValue,this.getText(t))},onBlur:function(t){this.$emit("blur",t)},onChipInput:function(t){this.multiple?this.selectItem(t):this.setValue(null),0===this.selectedItems.length?this.isMenuActive=!0:this.isMenuActive=!1,this.selectedIndex=-1},onClick:function(){this.isDisabled||(this.isMenuActive=!0,this.isFocused||(this.isFocused=!0,this.$emit("focus")))},onEnterDown:function(){this.onBlur()},onEscDown:function(t){t.preventDefault(),this.isMenuActive&&(t.stopPropagation(),this.isMenuActive=!1)},onKeyPress:function(t){var e=this;if(!this.multiple){var i=1e3,n=performance.now();n-this.keyboardLookupLastTime>i&&(this.keyboardLookupPrefix=""),this.keyboardLookupPrefix+=t.key.toLowerCase(),this.keyboardLookupLastTime=n;var s=this.allItems.findIndex(function(t){return e.getText(t).toLowerCase().startsWith(e.keyboardLookupPrefix)}),a=this.allItems[s];-1!==s&&(this.setValue(this.returnObject?a:this.getValue(a)),setTimeout(function(){return e.setMenuIndex(s)}))}},onKeyDown:function(t){var e=t.keyCode;return this.readonly||this.isMenuActive||![y["p"].enter,y["p"].space,y["p"].up,y["p"].down].includes(e)||this.activateMenu(),this.isMenuActive&&this.$refs.menu&&this.$refs.menu.changeListIndex(t),e===y["p"].enter?this.onEnterDown(t):e===y["p"].esc?this.onEscDown(t):e===y["p"].tab?this.onTabDown(t):void 0},onMouseUp:function(t){var e=this;if(this.hasMouseDown){var i=this.$refs["append-inner"];this.isMenuActive&&i&&(i===t.target||i.contains(t.target))?this.$nextTick(function(){return e.isMenuActive=!e.isMenuActive}):this.isEnclosed&&!this.isDisabled&&(this.isMenuActive=!0)}C["a"].options.methods.onMouseUp.call(this,t)},onScroll:function(){var t=this;if(this.isMenuActive){if(this.lastItem>=this.computedItems.length)return;var e=this.content.scrollHeight-(this.content.scrollTop+this.content.clientHeight)<200;e&&(this.lastItem+=20)}else requestAnimationFrame(function(){return t.content.scrollTop=0})},onTabDown:function(t){var e=this.getMenuIndex(),i=this.$refs.menu.tiles[e];i&&i.className.indexOf("v-list__tile--highlighted")>-1&&this.isMenuActive&&e>-1?(t.preventDefault(),t.stopPropagation(),i.click()):this.blur(t)},selectItem:function(t){var e=this;if(this.multiple){var i=(this.internalValue||[]).slice(),n=this.findExistingIndex(t);-1!==n?i.splice(n,1):i.push(t),this.setValue(i.map(function(t){return e.returnObject?t:e.getValue(t)})),this.$nextTick(function(){e.$refs.menu&&e.$refs.menu.updateDimensions()})}else this.setValue(this.returnObject?t:this.getValue(t)),this.isMenuActive=!1},setMenuIndex:function(t){this.$refs.menu&&(this.$refs.menu.listIndex=t)},setSelectedItems:function(){var t=this,e=[],i=this.multiple&&Array.isArray(this.internalValue)?this.internalValue:[this.internalValue],n=function(i){var n=t.allItems.findIndex(function(e){return t.valueComparator(t.getValue(e),t.getValue(i))});n>-1&&e.push(t.allItems[n])},s=!0,a=!1,o=void 0;try{for(var l,r=i[Symbol.iterator]();!(s=(l=r.next()).done);s=!0){var c=l.value;n(c)}}catch(h){a=!0,o=h}finally{try{!s&&r.return&&r.return()}finally{if(a)throw o}}this.selectedItems=e},setValue:function(t){var e=this.internalValue;this.internalValue=t,t!==e&&this.$emit("change",t)}}}),j=(i("8038"),i("b3df"),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}),M=j({},T,{offsetY:!0,offsetOverflow:!0,transition:!1}),P=B.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},browserAutocomplete:{type:String,default:"off"},filter:{type:Function,default:function(t,e,i){return i.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,noFilter:Boolean,searchInput:{default:void 0},menuProps:{type:B.options.props.menuProps.type,default:function(){return M}},autoSelectFirst:{type:Boolean,default:!1}},data:function(t){return{attrsInput:null,lazySearch:t.searchInput}},computed:{classes:function(){return Object.assign({},B.options.computed.classes.call(this),{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map(function(e){return t.getValue(e)})},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some(function(e){return!t.hasItem(e)}):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:this.getText(this.selectedItem).toString().length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(function(e){return t.filter(e,t.internalSearch.toString(),t.getText(e).toString())})},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:searchInput",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple?this.searchIsDirty:this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=B.options.computed.$_menuProps.call(this);return t.contentClass=("v-autocomplete__content "+(t.contentClass||"")).trim(),j({},M,t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find(function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))})},listData:function(){var t=B.options.computed.listData.call(this);return Object.assign(t.props,{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:function(t){this.onFilteredItemsChanged(t)},internalValue:function(){this.setSearch()},isFocused:function(t){t?this.$refs.input&&this.$refs.input.select():this.updateSelf()},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:function(t){this.onInternalSearchChanged(t)},itemText:function(){this.updateSelf()}},created:function(){this.setSearch()},methods:{onFilteredItemsChanged:function(t){var e=this;this.setMenuIndex(-1),this.$nextTick(function(){e.setMenuIndex(t.length>0&&(1===t.length||e.autoSelectFirst)?0:-1)})},onInternalSearchChanged:function(t){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){if(!this.searchIsDirty&&[y["p"].backspace,y["p"].left,y["p"].right,y["p"].delete].includes(t)){var e=this.selectedItems.length-1;if(t===y["p"].left)this.selectedIndex=-1===this.selectedIndex?e:this.selectedIndex-1;else if(t===y["p"].right)this.selectedIndex=this.selectedIndex>=e?-1:this.selectedIndex+1;else if(-1===this.selectedIndex)return void(this.selectedIndex=e);var i=this.selectedItems[this.selectedIndex];if([y["p"].backspace,y["p"].delete].includes(t)&&!this.getDisabled(i)){var n=this.selectedIndex===e?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;-1===n?this.setValue(this.multiple?[]:void 0):this.selectItem(i),this.selectedIndex=n}}},clearableCallback:function(){this.internalSearch=void 0,B.options.methods.clearableCallback.call(this)},genInput:function(){var t=C["a"].options.methods.genInput.call(this);return t.data.attrs.role="combobox",t.data.domProps.value=this.internalSearch,t},genSelections:function(){return this.hasSlot||this.multiple?B.options.methods.genSelections.call(this):[]},onClick:function(){this.isDisabled||(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.activateMenu())},onEnterDown:function(){},onInput:function(t){this.selectedIndex>-1||(t.target.value&&(this.activateMenu(),this.isAnyValueAllowed||this.setMenuIndex(0)),this.mask&&this.resetSelections(t.target),this.internalSearch=t.target.value,this.badInput=t.target.validity&&t.target.validity.badInput)},onKeyDown:function(t){var e=t.keyCode;B.options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onTabDown:function(t){B.options.methods.onTabDown.call(this,t),this.updateSelf()},setSelectedItems:function(){B.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick(function(){t.internalSearch=t.multiple&&t.internalSearch&&t.isMenuActive?t.internalSearch:!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem)})},updateSelf:function(){this.updateAutocomplete()},updateAutocomplete:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1}}}),E=P,F=i("afdd"),L=E.extend({name:"v-overflow-btn",props:{segmented:Boolean,editable:Boolean,transition:B.options.props.transition},computed:{classes:function(){return Object.assign(E.options.computed.classes.call(this),{"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable})},isAnyValueAllowed:function(){return this.editable||E.options.computed.isAnyValueAllowed.call(this)},isSingle:function(){return!0},computedItems:function(){return this.segmented?this.allItems:this.filteredItems},$_menuProps:function(){var t=E.options.computed.$_menuProps.call(this);return t.transition=t.transition||"v-menu-transition",t}},methods:{genSelections:function(){return this.editable?E.options.methods.genSelections.call(this):B.options.methods.genSelections.call(this)},genCommaSelection:function(t,e,i){return this.segmented?this.genSegmentedBtn(t):B.options.methods.genCommaSelection.call(this,t,e,i)},genInput:function(){var t=C["a"].options.methods.genInput.call(this);return t.data.domProps.value=this.editable?this.internalSearch:"",t.data.attrs.readonly=!this.isAnyValueAllowed,t},genLabel:function(){if(this.editable&&this.isFocused)return null;var t=C["a"].options.methods.genLabel.call(this);return t?(t.data.style={},t):t},genSegmentedBtn:function(t){var e=this,i=this.getValue(t),n=this.computedItems.find(function(t){return e.getValue(t)===i})||t;return n.text&&n.callback?this.$createElement(F["a"],{props:{flat:!0},on:{click:function(t){t.stopPropagation(),n.callback(t)}}},[n.text]):(Object(O["c"])("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)}}}),_=L,H={name:"v-combobox",extends:P,props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{counterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return B.options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onFilteredItemsChanged:function(){},onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find(function(e){return t.endsWith(e)});null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genChipSelection:function(t,e){var i=this,n=B.options.methods.genChipSelection.call(this,t,e);return this.multiple&&(n.componentOptions.listeners.dblclick=function(){i.editingIndex=e,i.internalSearch=i.getText(t),i.selectedIndex=-1}),n},onChipInput:function(t){B.options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),B.options.methods.onEnterDown.call(this),this.getMenuIndex()>-1||this.updateSelf()},onKeyDown:function(t){var e=t.keyCode;B.options.methods.onKeyDown.call(this,t),this.multiple&&e===y["p"].left&&0===this.$refs.input.selectionStart&&this.updateSelf(),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();P.options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():B.options.methods.selectItem.call(this,t)},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.internalSearch;B.options.methods.setValue.call(this,t)},updateEditing:function(){var t=this.internalValue.slice();t[this.editingIndex]=this.internalSearch,this.setValue(t),this.editingIndex=-1},updateCombobox:function(){var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),t&&(this.internalSearch=void 0))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this.getMenuIndex();if(!(t<0)||this.searchIsDirty){if(this.editingIndex>-1)return this.updateEditing();var e=this.selectedItems.indexOf(this.internalSearch);if(e>-1){var i=this.internalValue.slice();i.splice(e,1),this.setValue(i)}if(t>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}}}},z=H,N=i("7cf7"),K=i("ab6d");i.d(e,"a",function(){return W});var W={functional:!0,$_wrapperFor:B,props:{autocomplete:Boolean,combobox:Boolean,multiple:Boolean,tags:Boolean,editable:Boolean,overflow:Boolean,segmented:Boolean},render:function(t,e){var i=e.props,n=e.data,s=e.slots,a=e.parent;Object(K["a"])(n);var o=Object(N["a"])(s(),t);return i.autocomplete&&Object(O["d"])("<v-select autocomplete>","<v-autocomplete>",W,a),i.combobox&&Object(O["d"])("<v-select combobox>","<v-combobox>",W,a),i.tags&&Object(O["d"])("<v-select tags>","<v-combobox multiple>",W,a),i.overflow&&Object(O["d"])("<v-select overflow>","<v-overflow-btn>",W,a),i.segmented&&Object(O["d"])("<v-select segmented>","<v-overflow-btn segmented>",W,a),i.editable&&Object(O["d"])("<v-select editable>","<v-overflow-btn editable>",W,a),n.attrs=n.attrs||{},i.combobox||i.tags?(n.attrs.multiple=i.tags,t(z,n,o)):i.autocomplete?(n.attrs.multiple=i.multiple,t(E,n,o)):i.overflow||i.segmented||i.editable?(n.attrs.segmented=i.segmented,n.attrs.editable=i.editable,t(_,n,o)):(n.attrs.multiple=i.multiple,t(B,n,o))}};e["b"]=W},b847:function(t,e,i){},bf5a:function(t,e,i){},ce7e:function(t,e,i){"use strict";i("58db");var n=i("6a18"),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};e["a"]=n["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){return t("hr",{class:s({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:this.$attrs,on:this.$listeners})}})},e0c7:function(t,e,i){"use strict";i("90bd");var n=i("6a18"),s=i("58df"),a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};e["a"]=Object(s["a"])(n["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:a({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);
//# sourceMappingURL=acid~deviation~element~mass~setting.86b957ad.js.map