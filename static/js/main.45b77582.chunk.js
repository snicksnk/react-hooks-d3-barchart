(this.webpackJsonphookschart=this.webpackJsonphookschart||[]).push([[0],{25:function(t,e,n){t.exports=n(32)},30:function(t,e,n){},31:function(t,e,n){},32:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(16),i=n.n(o),c=(n(30),n(35)),l=n(11),s=n(21),u=n(10);function d(t,e){return Object(u.a)().domain(e).range([0,t.size.height]).paddingInner(.1).paddingOuter(.2).align(.9).round(!0)}function h(t,e,n,a,r){return"M".concat(e," ").concat(n)+"H ".concat(t.x(a))+"V ".concat(n+r)+"H ".concat(e)+"L ".concat(e," ").concat(n)}c.a.prototype.transition=s.a;var f=function(){var t=r.a.useRef(null);return Object(a.useEffect)((function(){var e,n,a={top:20,right:20,bottom:20,left:40},r=800-a.left-a.right,o=450-a.top-a.bottom,i=Object(c.a)(t.current).attr("width",r+a.left+a.right).attr("height",o+a.top+a.bottom).append("g").attr("transform","translate("+a.left+","+a.top+")"),s=["Cats","Dogs","Birds","Cows"],f={size:{width:r,height:o},margins:a},p={x:(e=f,n=[-50,50],Object(u.b)().domain(n).range([0,e.size.width]).nice()),y:d(f,s)};!function(t,e,n){var a=n.x,r=n.y;e.append("g").attr("class","axis x-axis").attr("transform","translate(0, ".concat(t.size.height,")")).call(a),e.append("g").attr("class","axis y-axis").attr("transform","translate(0, 0)").call(r)}(f,i,{x:Object(l.a)(p.x).ticks(10,"s").tickSize(-1*o),y:Object(l.b)(p.y)}),function(t,e,n,a,r){var o=n.x,i=n.y;console.log("values--",r.map((function(t){return t.map((function(e,n){return{value:e,size:t.length,n:n}}))})));var c=e.selectAll("g.bar-group").data(r.map((function(t){return t.map((function(e,n){return{value:e,size:t.length,n:n}}))}))).enter().append("g").attr("class","bar-group").attr("transform",(function(t,e){return"translate(0, ".concat(i("".concat(a[e])),")")})).selectAll("path").data((function(t){return t})).enter();c.append("path").attr("class",(function(t){return"bar bar-".concat(t.n)})).attr("filter","url(#filter)").attr("d",(function(e,a,r){var o=i.bandwidth();if(e.size>1){var c=o/e.size,l=c*e.n;return h(n,t.size.width/2,l,e.value,c-3)}return h(n,t.size.width/2,0,e.value,o)})),c.append("text").attr("class","text").attr("text-anchor",(function(t){return t.value>0?"end":t.value<0?"start":"center"})).attr("dy","+.2em").attr("x",(function(t){var e=t.value>0?-3:3;return o(t.value)+e})).attr("y",(function(t,e){var n=i.bandwidth()/t.size;return n*t.n+n/2})).text((function(t){return t.value}))}(f,i,p,s,[[10,20],[-48,50],[50],[-20,-25]])}),[t.current]),r.a.createElement("svg",{ref:t},r.a.createElement("defs",null,r.a.createElement("filter",{id:"filter",x:"-20%",y:"-20%",width:"140%",height:"140%",filterUnits:"objectBoundingBox",primitiveUnits:"userSpaceOnUse","color-interpolation-filters":"linearRGB"},r.a.createElement("feDropShadow",{stdDeviation:"5 5",in:"SourceGraphic",dx:"5",dy:"5","flood-color":"#000000","flood-opacity":"0.5",x:"0%",y:"0%",width:"100%",height:"100%",result:"dropShadow"}))))};n(31);var p=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"header"},"Grouped bar chart"),r.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[25,1,2]]]);
//# sourceMappingURL=main.45b77582.chunk.js.map