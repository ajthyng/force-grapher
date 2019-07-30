(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,n,t){e.exports=t(116)},116:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t.n(c),o=t(43),r=t(149),i=t(44),u=t(49),l=t(19),s=t(10),d=t(27),f=t(88),m={},p={subscribe:function(e,n){m[e]||(m[e]=[]),m[e].push(n)},unsubscribe:function(e,n){m[e]&&(m[e]=m[e].filter(function(e){return e!==n}))},next:function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),c=1;c<n;c++)t[c-1]=arguments[c];m[e]&&m[e].forEach(function(e){"function"===typeof e&&e.apply(void 0,t)})}};Object.freeze(p);var y=function(){var e=function(e,n){return JSON.parse(localStorage.getItem(e))||n};return{addNode:function(n){var t,c,a=e("nodes",[]);a.push(n),t="nodes",c=a,localStorage.setItem(t,JSON.stringify(c))},getNodes:function(n){return e("nodes",[])}}}(),b=function(e,n){return Object(c.useEffect)(function(){if("function"===typeof n)return p.subscribe(e,n),function(){return p.unsubscribe(e,n)}},[e,n]),function(n){return p.next(e,n)}},v=t(14),k=t.n(v),O=function(e,n){switch(n.type){case"update":var t=y.getNodes();return j(t);default:return e}},h=function(e){switch(e.key){case"oneway":case"twoway":return"#A0A0A0";case"custom":return"#04B080";case"builtin":return"#303030";default:return"#A0A0A0"}},j=function(e){return Array.isArray(e)?{nodes:e.map(function(e){return Object(d.a)({},e,{id:e.key,name:e.name,color:"#303030"})}),links:e.reduce(function(e,n){return Object.keys(k()(n,"connections",{})).forEach(function(t){var c=k()(n,"connections[".concat(t,"].connectedTo"),{}),a=k()(n,"connections[".concat(t,"].connectionType"),{});c.key&&n.key&&(e.push({source:n.key,target:c.key,color:h(a),type:a}),"twoway"===a.key&&e.push({source:c.key,target:n.key,color:h(a),type:a}))}),e},[])}:{nodes:[],links:[]}},g=function(e){var n=Object(c.useReducer)(O,j(y.getNodes())),t=Object(s.a)(n,2),o=t[0],r=t[1],i=Object(c.useState)(),u=Object(s.a)(i,2),d=u[0],m=u[1],p=Object(c.useRef)(),v=b("display-node-details");return Object(c.useEffect)(function(){p.current.d3Force("charge").strength(-150),p.current.zoom(4)},[o.links]),Object(c.useEffect)(function(){d&&v(d)},[d,v]),b("save-node-entry",function(){r({type:"update"})}),b("deselect-active-node",function(){return m(null)}),a.a.createElement(f.a,{ref:p,graphData:o,linkDirectionalArrowLength:5,linkDirectionalArrowRelPos:.5,linkCurvature:.25,nodeVal:4.5,onNodeClick:function(e){e.id!==k()(d,"id",null)?m(e):m(null)},linkAutoColorBy:function(e){return console.log("LINK: ",e)},nodeCanvasObject:function(e,n,t){var c=k()(d,"id",null)===e.id,a=e.name,o=16/t;n.font="".concat(c?"bold ":"").concat(o,"px Sans-Serif");var r=n.measureText(a).width,i=[r,o].map(function(e){return e+3*o}),u=[r,o].map(function(e){return e+o*(c?3.4:3.2)});return n.fillStyle=c?"#005481":e.color,n.fillRect.apply(n,[e.x-u[0]/2,e.y-u[1]/2].concat(Object(l.a)(u))),n.fillStyle="rgba(255, 255, 255, 1)",n.fillRect.apply(n,[e.x-i[0]/2,e.y-i[1]/2].concat(Object(l.a)(i))),n.textAlign="center",n.textBaseline="middle",n.fillStyle=c?"#005481":e.color,n.fillText(a,e.x,e.y),n}})},x=t(150),E=function(e){var n=[{key:"addNode",name:"Add System",iconProps:{iconName:"Add"},onClick:b("toggle-left-panel")}];return a.a.createElement(x.a,{items:n})},w=t(154),N=t(12),C=t(155),S=t(151),A=t(157),T=t(163),D=t(92),F=t(89),I=t(148),R=t(83),B=t.n(R),P=t(84),z=t.n(P);function J(){var e=Object(i.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  & > .ms-Dropdown-container {\n    flex: 1;\n    margin-right: 4px;\n  }\n\n  & > .ms-Button--icon {\n    align-self: flex-end;\n  }\n"]);return J=function(){return e},e}var L=function(e,n){if(""===n.path)return{};var t=Object(d.a)({},e);return z()(t,n.path,n.value),t},G=function(e,n){switch(n.type){case"add":var t=B()();return Object(d.a)({},e,{connections:[].concat(Object(l.a)(e.connections),[a.a.createElement(K,{key:t,id:t,addNodeForm:n.addNodeForm,updateNodeForm:n.updateNodeForm,handleRemove:function(){return n.dispatch({type:"remove",id:t})}})])});case"remove":return Object(d.a)({},e,{connections:Object(l.a)(e.connections.filter(function(e){return e.key!==n.id}))});case"reset":return{connections:[]};default:return e}},W=u.a.div(J()),K=function(e){var n=e.handleRemove,t=e.id,c=e.addNodeForm,o=e.existingSystems,r=e.updateNodeForm;return b("save-node-entry",function(){return console.log("update")}),a.a.createElement(W,null,a.a.createElement(S.a,{label:"Connected To",options:o,value:k()(c,"connections[".concat(t,"].connectedTo")),onChange:function(e,n){r({path:"connections[".concat(t,"].connectedTo"),value:{key:n.key,text:n.text}})}}),a.a.createElement(S.a,{label:"Connection Type",options:[{key:"oneway",text:"One Way Interface"},{key:"twoway",text:"Two Way Interface"},{key:"builtin",text:"Built In Interface"},{key:"custom",text:"Custom Interface"}],value:k()(c,"connections[".concat(t,"].connectionType")),onChange:function(e,n){r({path:"connections[".concat(t,"].connectionType"),value:{key:n.key,text:n.text,color:n.color}})}}),a.a.createElement(T.a,{iconProps:{iconName:"Delete"},onClick:n}))},V=function(){return y.getNodes().map(function(e){return{key:e.key,text:e.name}})},q=function(e){var n=Object(c.useState)(!1),t=Object(s.a)(n,2),o=t[0],r=t[1],i=Object(c.useState)(V()),u=Object(s.a)(i,2),l=u[0],f=u[1],m=Object(c.useReducer)(G,{connections:[]}),p=Object(s.a)(m,2),v=p[0],k=p[1],O=function(){return E({path:"",value:{}})},h=function(){return k({type:"reset"})},j=Object(c.useReducer)(L,{}),g=Object(s.a)(j,2),x=g[0],E=g[1];b("toggle-left-panel",function(){return r(!o)});var T=b("save-node-entry",function(){var e=V();f(e)});return a.a.createElement(w.a,{headerText:"Add a New System Node",isOpen:o,onDismiss:function(){return r(!1)},type:N.a.medium},a.a.createElement(C.a,{label:"Name",onChange:function(e,n){return E({path:"name",value:n})},value:x.name||""}),a.a.createElement(S.a,{label:"System Type",options:[{key:"oncampus",text:"On Campus"},{key:"cloud",text:"Cloud"},{key:"external",text:"External"}],value:x.type||"",onChange:function(e,n){return E({path:"type",value:n.key})}}),a.a.createElement(C.a,{label:"Description",multiline:!0,rows:4,onChange:function(e,n){return E({path:"description",value:n})},value:x.description||""}),v.connections.map(function(e){return a.a.cloneElement(e,{existingSystems:l})}),a.a.createElement(D.a,{onClick:function(){k({type:"add",dispatch:k,existingSystems:l,addNodeForm:x,updateNodeForm:E})},iconProps:{iconName:"Add"}},"Add Connection"),a.a.createElement(A.a,{horizontal:!0,horizontalAlign:"end",tokens:{childrenGap:12}},a.a.createElement(F.a,{text:"Cancel",onClick:function(){O(),h(),r(!1)}}),a.a.createElement(I.a,{text:"Add System",onClick:function(){y.addNode(Object(d.a)({key:(x.name||"").toLowerCase()},x)),T(),h(),O()}})))},H=t(158),M=function(e,n){var t=k()(e,"connections",{});return Object.keys(t).reduce(function(t,c){var o=k()(e,"connections[".concat(c,"].connectedTo.text"),""),r=k()(e,"connections[".concat(c,"].connectionType.text"),"");return n&&o===n?(o=k()(e,"name",""),t.push(a.a.createElement(Q,{to:o,type:r})),t):(n||t.push(a.a.createElement(Q,{to:o,type:r})),t)},[])},Q=function(e){var n=e.to,t=e.type;return a.a.createElement(H.a,null,n," - ",t)},U=function(e){var n=Object(c.useState)(!1),t=Object(s.a)(n,2),o=t[0],r=t[1],i=Object(c.useState)(null),u=Object(s.a)(i,2),d=u[0],f=u[1];b("display-node-details",function(e){f(e),r(!0)});var m=b("deselect-active-node"),p=k()(d,"name",""),v=k()(d,"description",""),O=function(e){if(!e)return[];var n=y.getNodes(),t=M(e),c=n.reduce(function(n,t){var c=M(t,e.name);return[].concat(Object(l.a)(n),Object(l.a)(c))},[]);return[].concat(Object(l.a)(t),Object(l.a)(c))}(d);return a.a.createElement(w.a,{isOpen:o,onDismiss:function(){m(),r(!1)},isLightDismiss:!0,type:N.a.customNear,customWidth:400,headerText:p},a.a.createElement(A.a,{tokens:{childrenGap:8}},a.a.createElement(A.a,{tokens:{childrenGap:4}},a.a.createElement(H.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Description"),a.a.createElement(H.a,null,v)),a.a.createElement(A.a,null,a.a.createElement(H.a,{style:{textDecoration:"underline"},variant:"mediumPlus"},"Connections"),O)))};function X(){var e=Object(i.a)(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #e8e3db;\n"]);return X=function(){return e},e}var Y=u.a.div(X());var Z=function(){return a.a.createElement(Y,null,a.a.createElement(E,null),a.a.createElement(q,null),a.a.createElement(U,null),a.a.createElement(g,null))};Object(r.a)(),Object(o.render)(a.a.createElement(Z,null),document.getElementById("root"))}},[[102,1,2]]]);
//# sourceMappingURL=main.25979aac.chunk.js.map