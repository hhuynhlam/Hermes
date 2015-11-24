'use strict';

var _ = require('lodash');

var queryBuilder = {
    
    // build params string
    params: function (keys, body) {
        var query = [];

        _.forEach(keys, (k) => {
            query.push( (body[k]) ? '\'' + body[k] + '\'' : 'NULL' );
        });

        return query.join(', ');
    },

    // build select string
    select: function(body) {
        var query, columns, table, where;

        // Build columns of query
        if (body.select instanceof Array) {
            columns = body.select.join(',');
            columns = '"' + columns + '"';
        }
        else {
            columns = '*';
        }
        query = 'SELECT ' + columns;

        // determine table name 
        if (body.route) {
            table = body.route; 
        }
        else {
            return 'Route not defined';
        }
        query += ' FROM ' + table;
        
        // Build where clause
        if (body.where instanceof Array) {
            var whereList = [];
            body.where.forEach(function(eachWhere) {
                whereList.push(eachWhere.key + eachWhere.operator + '\'' + eachWhere.value + '\'');
            });
            where = whereList.join(' AND ');
            query += ' WHERE ' + where;
        }

        // Build offset, limit clause
        if (body.offset) {
            query += ' OFFSET ' + body.offset;
        }

        if (body.limit) {
            query += ' LIMIT ' + body.limit;
        }

        return query;
    }
};

module.exports = queryBuilder;
