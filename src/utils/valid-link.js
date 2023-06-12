export const isValidLink = (url) => {
  let linkPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return linkPattern.test(url);
};
