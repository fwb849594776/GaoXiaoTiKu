// 添加搜索记录
var addSearchHistory = function(option,callback){
  executeDB({
    tbname: 'Search',
    sql: 'insert into Search(id,Key) values (NULL,"'+option.key+'")'
  },function(res){
    callback(res)
  })
}

// 查询搜索历史
var searchResult = function(option,callback){
  select({
    sql:"select * from Search GROUP BY Key ORDER BY id DESC LIMIT 10"
  },function (res) {
    callback(res.data)
  })
}

// 清空搜索历史
var clear = function(option,callback){
  cleartb({
    tbname:'Search'
  },function(res){
    callback(res)
  })
}
