export const createdAt = {
  type: Date,
  required: true,
  default: () => new Date(),
};

export const updatedAt = {
  type: Date,
  required: true,
  default: () => new Date(),
};
