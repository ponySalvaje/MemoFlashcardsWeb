// Calendar dates stay as strings so the browser's locale/timezone cannot change the day.
export const toApiDueDate = (value) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const [, day, month, year] = match;
  const iso = `${year}-${month}-${day}`;
  const date = new Date(`${iso}T00:00:00.000Z`);
  return Number(year) > 0 && !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === iso ? iso : null;
};

export const toDisplayDueDate = (value) => {
  // Accept the legacy date-only response and the migrated API's ISO timestamp.
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(value || "");
  if (!match) return "";
  const display = `${match[3]}/${match[2]}/${match[1]}`;
  return toApiDueDate(display) ? display : "";
};
