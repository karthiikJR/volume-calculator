import { ShapeId } from "@/lib/volumes";

interface ShapeDiagramProps {
  shapeId: ShapeId;
}

export function ShapeDiagram({ shapeId }: ShapeDiagramProps) {
  const diagram = diagramMap[shapeId];
  if (!diagram) return null;
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <svg
        viewBox="0 0 200 180"
        className="w-full h-full max-w-md max-h-96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {diagram}
      </svg>
    </div>
  );
}

const stroke = "stroke-blue-400";
const dash = "stroke-dasharray: 4 3;";
const textClass = "fill-blue-400 text-[11px] font-medium";

const diagramMap: Record<ShapeId, React.ReactNode> = {
  cube: (
    <>
      {/* front face */}
      <rect x="50" y="60" width="80" height="80" className={stroke} strokeWidth="1.5" fill="none" />
      {/* top face */}
      <polygon points="50,60 80,35 160,35 130,60" className={stroke} strokeWidth="1.5" fill="none" />
      {/* right face */}
      <polygon points="130,60 160,35 160,115 130,140" className={stroke} strokeWidth="1.5" fill="none" />
      {/* dashed back edges */}
      <line x1="80" y1="35" x2="80" y2="115" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="80" y1="115" x2="160" y2="115" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="80" y1="115" x2="50" y2="140" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      {/* label */}
      <text x="85" y="155" className={textClass}>a</text>
    </>
  ),
  "rectangular-prism": (
    <>
      <rect x="45" y="55" width="90" height="70" className={stroke} strokeWidth="1.5" fill="none" />
      <polygon points="45,55 75,30 165,30 135,55" className={stroke} strokeWidth="1.5" fill="none" />
      <polygon points="135,55 165,30 165,100 135,125" className={stroke} strokeWidth="1.5" fill="none" />
      <line x1="75" y1="30" x2="75" y2="100" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="75" y1="100" x2="165" y2="100" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="75" y1="100" x2="45" y2="125" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <text x="85" y="140" className={textClass}>l</text>
      <text x="150" y="75" className={textClass}>h</text>
      <text x="55" y="38" className={textClass}>w</text>
    </>
  ),
  sphere: (
    <>
      <circle cx="100" cy="90" r="55" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="90" rx="55" ry="18" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="90" x2="155" y2="90" className={stroke} strokeWidth="1.5" />
      <circle cx="100" cy="90" r="2" className="fill-blue-400" />
      <text x="125" y="85" className={textClass}>r</text>
    </>
  ),
  hemisphere: (
    <>
      <path d="M 45 100 A 55 55 0 0 1 155 100" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="100" rx="55" ry="18" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="100" x2="155" y2="100" className={stroke} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="2" className="fill-blue-400" />
      <text x="125" y="95" className={textClass}>r</text>
    </>
  ),
  "spherical-cap": (
    <>
      {/* Sphere (dashed) */}
      <circle
        cx="100"
        cy="110"
        r="55"
        className={stroke}
        strokeWidth="1"
        fill="none"
        style={{ strokeDasharray: "4 3" }}
      />

      {/* Cap top ellipse */}
      <ellipse
        cx="100"
        cy="85"
        rx="45"
        ry="14"
        className={stroke}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Spherical arc (front half of sphere) */}
      <path
        d="M 45 110 A 55 55 0 0 1 155 110"
        className={stroke}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Vertical height line */}
      <line
        x1="100"
        y1="55"
        x2="100"
        y2="85"
        className={stroke}
        strokeWidth="1.5"
      />

      {/* Radius line */}
      <line
        x1="100"
        y1="110"
        x2="145"
        y2="85"
        className={stroke}
        strokeWidth="1"
        style={{ strokeDasharray: "4 3" }}
      />

      {/* Labels */}
      <text x="104" y="80" className={textClass}>h</text>
      <text x="118" y="112" className={textClass}>R</text>
    </>
  ),
  ellipsoid: (
    <>
      <ellipse cx="100" cy="90" rx="70" ry="45" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="90" rx="70" ry="18" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="90" x2="170" y2="90" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="90" x2="100" y2="45" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="90" x2="130" y2="108" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <circle cx="100" cy="90" r="2" className="fill-blue-400" />
      <text x="135" y="85" className={textClass}>a</text>
      <text x="103" y="65" className={textClass}>c</text>
      <text x="102" y="105" className={textClass}>b</text>
    </>
  ),
  cylinder: (
    <>
      <ellipse cx="100" cy="45" rx="50" ry="16" className={stroke} strokeWidth="1.5" />
      <line x1="50" y1="45" x2="50" y2="135" className={stroke} strokeWidth="1.5" />
      <line x1="150" y1="45" x2="150" y2="135" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="135" rx="50" ry="16" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="45" x2="150" y2="45" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="155" y1="45" x2="155" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <text x="120" y="40" className={textClass}>r</text>
      <text x="158" y="95" className={textClass}>h</text>
    </>
  ),
  "hollow-cylinder": (
    <>
      <ellipse cx="100" cy="45" rx="55" ry="16" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="45" rx="30" ry="10" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="45" y1="45" x2="45" y2="135" className={stroke} strokeWidth="1.5" />
      <line x1="155" y1="45" x2="155" y2="135" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="135" rx="55" ry="16" className={stroke} strokeWidth="1.5" />
      <line x1="70" y1="45" x2="70" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="130" y1="45" x2="130" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="45" x2="155" y2="45" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="45" x2="130" y2="45" className={stroke} strokeWidth="1.5" />
      <text x="135" y="44" className={textClass}>R</text>
      <text x="108" y="44" className={textClass}>r</text>
      <text x="160" y="95" className={textClass}>h</text>
    </>
  ),
  capsule: (
    <>
      <path d="M 60 60 A 40 40 0 0 1 140 60" className={stroke} strokeWidth="1.5" />
      <line x1="60" y1="60" x2="60" y2="120" className={stroke} strokeWidth="1.5" />
      <line x1="140" y1="60" x2="140" y2="120" className={stroke} strokeWidth="1.5" />
      <path d="M 60 120 A 40 40 0 0 0 140 120" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="60" x2="140" y2="60" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="145" y1="60" x2="145" y2="120" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <text x="115" y="55" className={textClass}>r</text>
      <text x="148" y="95" className={textClass}>h</text>
    </>
  ),
  cone: (
    <>
      <line x1="100" y1="25" x2="50" y2="135" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="25" x2="150" y2="135" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="135" rx="50" ry="16" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="25" x2="100" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="135" x2="150" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <text x="103" y="85" className={textClass}>h</text>
      <text x="125" y="145" className={textClass}>r</text>
    </>
  ),
  "conical-frustum": (
    <>
      <ellipse cx="100" cy="40" rx="30" ry="10" className={stroke} strokeWidth="1.5" />
      <line x1="70" y1="40" x2="50" y2="135" className={stroke} strokeWidth="1.5" />
      <line x1="130" y1="40" x2="150" y2="135" className={stroke} strokeWidth="1.5" />
      <ellipse cx="100" cy="135" rx="50" ry="16" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="40" x2="100" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="40" x2="130" y2="40" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <line x1="100" y1="135" x2="150" y2="135" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <text x="103" y="92" className={textClass}>h</text>
      <text x="110" y="39" className={textClass}>r</text>
      <text x="125" y="145" className={textClass}>R</text>
    </>
  ),
  "triangular-prism": (
    <>
      {/* front triangle */}
      <polygon points="60,130 140,130 100,50" className={stroke} strokeWidth="1.5" fill="none" />
      {/* back triangle (offset) */}
      <polygon points="80,120 160,120 120,40" className={stroke} strokeWidth="1" fill="none" style={{ strokeDasharray: "4 3" }} />
      {/* connecting edges */}
      <line x1="60" y1="130" x2="80" y2="120" className={stroke} strokeWidth="1.5" />
      <line x1="140" y1="130" x2="160" y2="120" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="50" x2="120" y2="40" className={stroke} strokeWidth="1.5" />
      {/* labels */}
      <text x="93" y="147" className={textClass}>b</text>
      <text x="70" y="95" className={textClass}>h</text>
      <text x="155" y="135" className={textClass}>l</text>
    </>
  ),
  pyramid: (
    <>
      <line x1="100" y1="25" x2="45" y2="120" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="25" x2="155" y2="120" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="25" x2="60" y2="145" className={stroke} strokeWidth="1.5" />
      <line x1="100" y1="25" x2="160" y2="140" className={stroke} strokeWidth="1.5" />
      {/* base */}
      <polygon points="45,120 155,120 160,140 60,145" className={stroke} strokeWidth="1.5" fill="none" />
      {/* dashed height */}
      <line x1="100" y1="25" x2="100" y2="130" className={stroke} strokeWidth="1" style={{ strokeDasharray: "4 3" }} />
      <text x="103" y="82" className={textClass}>h</text>
      <text x="90" y="155" className={textClass}>l</text>
      <text x="160" y="130" className={textClass}>w</text>
    </>
  ),
  "truncated-pyramid": (
    <>
      {/* ===== BOTTOM FACE ===== */}
      <polygon
        points="45,120 145,110 160,135 60,145"
        className={stroke}
        strokeWidth="1.5"
        fill="none"
      />

      {/* ===== TOP FACE ===== */}
      <polygon
        points="72,68 122,63 130,75 80,80"
        className={stroke}
        strokeWidth="1.5"
        fill="none"
      />

      {/* ===== CONNECTING EDGES (SIDES) ===== */}
      <line x1="72" y1="68" x2="45" y2="120" className={stroke} strokeWidth="1.5" />
      <line x1="122" y1="63" x2="145" y2="110" className={stroke} strokeWidth="1.5" />
      <line x1="130" y1="75" x2="160" y2="135" className={stroke} strokeWidth="1.5" />
      <line x1="80" y1="80" x2="60" y2="145" className={stroke} strokeWidth="1.5" />

      {/* ===== HEIGHT INDICATOR ===== */}
      <line
        x1="101" y1="71"
        x2="101" y2="127"
        className={stroke}
        strokeWidth="1"
        style={{ strokeDasharray: "4 3" }}
      />

      {/* ===== LABELS ===== */}
      {/* Top dimensions */}
      <text x="100" y="60" className={textClass}>a₁</text>
      <text x="67" y="85" className={textClass}>b₁</text>

      {/* Bottom dimensions */}
      <text x="105" y="155" className={textClass}>a₂</text>
      <text x="35" y="135" className={textClass}>b₂</text>

      {/* Height */}
      <text x="105" y="105" className={textClass}>h</text>
    </>
  )
};
