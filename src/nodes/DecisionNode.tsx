import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { DecisionNodeData } from '../types/process';
import { ACTOR_COLORS } from '../types/process';

export function DecisionNode({ data }: NodeProps) {
  const nodeData = data as unknown as DecisionNodeData;
  const color = ACTOR_COLORS[nodeData.actor];

  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <Handle type="target" position={Position.Top} className="!w-2 !h-2" style={{ top: -4 }} />
      <div
        className="w-[130px] h-[130px] rotate-45 border-2 shadow-md flex items-center justify-center bg-white"
        style={{ borderColor: color }}
      >
        <span className="-rotate-45 text-xs font-semibold text-gray-800 text-center px-2 leading-tight">
          {nodeData.label}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2" style={{ bottom: -4 }} />
      <Handle type="source" position={Position.Right} id="right" className="!w-2 !h-2" style={{ right: -4 }} />
      <Handle type="source" position={Position.Left} id="left" className="!w-2 !h-2" style={{ left: -4 }} />
    </div>
  );
}
