'use strict';

// const methods = ['get', 'post', 'put', 'delete'];
// const cxiosSymbol = Symbol.for('context#cxios');
// let cxios = {};

// let getCxios = (_this) => {
//   methods.forEach(name => {
//     cxios[name] = async (url, data, config = {}) => {
//       config.method = name;
//       return await _this[cxiosSymbol](url, data, config)
//     }
//   })
//   return cxios;
// }

// module.exports = {
//   async [cxiosSymbol](url, data, config) {
//     let path = this.app.config.cxios.baseURL + url;
//     // this.logger.debug(`cxios -- url: ${path}, data: ${data}, config: ${config}`)
//     console.log(`cxios -- url: ${path}, data: ${JSON.stringify(data)}, config: ${JSON.stringify(config)}`)

//     let res = await this.curl(path, {
//       data,
//       ...config
//     })
//     return res;
//   },
//   get cxios() {
//     let length = Object.keys(cxios).length;
//     if (length > 0) return cxios;
//     return getCxios(this);
//   }
// }

module.exports = {
  get cxios() { return this.app.cxios; },
};
