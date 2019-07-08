'use strict';

const methods = [ 'get', 'post', 'put', 'delete' ];
const cxiosSymbol = Symbol.for('context#cxios');
const cxios = {};

const getCxios = _this => {
  methods.forEach(name => {
    cxios[name] = async (url, data, config = {}) => {
      config.method = name;
      return await cxios[cxiosSymbol](url, data, config);
    };
  });
  return cxios;
};

function createCxios(app, cconfig) {
  cxios[cxiosSymbol] = async (url, data, config) => {
    const path = cconfig.baseURL + url;
    // this.logger.debug(`cxios -- url: ${path}, data: ${data}, config: ${config}`)
    console.log(`cxios -- url: ${path}, data: ${JSON.stringify(data)}, config: ${JSON.stringify(config)}`);
    console.log(app.context);
    const res = await app.context.curl(path, {
      data,
      ...config,
    });
    return res;
  };
}


module.exports = app => {
  app.addSingleton('cxios', (config, app) => {
    createCxios(app, config);
    const length = Object.keys(cxios).length;
    if (length > 0) return cxios;
    return getCxios(config);
  });

};
