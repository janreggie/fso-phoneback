(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{23:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(2),s=n.n(c),o=n(16),a=n.n(o),u=(n(23),n(17)),i=n(3),j=n(5),d=n.n(j),b="/api/persons",f={getAll:function(){return d.a.get(b).then((function(e){return e.data}))},addEntry:function(e){return d.a.post(b,e).then((function(e){return e.data}))},changeEntry:function(e,t){return d.a.put(b+"/"+e,t).then((function(e){return e.data}))},deleteEntry:function(e){return d.a.delete(b+"/"+e)}},h=(n(42),function(e){var t=e.message,n=e.cN;return t?Object(r.jsx)("div",{className:n,children:t}):null}),l=function(e){var t=e.message;return Object(r.jsx)(h,{message:t,cN:"notice"})},m=function(e){var t=e.message;return Object(r.jsx)(h,{message:t,cN:"error"})},O=function(e){var t=e.searchFor,n=e.setSearchFor;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{value:t,onChange:function(e){return n(e.target.value)}})]})},v=function(e){var t=e.persons,n=e.setPersons,s=e.setNotice,o=Object(c.useState)(""),a=Object(i.a)(o,2),u=a[0],j=a[1],d=Object(c.useState)(""),b=Object(i.a)(d,2),h=b[0],l=b[1];return Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault();var r={name:u,number:h},c=t.find((function(e){return e.name===r.name}));if(c){if(!window.confirm("".concat(r.name," is already in phonebook. Replace the old number with the new one?")))return;f.changeEntry(c.id,r).then((function(e){n(t.map((function(t){return t.name===e.name?e:t}))),j(""),l(""),s("Modified ".concat(e.name))}))}else f.addEntry(r).then((function(e){n(t.concat(e)),j(""),l(""),s("Added ".concat(e.name))}))},children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:u,onChange:function(e){return j(e.target.value)}})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:h,onChange:function(e){return l(e.target.value)}})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},x=function(e){var t=e.persons,n=e.setPersons,c=e.searchFor,s=e.setNotice,o=e.setError,a=t.filter((function(e){return e.name.toLocaleLowerCase().includes(c)}));return Object(r.jsx)("div",{children:a.map((function(e){return Object(r.jsx)(p,{allPersons:t,person:e,setPersons:n,setNotice:s,setError:o},e.id)}))})},p=function(e){var t=e.person,n=e.allPersons,c=e.setPersons,s=e.setNotice,o=e.setError;return Object(r.jsxs)("div",{children:[t.name," ",t.number," ",Object(r.jsx)("button",{onClick:function(){window.confirm("Delete ".concat(t.name,"?"))&&(f.deleteEntry(t.id).then((function(e){return s("".concat(t.name," has been deleted"))})).catch((function(e){return o("".concat(t.name," has already been deleted from the server"))})),c(n.filter((function(e){return e.id!==t.id}))))},children:"delete"})]})},g=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],s=t[1],o=Object(c.useState)(""),a=Object(i.a)(o,2),j=a[0],d=a[1],b=Object(c.useState)(""),h=Object(i.a)(b,2),p=h[0],g=h[1],w=Object(c.useState)(""),E=Object(i.a)(w,2),N=E[0],y=E[1];Object(c.useEffect)((function(){return f.getAll().then((function(e){return s([].concat(Object(u.a)(e),[{name:"Rogue Rougeson",id:1001,number:"303 444944949 "}]))}))}),[]);var S=function(e){g(e),setTimeout((function(){return g("")}),5e3)};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(l,{message:p}),Object(r.jsx)(m,{message:N}),Object(r.jsx)(O,{searchFor:j,setSearchFor:d}),Object(r.jsx)("h3",{children:"add a new"}),Object(r.jsx)(v,{persons:n,setPersons:s,setNotice:S}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(x,{persons:n,setPersons:s,searchFor:j,setNotice:S,setError:function(e){y(e),setTimeout((function(){return y("")}),5e3)}})]})};a.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(g,{})}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.fb6259d0.chunk.js.map