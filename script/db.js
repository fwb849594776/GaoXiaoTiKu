// 打开数据库--如若不存在则自动创建
var openDB = function(option,callback){
  var db = api.require("db");
  var ret = db.openDatabaseSync({
    name: 'test'
  });
  callback(ret)
}
// 关闭数据库
var closeDB = function(option,callback){
  var db = api.require('db');
  var ret = db.closeDatabaseSync({
    name: 'test'
  });
  callback(ret)
}
// 执行sql语句
var executeDB = function(option,callback){
  var db = api.require('db');
  var sql = ''
  if(option.tbname == 'Persons'){
    sql = `
            CREATE TABLE IF NOT EXISTS Persons(
                ID  INTEGER PRIMARY KEY AUTOINCREMENT ,
                Name  nvarchar(50)
            )
          `
  }
  if(option.tbname == 'Search'){
    sql = `
            CREATE TABLE IF NOT EXISTS Search(
                id  INTEGER PRIMARY KEY AUTOINCREMENT ,
                Key  nvarchar(50)
            )
          `
  }
  createtb({
    sql: sql
  },function(res){
    if(res.status){
      var ret = db.executeSqlSync({
        name: 'test',
        sql: option.sql
      });
      callback(ret)
    }
  })
}
// 创建表
var createtb = function(option,callback){
  var db = api.require('db');
  var ret = db.executeSqlSync({
    name: 'test',
    sql: option.sql
  });
  callback(ret)
}
// 查询表
var select = function(option,callback){
  var db = api.require('db');
  var ret = db.selectSqlSync({
    name: 'test',
    sql: option.sql
  });
  callback(ret)
}
// 删除表
var deltb = function(option,callback){
  var db = api.require('db');
  var ret = db.executeSqlSync({
    name: 'test',
    sql: 'DROP TABLE ' + option.tbname
  });
  callback(ret)
}
// 清空表
var cleartb = function(option,callback){
  var db = api.require('db');
  var ret = db.executeSqlSync({
    name: 'test',
    sql: 'DELETE FROM ' + option.tbname
  });
  callback(ret)
}
