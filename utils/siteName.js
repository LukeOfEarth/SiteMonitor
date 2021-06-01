const getSiteName = (url) => {
    let splitURL = url.split('.');
    if(splitURL[0] === 'www'){
        return splitURL[1];
    }
    return splitURL[0];
}

module.exports = {
    getSiteName
}