import { Button } from "@omnidotdev/thornberry/button";
import { ArrowRight } from "lucide-react";

import CodeBlock from "@/components/core/CodeBlock";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

const steps = [
  {
    title: "Install & Initialize",
    description: "Get up and running with a single command",
    filename: "terminal",
    language: "bash",
    code: `npm install -g @omnidotdev/odk
odk init my-api-project
cd my-api-project`,
  },
  {
    title: "Define Your Schema",
    description: "Describe your data model in TypeScript",
    filename: "schema.ts",
    language: "typescript",
    code: `import { defineSchema } from "@omnidotdev/odk";

const schema = defineSchema({
  User: {
    id: "uuid",
    name: "string",
    email: "string @unique",
  },
  Post: {
    id: "uuid",
    title: "string",
    author: "User @relation",
  },
});`,
  },
  {
    title: "Generate & Run",
    description: "Generate your entire API stack and start developing",
    filename: "terminal",
    language: "bash",
    code: `odk generate
odk dev

# API running at http://localhost:3000
# GraphQL at http://localhost:3000/graphql
# Docs at http://localhost:3000/docs`,
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
          Three steps to your first generated API
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={cn(
                "transition-all duration-600",
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
          <Button size="lg" className="group">
            Read the Documentation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
