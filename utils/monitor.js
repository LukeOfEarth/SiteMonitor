const fetch = require('node-fetch');
const { getStatus } = require('./status');
const { getSiteName } = require('./siteName');
const { getSiteListQuery } = require('../queries/siteList.query');
const { insertItemQuery } = require('../queries/insertItem.query');

const getSiteList = async () => {
    const siteList = await getSiteListQuery();
    return siteList
}

const requestSite = async (url) => {
    const result = await fetch(`https://${url}`);

    let date = new Date();
    date = Math.floor(date.getTime()/1000);

    const status = getStatus(result);
    const name = getSiteName(url);

    let ttl = new Date();
    ttl.setDate(ttl.getDate() + 90);
    ttl = Math.floor(ttl.getTime()/1000);

    const data = {
        SiteId: `${url}|${date}`,
        SiteName: name,
        Status: status,
        TimeToExist: ttl
    }

    insertMonitoring(data);
}

const insertMonitoring = (data) => {
    insertItemQuery(data);
}

const performMonitoring = async () => {
    const siteList = await getSiteList();

    siteList.forEach(site => {
        requestSite(site.URL.S);
    });
}

module.exports = {
    performMonitoring
}