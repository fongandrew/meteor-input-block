/* global InputBlock: true */
InputBlock = {
  errorTemplate: "",  // Change to name of template if you want a custom error
                      // template to display for validation errors

  inputElmClass: "js-ib-input", // Used to identify our input elements

  dataAttr: "data-prop-name"   // Used to identify which property on schema
                               // an element corresponds to
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
    var elms = template.$('.' + self.inputElmClass);
    if (selector) {
      elms = elms.$(selector);
    }

    var ret = {};
    elms.each(function(index, elm) {
      elm = $(elm);
      var propName = elm.attr(self.dataAttr);
      var val = elm.val();
      ret[propName] = val;
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

    // Add id, name, and class attributes
    inputAttrs.id = this._inputId;
    inputAttrs.name = this._inputId;
    if (inputAttrs.class) { // Override class should not remove inputElmClass
      inputAttrs.class += " " + InputBlock.inputElmClass;
    }
    inputAttrs[InputBlock.dataAttr] = this.data.propName;

    // Actually assign to element
    var inputElm = this.$('.' + InputBlock.inputElmClass).first();
    inputElm.attr(inputAttrs);
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
        errorTemplate: InputBlock.errorTemplate,
        inputElmClass: InputBlock.inputElmClass
      }, this);
    }
  });

})();