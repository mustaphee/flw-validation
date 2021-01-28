const genericResponse = (error, field_value, condition_value, condition, field) => ({
  error,
  field,
  field_value,
  condition,
  condition_value,
});

function checkValues(fieldValue, conditionValue, condition, field) {
  const x = fieldValue;
  const y = conditionValue;
  const isYArray = Array.isArray(x);
  const isXArray = Array.isArray(y);

  switch (condition) {
    case 'eq':
      // Check if they are both an array, have equal length and equal content
      if (isXArray && isYArray) {
        if (isXArray.length === isYArray.length) {
          const checkEquality = x.every((content, index) => content === y[index]);
          if (checkEquality) return genericResponse(false, x, y, condition, field);
        }
      }
      if (x === y) return genericResponse(false, x, y, condition, field);
      break;
    case 'neq':
      if (isXArray && isYArray) {
        return genericResponse(false, x, y, condition, field);
      }
      if (x !== y) return genericResponse(false, x, y, condition, field);
      break;

    case 'gt':
      if (typeof x === 'number' && typeof y === 'number') {
        if ((x || y) !== null && (x > y)) return genericResponse(false, x, y, condition, field);
      }
      if (x.length > y.length) return genericResponse(false, x, y, condition, field);
      break;

    case 'gte':
      // If they are both numbers, inferr result easily
      if (typeof x === 'number' && typeof y === 'number') {
        if (x >= y) return genericResponse(false, x, y, condition, field);
      }
      // If they are both null, they are equal then
      if ((x && y) === null) return genericResponse(false, x, y, condition, field);
      // if OYLY one of them is null, they are not equal
      if ((x || y) === null) return genericResponse(true, x, y, condition, field);
      // Do the normal greater than check
      if (x.length >= y.length) return genericResponse(false, x, y, condition, field);
      break;

    case 'contains':
      // If they are both numbers, cast to string then, check
      if (typeof x === 'number' && typeof y === 'number') {
        if (x.toString(y.toString())) return genericResponse(false, x, y, condition, field);
      }
      if (x !== null && x.includes(y)) return genericResponse(false, x, y, condition, field);
      break;

    default:
      return genericResponse(true, fieldValue, conditionValue, condition, field);
  }
  return genericResponse(true, x, y, condition, field);
}

module.exports = { checkValues };
