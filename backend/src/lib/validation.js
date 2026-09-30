export const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const isObjectId = (value) =>
  typeof value === "string" && /^[a-f\d]{24}$/i.test(value);

export const isDriveId = (value) =>
  typeof value === "string" && value.length <= 100 && /^[a-zA-Z0-9_-]+$/.test(value);
