export const loadInitialDataSocket = socket => {
  return dispatch => {
    // dispatch(clearAllItems())
    socket.on("initialList", res => {
      console.dir(res);
    });
  };
};
