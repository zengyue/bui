/**
 * @fileOverview Uri命名空间入口文件
 * @ignore
 */

define('bui/uri',['bui/common','bui/uri/query','bui/uri/path','bui/uri/uri'],function (require) {
  var BUI = require('bui/common'),
    Uri = BUI.namespace('Uri');

  BUI.mix(Uri, {
    Query : require('bui/uri/query'),
    Path : require('bui/uri/path'),
    Uri: require('bui/uri/uri')
  });
  return Uri;
});