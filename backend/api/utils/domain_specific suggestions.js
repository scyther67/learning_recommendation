module.exports = {
    arrSum: (arr) => {
        arr.reduce((a,b) => a + b, 0)
    },

    softmax: (arr) => {
        return arr.map(function(value,index) { 
        return Math.exp(value) / arr.map( function(y){ return Math.exp(y) } ).reduce( function(a,b){ return a+b })
        })
    }
}