module.exports = (date) => {
  return {
    date: {
      $gt: new Date(date).setHours(0, 0, 0, 0),
      $lt: new Date(date).setHours(24, 0, 0, 0),
    },
  };
};
