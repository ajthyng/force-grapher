(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,n,t){e.exports=t(116)},115:function(e,n,t){},116:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(42),c=t(146),i=t(12),u=t(13),s=t(48),d=t(5),l=t.n(d),f=t(9),p=t(17),m=t(10);function b(){var e=Object(i.a)(["\n  width: 60px;\n  min-width: 60px;\n  margin: 8px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return b=function(){return e},e}function h(){var e=Object(i.a)(["\n  width: 45px;\n  min-width: 45px;\n  border-top: "," "," 4px;\n"]);return h=function(){return e},e}function v(){var e=Object(i.a)(["\n  margin-top: 12px;\n  margin-bottom: 24px;\n"]);return v=function(){return e},e}function x(){var e=Object(i.a)(["\n  color: #363534;\n  font-size: 18px;\n"]);return x=function(){return e},e}function y(){var e=Object(i.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n"]);return y=function(){return e},e}function g(){var e=Object(i.a)([""]);return g=function(){return e},e}function w(){var e=Object(i.a)([""]);return w=function(){return e},e}function k(){var e=Object(i.a)([""]);return k=function(){return e},e}function O(){var e=Object(i.a)(["\n  color: white;\n  font-size: 60px;\n  text-shadow: 2px 2px 4px #808080;\n  margin: 8px;\n  min-width: 60px;\n"]);return O=function(){return e},e}function E(){var e=Object(i.a)(["\n  transform: scale(0.3) translate3d(-392px, 450px, 0);\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  width: 300px;\n  border: solid 2px #808080;\n  border-radius: 3px;\n  background-color: #e8e3db;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  display: flex;\n  padding: 12px;\n\n  @media only screen and (max-width: 767px) {\n    display: none;\n  }\n\n  transition: transform 300ms ease-in-out;\n\n  &:hover {\n    transform: scale(1) translate3d(0, 0, 0);\n  }\n"]);return E=function(){return e},e}var j=u.b.div(E()),N=u.b.i(O()),C=Object(u.b)(N).attrs(function(e){return{className:"ion-md-star"}})(k()),F=Object(u.b)(N).attrs(function(e){return{className:"ion-md-square"}})(w()),S=Object(u.b)(N).attrs(function(e){return{className:"ion-md-cloud"}})(g()),D=u.b.div(y()),A=u.b.span(x()),R=function(e){var n=e.icon;return a.a.createElement(D,null,a.a.createElement(n,null),a.a.createElement(A,null,e.label))},I=Object(u.b)(D)(v()),T=u.b.div(h(),function(e){return e.dashed?"dashed":"solid"},function(e){return e.color}),P=u.b.div(b()),L=function(e){var n=e.color,t=e.label,r=e.dashed;return a.a.createElement(I,null,a.a.createElement(P,null,a.a.createElement(T,{color:n,dashed:r})),a.a.createElement(A,null,t))},_=function(e){return a.a.createElement(j,null,a.a.createElement(R,{icon:C,label:"On Campus System"}),a.a.createElement(R,{icon:F,label:"External System"}),a.a.createElement(R,{icon:S,label:"Cloud System"}),a.a.createElement(L,{color:"#005481",dashed:!0,label:"Custom Interface"}),a.a.createElement(L,{color:"#9e6614",label:"Built-in Interface"}))},M={},Y={subscribe:function(e,n){M[e]||(M[e]=[]),M[e].push(n)},unsubscribe:function(e,n){M[e]&&(M[e]=M[e].filter(function(e){return e!==n}))},next:function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];M[e]&&M[e].forEach(function(e){"function"===typeof e&&e.apply(void 0,t)})}};Object.freeze(Y);var z=t(4),B=t.n(z),K=t(74),U=t.n(K),G=t(43),X=t.n(G),q=function(){var e=function(e,n){return JSON.parse(localStorage.getItem(e))||n},n=function(e,n){return localStorage.setItem(e,JSON.stringify(n))},t=function(e){var n=Object(m.a)({},e),t=Object.keys(n),r=!1;return t.forEach(function(e){var t=n[e],a=e;t.forEach(function(t){if(t.node!==e){var o=n[t.node],c=o&&o.findIndex(function(e){return e.node===a});c>=0&&(o.splice(c,1),r||(r=!0))}}),n.length<=0&&delete t[e]}),{edges:n,didFix:r}},r=function(){var t=Object(f.a)(l.a.mark(function t(r){var a,o,c,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.node,o=r.x,c=r.y,t.next=3,e("_nodes",{});case 3:return(i=t.sent)[a]&&(i[a].position={x:o,y:c}),t.abrupt("return",n("_nodes",i));case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),a=function(){var t=Object(f.a)(l.a.mark(function t(r){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e("_nodes",{});case 2:return a=t.sent,Object.entries(r).forEach(function(e){var n=Object(p.a)(e,2),t=n[0],r=n[1],o=r.x,c=r.y;a[t]&&(a[t].position={x:o,y:c})}),t.abrupt("return",n("_nodes",a));case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),o=function(){var r=Object(f.a)(l.a.mark(function r(){var a,o,c,i;return l.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=3,e("_edges",{});case 3:if(a=r.sent,o=t(a),c=o.didFix,i=o.edges,!c){r.next=8;break}return r.next=8,n("_edges",i);case 8:return r.abrupt("return",e("_edges",{}));case 9:case"end":return r.stop()}},r)}));return function(){return r.apply(this,arguments)}}(),c=function(){var n=Object(f.a)(l.a.mark(function n(){var t;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e("_nodes",{});case 2:return t=n.sent,n.abrupt("return",Object.values(t));case 4:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}(),i=function(){var n=Object(f.a)(l.a.mark(function n(){return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e("_nodes",{}));case 1:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}(),u=function(){var e=Object(f.a)(l.a.mark(function e(t){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n("_edges",t));case 1:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=Object(f.a)(l.a.mark(function e(t){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n("_nodes",t));case 1:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),d=function(){var e=Object(f.a)(l.a.mark(function e(n){var t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.id){e.next=2;break}throw new Error("Nodes must have IDs to be added");case 2:return e.next=4,i();case 4:return(t=e.sent)[n.id]=n,e.next=8,g(n);case 8:return e.next=10,s(t);case 10:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),b=function(){var e=Object(f.a)(l.a.mark(function e(n,t,r){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.id&&t.id){e.next=2;break}throw new Error("Nodes must have IDs to add edges");case 2:return e.next=4,o();case 4:return a=e.sent,Array.isArray(a[n.id])||(a[n.id]=[]),e.next=8,h(n,t,r);case 8:case"end":return e.stop()}},e)}));return function(n,t,r){return e.apply(this,arguments)}}(),h=function(){var e=Object(f.a)(l.a.mark(function e(n,t,r){var a,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.id&&t.id){e.next=2;break}throw new Error("Nodes must have IDs to add directed edges");case 2:return e.next=4,o();case 4:return a=e.sent,Array.isArray(a[n.id])||(a[n.id]=[]),(c=a[n.id].findIndex(function(e){return e.node===t.id}))>=0?a[n.id][c]={node:t.id,data:r}:a[n.id].push({node:t.id,data:r}),e.next=10,u(Object(m.a)({},a));case 10:case"end":return e.stop()}},e)}));return function(n,t,r){return e.apply(this,arguments)}}(),v=function(){var e=Object(f.a)(l.a.mark(function e(n,t){var r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.id&&t.id){e.next=2;break}throw new Error("Nodes must have IDs to remove directed eges");case 2:return e.next=4,o();case 4:return(r=e.sent)[n.id]=r[n.id]&&r[n.id].filter(function(e){return e.node!==t.id}),e.next=8,u(r);case 8:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),x=function(){var e=Object(f.a)(l.a.mark(function e(n,t){var r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.id&&t.id){e.next=2;break}throw new Error("Nodes must have IDs to remove edges");case 2:return e.next=4,o();case 4:return(r=e.sent)[n.id]=r[n.id]&&r[n.id].filter(function(e){return e.node!==t.id}),e.next=8,u(r);case 8:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),y=function(){var e=Object(f.a)(l.a.mark(function e(n){var t,r,a,c,s,d,f,p,b,h;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.id,r=n.data,a=n.connections,c=null,!t){e.next=10;break}return e.next=5,i();case 5:s=e.sent,d=B()(s,"[".concat(t,"].position"),{x:void 0,y:void 0}),c={id:t,edges:[],previousEdges:s[t].edges.map(function(e){return Object(m.a)({},e)}),position:d,data:Object(m.a)({},s[t].data,r)},e.next=11;break;case 10:c={id:X()(),edges:[],data:Object(m.a)({},r||{})};case 11:if(f=Object.keys(a||{}),p=B()(c,"previousEdges",[]),!(f.length<=0&&p.length>0)){e.next=24;break}return e.next=16,o();case 16:return delete(b=e.sent)[c.id],h=[],Object.keys(b).forEach(function(e){b[e].forEach(function(n,t){n.node===c.id&&h.push({key:e,index:t})})}),h.forEach(function(e){b[e.key].splice(e.index,1)}),e.next=23,u(Object(m.a)({},b));case 23:return e.abrupt("return",c);case 24:return f.forEach(function(e){var n=B()(a,"".concat([e],".connectedTo"),null);if(!n)throw new Error("You cannot make a connection without a target");var t=B()(a,"".concat([e],".connectionType"),null);if(!t)throw new Error("You cannot make a connection without a type");var r=B()(a,"".concat([e],".read"),null),o=B()(a,"".concat([e],".write"),null);if(!r&&!o)throw new Error("You must specify a read or a write option");var i=B()(a,"[".concat(e,"].data"),{}),u=c.edges.findIndex(function(n){return n.id===e});u>=0?c.edges[u]={id:n.key,data:Object(m.a)({},i,{read:r,write:o,type:{id:t.key,label:t.text}})}:c.edges.push({id:n.key,data:Object(m.a)({},i,{read:r,write:o,type:{id:t.key,label:t.text}})})}),e.abrupt("return",c);case 26:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),g=function(){var e=Object(f.a)(l.a.mark(function e(n){var t,r,a,o,c,i,u,s,d,f;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=B()(n,"edges",[]),r=B()(n,"previousEdges",[]),!(t.length<=0)){e.next=4;break}return e.abrupt("return");case 4:a=l.a.mark(function e(a){var o,c,i,u,s,d,f;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=t[a],c=B()(o,"data.read"),i=B()(o,"data.write"),u={id:B()(n,"id")},s={id:B()(o,"id")},d=r.find(function(e){return e.id===o.id}),!(f={read:B()(d,"data.read",c),write:B()(d,"data.write",i)}).read||c){e.next=10;break}return e.next=10,v(s,u);case 10:if(!f.write||i){e.next=13;break}return e.next=13,v(u,s);case 13:if(!c||!i){e.next=18;break}return e.next=16,b(u,s,B()(o,"data"));case 16:e.next=26;break;case 18:if(!c){e.next=23;break}return e.next=21,h(s,u,B()(o,"data"));case 21:e.next=26;break;case 23:if(!i){e.next=26;break}return e.next=26,h(u,s,B()(o,"data"));case 26:case"end":return e.stop()}},e)}),o=0;case 6:if(!(o<t.length)){e.next=11;break}return e.delegateYield(a(o),"t0",8);case 8:o++,e.next=6;break;case 11:if(!((c=U()(r,n.edges,"id")).length>=0)){e.next=36;break}o=0;case 14:if(!(o<c.length)){e.next=36;break}if(i=c[o],u=B()(i,"data.read"),s=B()(i,"data.write"),d={id:B()(n,"id")},f={id:B()(i,"id")},!u||!s){e.next=25;break}return e.next=23,x(d,f);case 23:e.next=33;break;case 25:if(!u){e.next=30;break}return e.next=28,v(f,d);case 28:e.next=33;break;case 30:if(!s){e.next=33;break}return e.next=33,v(d,f);case 33:o++,e.next=14;break;case 36:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}();return{getNodes:i,getEdges:o,addNode:d,removeEdge:x,removeDirectedEdge:v,updateNodePosition:r,updateBatchNodePositions:a,saveUploadedData:function(){var e=Object(f.a)(l.a.mark(function e(t){var r,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=t.edges,a=t.nodes,n("_edges",r),n("_nodes",a);case 3:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),getNodesArray:c,makeNode:y}}(),J=t(50),W=function(){var e=[],n=[],t={},r=null,a=null,o=function(){return{nodes:new J.a(e),edges:new J.a(n)}},c={withEdges:function(e){return n=e,c},withNodes:function(n){return e=n,c},withOptions:function(e){return t=e,c},inContainer:function(e){return r=e,c},build:function(){return a||(a=new J.b(r,o(),t)).once("afterDrawing",function(){a.fit({animation:{duration:600,easingFunction:"easeInOutQuad"}})}),{network:a,setData:function(t){var r=t.nodes,c=t.edges;e=r,n=c,a.setData(o())},updateNodePosition:q.updateNodePosition,getNodes:function(){return e},getEdges:function(){return n}}}};return c}(),H=function(e,n){return Object(r.useEffect)(function(){if("function"===typeof n)return Y.subscribe(e,n),function(){return Y.unsubscribe(e,n)}},[e,n]),function(n){return Y.next(e,n)}},Q=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,a=Object(r.useRef)();Object(r.useEffect)(function(){a.current=n},[n]),Object(r.useEffect)(function(){if(t&&t.addEventListener){var n=function(e){return a.current(e)};return t.addEventListener(e,n),function(){t.removeEventListener(e,n)}}},[e,t])},V=function(e,n){switch(n.type){case"update":var t=n.nodes,r=n.edges;return ee(t,r);default:return e}},Z=function(e){switch(e){case"custom":return"#005481";case"builtin":return"#9e6614";default:return"#A0A0A0"}},$=function(e){var n=B()(e,"data.read"),t=B()(e,"data.write");return n&&t?"from, to":"to"},ee=function(e,n){var t={nodes:[],edges:[]};return Object.keys(e||{}).forEach(function(n){var r=e[n];t.nodes.push(Object(m.a)({id:r.id,type:r.data.type},function(e){switch(e){case"cloud":return{shape:"icon",shapeProperties:{size:25},icon:{face:"Ionicons",code:"\uf2c9",color:"#FFF"}};case"external":return{shape:"icon",shapeProperties:{size:25},icon:{face:"Ionicons",code:"\uf381",color:"#FFF"}};case"oncampus":default:return{shape:"icon",shapeProperties:{size:25},icon:{face:"Ionicons",code:"\uf384",color:"#FFF"}}}}(r.data.type),{label:r.data.name,edges:r.edges,font:{color:"#363534",strokeWidth:2,strokeColor:"#FFFFFF"},shadow:{enabled:!0,size:4,x:1,y:1},data:Object(m.a)({},r.data),color:"#FFFFFF",x:B()(r,"position.x"),y:B()(r,"position.y")}))}),Object.keys(n||{}).forEach(function(e){n[e].forEach(function(n){t.edges.push({from:e,to:n.node,smooth:{enabled:!0,type:"cubizBezier",roundness:.15},color:{color:Z(B()(n,"data.type.id")),hover:"#501214",highlight:"#501214"},dashes:"custom"===B()(n,"data.type.id"),type:B()(n,"data.type",{}),arrows:$(n)})})}),t},ne=function(){var e=Object(r.useReducer)(V,{nodes:[],edges:[]}),n=Object(p.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)(),i=Object(p.a)(c,2),u=i[0],d=i[1],m=Object(r.useRef)(),b=Object(r.useRef)([]),h=Object(r.useRef)(!1),v=Object(r.useRef)(),x=Object(r.useRef)(),y=function(){var e=Object(f.a)(l.a.mark(function e(){var n,t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.getNodes();case 2:return n=e.sent,e.next=5,q.getEdges();case 5:t=e.sent,o({type:"update",nodes:n,edges:t});case 7:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)(function(){y()},[]);var g=H("display-node-details");H("node-search-result",function(e){if(x.current.network){if(e.length<=0){var n=x.current.network.getSelectedNodes();return x.current.network.unselectAll(),void(n.length>0&&x.current.network.fit({animation:{duration:300,easingFunction:"easeInOutQuad"}}))}x.current.network.selectNodes(e),x.current.network.fit({nodes:e,animation:{duration:300,easingFunction:"easeInOutQuad"}})}});var w=Object(r.useCallback)(function(e){var n=B()(e,"nodes[0]",null);if(!(e.nodes.length>1||h)&&n&&!x.current.network.isCluster(n)&&!h.current){var r=t.nodes.find(function(e){return e.id===n});r&&d(r)}},[t.nodes]),k=Object(r.useCallback)(function(e){var n=x.current.network.getNodeAt(e.pointer.DOM);if(n){if(!x.current.network.isCluster(n)&&!h.current){var r=t.nodes.find(function(e){return e.id===n});r&&d(r)}if(h.current&&e.nodes[0]){var a=[].concat(Object(s.a)(b.current),[e.nodes[0]]);b.current=a,x.current.network.selectNodes(a)}}else b.current=[]},[t.nodes]),O=Object(r.useCallback)(function(e){if(e.nodes.length>0){var n=x.current.network.getPositions(e.nodes);q.updateBatchNodePositions(n)}},[]),E=Object(r.useCallback)(function(e){e.ctrlKey&&70===e.keyCode&&(e.preventDefault(),Y.next("focus-search-bar")),e.shiftKey&&!h.current&&(h.current=!0)},[h]),j=Object(r.useCallback)(function(e){!e.shiftKey&&h.current&&(h.current=!1)},[h]);Q("keydown",E),Q("keyup",j),Object(r.useEffect)(function(){u&&g(u)},[u,g]);return H("save-node-entry",y),H("deselect-active-node",function(){return d(null)}),H("node-added",function(e){m.current=e}),Object(r.useEffect)(function(){if(x.current)x.current.network.off("selectNode"),x.current.network.off("dragEnd"),x.current.network.off("click"),x.current.network.on("selectNode",w),x.current.network.on("click",k),x.current.network.on("dragEnd",O),console.log("redrawing"),x.current.setData(t),m.current&&(x.current.network.focus(m.current,{scale:1,animation:{duration:300,easingFunction:"easeInOutCubic"}}),x.current.network.selectNodes([m.current]));else{var e=new Date,n=W.inContainer(v.current).withEdges(t.edges).withNodes(t.nodes).withOptions({autoResize:!1,interaction:{hover:!0,hoverConnectedEdges:!0},physics:{enabled:!1}}).build();console.log("Network Build Time: ".concat(new Date-e,"ms")),x.current=n,x.current.network.on("selectNode",w),x.current.network.on("dragEnd",O),x.current.network.on("click",k),document.addEventListener("contextmenu",function(e){return e.preventDefault()},!1)}},[t,k,O,w]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{style:{overflow:"hidden",height:"calc(100% - 44px)"},ref:v,id:"graph"}),a.a.createElement(_,null))},te=t(147),re=t(155),ae=t(75),oe=t.n(ae),ce=function(e,n){var t=document.createElement("a");t.setAttribute("href","data:text/plain;charset=utf-8,".concat(encodeURIComponent(n))),t.setAttribute("download","".concat(e," - ").concat(oe()().format("YYYY-MM-DD/THHmmss"),".json")),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)},ie=function(e){var n=new FileReader;n.readAsBinaryString(e.target.files[0]),n.onloadend=Object(f.a)(l.a.mark(function e(){var t,r,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=JSON.parse(n.result),r=B()(t,"edges",{}),a=B()(t,"nodes",{}),q.saveUploadedData({edges:r,nodes:a}),Y.next("save-node-entry");case 5:case"end":return e.stop()}},e)}))},ue=t(76),se=t.n(ue),de=function(){var e=Object(f.a)(l.a.mark(function e(n,t){var r,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.getNodesArray();case 2:r=e.sent,a=r.filter(function(e){return B()(e,"data.name","").toLowerCase().includes(t.toLowerCase())}).map(function(e){return e.id}),t||(a=[]),Y.next("node-search-result",a);case 6:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),le=function(){return a.a.createElement(re.a,{id:"search-box-nodes",placeholder:"Search",className:"searchBox",styles:{root:{width:"250px",alignSelf:"center"}},onChange:se()(de,500)})},fe=function(e){var n=H("toggle-left-panel");Object(r.useEffect)(function(){Y.subscribe("focus-search-bar",function(){document.querySelector("#search-box-nodes").focus()})},[]);var t=[{key:"search",onRender:le}],o=[{key:"addNode",name:"Add System",iconProps:{iconName:"Add"},onClick:n},{key:"upload",name:"Upload",iconProps:{iconName:"Upload"},onClick:function(){!function(){var e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept",".json"),e.style.display="none",e.addEventListener("change",ie),e.click()}()}},{key:"download",name:"Download",iconProps:{iconName:"Download"},onClick:function(){var e=Object(f.a)(l.a.mark(function e(){var n,t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.getEdges();case 2:return n=e.sent,e.next=5,q.getNodes();case 5:t=e.sent,"TR_Systems",ce("TR_Systems",JSON.stringify({edges:n,nodes:t},null,2));case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()}];return a.a.createElement("div",null,a.a.createElement(te.a,{items:o,farItems:t}))},pe=t(151),me=t(15),be=t(154),he=t(86),ve=t(145),xe=t(51),ye=t.n(xe),ge=t(84),we=t.n(ge),ke=t(150),Oe=t(157),Ee=function(e,n){return function(t,r){return"read"===e?n||r||!1:"write"===e&&(n||t)||!1}},je=function(e){var n=e.read,t=e.write,r=e.onChange;return a.a.createElement(be.a,{style:{marginRight:8,marginTop:8},verticalAlign:"space-between",tokens:{childrenGap:4}},a.a.createElement(Oe.a,{checked:n,onChange:function(e,a){Ee("read",a)(n,t)&&r("read",a)},label:"Read"}),a.a.createElement(Oe.a,{checked:t,onChange:function(e,a){Ee("write",a)(n,t)&&r("write",a)},label:"Write"}))},Ne=t(159);function Ce(){var e=Object(i.a)(["\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: 8px;\n  margin-top: 12px;\n  border: 1px solid rgb(138, 136, 134);\n  box-sizing: border-box;\n  border-radius: 1px;\n\n  & > .ms-Dropdown-container {\n    flex: 1;\n    width: 100%;\n    margin-right: 4px;\n  }\n\n  & > .ms-Button--icon {\n    align-self: flex-end;\n  }\n"]);return Ce=function(){return e},e}var Fe=u.b.div(Ce()),Se=function(e){var n=e.handleRemove,t=e.id,o=e.edit,c=e.addNodeForm,i=e.nodeFormErrors,u=e.setNodeFormErrors,s=e.existingSystems,d=e.updateNodeForm,l=B()(c,"connections[".concat(t,"].connectedTo.key"),null),f=B()(c,"connections[".concat(t,"].connectionType.key"),null),p=B()(c,"connections[".concat(t,"].read"),!0),b=B()(c,"connections[".concat(t,"].write"),!1),h=B()(i,"[".concat(t,"].target")),v=B()(i,"[".concat(t,"].type"));return Object(r.useEffect)(function(){o||d({path:"connections[".concat(t,"].read"),value:!0})},[d,t,o]),a.a.createElement(Fe,null,a.a.createElement(Ne.a,{iconProps:{iconName:"ChromeClose"},onClick:function(){B()(c,"connections[".concat(t,"]"),null)&&d({path:"connections[".concat(t,"]"),type:"remove"}),n()}}),a.a.createElement(ke.a,{label:"Connected To",placeholder:"What does this system connect to?",options:s,errorMessage:h,selectedKey:l,onChange:function(e,n){if(d({path:"connections[".concat(t,"].connectedTo"),value:{key:n.key,text:n.text}}),"".concat(t)in i){var r=Object(m.a)({},i);delete r[t],u(r)}}}),a.a.createElement(ke.a,{label:"Interface",options:[{key:"builtin",text:"Built In"},{key:"custom",text:"Custom"}],placeholder:"How does this system connect?",selectedKey:f,errorMessage:v,onChange:function(e,n){if(d({path:"connections[".concat(t,"].connectionType"),value:{key:n.key,text:n.text,color:n.color}}),"".concat(t)in i){var r=Object(m.a)({},i);delete r[t],u(r)}}}),a.a.createElement(je,{read:p,write:b,onChange:function(e,n){d({path:"connections[".concat(t,"].").concat(e),value:n})}}))},De=t(153),Ae=t(89),Re=a.a.memo(function(e){var n=e.selectedKey,t=e.onChange,r=e.required,o=e.errorMessage;return a.a.createElement(ke.a,{required:r,label:"System Type",options:[{key:"oncampus",text:"On Campus"},{key:"cloud",text:"Cloud"},{key:"external",text:"External"}],errorMessage:o,placeholder:"Where does this system live?",selectedKey:n,onChange:t})},function(e,n){var t=e.selectedKey===n.selectedKey,r=e.errorMessage===n.errorMessage;return t&&r}),Ie=function(e){var n=e.nodeFormErrors,t=e.existingSystems,r=e.setNodeFormErrors,o=e.addNodeForm,c=e.updateNodeForm,i=e.connections,u=e.addConnection,s=e.edit;return e.loading?null:a.a.createElement(a.a.Fragment,null,a.a.createElement(De.a,{label:"Name",placeholder:"Choose a name",errorMessage:n.name,required:!0,onGetErrorMessage:function(e){var a=String(e).toLowerCase();if(t.some(function(e){var n=e.text;return String(n).toLowerCase()===a})&&!s)r(Object(m.a)({},n,{name:"The ".concat(e," system already exists")}));else if(n.name){var o=Object(m.a)({},n);delete o.name,r(o)}},onChange:function(e,n){return c({path:"name",value:n})},value:o.name||""}),a.a.createElement(Re,{required:!0,errorMessage:n.type,selectedKey:o.type||null,onChange:function(e,t){if(c({path:"type",value:t.key}),"type"in n){var a=Object(m.a)({},n);delete a.type,r(a)}}}),a.a.createElement(De.a,{label:"Department",placeholder:"Was this built for another department?",onChange:function(e,n){return c({path:"department",value:n})},value:o.department||""}),a.a.createElement(De.a,{label:"URL",placeholder:"Is there a url to access this system?",errorMessage:n.url,onChange:function(e,t){if(c({path:"url",value:t}),"url"in n){var a=Object(m.a)({},n);delete a.url,r(a)}},onGetErrorMessage:function(e){if(e)return function(e){if(e)try{if(new URL(e))return""}catch(n){return n.message}}(e)},value:o.url||""}),a.a.createElement(De.a,{label:"Description",placeholder:"Enter some information others may want to know about this system",multiline:!0,rows:4,onChange:function(e,n){return c({path:"description",value:n})},value:o.description||""}),function(e){var n=e.connections,t=e.existingSystems,r=e.addNodeForm,o=e.updateNodeForm,c=e.setNodeFormErrors,i=e.nodeFormErrors;return n.map(function(e){return a.a.cloneElement(e,{existingSystems:t,addNodeForm:r,updateNodeForm:o,setNodeFormErrors:c,nodeFormErrors:i})})}({connections:i,existingSystems:t,addNodeForm:o,updateNodeForm:c,setNodeFormErrors:r,nodeFormErrors:n}),a.a.createElement(Ae.a,{onClick:u,iconProps:{iconName:"Add"}},"Add Connection"))},Te=function(e,n){var t={};return e.edges.forEach(function(e){t[e.id]={read:e.data.read,write:e.data.write,connectionType:{key:e.data.type.id,text:e.data.type.label},connectedTo:{key:e.id,text:B()(n.filter(function(n){return n.id===e.id}),"[0].data.name","")}}}),t},Pe=function(e,n){if(""===n.path)return{};var t=Object(m.a)({},e);switch(n.type){case"remove":return we()(t,n.path),t;case"edit":return Object(m.a)({},n.formState);default:return ye()(t,n.path,n.value),t}},Le=function(e,n){switch(n.type){case"add":var t=X()();return[].concat(Object(s.a)(e),[a.a.createElement(Se,{key:t,id:t,handleRemove:function(){return n.dispatch({type:"remove",id:t})}})]);case"remove":return e.filter(function(e){return e.key!==n.id});case"reset":return[];case"edit":return Object.keys(n.connections).map(function(e){var t=e,r=B()(n,"dispatch",null);return r&&t?a.a.createElement(Se,{edit:!0,key:t,id:t,handleRemove:function(){return r({type:"remove",id:t})}}):null}).filter(function(e){return e});default:return e}},_e=function(){var e=Object(f.a)(l.a.mark(function e(){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.getNodesArray();case 2:return n=e.sent,e.abrupt("return",n.map(function(e){return{key:e.id,text:e.data.name}}).sort(function(e,n){return e.text<n.text?-1:e.text>n.text?1:0}));case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),Me=function(e,n){var t={};if(n&&(t=Object(m.a)({},n)),e.type||(t.type="A system type must be selected"),e.name||(t.name="A system name is required"),e.url){var r=function(e){if(e)try{if(new URL(e))return null}catch(n){return n.message}}(e.url);r&&(t.url=r)}e.connections&&Object.keys(e.connections||{}).forEach(function(n){var r=B()(e,"connections[".concat(n,"].connectedTo.key"),null);B()(e,"connections[".concat(n,"].connectionType.key"),null)||ye()(t,"[".concat(n,"].type"),"The connection must have a type selected"),r||ye()(t,"[".concat(n,"].target"),"You must select another system to connect to")});return t},Ye=function(e){var n=Object(r.useState)(!0),t=Object(p.a)(n,2),o=t[0],c=t[1],i=Object(r.useState)(!1),u=Object(p.a)(i,2),s=u[0],d=u[1],b=Object(r.useState)(!1),h=Object(p.a)(b,2),v=h[0],x=h[1],y=Object(r.useReducer)(Pe,{}),g=Object(p.a)(y,2),w=g[0],k=g[1],O=Object(r.useState)(),E=Object(p.a)(O,2),j=E[0],N=E[1],C=Object(r.useState)({}),F=Object(p.a)(C,2),S=F[0],D=F[1],A=Object(r.useReducer)(Le,[]),R=Object(p.a)(A,2),I=R[0],T=R[1],P=function(){return k({path:"",value:{}})},L=function(){return T({type:"reset"})};H("edit-system-panel",function(e){var n=function(e){var n=W.build(),t=n.network,r=n.getNodes,a=t.getConnectedNodes(e.id),o=r().filter(function(e){var n=e.id;return a.includes(n)});return{name:B()(e,"data.name"),id:B()(e,"id"),type:B()(e,"data.type"),department:B()(e,"data.department"),url:B()(e,"data.url"),description:B()(e,"data.description"),connections:Te(e,o)}}(e);T({type:"edit",connections:n.connections||{},dispatch:T}),k({type:"edit",formState:n}),d(!0),x(!0)});var _=function(){var e=Object(f.a)(l.a.mark(function e(){var n,t,r,a,o,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Me(w,S),!(Object.keys(n).length>0)){e.next=4;break}return D(Object(m.a)({},S,n)),e.abrupt("return");case 4:if(t=B()(w,"connections",{}),r={description:B()(w,"description",""),name:B()(w,"name",""),type:B()(w,"type",""),url:B()(w,"url",""),department:B()(w,"department","")},a=null,!s){e.next=16;break}return e.next=10,q.makeNode({id:w.id,connections:t,data:r});case 10:return o=e.sent,a=w.id,e.next=14,q.addNode(o);case 14:e.next=22;break;case 16:return e.next=18,q.makeNode({connections:t,data:r});case 18:return c=e.sent,a=c.id,e.next=22,q.addNode(c);case 22:z(),K(a),L(),P(),s&&M();case 27:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();H("toggle-left-panel",function(){return x(!v)});var M=function(){P(),L(),x(!1),d(!1)},Y=function(){var e=Object(f.a)(l.a.mark(function e(){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_e();case 2:n=e.sent,c(!1),N(n);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)(function(){Y()},[]);var z=H("save-node-entry",Y),K=H("node-added");return a.a.createElement(pe.a,{headerText:"".concat(s?"Edit":"Add"," System"),isOpen:v,onDismiss:M,isFooterAtBottom:!0,onRenderFooterContent:function(){return a.a.createElement(be.a,{horizontal:!0,horizontalAlign:"space-between",tokens:{childrenGap:12}},a.a.createElement(he.a,{text:"Cancel",onClick:M}),a.a.createElement(ve.a,{text:"Save System",onClick:_}))},type:me.a.medium},a.a.createElement(Ie,{loading:o,edit:s,existingSystems:j,nodeFormErrors:S,setNodeFormErrors:D,addNodeForm:w,updateNodeForm:k,connections:I,addConnection:function(){T({type:"add",dispatch:T,existingSystems:j,addNodeForm:w,updateNodeForm:k})}}))},ze=t(156),Be=function(e){var n=e.description,t=e.department,r=e.url;return a.a.createElement(be.a,{tokens:{childrenGap:8}},a.a.createElement(be.a,{tokens:{childrenGap:4}},a.a.createElement(ze.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"URL"),a.a.createElement("a",{href:r,target:"_blank",rel:"noopener noreferrer"},r)),a.a.createElement(be.a,{tokens:{childrenGap:4}},a.a.createElement(ze.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Department"),a.a.createElement(ze.a,null,t)),a.a.createElement(be.a,{tokens:{childrenGap:4}},a.a.createElement(ze.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Description"),a.a.createElement(ze.a,null,n)))};function Ke(){var e=Object(i.a)(["\n  & > .ms-Panel-main {\n    transition: width 300ms ease-in-out;\n  }\n"]);return Ke=function(){return e},e}var Ue=Object(u.b)(pe.a)(Ke()),Ge=function(e){var n=Object(r.useState)(!1),t=Object(p.a)(n,2),o=t[0],c=t[1],i=Object(r.useState)(null),u=Object(p.a)(i,2),s=u[0],d=u[1];H("display-node-details",function(e){d(e),c(!0)});var l=H("edit-system-panel"),f=H("deselect-active-node"),m=B()(s,"data.name","Very Unnamed System"),b=B()(s,"data.description","No description has been entered."),h=B()(s,"data.department","No department has been entered."),v=B()(s,"data.url","".concat(m," has no url")),x=function(){l(s),c(!1),f()};return a.a.createElement(Ue,{isOpen:o,onDismiss:function(){f(),c(!1)},onRenderHeader:function(e){return a.a.createElement(be.a,{horizontal:!0,tokens:{childrenGap:12}},a.a.createElement(ze.a,{variant:"xLarge",style:{marginLeft:16,marginBottom:12}},e.headerText),a.a.createElement(Ne.a,{iconProps:{iconName:"Edit"},onClick:x}))},isLightDismiss:!0,type:me.a.customNear,customWidth:400,headerText:m},a.a.createElement(Be,{department:h,description:b,url:v}))};function Xe(){var e=Object(i.a)(["\n  ","\n  animation-delay: -0.9s;\n"]);return Xe=function(){return e},e}function qe(){var e=Object(i.a)(["\n  ","\n"]);return qe=function(){return e},e}function Je(){var e=Object(i.a)(["\n  background-color: #501214;\n  width: 15px;\n  height: 15px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  \n  -webkit-animation: "," 1.8s infinite ease-in-out;\n  animation: "," 1.8s infinite ease-in-out;\n"]);return Je=function(){return e},e}function We(){var e=Object(i.a)(["\n  margin: 100px auto;\n  width: 40px;\n  height: 40px;\n  align-self: center;\n  justify-self: center;\n  position: relative;\n"]);return We=function(){return e},e}function He(){var e=Object(i.a)(["\n    25% { \n      transform: translateX(42px) rotate(-90deg) scale(0.5);\n      -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n    } 50% { \n      transform: translateX(42px) translateY(42px) rotate(-179deg);\n      -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n    } 50.1% { \n      transform: translateX(42px) translateY(42px) rotate(-180deg);\n      -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n    } 75% { \n      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n      -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n    } 100% { \n      transform: rotate(-360deg);\n      -webkit-transform: rotate(-360deg);\n    }\n"]);return He=function(){return e},e}var Qe=Object(u.c)(He()),Ve=(u.b.div(We()),Object(u.a)(Je(),Qe,Qe));u.b.div(qe(),Ve),u.b.div(Xe(),Ve);function Ze(){var e=Object(i.a)(["\n  background-color: #e8e3db;\n  flex: 1;\n  flex-direction: column;\n  display: flex;\n"]);return Ze=function(){return e},e}var $e=u.b.div(Ze());var en=function(){return a.a.createElement($e,null,a.a.createElement(fe,null),a.a.createElement(ne,null),a.a.createElement(Ye,null),a.a.createElement(Ge,null))};t(115);Object(c.a)(),document.addEventListener("DOMContentLoaded",function(){Object(o.render)(a.a.createElement(en,null),document.getElementById("root"))})}},[[101,1,2]]]);
//# sourceMappingURL=main.dfebd93e.chunk.js.map