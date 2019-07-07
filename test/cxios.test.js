'use strict';

const mock = require('egg-mock');

describe('test/cxios.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/cxios-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, cxios')
      .expect(200);
  });
});
