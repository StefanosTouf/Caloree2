export default (inpObj, keyToFlatten) => {
  return inpObj.map(({ [keyToFlatten]: flatten, ...others }) => {
    return { ...flatten, ...others };
  });
};
