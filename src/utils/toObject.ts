const toObject = (inputValue: any) => JSON.parse(
    JSON.stringify(
      inputValue,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  );

export default toObject;
