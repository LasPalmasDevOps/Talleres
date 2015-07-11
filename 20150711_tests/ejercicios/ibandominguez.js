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

  it("lists length must be 10", function() {
    for (var i = 0; i < 11; i++) {
      this.list.add('item' + i);
    }

    expect(this.list.length).toEqual(10);
  });

  it("it replaces current values", function() {
    for (var i = 0; i < 11; i++) {
      this.list.add('item' + (i+1));
    }

    expect(this.list.get(0)).toEqual('item11');
  });
});
