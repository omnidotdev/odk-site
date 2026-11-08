import EmitConstellation from "@/components/landing/EmitConstellation";
import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

const targets = [
  { name: "OpenAPI 3", kind: "def" },
  { name: "JSON Schema", kind: "def" },
  { name: "Protobuf" },
  { name: "Drizzle" },
  { name: "Typed SDKs" },
  { name: "React Query" },
  { name: "MSW mocks" },
  { name: "WASM plugins", kind: "ext" },
] as const;

/**
 * Emitter constellation: one IR emitting outward to every target.
 */
const Ecosystem = () => (
  <section id="emit" className="border-border border-t bg-card/30">
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
        One IR at the center.
      </h2>
      <p className="mt-3 max-w-[44em] text-lg text-muted-foreground">
        Built-in emitters for the formats you already use, and a plugin SDK for
        the ones you do not. Everything radiates from the same source.
      </p>

      <div className="mt-10">
        <EmitConstellation />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2.5 font-mono text-[12.5px]">
        {targets.map((t) => (
          <span
            key={t.name}
            className={cn(
              "rounded-md border px-3 py-1.5",
              "kind" in t && t.kind === "def"
                ? "border-primary text-foreground"
                : "kind" in t && t.kind === "ext"
                  ? "border-signal text-signal"
                  : "border-border text-muted-foreground",
            )}
          >
            {t.name}
          </span>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={`${app.docsUrl}/products/odk`}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 font-mono text-sm transition-colors hover:border-primary hover:text-primary"
        >
          Build a custom emitter
        </a>
      </div>
    </div>
  </section>
);

export default Ecosystem;
