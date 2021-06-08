const fetch = require('node-fetch');
const { getStatus } = require('./status');
const { epochTimeAddDays } = require('./time');
const { getSiteListQuery } = require('../queries/siteList.query');
const { insertItemQuery } = require('../queries/insertItem.query');

const getSiteList = async () => {
    const siteList = await getSiteListQuery();
    return siteList;
}

const requestSite = async (url, siteName) => {
    const result = await fetch(`https://${url}`);

    const status = getStatus(result);

    const date = epochTimeAddDays();

    const ttl = epochTimeAddDays(90);

    const data = {
        SiteId: `${url}|${date}`,
        SiteName: siteName,
        Status: status,
        TimeToExist: ttl
    }

    insertItemQuery(data);
}

const performMonitoring = async () => {
    const siteList = await getSiteList();

    siteList.forEach(site => {
        requestSite(site.URL.S, site.SiteName.S);
    });
}

module.exports = {
    performMonitoring
}