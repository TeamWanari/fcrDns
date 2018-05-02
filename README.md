# fcrDnsPromise
Forward-Confirmed Reverse DNS lookup implementation for node v6.11.1 (supported by Google Cloud Functions)

## Installation

```
 $ npm i --save fcrdns-promise
```

Example use in an express app (locally):

```
const DnsUtils = require('fcrdns-promise')

app.get('/test-fcr', (req, res) => {
    const ip = req.ip;
    console.log("IP: ", ip);
    DnsUtils.fcrDns(ip, 'fitbit.com')
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});
```