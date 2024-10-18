export const validateQueryParameters = (query: any) => {
  if (Object.keys(query).length === 0) {
    return {
      success: false,
      result: {
        error: 'No query parameters provided',
      },
    };
  }
  return null;
};
