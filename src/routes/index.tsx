import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Code,
  Database,
  GitBranch,
  Layers,
  Package,
  Terminal,
  Zap,
} from "lucide-react";

import Ecosystem from "@/components/landing/Ecosystem";
import GetStarted from "@/components/landing/GetStarted";
import HowItWorks from "@/components/landing/HowItWorks";
import { Button } from "@/components/ui/button";
import useInView from "@/lib/hooks/useInView";
import createMetaTags from "@/lib/util/createMetaTags";
import cn from "@/lib/utils";

import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: createMetaTags({
      title: "ODK - Omni Development Kit",
      description:
        "Transform your data schema into a complete API ecosystem - Postgres, REST, GraphQL, and SDKs in minutes.",
    }),
  }),
  component: HomePage,
});

/**
 * Home page / Landing.
 */
function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Ecosystem />
      <GetStarted />
    </div>
  );
}

function HeroSection() {
  const { ref, inView } = useInView({ margin: "0px" });

  return (
    <section
      ref={ref}
      className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden px-4 py-16 text-center"
    >
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div
        className={cn(
          "flex max-w-4xl flex-col items-center gap-6 transition-all duration-700",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <h1 className="font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          From{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Schema
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            APIs
          </span>{" "}
          in Minutes
        </h1>
        <p className="max-w-2xl text-muted-foreground text-xl">
          Omni Development Kit transforms your data schema into a complete API
          ecosystem—Postgres schema, RESTful API, GraphQL, and SDK generation,
          all in one seamless flow.
        </p>
      </div>

      <div
        className={cn(
          "flex flex-col gap-4 transition-all delay-200 duration-700 sm:flex-row",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <Button size="lg" className="group" asChild>
          <a href="#get-started">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
        <Button size="lg" variant="outline">
          View Documentation
        </Button>
      </div>

      {/* Code Preview */}
      <div
        className={cn(
          "mt-8 w-full max-w-4xl overflow-hidden rounded-lg border shadow-2xl transition-all delay-300 duration-700",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b bg-card px-4 py-3">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-destructive/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-muted-foreground text-sm">schema.ts</span>
          <div className="w-16" />
        </div>
        <pre className="overflow-x-auto bg-muted/50 p-4 text-left text-sm">
          <code className="text-foreground">{`// Define your data schema once
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
};

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string; // Relation to User
  published: boolean;
};`}</code>
        </pre>
      </div>

      {/* Workflow Icons */}
      <div
        className={cn(
          "mt-12 flex flex-col gap-8 transition-all delay-500 duration-700 md:flex-row md:gap-16",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <WorkflowStep
          icon={<Database className="h-8 w-8 text-primary" />}
          title="Postgres Schema"
          subtitle="via Drizzle"
        />
        <WorkflowStep
          icon={<Code className="h-8 w-8 text-secondary" />}
          title="REST & GraphQL"
          subtitle="OpenAPI compliant"
        />
        <WorkflowStep
          icon={<Terminal className="h-8 w-8 text-accent" />}
          title="SDKs & Plugins"
          subtitle="via Extism"
        />
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, inView } = useInView();

  return (
    <section id="features" className="bg-muted/50 px-4 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          Everything you need to build APIs
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          Schema-first development with a complete toolkit
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Schema-First Design"
            description="Define your data model once and generate everything else automatically"
            inView={inView}
            delay={0}
          />
          <FeatureCard
            icon={<Layers className="h-8 w-8" />}
            title="Multi-Target Output"
            description="Generate Postgres schemas, REST APIs, GraphQL endpoints, and typed SDKs"
            inView={inView}
            delay={75}
          />
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title="Plugin System"
            description="Extend functionality with Extism-powered plugins in any language"
            inView={inView}
            delay={150}
          />
          <FeatureCard
            icon={<GitBranch className="h-8 w-8" />}
            title="Version Control Ready"
            description="Schema changes tracked in git, with migration support built-in"
            inView={inView}
            delay={225}
          />
          <FeatureCard
            icon={<Database className="h-8 w-8" />}
            title="Drizzle Integration"
            description="First-class support for Drizzle ORM with automatic schema generation"
            inView={inView}
            delay={300}
          />
          <FeatureCard
            icon={<Code className="h-8 w-8" />}
            title="Type Safety"
            description="End-to-end TypeScript types from database to client SDK"
            inView={inView}
            delay={375}
          />
        </div>
      </div>
    </section>
  );
}

function WorkflowStep({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3 rounded-full bg-card p-4 shadow-md">{icon}</div>
      <span className="font-medium">{title}</span>
      <span className="text-muted-foreground text-sm">{subtitle}</span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  inView,
  delay,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md",
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-semibold text-xl">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
