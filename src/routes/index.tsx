import { createFileRoute } from "@tanstack/react-router";

import Ecosystem from "@/components/landing/Ecosystem";
import PipelineDiagram from "@/components/landing/PipelineDiagram";
import app from "@/lib/config/app.config";
import createMetaTags from "@/lib/util/createMetaTags";
import cn from "@/lib/utils";

const docs = `${app.docsUrl}/products/odk`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags({
      title: "ODK - Omni Development Kit",
      description:
        "Define your data model once. Generate OpenAPI, Protobuf, Drizzle, JSON Schema, and typed SDKs from a single schema.",
    }),
  }),
  component: HomePage,
});

/**
 * Home page / Landing.
 */
function HomePage() {
  return (
    <div
      className="relative"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    >
      <Hero />
      <StatRail />
      <SpecSheet />
      <Ecosystem />
    </div>
  );
}

function Hero() {
  return (
    <section className="border-border border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.02fr_0.98fr] md:py-20">
        <div>
          <h1 className="font-bold text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Model once,
            <br />
            <span className="text-primary">emit everywhere.</span>
          </h1>
          <p className="mt-6 max-w-[30em] text-lg text-muted-foreground">
            Define your data model one time, in the language you already use.
            ODK compiles it through a single IR into{" "}
            <span className="text-foreground">
              every spec, schema, and client
            </span>{" "}
            your stack needs. One source of truth, never hand-synced.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm">
            <a
              href={docs}
              className="rounded-md bg-primary px-4 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              cargo install odk-cli
            </a>
            <a
              href={docs}
              className="rounded-md border border-border px-4 py-3 transition-colors hover:border-primary hover:text-primary"
            >
              Read the docs
            </a>
            <span className="text-muted-foreground/70">
              {"// or bun add @omnidotdev/odk"}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card/50">
          <div className="flex items-center gap-2 border-border border-b px-4 py-2.5 font-mono text-muted-foreground text-xs">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="ml-auto">{"schema → IR → targets"}</span>
          </div>
          <div className="px-4 py-6">
            <PipelineDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { n: "4", l: "INPUT LANGUAGES", c: "text-primary" },
  { n: "7+", l: "BUILT-IN TARGETS" },
  { n: "1", l: "RUST BINARY, NO RUNTIME" },
  { n: "OSS", l: "APACHE-2.0, FREE FOREVER", c: "text-signal" },
] as const;

function StatRail() {
  return (
    <div className="border-border border-b bg-card/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 font-mono md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.l}
            className={cn("border-border px-6 py-5", i > 0 && "border-l")}
          >
            <div
              className={cn(
                "font-bold text-2xl tracking-tight",
                "c" in s && s.c,
              )}
            >
              {s.n}
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground tracking-wider">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const specRows = [
  {
    n: "01",
    h: "Author in any language",
    p: "YAML, TypeScript with Zod, Rust, or Python. They all compile to the same IR.",
    code: `models:
  User:
    id: { type: string, format: uuid }
    email: { type: string, format: email }`,
  },
  {
    n: "02",
    h: "Compile to specs and schemas",
    p: "OpenAPI and JSON Schema by default. Protobuf and Drizzle ORM on request, via TypeSpec.",
    code: `$ odk compile schema.odk.yaml \\
    -e @omnidotdev/typespec-drizzle`,
  },
  {
    n: "03",
    h: "Idiomatic types, including recursion",
    p: "Rust, TypeScript, and Python models with recursive discriminated unions, and extend it all with WASM plugins.",
    code: `#[serde(tag = "op")]
enum OpNode {
  Translate { child: Box<OpNode> },
  Union { children: Vec<OpNode> },
}`,
  },
];

function SpecSheet() {
  return (
    <section id="what" className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-primary text-xs">[ what it does ]</p>
      <h2 className="mt-2 font-bold text-3xl tracking-tight md:text-4xl">
        One schema, idiomatic everywhere.
      </h2>
      <p className="mt-3 max-w-[44em] text-lg text-muted-foreground">
        Author in the language you already use. The same IR drives every output,
        including the recursive, data-carrying types most codegen cannot
        express.
      </p>

      <div className="mt-10 border-border border-t">
        {specRows.map((r) => (
          <div
            key={r.n}
            className="grid gap-5 border-border border-b py-7 md:grid-cols-[64px_1fr_1fr] md:gap-7"
          >
            <div className="font-mono text-primary text-sm">{r.n}</div>
            <div className="min-w-0">
              <h3 className="font-semibold text-xl tracking-tight">{r.h}</h3>
              <p className="mt-1.5 text-muted-foreground">{r.p}</p>
            </div>
            <pre className="min-w-0 overflow-x-auto rounded-lg border border-border bg-card/50 p-4 font-mono text-[12.5px] text-muted-foreground leading-relaxed">
              {r.code}
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}
