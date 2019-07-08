const cxios = require('../../app/extend/context.js');

console.log(cxios.cxios)
cxios.cxios.get('/mallIndex/E9lM9uM4ct/app/statistics', {name: 1}, {
    headers: {
        'M-app-login-token': '1',
    }
})