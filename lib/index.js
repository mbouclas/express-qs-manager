var lo = require('lodash');
var Qs = require('qs');
var QsManager = Object.create(Qs);
QsManager.defaults = {
    indices : false,
    arrayFormat : 'brackets'
};
QsManager.setQuery = setQuery;
QsManager.add = add;
QsManager.has = has;
QsManager.remove = remove;
QsManager.appends = appends;
QsManager.init = init;


function setQuery(query){
    if (lo.isString(query)){
        QsManager.query = QsManager.parse(query);
        return;
    }

    QsManager.query = query;
}

function add(query,val){
    var tempObj = lo.clone(query,true);
    //adding color=1
    if (lo.isString(val)){
        val = QsManager.parse(val);
    }
    //check if key exists in the existing query
    var keyVal = lo.pairs(val);
    keyVal.forEach(function(item){
        if (lo.has(tempObj,item[0])){//so, if the key exists in the tempObj, we need to add is as array
            if (!lo.isArray(tempObj[item[0]])){//it exists, but not as array, convert it
                var tempArr = [tempObj[item[0]]];
                tempArr.push(item[1]);
                tempObj[item[0]] = lo.uniq(tempArr);
                return;
            }
            //it already is an
            tempObj[item[0]].push(item[1]);
            tempObj[item[0]] = lo.uniq(tempObj[item[0]]);
            return;
        }
        tempObj[item[0]] = item[1];
    });

    return tempObj;
}

function remove(query,val){
    var tempObj = lo.clone(query,true);
    //adding color=1
    if (lo.isString(val) && val.indexOf('=')){
        val = QsManager.parse(val);
    }
    //check if key exists in the existing query
    var keyVal = lo.pairs(val);
    keyVal.forEach(function(item){
        if (lo.has(tempObj,item[0])){//so, if the key exists in the tempObj, we need to remove it from the array
            if (!lo.isArray(tempObj[item[0]])){//it exists, but not as array, delete it
                delete tempObj[item[0]];
                return;
            }
            //it already is an
            tempObj[item[0]].splice(tempObj[item[0]].indexOf(item[1]),1);
            return;
        }

    });

    return tempObj;
}

function appends(query,val){
    return QsManager.stringify(QsManager.add(query,val));
}

function exclude(query,val){
    return QsManager.stringify(QsManager.remove(query,val));
}

//has(query,'color','ffff00');
function has(query,field,value){
    var searchFor = {};
    searchFor[field] = query;

    if (!lo.has(query,field)){
        return false;
    }

    if (lo.isArray(query[field])){
        if (query[field].indexOf(value) == -1){
            return false;
        }

        return true;
    }

    return (query[field] != value) ? false : true;
}

function init(options){
    if (options){
        QsManager.options = lo.merge(QsManager.defaults,options);
    }
    return function(req,res,next){
        res.locals.Qs = QsManager;
        next();
    }
}

module.exports = QsManager;