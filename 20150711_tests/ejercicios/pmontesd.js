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

	it("is limited to 10 items", function() {
		for (var i = 0, len = 10; i < len; i++) {
			this.list.add('item ' + i);
		}

		this. list.add('new item');
		expect(this.list.length).toEqual(10);
	});

	it("discards previous when repeating item", function() {
		for (var i = 0, len = 2; i < len; i++) {
			this.list.add('item ' + i);
		}

		this. list.add('item 0');
		expect(this.list.get(0)).toEqual('item 0');
		expect(this.list.get(1)).toEqual('item 1');
	});

	it("discards oldest item when max size is reached", function() {
		for (var i = 0, len = 10; i < len; i++) {
			this.list.add('item ' + i);
		}

		this. list.add('new item');
		expect(this.list.get(this.list.length-1)).toEqual('item 1');
	});

});
