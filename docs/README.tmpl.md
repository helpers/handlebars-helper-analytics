# {%= name %} {%= badge("fury") %}

> {%= description %}

## Install
{%= include("install") %}

To use with [Assemble](https://github.com/assemble/assemble), make sure you also specify the helper in the Assemble options, e.g.:

```js
options: {
  helpers: ['handlebars-helper-analytics']
}
```

## Usage

```handlebars
{{analytics [context] [placement]}}
```

Assuming you have the following data object:

```js
google: {
  analytics: {
    account: "UA-XXXXXX",
    sideid: "XXXXXXX"
  }
}
```

You would pass the `google.analytics` object as context to the helper, like this:

```handlebars
{{analytics google.analytics 'head'}}
{{analytics google.analytics 'footer'}}
```

### placement

* `head` will render the script that should be used in the `<head></head>`
* `footer` will render the script that should be used in the footer, e.g. last thing inside the `<body></body>` tag.


## Author
{%= contrib("json") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}