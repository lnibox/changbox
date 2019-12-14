"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isemail_1 = __importDefault(require("isemail"));
const rest_1 = require("@loopback/rest");
function validateCredentials(credentials) {
    // Validate Email
    if (!isemail_1.default.validate(credentials.email)) {
        throw new rest_1.HttpErrors.UnprocessableEntity('invalid email');
    }
    // Validate Password Length
    if (!credentials.password || credentials.password.length < 8) {
        throw new rest_1.HttpErrors.UnprocessableEntity('password must be minimum 8 characters');
    }
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=validator.js.map