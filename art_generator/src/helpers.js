
var arrayPluck = function (arr, key) {
    var newArr = [];
    for (var i = 0, x = arr.length; i < x; i++) {
        if (arr[i].hasOwnProperty(key)) {
            newArr.push(arr[i][key])
        }
    }
    return newArr;
}

function baseUrl(str = "") {
    str = typeof str === "string" ? str.trim() : "";
    if(str.slice(-1) == "/"){
        str = str.slice(0, -1);
    }
    return str ? `${str}/`: "";
}

module.exports = {
    arrayPluck,
    baseUrl
};