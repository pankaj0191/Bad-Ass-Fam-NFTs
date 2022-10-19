
var arrayPluck = function (arr, key) {
    var newArr = [];
    for (var i = 0, x = arr.length; i < x; i++) {
        if (arr[i].hasOwnProperty(key)) {
            newArr.push(arr[i][key])
        }
    }
    return newArr;
}

function baseUrl(str = "", absolutePath = "", type = "") {
    str = typeof str === "string" ? str.trim() : "";
    str = str.charAt(0) === "." ? str.slice(1) : str;
    str = str.charAt(0) === "/" ? str.slice(1) : str;
    str = str.slice(-1) === "/" ? str.slice(0, -1) : str;
    absolutePath = absolutePath.slice(-1) === "/" ? absolutePath.slice(0, -1) : absolutePath;
    if(type === "ipfs") {
        return str ? `${absolutePath}/${str}`: "";
    } else if(type === "arts") {
        return str ? `${absolutePath}/${str}/`: "";
    }
    return str ? `${str}/`: "";
}

module.exports = {
    arrayPluck,
    baseUrl
};