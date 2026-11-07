import {
  Boxes,
  Braces,
  Code,
  Database,
  FileCode,
  FlaskConical,
  Puzzle,
  Zap,
} from "lucide-react";

import EmitConstellation from "@/components/landing/EmitConstellation";
import app from "@/lib/config/app.config";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

import type { ReactNode } from "react";

const targets = [
  {
    name: "OpenAPI 3",
    description: "REST API contracts, emitted via TypeSpec",
    icon: <FileCode className="h-6 w-6" />,
    badge: "Default",
  },
  {
    name: "JSON Schema",
    description: "Validation and documentation for your types",
    icon: <Braces className="h-6 w-6" />,
    badge: "Default",
  },
  {
    name: "Protocol Buffers",
    description: "Wire schemas for gRPC and binary transport",
    icon: <Boxes className="h-6 w-6" />,
  },
  {
    name: "Drizzle ORM",
    description: "Postgres schema generated from your models",
    icon: <Database className="h-6 w-6" />,
  },
  {
    name: "Typed SDKs",
    description:
      "Idiomatic models and clients for TypeScript, Rust, and Python",
    icon: <Code className="h-6 w-6" />,
  },
  {
    name: "React Query",
    description: "Generated hooks and provider for your operations",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    name: "Mock Handlers",
    description: "MSW handlers and data factories for tests",
    icon: <FlaskConical className="h-6 w-6" />,
  },
  {
    name: "WASM Plugins",
    description: "Write your own emitter in Rust or Python with the plugin SDK",
    icon: <Puzzle className="h-6 w-6" />,
    badge: "Extensible",
  },
];

/**
 * Ecosystem section showcasing ODK's emitter targets and plugin SDK.
 */
const Ecosystem = () => {
  const { ref, inView } = useInView();

  return (
    <section id="ecosystem" className="bg-muted/50 px-4 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          Emit to Any Target
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          ODK ships emitters for the formats you already use, and a WASM plugin
          SDK for the ones you do not. All from the same IR at the center.
        </p>

        <div
          className={cn(
            "mb-16 transition-all duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <EmitConstellation />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {targets.map((target, i) => (
            <TargetCard
              key={target.name}
              {...target}
              inView={inView}
              delay={i * 75}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`${app.docsUrl}/products/odk`}
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            <Puzzle className="h-5 w-5" />
            Build a custom emitter
          </a>
        </div>
      </div>
    </section>
  );
};

const TargetCard = ({
  name,
  description,
  icon,
  badge,
  inView,
  delay,
}: {
  name: string;
  description: string;
  icon: ReactNode;
  badge?: string;
  inView: boolean;
  delay: number;
}) => (
  <div
    className={cn(
      "relative rounded-lg border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md",
      inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {badge && (
      <span className="absolute top-3 right-3 rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs">
        {badge}
      </span>
    )}
    <div className="mb-3 text-primary">{icon}</div>
    <h3 className="mb-1 font-semibold">{name}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default Ecosystem;
