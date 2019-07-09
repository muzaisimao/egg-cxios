'use strict';

const methods = [ 'get', 'post', 'put', 'delete', 'patch' ];
const curlSymbol = Symbol.for('context#curl');
const cxiosSymbol = Symbol.for('context#cxios');
const requestSymbol = Symbol.for('context#request');

class Cxios {
  constructor(config, app) {
    this[curlSymbol](config, app);
    this[cxiosSymbol]();
  }

  [curlSymbol](config, app) {
    this[requestSymbol] = async (url, data, options) => {
      const path = config.baseURL + url;
      const env = app.config.env || 'local';
      Object.keys(config.options).length > 0 && (options = { ...config.options, ...options });

      env === 'local' ? console.log(`cxios -- url: ${path}, data: ${JSON.stringify(data)}, options: ${JSON.stringify(options)}`)
        : this.logger.debug(`cxios -- url: ${path}, data: ${JSON.stringify(data)}, options: ${JSON.stringify(options)}`);

      return await app.curl(path, { data, ...options });
    };
  }

  [cxiosSymbol]() {
    methods.forEach(name => {
      this[name] = async (url, data, options = {}) => {
        options.method = name;
        return await this[requestSymbol](url, data, options);
      };
    });
  }
}

module.exports = app => {
  app.addSingleton('cxios', (config, app) => {
    console.log('实例配置: ', config);
    config = Object.assign({}, config);
    return new Cxios(config, app);
  });
};
