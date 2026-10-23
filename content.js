let host=window===top?location.hostname:null,cur="off"
const evts=["contextmenu","copy","cut","paste","selectstart","select","dragstart","beforecopy","beforecut"]
const stop=e=>e.stopImmediatePropagation()
const mouseStop=e=>{if(e.button==2)stop(e)}
const keyStop=e=>{if((e.ctrlKey||e.metaKey)&&"acxv".includes((e.key||"").toLowerCase()))stop(e)}
const addCss=css=>{
let s=document.createElement("style")
s.textContent=css
let put=()=>(document.head||document.documentElement).appendChild(s)
document.documentElement?put():document.addEventListener("readystatechange",put,{once:true})
}
const base=()=>{
evts.forEach(t=>window.addEventListener(t,stop,true))
addCss("*,*::before,*::after{-moz-user-select:text!important;user-select:text!important}")
}
const abs=()=>{
["mousedown","mouseup","auxclick"].forEach(t=>window.addEventListener(t,mouseStop,true))
;["keydown","keyup","keypress"].forEach(t=>window.addEventListener(t,keyStop,true))
addCss("::selection{background:#8855A8!important;color:#E7E5EC!important}")
try{
let w=window.wrappedJSObject,proto=w.Event.prototype,pd=proto.preventDefault,blocked=new Set([...evts,"mousedown"])
exportFunction(function(){if(!blocked.has(this.type))return pd.call(this)},proto,{defineAs:"preventDefault"})
exportFunction(()=>{},w,{defineAs:"alert"})
}catch{}
}
const apply=m=>{
if(m=="off"||m==cur)return
if(cur=="off")base()
if(m=="abs")abs()
cur=m
}
const run=async()=>{
host??=await browser.runtime.sendMessage("host")
apply((await browser.storage.local.get("sites")).sites?.[host]||"off")
}
run()
browser.storage.onChanged.addListener(run)
