module.exports = {
    baseURL: '',
    async get(url, data, config) {
        return await this.cxios(url, 'GET', data)
    },
    async post(url, data, config) {
        return await this.cxios(url, 'POST', data)
    },
    async put(url, data, config) {
        return await this.cxios(url, 'PUT', data)
    },
    async ['delete'](url, data, config) {
        return await this.cxios(url, 'DELETE', data)
    },
    async cxios({url, methods, data}) {
        let path = this.app.config.cxios.baseURL + url;
        this.logger.debug(`url: ${path}, methods: ${methods}, data: ${data}`)
        let res = await this.curl(path, {
            methods,
            dataType: 'json',
            data
        })
        return res;
    } 
}