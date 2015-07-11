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
    it("mi prueba 1",function(){
//mio ini
        this.list.add('3');
        this.list.add('4');
        this.list.add('5');
        this.list.add('6');
        this.list.add('7');
        this.list.add('8');
        this.list.add('9');
        this.list.add('10');
        this.list.add('11');
        this.list.add('12');
        this.list.add('13');
//fin fin
        expect(this.list.length).toEqual(10);
    });
    it("mi prueba 1",function(){
//mio ini
        this.list.add('3');
        this.list.add('4');
        this.list.add('5');
        this.list.add('6');
        this.list.add('7');
        this.list.add('8');
        this.list.add('9');
        this.list.add('10');
        this.list.add('11');
        this.list.add('12');
        this.list.add('13');
//fin fin
        expect(this.list.get(10)).toEqual('3');
    });    
});
