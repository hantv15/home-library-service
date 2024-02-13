// Local dependencies

export const getFromToDate = (from?: Date, to?: Date) => {
  const today = new Date();
  let _from = new Date(today.getFullYear(), today.getMonth(), 1).getTime();

  let _to = new Date(today.getFullYear(), today.getMonth() + 1, 0).getTime();

  if (from) {
    _from = new Date(from).getTime();
  }

  if (to) {
    _to = new Date(to).getTime();
  }

  return { fromDate: _from.toString(), toDate: _to.toString() };
};
