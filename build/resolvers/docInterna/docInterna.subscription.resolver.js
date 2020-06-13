"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const constants_1 = require("../../config/constants");
const docInternaSubscription = {
    Subscription: {
        todosDocInterna: {
            subscribe: (_, __, {pubsub}) =>
            {
                return pubsub.asyncIterator([constants_1.SUBSCRIPCIONES.NOT_DOC_INTERNA]);
            }
        },
    }
};
exports.default = docInternaSubscription;
