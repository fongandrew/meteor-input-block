fongandrew:input-block
======================
This package contains helpers for showing SimpleSchema validation errors on
forms. It provides a lightweight alternative to one part of aldeed:autoform.

Installation
------------
`meteor add fongandrew:input-block`

Usage
-----
The `inputBlock` template can called with the following variables:

  * schemaContext - SimpleSchema context
  * propName - Property in schema this input corresponds to
  * altError - Text of error state (will be displayed in lieu of any 
      validation errors)
  * Any other variables will be treated as attributes on the input element

```handlebars
{{> inputBlock schemaContext=schemaContext 
               placeholder="Name"
               class="name-input my-other-classes"
               propName="name"}}
```
This will generate an input/text field with a label and will reactively 
display a validation error underneath the input.

The `inputBlock` template can also be called with an optional contentBlock 
to use custom input element. The template will mark the first input, textarea, 
or select as the relevant element.

```handlebars
{{#inputBlock schemaContext=schemaContext propName="emailLocal"
              altError=duplicateErrorText}}
  <textarea class="my-class">Default Text</textarea>
{{/inputBlock}}
```

`InputBlock.getObj(template, selector)` can be used to retrieve values from
all InputBlock inputs in a given template instance and returns the 
corresponding JavaScript object. Also takes an optional jQuery selector to
narrow which inputs get examined.