(async function () {
  try {
    return await Promise.reject(new Error('SHAME ON YOU'));
  } catch (error) {
    console.log(error);
  }
})();
