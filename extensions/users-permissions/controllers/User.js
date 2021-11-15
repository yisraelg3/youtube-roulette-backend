'use strict';

const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
 const _ = require('lodash');
 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

 const sanitizeUser = user =>
 sanitizeEntity(user, {
   model: strapi.query('user', 'users-permissions').model,
 });

module.exports = {
    async choosevideo(ctx) {
        console.log(ctx)
    },
    async me(ctx) {
        const {id} = ctx.params
        let data = await strapi.query('user', 'users-permissions').findOne({
            id,
        });
        if (data) {
            data = sanitizeUser(data);
        }
        // const user = ctx.state.user;
        // if (!user) {
        //   return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        // }
        ctx.body = sanitizeUser(data);
    }
};