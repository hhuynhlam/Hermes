var qb = require('./query-builder');

var test = qb({
                'select' : [ 'email' ],
                'route'  : 'Users',
                'where'  : [ 
                             { 'key'   : 'lastname',
                               'value' : 'Huynh',
                               'operator' : '=',
                             }
                           ],
                'offset' : '3',
              });

console.log(test);
