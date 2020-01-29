'use strict';

const Code                  = require('@hapi/code');
const Lab                   = require('@hapi/lab');
const Joi                   = require('@hapi/joi');
const JoiCountry            = require('../lib');

const { ValidationError }   = Joi;

// Test shortcuts

const { it }     = exports.lab = Lab.script();
const { expect } = Code;

it('should register joi extension', () => {

    try {

        const customJoi = Joi.extend(JoiCountry);
        expect(customJoi._types.has('country')).to.equal(true);
    }
    catch (err) {

        Code.fail(`Error in Joi extension creation : ${err}`);
    }
});

it(`should pass validation if valid IMO number provided`, async () => {

    const customJoi = Joi.extend(JoiCountry);
    const schema = customJoi.country();
    const result = await schema.validateAsync('GB');
    expect(result).to.equal('GB');
});

it(`should fail validation if IMO number provided without the 'IMO' prefix`, async () => {

    const customJoi = Joi.extend(JoiCountry);
    const schema = customJoi.country();
    const result = await schema.validateAsync('de');
    expect(result).to.equal('DE');
});

it(`should fail validation if invalid string is provided`, async () => {

    const customJoi = Joi.extend(JoiCountry);
    const schema = customJoi.country();
    await expect(schema.validateAsync('Denmark')).to.reject(ValidationError, '"value" needs to be a valid ISO 3166-1 alpha-2 country code');
});

it(`should fail validation if IMO number is not provided as a string`, async () => {

    const customJoi = Joi.extend(JoiCountry);
    const schema = customJoi.country();
    await expect(schema.validateAsync(123)).to.reject(ValidationError, '"value" must be a string');
});
