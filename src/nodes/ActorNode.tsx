import type { NodeProps } from '@xyflow/react';
import type { ActorNodeData } from '../types/process';
import { ACTOR_COLORS } from '../types/process';

export function ActorNode({ data }: NodeProps) {
  const nodeData = data as unknown as ActorNodeData;
  const color = ACTOR_COLORS[nodeData.actor];

  return (
    <div
      className="px-6 py-2 rounded-full font-bold text-white text-sm shadow-md min-w-[160px] text-center"
      style={{ backgroundColor: color }}
    >
      {nodeData.label}
    </div>
  );
}
