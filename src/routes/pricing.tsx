import { Button } from "@omnidotdev/thornberry/button";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { FrequentlyAskedQuestions } from "@/components/pricing";
import createMetaTags from "@/lib/util/createMetaTags";

const included = [
  "The Rust CLI and every built-in emitter",
  "OpenAPI, Protobuf, Drizzle, and JSON Schema output",
  "Typed SDKs and models for TypeScript, Rust, and Python",
  "React Query hooks and MSW mock generation",
  "WASM plugin SDK for custom emitters",
  "Self-hostable, Apache-2.0 licensed",
];

/**
 * Pricing page. ODK is free and open source; hosted artifact hosting lives in
 * Manifold.
 */
const PricingPage = () => {
  return (
    <div className="flex h-full flex-col items-center px-4 py-8 text-center">
      <h1 className="my-6 font-bold text-4xl">Free and open source</h1>

      <h2 className="max-w-2xl font-medium text-muted-foreground text-xl">
        The Omni Development Kit is free to use, forever. No account, no seats,
        no usage limits.
      </h2>

      <div className="mt-10 grid w-full max-w-4xl gap-4 text-left lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
          <div>
            <h3 className="font-semibold text-2xl">ODK</h3>
            <p className="text-muted-foreground text-sm">
              Everything in the toolkit, at no cost
            </p>
          </div>
          <p className="font-bold text-4xl">
            $0
            <span className="ml-1 font-normal text-base text-muted-foreground">
              forever
            </span>
          </p>
          <ul className="flex flex-col gap-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm">
          <div>
            <h3 className="font-semibold text-2xl">Hosted registry</h3>
            <p className="text-muted-foreground text-sm">
              Store, version, and share what ODK generates
            </p>
          </div>
          <p className="text-muted-foreground">
            ODK writes its output to disk for free. When you want to host,
            version, and distribute those schemas, SDKs, and artifacts across a
            team, publish them to Manifold, the Omni artifact registry.
          </p>
          <Button className="mt-auto w-fit" asChild>
            <a href="https://manifold.omni.dev">Explore Manifold</a>
          </Button>
        </div>
      </div>

      <FrequentlyAskedQuestions className="mt-16 w-full" />
    </div>
  );
};

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: createMetaTags({
      title: "Pricing - ODK",
      description:
        "The Omni Development Kit is free and open source. Hosted artifact hosting lives in Manifold.",
    }),
  }),
  component: PricingPage,
});
