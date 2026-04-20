/**
 * Dates from the Google Sheet are interpreted and displayed in Pacific Time
 * (America/Los_Angeles: PST in winter, PDT in summer).
 *
 * ISO date-only strings like "2024-05-07" are treated as that calendar day at
 * midnight Pacific, not UTC (avoids off-by-one for Stanford / California context).
 */

import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

export const SHEET_PACIFIC_TZ = "America/Los_Angeles";

function pad(n) {
  return String(n).padStart(2, "0");
}

function sheetsSerialToPacificMidnight(serial) {
  const n = Math.floor(Number(serial));
  if (!Number.isFinite(n) || n < 1) return null;
  const epochMs = Date.UTC(1899, 11, 30);
  const ms = epochMs + n * 86400000;
  const rough = new Date(ms);
  const ymd = formatInTimeZone(rough, SHEET_PACIFIC_TZ, "yyyy-MM-dd");
  return fromZonedTime(`${ymd}T00:00:00`, SHEET_PACIFIC_TZ);
}

export function parseSheetDate(value) {
  if (value == null || value === "") return null;

  if (typeof value === "number") {
    if (value > 30000 && value < 60000) return sheetsSerialToPacificMidnight(value);
    return null;
  }

  const s = String(value).trim();

  const numericSerial = s.match(/^(\d{5})(\.\d+)?$/);
  if (numericSerial && Number(s) > 30000 && Number(s) < 60000) {
    return sheetsSerialToPacificMidnight(Number(s));
  }

  const isoPrefix = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoPrefix) {
    const y = isoPrefix[1];
    const m = isoPrefix[2];
    const d = isoPrefix[3];
    return fromZonedTime(`${y}-${m}-${d}T00:00:00`, SHEET_PACIFIC_TZ);
  }

  const usSlash = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usSlash) {
    const month = pad(usSlash[1]);
    const day = pad(usSlash[2]);
    const year = usSlash[3];
    return fromZonedTime(`${year}-${month}-${day}T00:00:00`, SHEET_PACIFIC_TZ);
  }

  const parsed = new Date(s);
  if (Number.isNaN(parsed.getTime())) return null;
  const ymd = formatInTimeZone(parsed, SHEET_PACIFIC_TZ, "yyyy-MM-dd");
  return fromZonedTime(`${ymd}T00:00:00`, SHEET_PACIFIC_TZ);
}

/** Start of “today” in Pacific (for upcoming vs past). */
export function startOfPacificToday() {
  const ymd = formatInTimeZone(new Date(), SHEET_PACIFIC_TZ, "yyyy-MM-dd");
  return fromZonedTime(`${ymd}T00:00:00`, SHEET_PACIFIC_TZ);
}

/** Alias: event “day” is always defined as midnight Pacific on that calendar date. */
export function startOfSheetDay(value) {
  return parseSheetDate(value);
}

export function formatSheetDate(value, locale = "en-US", options) {
  const d = parseSheetDate(value);
  if (!d) return typeof value === "string" ? value : "";
  const opts = options ?? {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: SHEET_PACIFIC_TZ,
  };
  return new Intl.DateTimeFormat(locale, opts).format(d);
}
