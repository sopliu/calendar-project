/**
 * Capitalizes the first letter of each word in a sentence.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The string with the first letter of each word capitalized.
 */
export const capitaliseSentence = (str: string) => {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

/**
 * Extracts and capitalizes the error message from Firebase Auth errors.
 *
 * @param {string} errorMsg - The error message from Firebase Auth.
 * @returns {string} The formatted error message.
 */
// TODO: Remomve last bracket from unencoded error message
export const getFirebaseErrorMsg = (errorMsg: string) => {
  console.log(errorMsg);
  const match = errorMsg.match(/auth\/([^\s]+)/);
  return match ? capitaliseSentence(match[1].replace("-", " ")) : errorMsg;
};
