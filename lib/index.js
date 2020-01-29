'use strict';

const Countries = require('i18n-iso-countries');

module.exports = (joi) => {

    return {
        base: joi.string(),
        type: 'string',
        messages: {
            'country.invalid': '{{#label}} needs to be a valid ISO 3166-1 alpha-2 country code'
        },
        rules: {
            country: {
                method(options) {

                    return this.$_addRule('country');
                },
                validate(value, helpers) {

                    if (Countries.isValid(value)) {

                        return value.toUpperCase();
                    }

                    return helpers.error('country.invalid');
                }
            }
        }
    };
};
