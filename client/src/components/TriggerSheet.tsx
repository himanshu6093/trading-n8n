import type { NodeKind, NodeMetaData } from "./CreateWorkflow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "run this trigger every x seconds or minutes",
  },
  {
    id: "price-trigger",
    title: "Price-trigger",
    description:
      "Runs whenever the price goes below or above a certain number for an asset",
  },
];

const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<
    TimerNodeMetadata | PriceTriggerMetadata
  >({
    time: 3600,
  });
  const [selectedTrigger, setSelectedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id
  );
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you need
            <Select
              value={selectedTrigger}
              onValueChange={(value) => setSelectedTrigger(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <>
                      {/* <SelectLabel>{title}</SelectLabel> */}
                      <SelectItem key={id} value={id}>
                        {title}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedTrigger === "timer" && (
              <div>
                <div className="pt-4">Number of seconds</div>
                <Input
                  type="text"
                  onChange={(e) =>
                    setMetadata((m) => ({
                      ...metadata,
                      time: Number(e.target.value),
                    }))
                  }
                ></Input>
              </div>
            )}
            {selectedTrigger === "price-trigger" && (
              <div>
                Price:
                <Input
                  type="text"
                  onChange={(e) =>
                    setMetadata((m) => ({
                      ...metadata,
                      price: Number(e.target.value),
                    }))
                  }
                ></Input>
                Asset
                <Select
                  value={metadata.asset}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      asset: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((id) => (
                        <>
                          {/* <SelectLabel>{title}</SelectLabel> */}
                          <SelectItem key={id} value={id}>
                            {id}
                          </SelectItem>
                        </>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger, metadata);
            }}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
