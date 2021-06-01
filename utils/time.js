const epochTimeAddDays = (days = 0) => {
    let date = new Date();

    if(!!days && days > 0) {
        date.setDate(date.getDate() + days);
    }

    return Math.floor(date.getTime()/1000);
}

module.exports = {
    epochTimeAddDays
}