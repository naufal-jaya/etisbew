type ClassValue = string | number | boolean | undefined | null | ClassValue[];

function classNames(...inputs: ClassValue[]) {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      continue;
    }

    if (Array.isArray(input)) {
      classes.push(classNames(...input));
      continue;
    }

    if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.filter(Boolean).join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return classNames(...inputs);
}
