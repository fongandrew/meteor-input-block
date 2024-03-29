/* global InputBlock: true */
InputBlock = {
  errorTemplate: "",  // Change to name of template if you want a custom error
                      // template to display for validation errors

  dataAttr: "data-prop-name"   // Used to identify which property on schema
                               // an element corresponds to. If not provided,
                               // defaults to an input's name
};

(function() {
  'use strict';

  /** Returns an object full of vars based on input element values
   *  @param {Template.instance} template - Template instance to look for 
   *    input elements in
   *  @param {String} [selector] - Optional jQuery selector to narrow
   *    attributes
   */
  InputBlock.getObj = function(template, selector) {
    var self = this;
    var inputs = template.$('input');
    var selects = template.$('select');
    var textareas = template.$('textarea');
    var elms = inputs.add(selects).add(textareas);
    if (selector) {
      elms = elms.$(selector);
    }

    var ret = {};
    elms.each(function(index, elm) {
      elm = $(elm);
      var propName = elm.attr(self.dataAttr) || elm.attr('name');
      var type = elm.attr('type');
      
      // Ignore unchecked radios / checkboxes
      if (_.contains(['radio', 'checkbox'], type) && !elm.prop('checked')) {
        return; 
      }

      var val = elm.val();

      // Handle multiple return parameters
      if (ret[propName]) {
        if (_.isArray(ret[propName])) {
          ret[propName].push(val);
        }
        else {
          var oldVal = ret[propName];
          ret[propName] = [oldVal, val];
        }
      } else {
        ret[propName] = val;
      }
    });
    
    return ret;
  };

  ////////

  Template.inputBlock.onCreated(function() {
    // Generate a new input _id
    this._inputId = 'ib-' + Random.id(17);
  });

  Template.inputBlock.onRendered(function() {
    // Get all data context attrs (minus propName and schemaContext) to add 
    // to our input element based on context
    var inputAttrs = _.extend({}, this.data);
    delete inputAttrs.propName;
    delete inputAttrs.schemaContext;
    delete inputAttrs.altError;

    // Add id, name attributes
    inputAttrs.id = this._inputId;
    inputAttrs.name = this.data.propName;
    inputAttrs[InputBlock.dataAttr] = this.data.propName;

    // Actually assign to element(s)
    var inputs = this.$('input');
    var selects = this.$('select');
    var textareas = this.$('textarea');
    var elm = inputs.add(selects).add(textareas).first();
    elm.attr(inputAttrs);
  });

  Template.inputBlock.helpers({
    addContext: function() {
      var instance = Template.instance();

      var propName = this.propName;
      var context = this.schemaContext;
      var simpleSchema = context._simpleSchema;

      return _.extend({
        inputId: instance._inputId,
        label: simpleSchema.label(propName),
        validationError: this.altError || context.keyErrorMessage(propName),
        errorTemplate: InputBlock.errorTemplate
      }, this);
    }
  });

})();