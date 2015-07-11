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
        expect(this.list.length).toEqual(2);
    });

    it("full list behaviour", function() {
        this.list.add('one');
        this.list.add('two');
        this.list.add('three');
        this.list.add('four');
        this.list.add('five');
        this.list.add('six');
        this.list.add('seven');
        this.list.add('eight');
        this.list.add('nine');
        this.list.add('ten');
        this.list.add('eleven');

        expect(this.list.length).toEqual(10);
        expect(this.list.get(0)).toEqual('eleven');
        expect(this.list.get(9)).toEqual('two');
    });

    it("repeated item", function() {
        this.list.add('one');
        this.list.add('two');
        this.list.add('two');

        expect(this.list.length).toEqual(2);
        expect(this.list.get(0)).toEqual('two');
        expect(this.list.get(1)).toEqual('one');
    });

    it("repeated item movement", function() {
        this.list.add('one');
        this.list.add('two');
        this.list.add('three');
        this.list.add('two');

        expect(this.list.length).toEqual(3);
        expect(this.list.get(0)).toEqual('two');
        expect(this.list.get(1)).toEqual('three');
        expect(this.list.get(2)).toEqual('one');
    });

    it("repeated first element with full list", function() {
        this.list.add('one');
        this.list.add('two');
        this.list.add('three');
        this.list.add('four');
        this.list.add('five');
        this.list.add('six');
        this.list.add('seven');
        this.list.add('eight');
        this.list.add('nine');
        this.list.add('ten');
        this.list.add('ten');

        expect(this.list.length).toEqual(10);
        expect(this.list.get(0)).toEqual('ten');
        expect(this.list.get(9)).toEqual('one');
    });
});

