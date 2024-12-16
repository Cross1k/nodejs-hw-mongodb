const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') return isFavourite;

  if (typeof isFavourite === 'string') {
    const normalized = isFavourite.toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }

  return;
};

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isGender = (type) => ['work', 'home', 'personal'].includes(type);

  if (isGender(type)) return type;
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(type);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
