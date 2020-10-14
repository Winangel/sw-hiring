import { isGetAccessor } from "typescript";
import {
  cleanData,
  getRelativeDistance,
  isPerfectMatch,
  indexMap,
  getMatchingScore,
  weights,
} from "./core";

const companyA = [
  "123",
  "bob company",
  "http://www.bobcompany.com",
  "",
  "+(33) 12 34 56 78",
  "4 Rue Paul Dautier",
  "78140,Vélizy-Villacoublay",
  "France",
];

const companyB = [
  "1238",
  "bob compani",
  "http://www.bobcomany.com",
  "",
  "+33 12 31 31 31",
  "4 avenue des champs élysées",
  "75008 Paris",
  "France",
];

const companyC = [
  "1238",
  "bob company",
  "http://www.bobcompany.com",
  "",
  "+33 12 31 31 31",
  "4 avenue des champs élysées",
  "75008 Paris",
  "France",
];

describe("core", () => {
  describe("isPerfectMatch", () => {
    it("should identify same company as perfect match", () => {
      expect(isPerfectMatch(companyA, companyA)).toBeTruthy();
    });
    it("should take only name and url into account", () => {
      expect(isPerfectMatch(companyA, companyC)).toBeTruthy();
    });
    it("should return false for a small difference in name or url", () => {
      expect(isPerfectMatch(companyA, companyB)).toBeFalsy();
    });
  });

  describe("getRelativeDistance", () => {
    it("should be symmetrical", () => {
      expect(getRelativeDistance("alice", "bob")).toEqual(
        getRelativeDistance("bob", "alice")
      );
    });

    it("should be 0 for same string", () => {
      expect(getRelativeDistance("alice", "alice")).toEqual(0);
    });

    it("should be 1 for distance with empty string", () => {
      expect(getRelativeDistance("alice", "")).toEqual(1);
    });
  });

  describe("cleanData", () => {
    it("should sanitize url, phonenumbers and name", () => {
      const cleanedCompany = cleanData(companyA);
      expect(cleanedCompany[indexMap.url]).toEqual("bobcompany.com");
      expect(cleanedCompany[indexMap.phoneNumber]).toEqual("33 12 34 56 78");
      expect(cleanedCompany[indexMap.companyName]).toEqual("bob");
    });
  });

  describe("getMatchingScore", () => {
    it("should identify perfect match", () => {
      expect(getMatchingScore(companyA, companyA, weights)).toEqual(1);
    });
    it("should identify no match at all", () => {
      expect(
        getMatchingScore(companyA, new Array(9).fill(""), weights)
      ).toEqual(0);
    });
  });
});
