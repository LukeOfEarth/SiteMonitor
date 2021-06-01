const getStatus = (response) => {
    switch (response.status){
        case 200:
            return 'AVAILABLE'
        default:
            return 'UNAVAILABLE'
    }
}

module.exports = {
    getStatus
}