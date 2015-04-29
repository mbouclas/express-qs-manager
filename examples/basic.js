var Qs = require('../index');
var QueryString = 'material[]=cott&material[]=polye&sort=price&way=asc',
    Query = Qs.parse(QueryString);

Qs.add(Query,{material : 'polya',color : ['ffff00','white']});

/*var Stringified = Qs.stringify(Query);
console.log(Stringified);
console.log(Qs.parse(Stringified));*/
/*

console.log(Qs.add(Query,{page : 1,color:'red'}));
console.log(Qs.add(Query,{page : 2,color:'blue'}));
console.log(Qs.add(Query,{page : 3,color:'yellow'}));
*/

console.log(Qs.stringify(Qs.add(Query,'color=red')));
console.log(Qs.stringify(Qs.add(Query,'color=blue')));

console.log(Query);
console.log(Qs.remove(Query,{material :'cott'}));
console.log(Qs.remove(Query,'price'));