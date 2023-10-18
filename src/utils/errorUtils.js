export const handleError = (error) => {
  if (error.response?.data?.data) {
    const { code, message, status, errors = {} } = error.response.data.data;

    return {
      code,
      message,
      errors,
      status: status ?? error.response.status,
    };
  } else {
    const { code, message, errors = {} } = error;

    return { code, message, errors };
  }
};
