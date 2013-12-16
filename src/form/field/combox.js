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
    if(filter){
      var rst = [];
      BUI.each(items, function(item){
        if(item.text.indexOf(filter) !== -1){
          rst.push(item);
        }
      })
      return rst;
    }
    return items;
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
        var items = formatItems(_self.get('items')),
          picker = new Picker.ListPicker({
          trigger: innerControl,
          autoSetValue: false,
          children: [{
            elCls:'bui-select-list',
            items: items
          }],
          valueField: innerControl
        }).render();
        // picker.get('el').css('min-width', innerControl.outerWidth());
        _self.set('picker', picker);
        _self.set('items', items);
        //绑定picker的事件
        _self._initPickerEvent();

        _self._initMinWidth();
        _self._initMaxHeight();
      })
    },
    /**
     * 初始化picker的事件
     */
    _initPickerEvent: function(){
      var _self = this,
        innerControl = _self.getInnerControl(),
        items = _self.get('items'),
        picker = _self.get('picker'),
        list = picker.get('list');

      //在picker的show时和输入框值的改变时，都需要重新获取里面的item项
      picker.on('show', function(ev){
        list.set('items', filterItem(items, innerControl.val()));
      });
      innerControl.on('keyup', function(ev){
        list.set('items', filterItem(items, innerControl.val()));
        picker.show();
      });
    },
    /**
     * 初始化Picker的宽度
     * @private
     */
    _initMinWidth: function(){
      var _self = this,
        minWidth = _self.get('minWidth') || _self.getInnerControl().outerWidth(),
        picker = _self.get('picker');
      _self.set('minWidth', minWidth);
    },
    /**
     * 初始化picker的最大高度
     * @private
     */
    _initMaxHeight: function(){
      var maxHeight = this.get('maxHeight');
      if(maxHeight){
        this.set('maxHeight', maxHeight);
      }
    },
    _uiSetMinWidth: function(v){
      var picker = this.get('picker');
      if(picker && picker.isController){
        picker.get('el').css('min-width', v);
      }
    },
    _uiSetMaxHeight: function(v){
      var picker = this.get('picker');
      if(picker && picker.isController){
        picker.get('el').css('max-height', v);
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
      },
      /**
       * picker的最小宽度
       * @type {Object}
       */
      minWidth:{
        view: true
      },
      /**
       * picker的最高高度
       * @type {Number}
       */
      maxHeight: {
        view: true
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