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

    const date = new Date();
    const status = getStatus(result);
    const name = getSiteName(url);

    let ttl = new Date();
    ttl.setDate(ttl.getDate() + 90);
    ttl = ttl.getTime();

    const data = {
        SiteId: `${result.url}|${date.getTime()}`,
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