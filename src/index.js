const Q = require('q');
const dns = require('dns');

class DnsUtils {
    static fcrDns(ipAddress, domainToMatch) {

        const reverse = Q.denodeify(dns.reverse);
        const resolve4 = Q.denodeify(dns.resolve4);

        return reverse(ipAddress).then(hostNames => {
            if(!hostNames.every(hostName => hostName.endsWith(domainToMatch))) {
                return Promise.reject(new Error(`Hostname ${hostNames} did not end with ${domainToMatch}.`))
            } else {
                return Promise.all([...hostNames.map(hostName => {
                    return resolve4(hostName)
                        .then(resolvedAddresses => {
                            if(resolvedAddresses.every(address => address === ipAddress)) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error(`Resolved addresses ${resolvedAddresses} did not equal to the initial IP address ${ipAddress}`));
                            }
                        })
                })])
            }
        })
    }
}

module.exports = DnsUtils;