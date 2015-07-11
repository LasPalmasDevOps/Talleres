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
        this.list.add('three');

        expect(this.list.get(0)).toEqual('three');
        expect(this.list.get(1)).toEqual('two');
        expect(this.list.get(2)).toEqual('one');
        expect(this.list.length).toEqual(3);
    });

    it("doesn't repeat items", function() {
        this.list.add('one');
        this.list.add('two');
        this.list.add('one');

        expect(this.list.get(0)).toEqual('one');
        expect(this.list.get(1)).toEqual('two');
        expect(this.list.length).toEqual(2);
    });

    it("remove repeated over 10", function() {
        for (var i=0; i < 10; i++) {
            this.list.add('item-' + i);
        }        
        this.list.add('item-2');

        expect(this.list.length).toEqual(10);
        expect(this.list.get(0)).toEqual('item-2');
        expect(this.list.get(1)).toEqual('item-9');        
        expect(this.list.get(9)).toEqual('item-0');
    });

    it("add false items", function() {
        this.list.add('');
        this.list.add(false);
        this.list.add(0);
        this.list.add(null);
        expect(this.list.length).toEqual(4);
    });
});
