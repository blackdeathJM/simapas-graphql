"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const constants_1 = require("../../config/constants");
const docExtSubscription = {
    Subscription: {
        todosDocsExt: {
            subscribe: (_, __, {pubsub}) => {
                return pubsub.asyncIterator([constants_1.SUBSCRIPCIONES.NOT_DOC_EXTERNA]);
            }
        }
    }
};
exports.default = docExtSubscription;
