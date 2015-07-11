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

    it("doesn't repeat items", function() {
	this.list.add('item');
	this.list.add('item');
        expect(this.list.length).toEqual(1);
    });

    it("list max size is 10", function() {
	for (var i = 0, len = 11; i < len; i++) {
	    this.list.add('item' + i);
	}
        expect(this.list.length).toEqual(10);
    });

    it("oldest item is removed", function() {
	for (var i = 0, len = 10; i < len; i++) {
	    this.list.add('item' + i);
	}
	this.list.add('item10');
        expect(this.list.get(this.list.length-1)).toEqual('item1');
    });

     it("add repeated item as most recent", function() {
        this.list.add('one');
        this.list.add('two');
	this.list.add('one');

        expect(this.list.get(this.list.length-1)).toEqual('one');
    });   

    
});
