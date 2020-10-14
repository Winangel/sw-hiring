"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var companyA = [
    "123",
    "bob company",
    "http://www.bobcompany.com",
    "",
    "+(33) 12 34 56 78",
    "4 Rue Paul Dautier",
    "78140,Vélizy-Villacoublay",
    "France",
];
var companyB = [
    "1238",
    "bob compani",
    "http://www.bobcomany.com",
    "",
    "+33 12 31 31 31",
    "4 avenue des champs élysées",
    "75008 Paris",
    "France",
];
var companyC = [
    "1238",
    "bob company",
    "http://www.bobcompany.com",
    "",
    "+33 12 31 31 31",
    "4 avenue des champs élysées",
    "75008 Paris",
    "France",
];
describe("core", function () {
    describe("isPerfectMatch", function () {
        it("should identify same company as perfect match", function () {
            expect(core_1.isPerfectMatch(companyA, companyA)).toBeTruthy();
        });
        it("should take only name and url into account", function () {
            expect(core_1.isPerfectMatch(companyA, companyC)).toBeTruthy();
        });
        it("should return false for a small difference in name or url", function () {
            expect(core_1.isPerfectMatch(companyA, companyB)).toBeFalsy();
        });
    });
    describe("getRelativeDistance", function () {
        it("should be symmetrical", function () {
            expect(core_1.getRelativeDistance("alice", "bob")).toEqual(core_1.getRelativeDistance("bob", "alice"));
        });
        it("should be 0 for same string", function () {
            expect(core_1.getRelativeDistance("alice", "alice")).toEqual(0);
        });
        it("should be 1 for distance with empty string", function () {
            expect(core_1.getRelativeDistance("alice", "")).toEqual(1);
        });
    });
    describe("cleanData", function () {
        it("should sanitize url, phonenumbers and name", function () {
            var cleanedCompany = core_1.cleanData(companyA);
            expect(cleanedCompany[core_1.indexMap.url]).toEqual("bobcompany.com");
            expect(cleanedCompany[core_1.indexMap.phoneNumber]).toEqual("33 12 34 56 78");
            expect(cleanedCompany[core_1.indexMap.companyName]).toEqual("bob");
        });
    });
    describe("getMatchingScore", function () {
        it("should identify perfect match", function () {
            expect(core_1.getMatchingScore(companyA, companyA, core_1.weights)).toEqual(1);
        });
        it("should identify no match at all", function () {
            expect(core_1.getMatchingScore(companyA, new Array(9).fill(""), core_1.weights)).toEqual(0);
        });
    });
});
