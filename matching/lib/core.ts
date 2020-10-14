import levenshtein from "js-levenshtein";

export const indexMap = {
  id: 0,
  companyName: 1,
  url: 2,
  phoneNumber: 4,
};
export const weights = [0, 4, 4, 1, 2, 2, 3, 0, 0];

export const stopWords = ["consulting", "group", "company"];

export function isPerfectMatch(companyA: string[], companyB: string[]) {
  return (
    companyA[indexMap.companyName] === companyB[indexMap.companyName] &&
    companyA[indexMap.url] === companyB[indexMap.url]
  );
}

export function getRelativeDistance(a: string, b: string) {
  if (a.length === 0 && b.length === 0) {
    // we consider empty string as no info, this is not a sign of similarity
    return 1;
  }
  return levenshtein(a, b) / Math.max(a.length, b.length);
}

export function getMatchingScore(
  companyA: string[],
  companyB: string[],
  weights: number[]
) {
  let divider = 0;
  const cleanA = cleanData(companyA);
  const cleanB = cleanData(companyB);
  const overallDistance = cleanA.reduce(
    (acc: number, value: string, index: number) => {
      if (!value.length || !cleanB[index].length || weights[index] === 0) {
        return acc;
      }
      acc += weights[index] * getRelativeDistance(value, cleanB[index]);
      divider += weights[index];
      return acc;
    },
    0
  );

  return divider > 0 ? 1 - overallDistance / divider : 0;
}

export function cleanURL(url: string) {
  return url.replace("http://", "").replace("www.", "");
}

export function cleanPhoneNumber(phone: string) {
  return phone.replace("+", "").replace("(", "").replace(")", "");
}

export function cleanName(companyName: string) {
  let result = companyName;
  stopWords.forEach((w) => {
    result = result.replace(" " + w, "");
  });
  return result;
}

export function cleanData(company: string[]) {
  const result = [...company];
  result[indexMap.url] = cleanURL(company[indexMap.url]);
  result[indexMap.phoneNumber] = cleanPhoneNumber(
    company[indexMap.phoneNumber]
  );
  result[indexMap.companyName] = cleanName(company[indexMap.companyName]);
  return result;
}
