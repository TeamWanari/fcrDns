# fcrDns
Forward-Confirmed Reverse DNS lookup implementation for node v6.11.1 (supported by Google Cloud Functions)

Example use in an express app:

```
const fcrDns = require('fcrDns');

app.post('/', (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    return fcrDns.fcrDns('169.45.134.251', 'fitbit.com')
        .then(resolved => {
            console.log("responded 204");
            res.sendStatus(204);
        }).catch(err => {
            console.log("Err: ", err);
            res.sendStatus(404);
        });

});
```