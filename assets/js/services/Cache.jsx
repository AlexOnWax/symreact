// const cache ={};
//
// function set(key,data){
//
//     cache[key]={
//         data:data,
//         cachedAt: new Date().getTime()
//     }
// }
//
// function get(key){
//     return new Promise((resolve)=>{
//         //est ce que qqchose existe dans le cache
//         //est ce que l date à laquelle ca a ete caché + 15minutes est sup a time de maintanant
//         resolve(
//             cache[key] && cache[key].cachedAt <   15*60*1000 > new Date().getTime() ? cache[key].data : null)
//     })
//
// }
//
// export default {
//     set,
//     get
// }