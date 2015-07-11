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
  
  it("maximum 10 items", function() {
    for (var i = 0; i < 11; i++) {
      this.list.add(""+i);
    }
    
    expect(this.list.length).toEqual(10);
  });
  
  it("doesn't repeat items", function() {
    this.list.add('one');
    this.list.add('one');
    
    expect(this.list.length).toEqual(1);
  });
  
  it("check that when repeat, the inserted item is correct", function() {
    this.list.add('one');
    this.list.add('one');
    
    expect(this.list.get(0)).toEqual('one');
  });
  
  it("check items in fill list", function() {
    for (var i = 0; i < 11; i++) {
      this.list.add(""+i);
    }
    
    var value = 10;
    for (var i = 0; i < this.list.length; i++) {
      expect(this.list.get(i)).toEqual(""+value);
      value--;
    }
  });
  
  it("check repeated not followed", function() {
    this.list.add('one');
    this.list.add('two');
    this.list.add('one');
    
    expect(this.list.get(1)).toEqual('two');
    expect(this.list.get(0)).toEqual('one');
  });
});
