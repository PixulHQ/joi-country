# Joi Country

A Joi extension for validation of [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes.

### Installation

```
npm install --save @pixul/joi-country
```

### Usage

```js
const BaseJoi = require('@hapi/joi')
const JoiCountryExtension = require('@pixul/joi-country')
const Joi = BaseJoi.extend(JoiCountryExtension)

const schema = Joi.string().country()
const result = await schema.validate('gb')

console.log(result) // GB
```


### Credits

This plugin is a fork & rewrite of https://github.com/Tallysticks/joi-country-extension to support joi > 16