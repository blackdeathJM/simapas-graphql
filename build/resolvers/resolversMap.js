"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const unionMutation_1 = __importDefault(require("./unionMutation"));
const unionQuery_1 = __importDefault(require("./unionQuery"));
const unionSubscription_1 = __importDefault(require("./unionSubscription"));
const unionTypes_1 = __importDefault(require("./unionTypes"));
const resolvers = Object.assign(Object.assign(Object.assign(Object.assign({}, unionQuery_1.default), unionMutation_1.default), unionTypes_1.default), unionSubscription_1.default);
exports.default = resolvers;
