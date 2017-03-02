webpackJsonp([1,2],{41:function(t,e){},42:function(t,e,n){n(85);var o=n(24)(n(45),n(90),null,null);t.exports=o.exports},45:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(88),i=n.n(o);e.default={name:"app",components:{speciesList:i.a}}},46:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["specie"]}},47:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(50),i=n.n(o),s=n(51),a=n.n(s),c=n(49),r=n.n(c),l=n(87),d=n.n(l);e.default={name:"speciesList",components:{specieItem:d.a},data:function(){return{records:[],token:"blank",selectedTaxonId:0,status:{token:"waiting for token",error:""}}},computed:{selectedTaxon:function(){var t=this;return this.records.filter(function(e){return e.taxonId===t.selectedTaxonId})[0]||{}},species:function(){return this.records.reduce(function(t,e){var n=r()({},{commonNme:e.commonNme,scientificDisplayNme:e.scientificDisplayNme,taxonId:e.taxonId,totalCountInt:Object.prototype.hasOwnProperty.call(e,"totalCountInt")?e.totalCountInt:1}),o=t.findIndex(function(t){return t.taxonId===n.taxonId});return o>-1?(n.totalCountInt+=t[o].totalCountInt,[].concat(a()(t.slice(0,o)),[n],a()(t.slice(o+1)))):[].concat(a()(t),[n])},[])}},methods:{getToken:function(){var t=this;return this.$http.get("https://vbapi.herokuapp.com/auth/guest").then(function(e){t.token=e.body.jwt})},getLocation:function(){var t={enableHighAccuracy:!0,timeout:1e4,maximumAge:0};return new i.a(function(e,n){e({accu:"12",lat:"-37.809610",long:"144.972052"}),"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(t){var n=t.coords.accuracy,o=t.coords.latitude,i=t.coords.longitude;console.log("Position aquired, accuracy : "+t.coords.accuracy),e({accu:n,lat:o,long:i})},function(t){n(new Error(t.message))},t):n(new Error("no geolocation feature present on device"))})},getRecordsByLoc:function(){var t=this,e=this.token;this.getLocation().then(function(n){console.log(n);var o={lat:n.lat,long:n.long,rad:250};t.$http.get("https://vbapi.herokuapp.com/search/point",{headers:{"x-access-token":e},params:o}).then(function(e){t.records=e.body.species,console.log(t.records.length+" Records found")})}).catch(function(e){t.status.error=e.message})},toggleRightSidenav:function(){this.selectedTaxonId=parseInt(event.currentTarget.id,10),this.$refs.rightSidenav.toggle()},closeRightSidenav:function(){this.$refs.rightSidenav.close()},open:function(t){console.log("Opened: + "+t)},close:function(t){console.log("Closed: + "+t)}},mounted:function(){var t=this;this.getToken().then(function(){t.status.token="Ready"})}}},85:function(t,e){},86:function(t,e){},87:function(t,e,n){var o=n(24)(n(46),n(89),null,null);t.exports=o.exports},88:function(t,e,n){n(86);var o=n(24)(n(47),n(91),null,null);t.exports=o.exports},89:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("md-list-item",{staticClass:"md-list-item"},[n("md-avatar",[n("img",{attrs:{src:"https://placeimg.com/40/40/animals/"+t.specie.taxonId,alt:"People"}})]),t._v(" "),n("div",{staticClass:"md-list-text-container"},[n("span",[t._v(t._s(t.specie.commonNme))]),t._v(" "),n("span",[t._v(t._s(t.specie.scientificDisplayNme))]),t._v(" "),n("p",[t._v("Total count : "+t._s(t.specie.totalCountInt))])]),t._v(" "),n("md-button",{staticClass:"md-icon-button md-list-action",attrs:{id:t.specie.taxonId},nativeOn:{click:function(e){t.toggleRightSidenav(e)}}},[n("md-icon",{staticClass:"md-primary"},[t._v("info")])],1),t._v(" "),n("md-divider",{staticClass:"md-inset"})],1)},staticRenderFns:[]}},90:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("md-whiteframe",{staticClass:"main-toolbar",attrs:{"md-elevation":"1","md-theme":"light-blue"}},[n("md-toolbar",{staticClass:"main-toolbar"},[n("h1",{staticClass:"md-title"},[t._v("Vic Bio scan")])])],1),t._v(" "),n("main",{staticClass:"main-content"},[n("speciesList")],1)],1)},staticRenderFns:[]}},91:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"speciesList"}},[n("md-sidenav",{ref:"rightSidenav",staticClass:"md-sidenav md-right md-fixed",on:{open:function(e){t.open("Right")},close:function(e){t.close("Right")}}},[n("md-toolbar",[n("div",{staticClass:"md-toolbar-container"},[n("h3",{staticClass:"md-title"},[n("md-icon",{nativeOn:{click:function(e){t.closeRightSidenav(e)}}},[t._v("arrow_back")]),t._v(" "+t._s(t.selectedTaxon.commonNme))],1)])]),t._v(" "),n("img",{attrs:{src:"http://collections.museumvictoria.com.au/content/media/27/728777-medium.jpg",alt:""}}),t._v(" "),n("md-list",[n("md-subheader",[t._v("Common name:")]),t._v(" "),n("md-list-item",[t._v(t._s(t.selectedTaxon.commonNme))]),t._v(" "),n("md-subheader",[t._v("Scientific name:")]),t._v(" "),n("md-list-item",[t._v(t._s(t.selectedTaxon.scientificDisplayNme))]),t._v(" "),n("md-subheader",[t._v("Count:")]),t._v(" "),n("md-list-item",[t._v(t._s(t.selectedTaxon.totalCountInt))]),t._v(" "),n("md-subheader",[t._v("Common name:")]),t._v(" "),n("md-list-item",[t._v(t._s(t.selectedTaxon.commonNme))]),t._v(" "),n("md-subheader",[t._v("Scientific name:")]),t._v(" "),n("md-list-item",[t._v(t._s(t.selectedTaxon.scientificDisplayNme))]),t._v(" "),n("md-subheader",[t._v("Count:")]),t._v(" "),n("md-list-item",[t._v(t._s(t.selectedTaxon.totalCountInt))])],1)],1),t._v(" "),n("md-list",t._l(t.species,function(t){return n("speciesItem",{key:t.taxonId,attrs:{specie:t}})})),t._v(" "),n("md-button",{staticClass:"md-button md-fab md-fab-bottom-right",staticStyle:{position:"fixed"},nativeOn:{click:function(e){t.getRecordsByLoc()}}},[n("md-icon",[t._v("my_location")])],1),t._v(" "),n("pre",[t._v(t._s(t.status))]),t._v(" "),n("pre",[t._v("selected taxonId: "+t._s(t.selectedTaxonId))]),t._v(" "),n("pre",[t._v(t._s(t.selectedTaxon))])],1)},staticRenderFns:[]}},94:function(t,e){},95:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(25),i=n.n(o),s=n(43),a=n.n(s),c=n(41),r=(n.n(c),n(44)),l=n.n(r),d=n(42),u=n.n(d);i.a.use(a.a),i.a.use(l.a),new i.a({el:"#app",template:"<App/>",components:{App:u.a}})}},[95]);
//# sourceMappingURL=app.1bf02efa440e4d5d5528.js.map