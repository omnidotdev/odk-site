/**
 * Living pipeline: one schema flows through a single IR out to many targets.
 * Theme-aware (colors come from tokens, not fixed hex) and motion-safe (the
 * traveling sparks hide under prefers-reduced-motion).
 */
const inputs = [
  { y: 70, label: "schema.odk.yaml" },
  { y: 122, label: "schema.ts + zod" },
  { y: 174, label: "plugin.rs / .py" },
];

const targets = [
  { y: 44, label: "OpenAPI 3" },
  { y: 96, label: "JSON Schema" },
  { y: 148, label: "Protobuf" },
  { y: 200, label: "Drizzle + typed SDKs" },
  { y: 252, label: "your WASM emitter", accent: true },
];

// core -> target wire paths, kept in sync with the target rows above
const outWires = [
  "M560 150 C640 120 690 61 740 61",
  "M560 158 C640 140 690 113 740 113",
  "M560 168 C640 165 690 165 740 165",
  "M560 178 C640 190 690 217 740 217",
  "M560 188 C640 235 690 269 740 269",
];

const inWires = [
  "M212 88 C320 88 352 160 404 160",
  "M212 140 C320 140 352 160 404 160",
  "M212 192 C320 192 352 160 404 160",
];

const PipelineDiagram = () => (
  <svg
    viewBox="0 0 940 320"
    className="h-auto w-full"
    role="img"
    aria-label="One schema compiles through a single IR into OpenAPI, Protobuf, Drizzle, JSON Schema, typed SDKs, and your own WASM emitters"
  >
    <defs>
      <marker
        id="pl-arrow"
        markerWidth="8"
        markerHeight="8"
        refX="6"
        refY="3"
        orient="auto"
      >
        <path d="M0 0 L6 3 L0 6 Z" className="fill-border" />
      </marker>
      <filter id="pl-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    {/* column labels */}
    <text
      x="116"
      y="24"
      textAnchor="middle"
      className="fill-muted-foreground text-[10.5px] tracking-[0.16em]"
    >
      YOU WRITE ONE
    </text>
    <text
      x="474"
      y="24"
      textAnchor="middle"
      className="fill-muted-foreground text-[10.5px] tracking-[0.16em]"
    >
      ODK COMPILES
    </text>
    <text
      x="820"
      y="24"
      textAnchor="middle"
      className="fill-muted-foreground text-[10.5px] tracking-[0.16em]"
    >
      EVERYTHING COMES OUT
    </text>

    {/* inputs */}
    {inputs.map((i) => (
      <g key={i.label}>
        <rect
          x="24"
          y={i.y}
          width="188"
          height="36"
          rx="8"
          className="fill-card stroke-border"
        />
        <text
          x="42"
          y={i.y + 23}
          className="fill-foreground font-mono text-[12.5px]"
        >
          {i.label}
        </text>
      </g>
    ))}

    {/* wires in */}
    {inWires.map((d, i) => (
      <path
        key={d}
        id={`plin-${i}`}
        d={d}
        fill="none"
        markerEnd="url(#pl-arrow)"
        className="stroke-border"
        strokeWidth="1.6"
      />
    ))}

    {/* IR core */}
    <rect
      x="404"
      y="120"
      width="140"
      height="80"
      rx="18"
      className="fill-primary/10 stroke-primary motion-safe:animate-pulse"
      strokeWidth="1.6"
      filter="url(#pl-glow)"
    />
    <rect
      x="404"
      y="120"
      width="140"
      height="80"
      rx="18"
      className="fill-card stroke-primary"
      strokeWidth="1.6"
    />
    <text
      x="474"
      y="158"
      textAnchor="middle"
      className="fill-primary font-bold font-mono text-[22px]"
    >
      ONE IR
    </text>
    <text
      x="474"
      y="180"
      textAnchor="middle"
      className="fill-muted-foreground font-mono text-[9px] tracking-[2px]"
    >
      COMPILEDSCHEMA
    </text>

    {/* wires out */}
    {outWires.map((d, i) => (
      <path
        key={d}
        id={`plout-${i}`}
        d={d}
        fill="none"
        markerEnd="url(#pl-arrow)"
        className="stroke-border"
        strokeWidth="1.6"
      />
    ))}

    {/* targets */}
    {targets.map((t) => (
      <g key={t.label}>
        <rect
          x="740"
          y={t.y}
          width="184"
          height="34"
          rx="8"
          className={`fill-card ${t.accent ? "stroke-accent" : "stroke-border"}`}
        />
        <text
          x="758"
          y={t.y + 22}
          className="fill-foreground font-mono text-[12px]"
        >
          {t.label}
        </text>
      </g>
    ))}

    {/* traveling sparks (hidden when the viewer prefers reduced motion) */}
    <g className="motion-reduce:hidden">
      {inWires.map((d, i) => (
        <circle
          key={`in-${d}`}
          r="4.5"
          className="fill-primary"
          filter="url(#pl-glow)"
        >
          <animateMotion
            dur="2s"
            begin={`${i * 0.6}s`}
            repeatCount="indefinite"
          >
            <mpath href={`#plin-${i}`} />
          </animateMotion>
        </circle>
      ))}
      {outWires.map((d, i) => (
        <circle
          key={`out-${d}`}
          r="4.5"
          className="fill-primary"
          filter="url(#pl-glow)"
        >
          <animateMotion
            dur="1.8s"
            begin={`${0.2 + i * 0.5}s`}
            repeatCount="indefinite"
          >
            <mpath href={`#plout-${i}`} />
          </animateMotion>
        </circle>
      ))}
    </g>
  </svg>
);

export default PipelineDiagram;
