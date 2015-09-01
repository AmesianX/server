﻿var mysql = require('mysql');var config = require('./config.json');var configSql = config['sql'];var pool  = mysql.createPool({	host		: configSql['host'],	port		: configSql['dbport'],	user		: configSql['user'],	password	: configSql['pass'],	database	: configSql['database'],	charset		: configSql['charset'],	timezone	: '+0000'});var logger = require('./../../Common/sources/logger');exports.sqlQuery = function (sqlCommand, callbackFunction) {	pool.getConnection(function(err, connection) {		if (err) {			logger.error('pool.getConnection error: %s', err);			if (callbackFunction) callbackFunction(err, null);			return;		}		connection.query(sqlCommand, function (error, result) {			connection.release();			if (error) {				logger.error('________________________error_____________________');				logger.error('sqlQuery: %s sqlCommand: %s', error.code, sqlCommand);				logger.error(error);				logger.error('_____________________end_error_____________________');			}			if (callbackFunction) callbackFunction(error, result);		});	});};exports.sqlEscape = function (value) {	return pool.escape(value);};