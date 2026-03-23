import {
  Activity,
  Bell,
  Lock,
  Puzzle,
  Search,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

import useInView from "@/lib/hooks/useInView";
import cn from "@/lib/utils";

import type { ReactNode } from "react";

const plugins = [
  {
    name: "CLI Tools",
    description:
      "Schema management, migrations, and deployment from the terminal",
    icon: <Terminal className="h-6 w-6" />,
    badge: "Core",
  },
  {
    name: "Auth Provider",
    description: "JWT authentication, OAuth, and role-based access control",
    icon: <Lock className="h-6 w-6" />,
    badge: "Popular",
  },
  {
    name: "Search Engine",
    description: "Full-text search powered by PostgreSQL or Elasticsearch",
    icon: <Search className="h-6 w-6" />,
  },
  {
    name: "Rate Limiting",
    description:
      "API protection with configurable rate limits and usage monitoring",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    name: "Cache Manager",
    description: "Intelligent caching layer for high-performance API responses",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    name: "Webhooks",
    description:
      "Event-driven architecture with configurable webhook endpoints",
    icon: <Bell className="h-6 w-6" />,
  },
  {
    name: "Monitoring",
    description: "Metrics, tracing, and performance insights out of the box",
    icon: <Activity className="h-6 w-6" />,
  },
  {
    name: "Custom Plugin",
    description: "Build your own plugins with the Extism SDK in any language",
    icon: <Puzzle className="h-6 w-6" />,
  },
];

/**
 * Ecosystem section showcasing the ODK plugin system.
 */
const Ecosystem = () => {
  const { ref, inView } = useInView();

  return (
    <section id="ecosystem" className="bg-muted/50 px-4 py-24" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          Plugin Ecosystem
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
          Extend ODK with a growing collection of plugins powered by Extism
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plugins.map((plugin, i) => (
            <PluginCard
              key={plugin.name}
              {...plugin}
              inView={inView}
              delay={i * 75}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            <Puzzle className="h-5 w-5" />
            Browse Plugin Registry
          </button>
        </div>
      </div>
    </section>
  );
};

const PluginCard = ({
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
