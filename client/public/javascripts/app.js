!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},n={},i={},r={}.hasOwnProperty,o="components/",l=function(e,t){var n=0;t&&(0===t.indexOf(o)&&(n=o.length),t.indexOf("/",n)>0&&(t=t.substring(n,t.indexOf("/",n))));var r=i[e+"/index.js"]||i[t+"/deps/"+e+"/index.js"];return r?o+r.substring(0,r.length-".js".length):e},s=/^\.\.?(\/|$)/,a=function(e,t){for(var n,i=[],r=(s.test(t)?e+"/"+t:t).split("/"),o=0,l=r.length;l>o;o++)n=r[o],".."===n?i.pop():"."!==n&&""!==n&&i.push(n);return i.join("/")},c=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(n){var i=a(c(t),n);return e.require(i,t)}},d=function(e,t){var i={id:e,exports:{}};return n[e]=i,t(i.exports,u(e),i),i.exports},f=function(e,i){var o=a(e,".");if(null==i&&(i="/"),o=l(e,i),r.call(n,o))return n[o].exports;if(r.call(t,o))return d(o,t[o]);var s=a(o,"./index");if(r.call(n,s))return n[s].exports;if(r.call(t,s))return d(s,t[s]);throw new Error('Cannot find module "'+e+'" from "'+i+'"')};f.alias=function(e,t){i[t]=e},f.register=f.define=function(e,n){if("object"==typeof e)for(var i in e)r.call(e,i)&&(t[i]=e[i]);else t[e]=n},f.list=function(){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e},f.brunch=!0,f._cache=n,e.require=f}}(),require.register("application",function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("views/menu"),o=i(r),l=t("views/main"),s=i(l),a=Backbone.Router.extend({routes:{"doctype/:doctype":"onDoctype"},onDoctype:function(e){this.app.views.main.setDoctype(e),this.app.views.menu.select(e)}}),c={initialize:function(){this.views={menu:new o["default"],main:new s["default"]},this.views.menu.$el.appendTo("#container"),this.views.main.$el.appendTo("#container"),this.router=new a({app:this}),this.router.app=this,Backbone.history.start(),$("[formaction='drawer/toggle']").on("click",function(){var e=$("aside"),t="true"===e.attr("aria-expanded")?"false":"true";e.attr("aria-expanded",t)})}};new a;e["default"]=c}),require.register("initialize",function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var r=t("application"),o=i(r);window.app=o["default"],$(function(){return o["default"].initialize()})}),require.register("models/menu",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=Backbone.Collection.extend({model:Backbone.Model,url:"doctypes"})}),require.register("views/main",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=Backbone.View.extend({el:"[role='contentinfo']",collection:new Backbone.Collection,initialize:function(){this.listenTo(this.collection,"reset",this.render)},getCols:function(e){var t=[];if(0===e.length)return t;for(var n in e[0])t.push({title:n,data:n,defaultContent:""});return t},render:function(){this.$el.html("<table></table>");var e=this.collection.toJSON(),t={destroy:!0,lengthChange:!1,dom:'<"thead"Bfi>t',buttons:["colvis"],scrollX:"100%",scrollY:"calc(100vh - 7em)",deferRender:!0,scroller:!0,data:e,columns:this.getCols(e)};return this.$("table").DataTable(t),this},setDoctype:function(e){this.doctype=e,this.collection.fetch({reset:!0,url:"search?range=all&doctypes[]="+e})}})}),require.register("views/menu",function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("models/menu"),o=i(r);e["default"]=Backbone.View.extend({el:"aside",collection:new o["default"],initialize:function(){this.collection.fetch().done(this.render.bind(this))},itemTemplate:_.template('<li><a class="<%= sclass %>" href="#doctype/<%= doctype %>"><%= doctype %> (<%= sum %>)</a></li>'),render:function(){var e=this,t="<ul>";return this.collection.forEach(function(n){var i=n.toJSON();i.sclass=i.doctype===e.selected?"selected":"",t+=e.itemTemplate(i)},this),t+="</ul>",this.$el.empty().html(t),this},select:function(e){this.selected=e,this.$("a").removeClass("selected"),this.$("a[href='#doctype/"+e+"']").addClass("selected")}})});