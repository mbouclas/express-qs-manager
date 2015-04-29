express-qs-manager
======================

A query string manager for express

## What does it do
It allows you to easily manipulate query strings within templates


## Usage
check [the examples folder](https://github.com/mbouclas/express-qs-manager/tree/master/examples) for usage scenarios

Initialize like so :
```
var Qs = require('express-qs-manager');
app.use(Qs.init());
```
then somewhere in your routes assign to a variable the query string from express and pass it to the templates

```
res.render('myTemplate.html',{QueryString : req.query});
```

After that you're good to go. In any template just use the Qs.appends or Qs.exclude methods to either add or remove parameters
from the query string. You can also use the Qs.has method to check if a key-value set is in the query string


```
<a href="?{{ Qs.appends(QueryString,{myKey:'myValue'}) }}"
                       class="{% if Qs.has(QueryString,'myKey','myValue') %} active{%endif%}">
                        A link</a>
```

