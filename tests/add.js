var assert = require('assert'),
    lo = require('lodash');
var Qs = require('../index');



describe("adding a parameter to a query string",function(){
    var QueryString = 'material[]=cott&material[]=polye&sort=price&way=asc',
        Query = Qs.parse(QueryString);

    before(function () {

    });

    describe("adding a parameter as an object",function(){
        it("is adds a single value",function(){
            assert(addSingleValue(Query,{material : 'polya'}));
        });

        it("is adds multiple values",function(){
            assert(addSingleValue(Query,{material : 'polya',size: 'big'}));
        });
    });
});

function addSingleValue(query,value){
    var temp,
        keyVal = lo.pairs(value);

    if (lo.isObject(value)){
        temp = Qs.add(query,value);
        if (!lo.has(temp,keyVal[0][0])){
            return false;
        }
        return true;
    }
}

function addMultipleValues(query,value){
    var temp,
        keyVal = lo.pairs(value);

    if (lo.isObject(value)){
        temp = Qs.add(query,value);
        if (!lo.has(temp,keyVal[0][0])){
            return false;
        }
        return true;
    }
}