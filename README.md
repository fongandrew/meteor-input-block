fongandrew:input-block
======================

inputBlock template can called with the following variables:

  * schemaContext - SimpleSchema context
  * propName - Property in schema this input corresponds to
  * altError - Text of error state (will be displayed in lieu of any 
      validation errors)
  * Any other variables will be treated as attributes on the input element

Can be called with an optional contentBlock to custom input element. If
using a custom input element, the element should have the 
"js-ib-input" class (or whatever is set on InputBlock.inputElmClass).
