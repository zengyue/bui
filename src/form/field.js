/**
 * @fileOverview 表单域的入口文件
 * @ignore
 */
;(function(){
var BASE = 'bui/form/';
define(BASE + 'field',['bui/common',BASE + 'textfield',BASE + 'datefield',BASE + 'selectfield',BASE + 'hiddenfield',
  BASE + 'numberfield',BASE + 'checkfield',BASE + 'radiofield',BASE + 'checkboxfield',BASE + 'plainfield',BASE + 'listfield',
  BASE + 'checklistfield',BASE + 'radiolistfield'],function (require) {
  var BUI = require('bui/common'),
    Field = require(BASE + 'basefield');

  BUI.mix(Field,{
    Text : require(BASE + 'textfield'),
    Date : require(BASE + 'datefield'),
    Select : require(BASE + 'selectfield'),
    Hidden : require(BASE + 'hiddenfield'),
    Number : require(BASE + 'numberfield'),
    Check : require(BASE + 'checkfield'),
    Radio : require(BASE + 'radiofield'),
    Checkbox : require(BASE + 'checkboxfield'),
    Plain : require(BASE + 'plainfield'),
    List : require(BASE + 'listfield'),
    Combox : require(BASE + 'comboxfield'),
    Uploader : require(BASE + 'uploaderfield'),
    CheckList : require(BASE + 'checklistfield'),
    RadioList : require(BASE + 'radiolistfield')
  });

  return Field;
});

})();
