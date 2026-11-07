import { Button } from "@omnidotdev/thornberry/button";
import { ArrowRight } from "lucide-react";

import CodeBlock from "@/components/core/CodeBlock";
import app from "@/lib/config/app.config";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

const steps = [
  {
    title: "Install the CLI",
    description: "A single Rust binary, no runtime to manage",
    filename: "terminal",
    language: "bash",
    code: `cargo install odk-cli

# optional SDKs
bun add @omnidotdev/odk zod   # TypeScript
pip install odk-pdk           # Python`,
  },
  {
    title: "Define your schema",
    description:
      "Describe your models once, in YAML (or TypeScript, Rust, or Python)",
    filename: "schema.odk.yaml",
    language: "yaml",
    code: `version: "1.0"
name: BlogAPI

models:
  User:
    fields:
      id: { type: string, format: uuid }
      email: { type: string, format: email }
      name: { type: string, optional: true }
  Post:
    fields:
      id: { type: string, format: uuid }
      title: string
      authorId: { type: string, format: uuid }`,
  },
  {
    title: "Emit your targets",
    description:
      "Compile to specs and schemas, or generate typed clients from a GraphQL schema",
    filename: "terminal",
    language: "bash",
    code: `# OpenAPI + JSON Schema (default), Protobuf, Drizzle, ...
odk compile schema.odk.yaml -o generated/

# typed models and clients
odk generate schema.odk.yaml -t typescript,rust`,
  },
];

/**
 * Get Started section with a 3-step quickstart guide.
 */
const GetStarted = () => {
  const { ref, inView } = useInView();

  return (
    <section id="get-started" className="px-4 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          Get Started in Minutes
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
          Three steps from a schema to generated artifacts
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={cn(
                // min-w-0 lets the grid cell shrink below the code block's
                // intrinsic width so the block scrolls instead of overflowing
                "min-w-0 transition-all duration-600",
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <CodeBlock
                code={step.code}
                filename={step.filename}
                language={step.language}
                className="mb-4"
              />
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="group" asChild>
            <a href={`${app.docsUrl}/products/odk`}>
              Read the Documentation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
