import { Format } from "@ark-ui/react";
import { CheckIcon } from "lucide-react";

import { ExternalLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/util";
import cn from "@/lib/utils";

import type { CardProps } from "@/components/ui/card";
import type { Price } from "@/lib/providers/billing";

interface Props extends CardProps {
  price: Price;
  disableAction?: boolean;
}

/**
 * Price card.
 */
const PriceCard = ({ price, className, disableAction, ...rest }: Props) => {
  return (
    <CardRoot
      key={price.product.name}
      className={cn(
        "size-full max-w-lg overflow-hidden lg:min-w-80",
        className,
      )}
      {...rest}
    >
      <CardHeader className="bg-muted pb-3 lg:min-h-50.5">
        <div className="flex flex-1 flex-col">
          <CardTitle className="text-lg">
            {capitalizeFirstLetter(price.product.name)}
          </CardTitle>

          <CardDescription className="mt-2 mb-4 flex-1">
            {price.product.description}
          </CardDescription>

          {price.unit_amount != null && (
            <p className="font-semibold text-lg">
              <Format.Number
                value={price.unit_amount / 100}
                style="currency"
                currency="USD"
                notation="compact"
                compactDisplay="short"
              />

              <span className="pl-1 font-normal text-muted-foreground text-sm">
                /{price.recurring ? price.recurring.interval : "forever"}
              </span>
            </p>
          )}
        </div>

        <Button disabled={disableAction} asChild>
          <ExternalLink href="https://omni.dev" variant="unstyled">
            Get Started
          </ExternalLink>
        </Button>
      </CardHeader>

      <CardContent className="p-4">
        {price.product.marketing_features.map((feature) => (
          <div key={feature.name} className="flex items-center gap-2">
            <CheckIcon className="size-4 text-primary" />
            <p>{feature.name}</p>
          </div>
        ))}
      </CardContent>
    </CardRoot>
  );
};

export default PriceCard;
