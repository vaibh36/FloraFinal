export const countValues = (arr= [], items = {})=>{
    return arr.reduce((acc, item)=>{
        acc = acc + items[item].quantity;
        return acc
    },0)
}