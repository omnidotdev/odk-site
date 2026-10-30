import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@omnidotdev/thornberry/accordion";

import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

const FAQ = [
  {
    question: "Is ODK really free?",
    answer: `Yes. ${app.name} is free and open source under Apache 2.0. The CLI, every built-in emitter, the SDKs, and the plugin SDK are all free, with no account, seats, or usage limits.`,
  },
  {
    question: "What can I generate from one schema?",
    answer:
      "OpenAPI, Protobuf, Drizzle ORM, and JSON Schema, plus typed models and SDKs for TypeScript, Rust, and Python, React Query hooks, and MSW mocks. You can add your own targets with WASM plugins.",
  },
  {
    question: "Do I need an account or a server?",
    answer:
      "No. ODK is a Rust CLI that runs entirely on your machine and writes its output to disk. There is nothing to sign in to and nothing to deploy.",
  },
  {
    question: "Where do hosted features fit in?",
    answer:
      "When you want to host, version, and distribute the schemas, SDKs, and artifacts ODK generates across a team, publish them to Manifold, the Omni artifact registry.",
  },
];

interface Props {
  className?: string;
}

/**
 * Frequently asked questions.
 */
const FrequentlyAskedQuestions = ({ className }: Props) => {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <h1 className="font-bold text-lg">Frequently Asked Questions</h1>

      <AccordionRoot multiple className="w-full max-w-2xl">
        {FAQ.map((item) => (
          <AccordionItem
            key={item.question}
            value={item.question}
            className="text-start"
          >
            <AccordionItemTrigger className="font-semibold">
              {item.question}
            </AccordionItemTrigger>

            <AccordionItemContent className="pr-8 text-muted-foreground">
              {item.answer}
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </div>
  );
};

export default FrequentlyAskedQuestions;
