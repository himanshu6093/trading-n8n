import type { NodeKind, NodeMetaData } from "./CreateWorkflow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { SUPPORTED_ASSETS } from "./TriggerSheet";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on hyperliquid",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on backpack",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on lighter",
  },
];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
  const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Select the type of action you need
            <Select
              value={selectedAction}
              onValueChange={(value) => setSelectedAction(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a action" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ACTIONS.map(({ id, title }) => (
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
            {(selectedAction === "lighter" ||
              selectedAction === "hyperliquid" ||
              selectedAction === "backpack") && (
              <div>
                <div className="pt-4">Type</div>
                <Select
                  value={metadata?.type}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      type: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"long"}>LONG</SelectItem>
                      <SelectItem value={"short"}>SHORT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="pt-4">Symbol</div>
                <Select
                  value={metadata?.symbol}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      symbol: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="pt-4">Qty</div>
                <Input
                  type="text"
                  onChange={(e) =>
                    setMetadata((m) => ({
                      ...metadata,
                      qty: Number(e.target.value),
                    }))
                  }
                ></Input>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction, metadata);
            }}
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
