(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){e.exports=n(114)},114:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(42),c=n(143),i=n(20),s=n(22),u=n(6),d=n.n(u),l=n(12),f=n(19),p=n(9),m={},h={subscribe:function(e,t){m[e]||(m[e]=[]),m[e].push(t)},unsubscribe:function(e,t){m[e]&&(m[e]=m[e].filter(function(e){return e!==t}))},next:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];m[e]&&m[e].forEach(function(e){"function"===typeof e&&e.apply(void 0,n)})}};Object.freeze(h);var b=function(){var e=function(e,t){return JSON.parse(localStorage.getItem(e))||t},t=function(e,t){return localStorage.setItem(e,JSON.stringify(t))};return{getEdges:function(){return e("_edges",{})},getNodesObject:function(){return e("_nodes",{})},saveUploadedData:function(e){var n=e.edges,r=e.nodes;t("_edges",n),t("_nodes",r)},getNodes:function(){var t=e("_nodes",{});return Object.keys(t).reduce(function(e,n){return e.push(t[n]),e},[])}}}(),v=n(3),y=n.n(v),x=n(71),g=n.n(x),k=n(43),w=n.n(k),E=function(){var e=function(e,t){return JSON.parse(localStorage.getItem(e))||t},t=function(e,t){return localStorage.setItem(e,JSON.stringify(t))},n=function(e){var t=Object(p.a)({},e),n=Object.keys(t),r=!1;return n.forEach(function(e){var n=t[e],a=e;n.forEach(function(n){if(n.node!==e){var o=t[n.node],c=o&&o.findIndex(function(e){return e.node===a});c>=0&&(o.splice(c,1),r||(r=!0))}}),t.length<=0&&delete n[e]}),{edges:t,didFix:r}},r=function(){var n=Object(l.a)(d.a.mark(function n(r){var a,o,c,i;return d.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=r.node,o=r.x,c=r.y,n.next=3,e("_nodes",{});case 3:return(i=n.sent)[a]&&(i[a].position={x:o,y:c}),n.abrupt("return",t("_nodes",i));case 6:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}(),a=function(){var r=Object(l.a)(d.a.mark(function r(){var a,o,c,i;return d.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=3,e("_edges",{});case 3:if(a=r.sent,o=n(a),c=o.didFix,i=o.edges,!c){r.next=8;break}return r.next=8,t("_edges",i);case 8:return r.abrupt("return",e("_edges",{}));case 9:case"end":return r.stop()}},r)}));return function(){return r.apply(this,arguments)}}(),o=function(){var t=Object(l.a)(d.a.mark(function t(){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e("_nodes",{}));case 1:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),c=function(){var e=Object(l.a)(d.a.mark(function e(n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t("_edges",n));case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),i=function(){var e=Object(l.a)(d.a.mark(function e(n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",t("_nodes",n));case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(l.a)(d.a.mark(function e(t){var n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id){e.next=2;break}throw new Error("Nodes must have IDs to be added");case 2:return e.next=4,o();case 4:return(n=e.sent)[t.id]=t,e.next=8,v(t);case 8:return e.next=10,i(n);case 10:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(l.a)(d.a.mark(function e(t,n,r){var o;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id&&n.id){e.next=2;break}throw new Error("Nodes must have IDs to add edges");case 2:return e.next=4,a();case 4:return o=e.sent,Array.isArray(o[t.id])||(o[t.id]=[]),e.next=8,f(t,n,r);case 8:case"end":return e.stop()}},e)}));return function(t,n,r){return e.apply(this,arguments)}}(),f=function(){var e=Object(l.a)(d.a.mark(function e(t,n,r){var o,i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id&&n.id){e.next=2;break}throw new Error("Nodes must have IDs to add directed edges");case 2:return e.next=4,a();case 4:return o=e.sent,Array.isArray(o[t.id])||(o[t.id]=[]),(i=o[t.id].findIndex(function(e){return e.node===n.id}))>=0?o[t.id][i]={node:n.id,data:r}:o[t.id].push({node:n.id,data:r}),e.next=10,c(Object(p.a)({},o));case 10:case"end":return e.stop()}},e)}));return function(t,n,r){return e.apply(this,arguments)}}(),m=function(){var e=Object(l.a)(d.a.mark(function e(t,n){var r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id&&n.id){e.next=2;break}throw new Error("Nodes must have IDs to remove directed eges");case 2:return e.next=4,a();case 4:return(r=e.sent)[t.id]=r[t.id]&&r[t.id].filter(function(e){return e.node!==n.id}),e.next=8,c(r);case 8:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),h=function(){var e=Object(l.a)(d.a.mark(function e(t,n){var r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id&&n.id){e.next=2;break}throw new Error("Nodes must have IDs to remove edges");case 2:return e.next=4,a();case 4:return(r=e.sent)[t.id]=r[t.id]&&r[t.id].filter(function(e){return e.node!==n.id}),e.next=8,c(r);case 8:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(d.a.mark(function e(t){var n,r,i,s,u,l,f,m,h;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.id,r=t.data,i=t.connections,s=null,!n){e.next=9;break}return e.next=5,o();case 5:u=e.sent,s={id:n,edges:[],previousEdges:u[n].edges.map(function(e){return Object(p.a)({},e)}),data:Object(p.a)({},u[n].data,r)},e.next=10;break;case 9:s={id:w()(),edges:[],data:Object(p.a)({},r||{})};case 10:if(l=Object.keys(i||{}),f=y()(s,"previousEdges",[]),!(l.length<=0&&f.length>0)){e.next=23;break}return e.next=15,a();case 15:return delete(m=e.sent)[s.id],h=[],Object.keys(m).forEach(function(e){m[e].forEach(function(t,n){t.node===s.id&&h.push({key:e,index:n})})}),h.forEach(function(e){m[e.key].splice(e.index,1)}),e.next=22,c(Object(p.a)({},m));case 22:return e.abrupt("return",s);case 23:return l.forEach(function(e){var t=y()(i,"".concat([e],".connectedTo"),null);if(!t)throw new Error("You cannot make a connection without a target");var n=y()(i,"".concat([e],".connectionType"),null);if(!n)throw new Error("You cannot make a connection without a type");var r=y()(i,"".concat([e],".read"),null),a=y()(i,"".concat([e],".write"),null);if(!r&&!a)throw new Error("You must specify a read or a write option");var o=y()(i,"[".concat(e,"].data"),{}),c=s.edges.findIndex(function(t){return t.id===e});c>=0?s.edges[c]={id:t.key,data:Object(p.a)({},o,{read:r,write:a,type:{id:n.key,label:n.text}})}:s.edges.push({id:t.key,data:Object(p.a)({},o,{read:r,write:a,type:{id:n.key,label:n.text}})})}),e.abrupt("return",s);case 25:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(l.a)(d.a.mark(function e(t){var n,r,a,o,c,i,s,l,p,b;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=y()(t,"edges",[]),r=y()(t,"previousEdges",[]),!(n.length<=0)){e.next=4;break}return e.abrupt("return");case 4:a=d.a.mark(function e(a){var o,c,i,s,l,p,h;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=n[a],c=y()(o,"data.read"),i=y()(o,"data.write"),s={id:y()(t,"id")},l={id:y()(o,"id")},p=r.find(function(e){return e.id===o.id}),!(h={read:y()(p,"data.read",c),write:y()(p,"data.write",i)}).read||c){e.next=10;break}return e.next=10,m(l,s);case 10:if(!h.write||i){e.next=13;break}return e.next=13,m(s,l);case 13:if(!c||!i){e.next=18;break}return e.next=16,u(s,l,y()(o,"data"));case 16:e.next=26;break;case 18:if(!c){e.next=23;break}return e.next=21,f(l,s,y()(o,"data"));case 21:e.next=26;break;case 23:if(!i){e.next=26;break}return e.next=26,f(s,l,y()(o,"data"));case 26:case"end":return e.stop()}},e)}),o=0;case 6:if(!(o<n.length)){e.next=11;break}return e.delegateYield(a(o),"t0",8);case 8:o++,e.next=6;break;case 11:if(!((c=g()(r,t.edges,"id")).length>=0)){e.next=36;break}o=0;case 14:if(!(o<c.length)){e.next=36;break}if(i=c[o],s=y()(i,"data.read"),l=y()(i,"data.write"),p={id:y()(t,"id")},b={id:y()(i,"id")},!s||!l){e.next=25;break}return e.next=23,h(p,b);case 23:e.next=33;break;case 25:if(!s){e.next=30;break}return e.next=28,m(b,p);case 28:e.next=33;break;case 30:if(!l){e.next=33;break}return e.next=33,m(p,b);case 33:o++,e.next=14;break;case 36:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return{getNodes:o,getEdges:a,addNode:s,removeEdge:h,removeDirectedEdge:m,updateNodePosition:r,makeNode:b}}(),O=n(49),j=function(){var e=[],t=[],n={},r=null,a=null,o=function(){return{nodes:new O.a(e),edges:new O.a(t)}},c={withEdges:function(e){return t=e,c},withNodes:function(t){return e=t,c},withOptions:function(e){return n=e,c},inContainer:function(e){return r=e,c},build:function(){return a||(a=new O.b(r,o(),n)).once("afterDrawing",function(){a.fit({animation:{duration:600,easingFunction:"easeInOutQuad"}})}),{network:a,setData:function(n){var r=n.nodes,c=n.edges;e=r,t=c,a.setData(o())},updateNodePosition:E.updateNodePosition,getNodes:function(){return e},getEdges:function(){return t}}}};return c}(),N=function(e,t){return Object(r.useEffect)(function(){if("function"===typeof t)return h.subscribe(e,t),function(){return h.unsubscribe(e,t)}},[e,t]),function(t){return h.next(e,t)}},F=function(e,t){switch(t.type){case"update":var n=t.nodes,r=t.edges;return D(n,r);default:return e}},C=function(e){switch(e){case"custom":return"#005481";case"builtin":return"#9e6614";default:return"#A0A0A0"}},S=function(e){var t=y()(e,"data.read"),n=y()(e,"data.write");return t&&n?"from, to":"to"},D=function(e,t){var n={nodes:[],edges:[]};return Object.keys(e||{}).forEach(function(t){var r=e[t];n.nodes.push(Object(p.a)({id:r.id,type:r.data.type},function(e){switch(e){case"cloud":return{shape:"icon",shapeProperties:{size:25},icon:{face:"Ionicons",code:"\uf2c9",color:"#FFF"}};case"external":return{shape:"icon",shapeProperties:{size:25},icon:{face:"Ionicons",code:"\uf381",color:"#FFF"}};case"oncampus":default:return{shape:"icon",shapeProperties:{size:25},icon:{face:"Ionicons",code:"\uf384",color:"#FFF"}}}}(r.data.type),{label:r.data.name,edges:r.edges,font:{color:"#363534",strokeWidth:2,strokeColor:"#FFFFFF"},shadow:{enabled:!0,size:4,x:1,y:1},data:Object(p.a)({},r.data),color:"#FFFFFF",x:y()(r,"position.x"),y:y()(r,"position.y")}))}),Object.keys(t||{}).forEach(function(e){t[e].forEach(function(t){n.edges.push({from:e,to:t.node,smooth:{enabled:!0,type:"cubizBezier",roundness:.15},color:{color:C(y()(t,"data.type.id")),hover:"#501214",highlight:"#501214"},dashes:"custom"===y()(t,"data.type.id"),type:y()(t,"data.type",{}),arrows:S(t)})})}),n},A=function(){var e=Object(r.useReducer)(F,{nodes:[],edges:[]}),t=Object(f.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(),i=Object(f.a)(c,2),s=i[0],u=i[1],p=Object(r.useRef)(),m=Object(r.useRef)(),h=function(){var e=Object(l.a)(d.a.mark(function e(){var t,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.getNodes();case 2:return t=e.sent,e.next=5,E.getEdges();case 5:n=e.sent,o({type:"update",nodes:t,edges:n});case 7:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();Object(r.useEffect)(function(){h()},[]);var b=N("display-node-details"),v=Object(r.useCallback)(function(e){var t=y()(e,"nodes[0]",null);if(t&&!m.current.network.isCluster(t)){var r=n.nodes.find(function(e){return e.id===t});r&&u(r)}},[n.nodes]);return Object(r.useEffect)(function(){s&&b(s)},[s,b]),N("save-node-entry",h),N("deselect-active-node",function(){return u(null)}),Object(r.useEffect)(function(){console.log(n);if(m.current)m.current.network.off("selectNode",v),m.current.network.on("selectNode",v),m.current.setData(n);else{var e=new Date,t=j.inContainer(p.current).withEdges(n.edges).withNodes(n.nodes).withOptions({autoResize:!1,interaction:{hover:!0,hoverConnectedEdges:!0},physics:{enabled:!1}}).build();console.log("Network Build Time: ".concat(new Date-e,"ms")),m.current=t,m.current.network.on("selectNode",v),m.current.network.on("dragEnd",function(e){if(e.nodes.length>0){var t=y()(e,"nodes[0]"),n=y()(e,"pointer.canvas",{}),r=n.x,a=n.y;m.current.updateNodePosition({node:t,x:r,y:a})}}),document.addEventListener("contextmenu",function(e){return e.preventDefault()},!1)}},[n,v]),a.a.createElement("div",{style:{overflow:"hidden",flex:1},ref:p,id:"graph"})},I=n(144),R=n(72),T=n.n(R),P=function(e){var t=new FileReader;t.readAsBinaryString(e.target.files[0]),t.onloadend=Object(l.a)(d.a.mark(function e(){var n,r,a;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=JSON.parse(t.result),r=y()(n,"edges",{}),a=y()(n,"nodes",{}),b.saveUploadedData({edges:r,nodes:a}),h.next("save-node-entry");case 5:case"end":return e.stop()}},e)}))},Y=function(e){var t=[{key:"addNode",name:"Add System",iconProps:{iconName:"Add"},onClick:N("toggle-left-panel")},{key:"upload",name:"Upload",iconProps:{iconName:"Upload"},onClick:function(){!function(){var e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept",".json"),e.style.display="none",e.addEventListener("change",P),e.click()}()}},{key:"download",name:"Download",iconProps:{iconName:"Download"},onClick:function(){var e=b.getEdges(),t=b.getNodesObject();!function(e,t){var n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,".concat(encodeURIComponent(t))),n.setAttribute("download","".concat(e," - ").concat(T()().format("YYYY-MM-DD/THHmmss"),".json")),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}("TR_Systems",JSON.stringify({edges:e,nodes:t},null,2))}}];return a.a.createElement("div",{style:{position:"fixed",top:0,left:0,right:0}},a.a.createElement(I.a,{items:t}))},_=n(84),z=n(148),M=n(13),L=n(151),G=n(85),U=n(142),B=n(50),J=n.n(B),W=n(80),X=n.n(W),K=n(147),q=n(153),H=function(e,t){return function(n,r){return"read"===e?t||r||!1:"write"===e&&(t||n)||!1}},Q=function(e){var t=e.read,n=e.write,r=e.onChange;return a.a.createElement(L.a,{style:{marginRight:8,marginTop:8},verticalAlign:"space-between",tokens:{childrenGap:4}},a.a.createElement(q.a,{checked:t,onChange:function(e,a){H("read",a)(t,n)&&r("read",a)},label:"Read"}),a.a.createElement(q.a,{checked:n,onChange:function(e,a){H("write",a)(t,n)&&r("write",a)},label:"Write"}))},V=n(158);function Z(){var e=Object(i.a)(["\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  justify-content: flex-start;\n  padding: 8px;\n  margin-top: 12px;\n  border: 1px solid rgb(138, 136, 134);\n  box-sizing: border-box;\n  border-radius: 1px;\n\n  & > .ms-Dropdown-container {\n    flex: 1;\n    width: 100%;\n    margin-right: 4px;\n  }\n\n  & > .ms-Button--icon {\n    align-self: flex-end;\n  }\n"]);return Z=function(){return e},e}var $=s.b.div(Z()),ee=function(e){var t=e.handleRemove,n=e.id,o=e.edit,c=e.addNodeForm,i=e.nodeFormErrors,s=e.setNodeFormErrors,u=e.existingSystems,d=e.updateNodeForm,l=y()(c,"connections[".concat(n,"].connectedTo.key"),null),f=y()(c,"connections[".concat(n,"].connectionType.key"),null),m=y()(c,"connections[".concat(n,"].read"),!0),h=y()(c,"connections[".concat(n,"].write"),!1),b=y()(i,"[".concat(n,"].target")),v=y()(i,"[".concat(n,"].type"));return Object(r.useEffect)(function(){o||d({path:"connections[".concat(n,"].read"),value:!0})},[d,n,o]),a.a.createElement($,null,a.a.createElement(V.a,{iconProps:{iconName:"ChromeClose"},onClick:function(){y()(c,"connections[".concat(n,"]"),null)&&d({path:"connections[".concat(n,"]"),type:"remove"}),t()}}),a.a.createElement(K.a,{label:"Connected To",placeholder:"What does this system connect to?",options:u,errorMessage:b,selectedKey:l,onChange:function(e,t){if(d({path:"connections[".concat(n,"].connectedTo"),value:{key:t.key,text:t.text}}),"".concat(n)in i){var r=Object(p.a)({},i);delete r[n],s(r)}}}),a.a.createElement(K.a,{label:"Interface",options:[{key:"builtin",text:"Built In"},{key:"custom",text:"Custom"}],placeholder:"How does this system connect?",selectedKey:f,errorMessage:v,onChange:function(e,t){if(d({path:"connections[".concat(n,"].connectionType"),value:{key:t.key,text:t.text,color:t.color}}),"".concat(n)in i){var r=Object(p.a)({},i);delete r[n],s(r)}}}),a.a.createElement(Q,{read:m,write:h,onChange:function(e,t){d({path:"connections[".concat(n,"].").concat(e),value:t})}}))},te=n(150),ne=n(88),re=a.a.memo(function(e){var t=e.selectedKey,n=e.onChange,r=e.required,o=e.errorMessage;return a.a.createElement(K.a,{required:r,label:"System Type",options:[{key:"oncampus",text:"On Campus"},{key:"cloud",text:"Cloud"},{key:"external",text:"External"}],errorMessage:o,placeholder:"Where does this system live?",selectedKey:t,onChange:n})},function(e,t){var n=e.selectedKey===t.selectedKey,r=e.errorMessage===t.errorMessage;return n&&r}),ae=function(e){var t=e.nodeFormErrors,n=e.existingSystems,r=e.setNodeFormErrors,o=e.addNodeForm,c=e.updateNodeForm,i=e.connections,s=e.addConnection,u=e.edit;return a.a.createElement(a.a.Fragment,null,a.a.createElement(te.a,{label:"Name",placeholder:"Choose a name",errorMessage:t.name,required:!0,onGetErrorMessage:function(e){var a=String(e).toLowerCase();if(n.some(function(e){var t=e.text;return String(t).toLowerCase()===a})&&!u)r(Object(p.a)({},t,{name:"The ".concat(e," system already exists")}));else if(t.name){var o=Object(p.a)({},t);delete o.name,r(o)}},onChange:function(e,t){return c({path:"name",value:t})},value:o.name||""}),a.a.createElement(re,{required:!0,errorMessage:t.type,selectedKey:o.type||null,onChange:function(e,n){if(c({path:"type",value:n.key}),"type"in t){var a=Object(p.a)({},t);delete a.type,r(a)}}}),a.a.createElement(te.a,{label:"Department",placeholder:"Was this built for another department?",onChange:function(e,t){return c({path:"department",value:t})},value:o.department||""}),a.a.createElement(te.a,{label:"URL",placeholder:"Is there a url to access this system?",onChange:function(e,t){return c({path:"url",value:t})},onGetErrorMessage:function(e){return function(e){if(e)try{if(new URL(e))return null}catch(t){return t.message}}(e)},value:o.url||""}),a.a.createElement(te.a,{label:"Description",placeholder:"Enter some information others may want to know about this system",multiline:!0,rows:4,onChange:function(e,t){return c({path:"description",value:t})},value:o.description||""}),function(e){var t=e.connections,n=e.existingSystems,r=e.addNodeForm,o=e.updateNodeForm,c=e.setNodeFormErrors,i=e.nodeFormErrors;return t.map(function(e){return a.a.cloneElement(e,{existingSystems:n,addNodeForm:r,updateNodeForm:o,setNodeFormErrors:c,nodeFormErrors:i})})}({connections:i,existingSystems:n,addNodeForm:o,updateNodeForm:c,setNodeFormErrors:r,nodeFormErrors:t}),a.a.createElement(ne.a,{onClick:s,iconProps:{iconName:"Add"}},"Add Connection"))},oe=function(e,t){var n={};return e.edges.forEach(function(e){n[e.id]={read:e.data.read,write:e.data.write,connectionType:{key:e.data.type.id,text:e.data.type.label},connectedTo:{key:e.id,text:y()(t.filter(function(t){return t.id===e.id}),"[0].data.name","")}}}),n},ce=function(e,t){if(""===t.path)return{};var n=Object(p.a)({},e);switch(t.type){case"remove":return X()(n,t.path),n;case"edit":return Object(p.a)({},t.formState);default:return J()(n,t.path,t.value),n}},ie=function(e,t){switch(t.type){case"add":var n=w()();return[].concat(Object(_.a)(e),[a.a.createElement(ee,{key:n,id:n,handleRemove:function(){return t.dispatch({type:"remove",id:n})}})]);case"remove":return e.filter(function(e){return e.key!==t.id});case"reset":return[];case"edit":return Object.keys(t.connections).map(function(e){var n=e,r=y()(t,"dispatch",null);return r&&n?a.a.createElement(ee,{edit:!0,key:n,id:n,handleRemove:function(){return r({type:"remove",id:n})}}):null}).filter(function(e){return e});default:return e}},se=function(){return b.getNodes().map(function(e){return{key:e.id,text:e.data.name}}).sort(function(e,t){return e.text<t.text?-1:e.text>t.text?1:0})},ue=function(e,t){var n={};(t&&(n=Object(p.a)({},t)),e.type||(n.type="A system type must be selected"),e.name||(n.name="A system name is required"),e.connections)&&Object.keys(e.connections||{}).forEach(function(t){var r=y()(e,"connections[".concat(t,"].connectedTo.key"),null);y()(e,"connections[".concat(t,"].connectionType.key"),null)||J()(n,"[".concat(t,"].type"),"The connection must have a type selected"),r||J()(n,"[".concat(t,"].target"),"You must select another system to connect to")});return n},de=function(e){var t=Object(r.useState)(!1),n=Object(f.a)(t,2),o=n[0],c=n[1],i=Object(r.useState)(!1),s=Object(f.a)(i,2),u=s[0],m=s[1],h=Object(r.useReducer)(ce,{}),b=Object(f.a)(h,2),v=b[0],x=b[1],g=Object(r.useState)(se()),k=Object(f.a)(g,2),w=k[0],O=k[1],F=Object(r.useState)({}),C=Object(f.a)(F,2),S=C[0],D=C[1],A=Object(r.useReducer)(ie,[]),I=Object(f.a)(A,2),R=I[0],T=I[1],P=function(){return x({path:"",value:{}})},Y=function(){return T({type:"reset"})};N("edit-system-panel",function(e){var t=function(e){var t=j.build(),n=t.network,r=t.getNodes,a=n.getConnectedNodes(e.id),o=r().filter(function(e){var t=e.id;return a.includes(t)});return{name:y()(e,"data.name"),id:y()(e,"id"),type:y()(e,"data.type"),department:y()(e,"data.department"),url:y()(e,"data.url"),description:y()(e,"data.description"),connections:oe(e,o)}}(e);T({type:"edit",connections:t.connections||{},dispatch:T}),x({type:"edit",formState:t}),c(!0),m(!0)});var _=function(){var e=Object(l.a)(d.a.mark(function e(){var t,n,r,a,c;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=ue(v,S),!(Object.keys(t).length>0)){e.next=4;break}return D(Object(p.a)({},S,t)),e.abrupt("return");case 4:if(n=y()(v,"connections",{}),r={description:y()(v,"description",""),name:y()(v,"name",""),type:y()(v,"type",""),url:y()(v,"url",""),department:y()(v,"department","")},!o){e.next=14;break}return e.next=9,E.makeNode({id:v.id,connections:n,data:r});case 9:return a=e.sent,e.next=12,E.addNode(a);case 12:e.next=19;break;case 14:return e.next=16,E.makeNode({connections:n,data:r});case 16:return c=e.sent,e.next=19,E.addNode(c);case 19:J(),Y(),P();case 22:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();N("toggle-left-panel",function(){return m(!u)});var B=function(){P(),Y(),m(!1),c(!1)},J=N("save-node-entry",function(){var e=se();O(e)});return a.a.createElement(z.a,{headerText:"".concat(o?"Edit":"Add"," System"),isOpen:u,onDismiss:B,isFooterAtBottom:!0,onRenderFooterContent:function(){return a.a.createElement(L.a,{horizontal:!0,horizontalAlign:"space-between",tokens:{childrenGap:12}},a.a.createElement(G.a,{text:"Cancel",onClick:B}),a.a.createElement(U.a,{text:"Save System",onClick:_}))},type:M.a.medium},a.a.createElement(ae,{edit:o,existingSystems:w,nodeFormErrors:S,setNodeFormErrors:D,addNodeForm:v,updateNodeForm:x,connections:R,addConnection:function(){T({type:"add",dispatch:T,existingSystems:w,addNodeForm:v,updateNodeForm:x})}}))},le=n(152),fe=function(e){var t=e.description,n=e.department,r=e.url,o=e.connections;return a.a.createElement(L.a,{tokens:{childrenGap:8}},a.a.createElement(L.a,{tokens:{childrenGap:4}},a.a.createElement(le.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Description"),a.a.createElement(le.a,null,t)),a.a.createElement(L.a,{tokens:{childrenGap:4}},a.a.createElement(le.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Department"),a.a.createElement(le.a,null,n)),a.a.createElement(L.a,{tokens:{childrenGap:4}},a.a.createElement(le.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"URL"),a.a.createElement("a",{href:r},r)),a.a.createElement(L.a,null,a.a.createElement(le.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Connections"),o))};function pe(){var e=Object(i.a)(["\n  & > .ms-Panel-main {\n    transition: width 300ms ease-in-out;\n  }\n"]);return pe=function(){return e},e}var me=Object(s.b)(z.a)(pe()),he=function(e){var t=e.to,n=e.type,r=e.read,o=e.write,c="";return r&&o?c="(Read and Write)":r?c="(Read)":o&&(c="(Write)"),a.a.createElement(le.a,null,t," - ",n," ",c)},be=function(e){var t=Object(r.useState)(!1),n=Object(f.a)(t,2),o=n[0],c=n[1],i=Object(r.useState)(null),s=Object(f.a)(i,2),u=s[0],d=s[1];N("display-node-details",function(e){d(e),c(!0)});var l=N("edit-system-panel"),p=N("deselect-active-node"),m=y()(u,"data.name","Very Unnamed System"),h=y()(u,"data.description","No description has been entered."),v=y()(u,"data.department","No department has been entered."),x=y()(u,"data.url","".concat(m," has no url")),g=function(e){if(!e)return[];var t=b.getEdges(),n=b.getNodesObject();return Object.keys(t||{}).reduce(function(r,o){return t[o].filter(function(t){return t.node===e.id}).forEach(function(e){var t=y()(n,"[".concat(o,"].data.name")),c=y()(e,"data.type.label"),i=y()(e,"data.read"),s=y()(e,"data.write");r.push(a.a.createElement(he,{key:e.node,to:t,read:i,write:s,type:c}))}),r},[])}(u),k=function(){l(u),c(!1),p()};return a.a.createElement(me,{isOpen:o,onDismiss:function(){p(),c(!1)},onRenderHeader:function(e){return a.a.createElement(L.a,{horizontal:!0,tokens:{childrenGap:12}},a.a.createElement(le.a,{variant:"xLarge",style:{marginLeft:16,marginBottom:12}},e.headerText),a.a.createElement(V.a,{iconProps:{iconName:"Edit"},onClick:k}))},isLightDismiss:!0,type:M.a.customNear,customWidth:400,headerText:m},a.a.createElement(fe,{connections:g,department:v,description:h,url:x}))};function ve(){var e=Object(i.a)(["\n  ","\n  animation-delay: -0.9s;\n"]);return ve=function(){return e},e}function ye(){var e=Object(i.a)(["\n  ","\n"]);return ye=function(){return e},e}function xe(){var e=Object(i.a)(["\n  background-color: #501214;\n  width: 15px;\n  height: 15px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  \n  -webkit-animation: "," 1.8s infinite ease-in-out;\n  animation: "," 1.8s infinite ease-in-out;\n"]);return xe=function(){return e},e}function ge(){var e=Object(i.a)(["\n  margin: 100px auto;\n  width: 40px;\n  height: 40px;\n  align-self: center;\n  justify-self: center;\n  position: relative;\n"]);return ge=function(){return e},e}function ke(){var e=Object(i.a)(["\n    25% { \n      transform: translateX(42px) rotate(-90deg) scale(0.5);\n      -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n    } 50% { \n      transform: translateX(42px) translateY(42px) rotate(-179deg);\n      -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n    } 50.1% { \n      transform: translateX(42px) translateY(42px) rotate(-180deg);\n      -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n    } 75% { \n      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n      -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n    } 100% { \n      transform: rotate(-360deg);\n      -webkit-transform: rotate(-360deg);\n    }\n"]);return ke=function(){return e},e}var we=Object(s.c)(ke()),Ee=(s.b.div(ge()),Object(s.a)(xe(),we,we));s.b.div(ye(),Ee),s.b.div(ve(),Ee);function Oe(){var e=Object(i.a)(["\n  background-color: #e8e3db;\n  flex: 1;\n  flex-direction: column;\n  display: flex;\n"]);return Oe=function(){return e},e}var je=s.b.div(Oe());var Ne=function(){return a.a.createElement(je,null,a.a.createElement(A,null),a.a.createElement(Y,null),a.a.createElement(de,null),a.a.createElement(be,null))};Object(c.a)(),Object(o.render)(a.a.createElement(Ne,null),document.getElementById("root"))}},[[100,1,2]]]);
//# sourceMappingURL=main.a4f5e4fd.chunk.js.map