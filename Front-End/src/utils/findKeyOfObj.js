// utils.js

export default function findValue(obj, targetKey) {
  // Base case: if obj is not an object, return an empty string
  if (typeof obj !== "object" || obj === null) {
    return "";
  }

  // Check if the targetKey exists in the current object
  if (obj.hasOwnProperty(targetKey)) {
    return obj[targetKey];
  }

  // Check if the targetKey exists in any nested objects
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const value = findValue(obj[key], targetKey);
      if (value !== "") {
        return value;
      }
    }
  }

  // If targetKey is not found in any nested objects, return an empty string
  return "";
}
