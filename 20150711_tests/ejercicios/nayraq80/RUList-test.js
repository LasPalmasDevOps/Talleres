/*global describe, it, before */

"use strict";

var buster = require("buster");
var RUList = require("../lib/RUList");

buster.spec.expose();
var expect = buster.expect;

describe("Recently-Used List", function() {
    before(function() {
        this.list = new RUList();
    });

    it("is initially empty", function() {
        expect(this.list.length).toEqual(0);
    });

    it("adds items in reverse order", function() {
        this.list.add('one');
        this.list.add('two');

        expect(this.list.get(0)).toEqual('two');
    });

    it("max number elements is 10", function() {
        var maxNumber = 10;

        for(var i = 0; i < maxNumber; i++)
            this.list.add(i);

        expect(this.list.length).toEqual(maxNumber);

        this.list.add(i + 1);

        expect(this.list.length).toEqual(maxNumber);
    });
});
