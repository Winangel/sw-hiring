"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanData = exports.cleanName = exports.cleanPhoneNumber = exports.cleanURL = exports.getMatchingScore = exports.getRelativeDistance = exports.isPerfectMatch = exports.stopWords = exports.weights = exports.indexMap = void 0;
var js_levenshtein_1 = __importDefault(require("js-levenshtein"));
exports.indexMap = {
    id: 0,
    companyName: 1,
    url: 2,
    phoneNumber: 4,
};
exports.weights = [0, 4, 4, 1, 2, 2, 3, 0, 0];
exports.stopWords = ["consulting", "group", "company"];
function isPerfectMatch(companyA, companyB) {
    return (companyA[exports.indexMap.companyName] === companyB[exports.indexMap.companyName] &&
        companyA[exports.indexMap.url] === companyB[exports.indexMap.url]);
}
exports.isPerfectMatch = isPerfectMatch;
function getRelativeDistance(a, b) {
    if (a.length === 0 && b.length === 0) {
        // we consider empty string as no info, this is not a sign of similarity
        return 1;
    }
    return js_levenshtein_1.default(a, b) / Math.max(a.length, b.length);
}
exports.getRelativeDistance = getRelativeDistance;
function getMatchingScore(companyA, companyB, weights) {
    var divider = 0;
    var cleanA = cleanData(companyA);
    var cleanB = cleanData(companyB);
    var overallDistance = cleanA.reduce(function (acc, value, index) {
        if (!value.length || !cleanB[index].length || weights[index] === 0) {
            return acc;
        }
        acc += weights[index] * getRelativeDistance(value, cleanB[index]);
        divider += weights[index];
        return acc;
    }, 0);
    return divider > 0 ? 1 - overallDistance / divider : 0;
}
exports.getMatchingScore = getMatchingScore;
function cleanURL(url) {
    return url.replace("http://", "").replace("www.", "");
}
exports.cleanURL = cleanURL;
function cleanPhoneNumber(phone) {
    return phone.replace("+", "").replace("(", "").replace(")", "");
}
exports.cleanPhoneNumber = cleanPhoneNumber;
function cleanName(companyName) {
    var result = companyName;
    exports.stopWords.forEach(function (w) {
        result = result.replace(" " + w, "");
    });
    return result;
}
exports.cleanName = cleanName;
function cleanData(company) {
    var result = __spreadArrays(company);
    result[exports.indexMap.url] = cleanURL(company[exports.indexMap.url]);
    result[exports.indexMap.phoneNumber] = cleanPhoneNumber(company[exports.indexMap.phoneNumber]);
    result[exports.indexMap.companyName] = cleanName(company[exports.indexMap.companyName]);
    return result;
}
exports.cleanData = cleanData;
