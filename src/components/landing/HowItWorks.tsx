import CodeBlock from "@/components/core/CodeBlock";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

const steps = [
  {
    title: "Define your model once",
    description:
      "Describe your types in YAML (or TypeScript, Rust, or Python). This is the single source of truth.",
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
      authorId: { type: string, format: uuid }
      published: boolean`,
  },
  {
    title: "Compile to specs and schemas",
    description:
      "One IR, many emitters: OpenAPI and JSON Schema by default, plus Protobuf, Drizzle ORM, and more.",
    filename: "generated/openapi.yaml",
    language: "yaml",
    code: `components:
  schemas:
    User:
      type: object
      required: [id, email]
      properties:
        id: { type: string, format: uuid }
        email: { type: string, format: email }
        name: { type: string }
    Post:
      type: object
      required: [id, title, authorId, published]
      properties:
        id: { type: string, format: uuid }
        title: { type: string }`,
  },
  {
    title: "Generate typed clients",
    description:
      "From a GraphQL schema and operations, emit a typed SDK, React Query hooks, and MSW mocks.",
    filename: "generated/models.ts",
    language: "typescript",
    code: `export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Post {
  id: string;
  title: string;
  authorId: string;
  published: boolean;
}`,
  },
  {
    title: "Model once, in every language",
    description:
      "Emit idiomatic TypeScript, Rust, and Python types, including recursive, data-carrying discriminated unions.",
    filename: "generated/models.rs",
    language: "rust",
    code: `#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(tag = "op", rename_all = "lowercase")]
pub enum OpNode {
    Cube { size: [f64; 3], center: bool },
    Translate { v: [f64; 3], child: Box<OpNode> },
    Union { children: Vec<OpNode> },
}`,
  },
];

/**
 * How It Works section showing the ODK schema-to-artifacts workflow.
 */
const HowItWorks = () => {
  const { ref, inView } = useInView();

  return (
    <section id="how-it-works" className="px-4 py-24" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
          One schema compiles through a shared IR to any target
        </p>

        <div className="space-y-16">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={cn(
                "flex flex-col gap-8 transition-all duration-700 md:flex-row md:items-start",
                i % 2 === 1 && "md:flex-row-reverse",
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="min-w-0 flex-1 md:pt-8">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-semibold text-2xl">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              <div className="min-w-0 flex-1">
                <CodeBlock
                  code={step.code}
                  filename={step.filename}
                  language={step.language}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
