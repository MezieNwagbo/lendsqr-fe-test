export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatText = (
  text: string,
  mode: "capitalized" | "uppercase" = "capitalized"
) => {
  // Split camelCase or PascalCase into words
  const words = text.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  if (mode === "uppercase") {
    return words.join(" ").toUpperCase();
  }

  // Default: Capitalized (e.g., "Phone Number")
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
