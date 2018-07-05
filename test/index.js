const utils = require('../lib');


describe('checkers', () => {

    it("isObject", () => {
        utils.isObject({}).should.equal(true);
        utils.isObject(new function () {}).should.equal(true);


        utils.isObject("test str").should.equal(false);
        utils.isObject(1000).should.equal(false);
        utils.isObject(false).should.equal(false);
        utils.isObject(true).should.equal(false);
        utils.isObject(() => {}).should.equal(false);


    });

    it("isPlainObject", () => {
        utils.isPlainObject({}).should.equal(true);
        utils.isPlainObject(Object.create({})).should.equal(true);
        utils.isPlainObject(() => {}).should.equal(false);
        utils.isPlainObject(new function () {});
    });

    it("isString", () => {
        utils.isString("").should.equal(true);
        utils.isString(true).should.equal(false);
        utils.isString(function () {}).should.equal(false);
    });

    it("isFunction", () => {
        utils.isFunction(() => {}).should.equal(true);
    });


});