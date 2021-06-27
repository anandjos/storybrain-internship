function getVal(item) {
    let val = window.localStorage.getItem(item);
    if (val == null) return [];
    return JSON.parse(val);
}
function getScores(){
    let scores = getVal('scores');
}