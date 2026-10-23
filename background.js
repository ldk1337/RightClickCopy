const modes=["off","on","abs"]
const hostOf=u=>{try{return new URL(u).hostname}catch{return""}}
const getSites=async()=>(await browser.storage.local.get("sites")).sites||{}
const badge=async(tabId,url)=>{
let m=(await getSites())[hostOf(url)]||"off"
browser.action.setBadgeText({tabId,text:m=="off"?"":m})
browser.action.setBadgeBackgroundColor({tabId,color:"#8855A8"})
browser.action.setBadgeTextColor({tabId,color:"#E7E5EC"})
browser.action.setTitle({tabId,title:"rightClickCopy: "+{off:"off",on:"on",abs:"absolute"}[m]})
}
browser.action.onClicked.addListener(async tab=>{
let host=hostOf(tab.url)
if(!host)return
let sites=await getSites()
let m=modes[(modes.indexOf(sites[host]||"off")+1)%modes.length]
if(m=="off")delete sites[host]
else sites[host]=m
await browser.storage.local.set({sites})
badge(tab.id,tab.url)
if(m=="off")browser.tabs.reload(tab.id)
})
browser.tabs.onUpdated.addListener((tabId,info,tab)=>{if(info.url||info.status=="loading")badge(tabId,tab.url)})
browser.tabs.onActivated.addListener(({tabId})=>browser.tabs.get(tabId).then(t=>badge(tabId,t.url)))
browser.runtime.onMessage.addListener((msg,sender)=>{if(msg=="host")return Promise.resolve(hostOf(sender.tab?.url))})
