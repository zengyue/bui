/**
 * @fileOverview 表单中的下拉选择列表
 * @ignore
 */

define('bui/form/comboxfield',['bui/common','bui/form/basefield','bui/list'],function (require) {
  var BUI = require('bui/common'),
    Field = require('bui/form/basefield');


  function formatItems(items){
    if($.isPlainObject(items)){
      var tmp = [];
      BUI.each(items, function(v,n){
        tmp.push({value : n,text : v});
      });
      return tmp;
    }
    var rst = [];
    BUI.each(items,function(item,index){
      if(BUI.isString(item)){
        rst.push({value : item,text:item});
      }else{
        rst.push(item);
      }
    });
    return rst;
  }

  function filterItem(items, filter){
    var rst = [];
    BUI.each(items, function(item){
      if(filter && item.text.indexOf(filter) === -1){
        return;
      }
      rst.push(item);
    })
    return rst;
  }


  /**
   * @class BUI.Form.Field.Combox
   * 表单中的列表
   * @extends BUI.Form.Field
   */
  var Combox = Field.extend({
    renderUI: function(){
      var _self = this;
      _self._initPicker();
    },
    /**
     * 初始化选择器
     */
    _initPicker: function(){
      var _self = this,
        innerControl = _self.getInnerControl();
      BUI.use('bui/picker', function(Picker){
        var picker = new Picker.ListPicker({
          trigger: innerControl,
          autoSetValue: false,
          children: [{
            elCls:'bui-select-list',
            items: formatItems(_self.get('items'))
          }],
          valueField: innerControl
        }).render();
        picker.get('el').css('min-width', innerControl.outerWidth());
        _self.set('picker', picker);
      })
    },
    bindUI: function(){
      var _self = this,
        innerControl = _self.getInnerControl(),
        items = _self.get('items');

      if(_self.get('inputFilter')){
        innerControl.on('keyup', function(ev){
          var picker = _self.get('picker'),
            list = picker.get('list'),
            val = innerControl.val(),
            childItems = val ? formatItems(items) : filterItem(formatItems(items), val);
          picker.show();
          list.set('items', childItems);
        })
      }
    }
  },{
    ATTRS : {
      /**
       * 选择器
       * @type {BUI.Picker.ListPicker}
       */
      picker: {
      },
      /**
       * 输入时是否自动过滤
       * @type {Object}
       */
      inputFilter: {
        value: true
      }
    }
  },{
    xclass : 'form-field-combox'
  });

  // var Combox = Field.extend({
  //   renderUI: function(){
  //     var _self = this,
  //       combox = _self.get('combox') || {},
  //       innerControl = _self.getInnerControl();
  //     _self._initCombox(combox);
  //   },
  //   /**
  //    * 初始化combox
  //    * @param  {[type]} combox [description]
  //    * @return {[type]}        [description]
  //    */
  //   _initCombox: function(combox){
  //     var _self = this,
  //       items = _self.get('items');

  //     BUI.use('bui/select', function(Select){
  //       combox.render = _self.getControlContainer();
  //       combox.valueField = _self.getInnerControl();
  //       combox.autoRender = true;
  //       if(items){
  //         combox.items = items;
  //       }
  //       combox = new Select.Combox(combox);
  //       _self.set('combox', combox);
  //       _self.set('isCreate',true);
  //       _self.get('children').push(combox);

  //       combox.on('change',function(ev){
  //         var val = combox.getSelectedValue();
  //         _self.set('value',val);
  //       });
  //     })
  //   },
  //   /**
  //    * 设置字段的值
  //    * @protected
  //    * @param {*} value 字段值
  //    */
  //   setControlValue : function(value){
  //     var _self = this,
  //       combox = _self.get('combox'),
  //       innerControl = _self.getInnerControl();
  //     innerControl.val(value);
  //     if(combox && combox.set &&  combox.getSelectedValue() !== value){
  //       select.setSelectedValue(combox);
  //     }
  //   }
  // },{
  //   ATTRS : {
  //     /**
  //      * 选择器
  //      * @type {BUI.Picker.ListPicker}
  //      */
  //     picker: {
  //     },
  //     controlTpl: {
  //       value : '<input type="hidden"/>'
  //     },
  //     combox: {

  //     }
  //   }
  // },{
  //   xclass : 'form-field-combox'
  // });

  return Combox;
});