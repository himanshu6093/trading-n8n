import { Handle, Position } from "@xyflow/react";


//asset = SOL
//price =150
export type PriceTriggerMetadata = {
    asset: string,
    price: number
}

export function PriceTrigger({ data}: {
    data: {
        metadata: PriceTriggerMetadata
    },
    isConnectable: boolean
}) {
    return <div className="p-4 border">
        {data.metadata.asset}
        {data.metadata.price}
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}
