export const fixSrcString = (link) => {
    let original=link;
    let res = link.split(" ").find(item => item.includes("src"))
    if(res==undefined){
        return original
    }
    res = res.slice(5, res.length - 1)
    return res
}