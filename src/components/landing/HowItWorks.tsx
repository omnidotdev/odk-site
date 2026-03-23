import CodeBlock from "@/components/core/CodeBlock";
import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

const steps = [
  {
    title: "Define Your Schema",
    description:
      "Start with a simple TypeScript schema that describes your data model",
    filename: "schema.ts",
    language: "typescript",
    code: `import { defineSchema } from "@omnidotdev/odk";

const schema = defineSchema({
  User: {
    id: "uuid",
    name: "string",
    email: "string @unique",
    role: "'admin' | 'user'",
    createdAt: "timestamp",
  },
  Post: {
    id: "uuid",
    title: "string",
    content: "text",
    author: "User @relation",
    published: "boolean @default(false)",
  },
});`,
  },
  {
    title: "Generate Database Schema",
    description:
      "ODK transforms your schema into production-ready PostgreSQL with Drizzle ORM",
    filename: "generated/db.sql",
    language: "sql",
    code: `CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "role" TEXT NOT NULL DEFAULT 'user',
  "created_at" TIMESTAMP DEFAULT now()
);

CREATE TABLE "posts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "author_id" UUID NOT NULL REFERENCES "users"("id"),
  "published" BOOLEAN DEFAULT false
);`,
  },
  {
    title: "Build REST APIs",
    description:
      "Auto-generated REST endpoints with full OpenAPI documentation",
    filename: "generated/api.ts",
    language: "typescript",
    code: `// Auto-generated REST API endpoints
app.get("/api/users", async (ctx) => {
  const users = await db.select().from(usersTable);
  return ctx.json(users);
});

app.post("/api/users", async (ctx) => {
  const body = await ctx.req.json();
  const user = await db.insert(usersTable)
    .values(body).returning();
  return ctx.json(user, 201);
});`,
  },
  {
    title: "Create GraphQL API",
    description: "A full GraphQL schema with resolvers, ready for production",
    filename: "generated/schema.graphql",
    language: "graphql",
    code: `type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  posts: [Post!]!
}

type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}`,
  },
];

/**
 * How It Works section showing the 4-step ODK workflow.
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
          Go from a TypeScript schema to a complete API ecosystem in four steps
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
              <div className="flex-1 md:pt-8">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-sm">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-semibold text-2xl">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              <div className="flex-1">
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
