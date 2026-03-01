export type ShapeId =
  | "cube"
  | "rectangular-prism"
  | "sphere"
  | "hemisphere"
  | "spherical-cap"
  | "ellipsoid"
  | "cylinder"
  | "hollow-cylinder"
  | "capsule"
  | "cone"
  | "conical-frustum"
  | "triangular-prism"
  | "pyramid"
  | "truncated-pyramid";

export interface ShapeParam {
  id: string;
  label: string;
  symbol: string;
}

export interface ShapeConfig {
  id: ShapeId;
  name: string;
  params: ShapeParam[];
  calculate: (values: Record<string, number>) => number;
}

const PI = Math.PI;

export const shapes: ShapeConfig[] = [
  {
    id: "cube",
    name: "Cube",
    params: [{ id: "side", label: "Side length", symbol: "a" }],
    calculate: (v) => Math.pow(v.side, 3),
  },
  {
    id: "rectangular-prism",
    name: "Rectangular prism (box)",
    params: [
      { id: "length", label: "Length", symbol: "l" },
      { id: "width", label: "Width", symbol: "w" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) => v.length * v.width * v.height,
  },
  {
    id: "sphere",
    name: "Sphere",
    params: [{ id: "radius", label: "Radius", symbol: "r" }],
    calculate: (v) => (4 / 3) * PI * Math.pow(v.radius, 3),
  },
  {
    id: "hemisphere",
    name: "Hemisphere",
    params: [{ id: "radius", label: "Radius", symbol: "r" }],
    calculate: (v) => (2 / 3) * PI * Math.pow(v.radius, 3),
  },
  {
    id: "spherical-cap",
    name: "Spherical cap",
    params: [
      { id: "radius", label: "Ball radius", symbol: "R" },
      { id: "height", label: "Cap height", symbol: "h" },
    ],
    calculate: (v) =>
      (PI * Math.pow(v.height, 2) * (3 * v.radius - v.height)) / 3,
  },
  {
    id: "ellipsoid",
    name: "Ellipsoid",
    params: [
      { id: "a", label: "Semi-axis", symbol: "a" },
      { id: "b", label: "Semi-axis", symbol: "b" },
      { id: "c", label: "Semi-axis", symbol: "c" },
    ],
    calculate: (v) => (4 / 3) * PI * v.a * v.b * v.c,
  },
  {
    id: "cylinder",
    name: "Cylinder",
    params: [
      { id: "radius", label: "Radius", symbol: "r" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) => PI * Math.pow(v.radius, 2) * v.height,
  },
  {
    id: "hollow-cylinder",
    name: "Hollow cylinder / tube",
    params: [
      { id: "outerRadius", label: "Outer radius", symbol: "R" },
      { id: "innerRadius", label: "Inner radius", symbol: "r" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) =>
      PI * (Math.pow(v.outerRadius, 2) - Math.pow(v.innerRadius, 2)) * v.height,
  },
  {
    id: "capsule",
    name: "Capsule",
    params: [
      { id: "radius", label: "Radius", symbol: "r" },
      { id: "height", label: "Cylinder height", symbol: "h" },
    ],
    calculate: (v) =>
      PI * Math.pow(v.radius, 2) * ((4 / 3) * v.radius + v.height),
  },
  {
    id: "cone",
    name: "Cone",
    params: [
      { id: "radius", label: "Radius", symbol: "r" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) => (1 / 3) * PI * Math.pow(v.radius, 2) * v.height,
  },
  {
    id: "conical-frustum",
    name: "Conical frustum",
    params: [
      { id: "topRadius", label: "Top radius", symbol: "r" },
      { id: "bottomRadius", label: "Bottom radius", symbol: "R" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) =>
      (PI * v.height *
        (Math.pow(v.topRadius, 2) +
          v.topRadius * v.bottomRadius +
          Math.pow(v.bottomRadius, 2))) /
      3,
  },
  {
    id: "triangular-prism",
    name: "Triangular prism",
    params: [
      { id: "base", label: "Triangle base", symbol: "b" },
      { id: "triHeight", label: "Triangle height", symbol: "h" },
      { id: "length", label: "Length", symbol: "l" },
    ],
    calculate: (v) => 0.5 * v.base * v.triHeight * v.length,
  },
  {
    id: "pyramid",
    name: "Pyramid",
    params: [
      { id: "length", label: "Base length", symbol: "l" },
      { id: "width", label: "Base width", symbol: "w" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) => (1 / 3) * v.length * v.width * v.height,
  },
  {
    id: "truncated-pyramid",
    name: "Truncated pyramid",
    params: [
      { id: "topLength", label: "Top length", symbol: "a₁" },
      { id: "topWidth", label: "Top width", symbol: "b₁" },
      { id: "bottomLength", label: "Bottom length", symbol: "a₂" },
      { id: "bottomWidth", label: "Bottom width", symbol: "b₂" },
      { id: "height", label: "Height", symbol: "h" },
    ],
    calculate: (v) => {
      const A1 = v.topLength * v.topWidth;
      const A2 = v.bottomLength * v.bottomWidth;
      return (v.height / 3) * (A1 + A2 + Math.sqrt(A1 * A2));
    },
  },
];

export function getShapeById(id: ShapeId): ShapeConfig | undefined {
  return shapes.find((s) => s.id === id);
}
