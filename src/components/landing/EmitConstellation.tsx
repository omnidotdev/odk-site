/**
 * Emitter constellation: one IR at the center emits outward to every target.
 * Theme-aware and motion-safe (sparks and the rotating glow stop under
 * prefers-reduced-motion).
 */
type Node = {
  label: string;
  w: number;
  nx: number;
  ny: number;
  sx: number;
  sy: number;
  accent?: boolean;
};

// 8 emitters on a ring around the core; sx/sy is the spoke start on the core
// edge, nx/ny the node (chip) center.
const nodes: Node[] = [
  { label: "OpenAPI", w: 92, nx: 430, ny: 260, sx: 310, sy: 260 },
  { label: "JSON Schema", w: 108, nx: 380, ny: 380, sx: 295, sy: 295 },
  { label: "Protobuf", w: 92, nx: 260, ny: 430, sx: 260, sy: 310 },
  { label: "Drizzle", w: 86, nx: 140, ny: 380, sx: 225, sy: 295 },
  { label: "TS SDK", w: 84, nx: 90, ny: 260, sx: 210, sy: 260 },
  { label: "Rust", w: 72, nx: 140, ny: 140, sx: 225, sy: 225 },
  { label: "Python", w: 84, nx: 260, ny: 90, sx: 260, sy: 210 },
  {
    label: "WASM plugin",
    w: 112,
    nx: 380,
    ny: 140,
    sx: 295,
    sy: 225,
    accent: true,
  },
];

const spoke = (n: Node) => `M${n.sx} ${n.sy} L${n.nx} ${n.ny}`;

const EmitConstellation = () => (
  <div className="relative mx-auto grid max-w-xl place-items-center">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute aspect-square w-[62%] rounded-full bg-primary/15 blur-xl motion-safe:animate-pulse"
    />
    <svg
      viewBox="0 0 520 520"
      className="relative h-auto w-full"
      role="img"
      aria-label="One IR emitting outward to OpenAPI, JSON Schema, Protobuf, Drizzle, typed SDKs for TypeScript, Rust and Python, and your own WASM plugins"
    >
      <defs>
        <marker
          id="co-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L5 3 L0 6 Z" className="fill-border" />
        </marker>
        <filter id="co-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <circle
        cx="260"
        cy="260"
        r="170"
        fill="none"
        className="stroke-border"
        strokeDasharray="3 6"
      />

      {/* spokes */}
      {nodes.map((n) => (
        <path
          key={`s-${n.label}`}
          id={`co-${n.nx}-${n.ny}`}
          d={spoke(n)}
          fill="none"
          markerEnd="url(#co-arrow)"
          className="stroke-border"
          strokeWidth="1.4"
        />
      ))}

      {/* core */}
      <circle
        cx="260"
        cy="260"
        r="48"
        className="fill-primary/10 stroke-primary"
        strokeWidth="1.6"
        filter="url(#co-glow)"
      />
      <circle
        cx="260"
        cy="260"
        r="46"
        className="fill-card stroke-primary"
        strokeWidth="1.8"
      />
      <text
        x="260"
        y="256"
        textAnchor="middle"
        className="fill-primary font-bold font-mono text-[18px]"
      >
        IR
      </text>
      <text
        x="260"
        y="272"
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[8px] tracking-[1.5px]"
      >
        ONE SOURCE
      </text>

      {/* emitter chips */}
      {nodes.map((n) => (
        <g key={`c-${n.label}`}>
          <rect
            x={n.nx - n.w / 2}
            y={n.ny - 15}
            width={n.w}
            height="30"
            rx="8"
            className={`fill-card ${n.accent ? "stroke-accent" : "stroke-border"}`}
          />
          <text
            x={n.nx}
            y={n.ny + 4}
            textAnchor="middle"
            className="fill-foreground font-mono text-[12px]"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* outward sparks */}
      <g className="motion-reduce:hidden">
        {nodes.map((n, i) => (
          <circle
            key={`sp-${n.label}`}
            r="5"
            className="fill-primary"
            filter="url(#co-glow)"
          >
            <animateMotion
              dur="1.5s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#co-${n.nx}-${n.ny}`} />
            </animateMotion>
          </circle>
        ))}
      </g>
    </svg>
  </div>
);

export default EmitConstellation;
