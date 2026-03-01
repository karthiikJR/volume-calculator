export type UnitId =
  | "mm"
  | "cm"
  | "m"
  | "km"
  | "in"
  | "ft"
  | "yd"
  | "mi"
  | "nmi";

export interface UnitOption {
  id: UnitId;
  label: string;
  short: string;
  toMeters: number; // conversion factor to meters
}

export const units: UnitOption[] = [
  { id: "mm", label: "millimeters (mm)", short: "mm", toMeters: 0.001 },
  { id: "cm", label: "centimeters (cm)", short: "cm", toMeters: 0.01 },
  { id: "m", label: "meters (m)", short: "m", toMeters: 1 },
  { id: "km", label: "kilometers (km)", short: "km", toMeters: 1000 },
  { id: "in", label: "inches (in)", short: "in", toMeters: 0.0254 },
  { id: "ft", label: "feet (ft)", short: "ft", toMeters: 0.3048 },
  { id: "yd", label: "yards (yd)", short: "yd", toMeters: 0.9144 },
  { id: "mi", label: "miles (mi)", short: "mi", toMeters: 1609.344 },
  { id: "nmi", label: "nautical miles (nmi)", short: "nmi", toMeters: 1852 },
];

export function getVolumeUnitLabel(unit: UnitOption): string {
  return `${unit.short}³`;
}

export function getUnitById(id: UnitId): UnitOption {
  return units.find((u) => u.id === id) ?? units[1]; // default cm
}
