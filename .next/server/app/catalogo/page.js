(()=>{var e={};e.id=411,e.ids=[411],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},11879:(e,a,r)=>{"use strict";r.r(a),r.d(a,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>c});var t=r(86186),s=r(16557),l=r(46437),o=r.n(l),i=r(94842),n={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>i[e]);r.d(a,n);let c=["",{children:["catalogo",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,9328)),"/Users/elobredor/Desktop/afi_ecomerce/src/app/catalogo/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,6588))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,45874)),"/Users/elobredor/Desktop/afi_ecomerce/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,40571,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,21430,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,75055,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,6588))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/elobredor/Desktop/afi_ecomerce/src/app/catalogo/page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},p=new t.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/catalogo/page",pathname:"/catalogo",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},16777:(e,a,r)=>{Promise.resolve().then(r.bind(r,9328))},81929:(e,a,r)=>{Promise.resolve().then(r.bind(r,81580))},81580:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>d});var t=r(35422),s=r(20719),l=r(50364),o=r(97232),i=r.n(o),n=r(8312),c=r(70860);function d(){let e=(0,n.useRouter)(),[a,r]=(0,s.useState)(null),o=[{name:"Categor\xeda",options:a}];return(0,t.jsx)("div",{children:(0,t.jsxs)("div",{className:"mt-[4rem] mb-[1rem]",children:[(0,t.jsx)("div",{className:"mt-[1rem] mb-[1rem]",children:(0,t.jsx)(c.A,{filters:o,onFilterChange:e=>{console.log("Filtros seleccionados:",e)},onSearch:e=>{console.log(e)}})}),(0,t.jsx)("div",{className:i().gridContainer,children:null===a?(0,t.jsx)("p",{children:"Cargando categor\xedas..."}):a.length>0?a.map(e=>(0,t.jsx)(l.A,{imageSrc:e.imageSrc,text:e.text,id:e.id,level:"categoria"},e.id)):(0,t.jsx)("p",{children:"No hay categor\xedas disponibles"})}),(0,t.jsx)("div",{className:"flex justify-center mt-5",children:(0,t.jsx)("button",{style:{backgroundColor:"#002C6A"},className:" rounded-full text-white text-[12px] px-8 py-3 hover:bg-blue-200 transition",onClick:()=>e.push("/catalogo"),children:"Ver Todas"})})]})})}r(34320)},50364:(e,a,r)=>{"use strict";r.d(a,{A:()=>i});var t=r(35422),s=r(8312),l=r(20719),o=r(80733);r(79456);let i=({imageSrc:e,text:a,level:r,categoria:i,marca:n,linea:c})=>{let d=(0,s.useRouter)(),[u,p]=(0,l.useState)(!1),g=e=>e?e.trim().replace(/\s+/g,"_").replace(/\//g,"-"):"";return(0,l.useEffect)(()=>{if(u){let e=g(a),t=g(i),s=g(n),l=g(c),o="";switch(r){case"categoria":o=`/${e}`;break;case"marca":o=`/${t}/${e}`;break;case"linea":o=`/${t}/${s}/${e}`;break;case"producto":o=`/${t}/${s}/${l}/${e}`}console.log("Redirigiendo a:",o),d.push(o),p(!1)}},[u,i,n,a,r,d,c]),(0,t.jsx)("div",{className:"card-container",children:(0,t.jsxs)("div",{className:"card",onClick:()=>{p(!0)},style:{cursor:"pointer"},children:[(0,t.jsx)(o.default,{src:e||"/placeholder.jpg",height:150,width:150,alt:a,className:"card-image p-8 mt-3"}),(0,t.jsx)("div",{className:"card-text",children:(0,t.jsx)("p",{className:"animated-text",children:a})})]})})}},70860:(e,a,r)=>{"use strict";r.d(a,{A:()=>i});var t=r(35422),s=r(20719);let l=({options:e,onSelect:a,placeholder:r="Selecciona una opci\xf3n"})=>{let[l,o]=(0,s.useState)(""),[i,n]=(0,s.useState)(!1),[c,d]=(0,s.useState)(null),u=e.filter(e=>e.label.toLowerCase().includes(l.toLowerCase())),p=e=>{d(e),a(e),n(!1),o("")};return(0,t.jsxs)("div",{className:"relative w-full max-w-xs",children:[(0,t.jsxs)("div",{className:"border border-gray-300 p-2 rounded-md bg-white cursor-pointer flex justify-between items-center",onClick:()=>n(!i),children:[(0,t.jsx)("span",{className:"text-gray-700",children:c?c.label:r}),(0,t.jsx)("span",{className:"text-gray-500",children:i?"▲":"▼"})]}),i&&(0,t.jsxs)("div",{className:"absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10",children:[(0,t.jsx)("input",{type:"text",className:"w-full p-2 border-b border-gray-200 outline-none text-gray-700",placeholder:"Buscar...",value:l,onChange:e=>o(e.target.value)}),(0,t.jsx)("div",{className:"max-h-40 overflow-y-auto",children:u.length>0?u.map(e=>(0,t.jsx)("div",{className:"p-2 hover:bg-gray-100 cursor-pointer text-gray-700",onClick:()=>p(e),children:e.label},e.value)):(0,t.jsx)("p",{className:"p-2 text-gray-500 text-sm",children:"No hay resultados"})})]})]})};var o=r(34320);let i=({onFilterChange:e})=>{let[a,r]=(0,s.useState)([]),[i,n]=(0,s.useState)([]),[c,d]=(0,s.useState)([]),[u,p]=(0,s.useState)([]),[g,m]=(0,s.useState)(null),[x,b]=(0,s.useState)(null),[h,f]=(0,s.useState)(null),[v,_]=(0,s.useState)(null);(0,s.useEffect)(()=>{(async()=>{try{let e=await o.F.categories.getList();r(e.data.map(e=>({label:e.mga_name.replace(/\s+/g,"_").replace(/\//g,"-"),value:e.mga_id})))}catch(e){console.error("Error cargando categor\xedas:",e)}})()},[]),(0,s.useEffect)(()=>{if(!g){n([]),d([]),p([]);return}(async()=>{try{let{data:e}=await o.F.categories.getAll(g.label);n(e.map(e=>({label:e.mfa_pref.replace(/\s+/g,"_").replace(/\//g,"-"),value:e})))}catch(e){console.error("Error cargando marcas:",e)}})()},[g]),(0,s.useEffect)(()=>{if(!g||!x){d([]),p([]);return}(async()=>{try{let{data:e}=await o.F.line.getAll(g.label,x.label);d(e.map(e=>({label:e.msg_pref.replace(/\s+/g,"_").replace(/\//g,"-"),value:e.id})))}catch(e){console.error("Error cargando l\xedneas:",e)}})()},[g,x]),(0,s.useEffect)(()=>{if(!h){p([]);return}(async()=>{try{let{data:e}=await o.F.line.getArticles(g?.label,x?.label,h?.label);p(e.map(e=>({label:e.code,value:e.id})))}catch(e){console.error("Error cargando modelos:",e)}})()},[h,x?.label,g?.label]);let j=()=>{if(!g){console.error("Debe seleccionar al menos una categor\xeda para realizar la b\xfasqueda");return}let e=[g.label,x?.label,h?.label,v||null].filter(Boolean).map(e=>e?.replace(/\s+/g,"-")),a=`/${e.join("/")}`;window.location.href=a};return(0,t.jsxs)("div",{className:"border border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-bl-lg rounded-tr-lg",children:[(0,t.jsxs)("div",{className:"w-full",children:[(0,t.jsx)("label",{htmlFor:"categoria",className:"text-sm font-semibold text-gray-700",children:"Categor\xeda"}),(0,t.jsx)(l,{id:"categoria",options:a,value:g,onSelect:a=>{m(a),b(null),f(null),p([]),e({Categoria:a})},placeholder:"Selecciona una categor\xeda"})]}),(0,t.jsxs)("div",{className:"w-full",children:[(0,t.jsx)("label",{htmlFor:"marca",className:"text-sm font-semibold text-gray-700",children:"Marca"}),(0,t.jsx)(l,{id:"marca",options:i,value:x,onSelect:a=>{b(a),f(null),p([]),e({Categoria:g,Marca:a})},placeholder:"Selecciona una marca",disabled:!g})]}),(0,t.jsxs)("div",{className:"w-full",children:[(0,t.jsx)("label",{htmlFor:"linea",className:"text-sm font-semibold text-gray-700",children:"L\xednea"}),(0,t.jsx)(l,{id:"linea",options:c,value:h,onSelect:a=>{f(a),p([]),e({Categoria:g,Marca:x,Línea:a})},placeholder:"Selecciona una l\xednea",disabled:!x})]}),(0,t.jsxs)("div",{className:"w-full",children:[(0,t.jsx)("label",{htmlFor:"modelo",className:"text-sm font-semibold text-gray-700",children:"Modelo"}),(0,t.jsx)(l,{id:"modelo",options:u,value:v,onSelect:a=>{_(a.label),e({Categoria:g,Marca:x,Línea:h,Modelo:a})},placeholder:"Selecciona un modelo",disabled:!h})]}),(0,t.jsx)("div",{className:"w-full flex items-end",children:(0,t.jsx)("button",{onClick:()=>j({Categoria:g,Marca:x,Línea:h,Modelo:h}),className:"bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full",disabled:!g,children:"Buscar"})})]})}},97232:e=>{e.exports={catalogContainer:"catalogoPage_catalogContainer__2rIuq",breadcrumbWrapper:"catalogoPage_breadcrumbWrapper__vbda_",gridContainer:"catalogoPage_gridContainer__N9Gsr",item:"catalogoPage_item__oMuid",large:"catalogoPage_large__utsGF",small:"catalogoPage_small__LyDPE",emptyMessage:"catalogoPage_emptyMessage__oEbbg",backLink:"catalogoPage_backLink__wdeEV",skeletonCard:"catalogoPage_skeletonCard__wYLpf",skeletonImage:"catalogoPage_skeletonImage__TkLMg",skeletonText:"catalogoPage_skeletonText__CPi7z"}},9328:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>t});let t=(0,r(65002).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/elobredor/Desktop/afi_ecomerce/src/app/catalogo/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/elobredor/Desktop/afi_ecomerce/src/app/catalogo/page.tsx","default")},6588:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>s});var t=r(66371);let s=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,t.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},79456:()=>{}};var a=require("../../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[934,660,371,792],()=>r(11879));module.exports=t})();