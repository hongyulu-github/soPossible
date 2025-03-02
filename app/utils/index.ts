export const getUserNameInitials = (name: string): string => {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("");
};
