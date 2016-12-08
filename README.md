# iigb-cms-tags
Parses cms-field tags in text files (e.g. html) to extract field definitions that is intended to be used by cms.

### Example

Field attributes are defined using yaml between cms-field tags.  Heavily inspired by prose.io metadata configuration.

```
[cms-field]
    name: pageTitle
    label: Page Title
    help:
    type: text
    required: true
    placeHolder:
[/cms-field]

```

__Tip__: You can place cms-field definitions within html comment blocks, it will still work.

### CMS Field attributes

#### Text
- __type__: text
- __label__: _(optional string)_ Label to the user
- __help__: _(optional string)_ Help/description to accompany a label
- __value__: _(optional string)_ A default value
- __placeholder__: _(optional string)_ Helper text in the input if no value is provided.
- __required__: _(boolean)_ true or false ( default is false). If no default value is provided user must supply this value.

#### Textarea
- __type__: textarea
- __label__: _(optional string)_ Label to the user
- __help__: _(optional string)_ Help/description to accompany a label
- __value__: _(optional string)_ A default value
- __placeholder__: _(optional string)_ Helper text in the textarea if no value is provided.
- __required__: _(boolean)_ true or false ( default is false). If no default value is provided user must supply this value.

#### Select & Multiselect

Allow a user to make one or more selections

- __type__: select OR multiselect
- __label__: _(optional string)_ Label to the user
- __help__: _(optional string)_ Help/description to accompany a label
- __options__: _(array)_ format should look like:

```yaml
options:
  - name: 'Granny Apples'
    value: 'granny-apples'
```
- __placeholder__: _(optional string)_ Helper text if no value is provided

__(Multiselect only)__
- __alterable__: _(optional boolean)_ true or false whether a user can add
-       additional values. Useful for tags.

#### Hidden

This is particularly useful for frontmatter fields that should always have a fixed value and not changed. 

- __type__: hidden
- __value__: _(optional string)_ The default value

#### Number

- __type__: number
- __label__: _(optional string)_ Label to the user
- __help__: _(optional string)_ Help/description to accompany a label
- __value__: _(optional integer)_ A default integer
- __type__: number
- __required__: _(boolean)_ true or false ( default is false). If no default value is provided user must supply this value.


#### Checkbox
Toggles on a true or false state

- __element__: checkbox
- __label__: _(optional string)_ Label to the user
- __help__: _(optional string)_ Help/description to accompany a label
- __value__: _(boolean)_ true or false

