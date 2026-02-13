import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { ProcessNodeData } from '../types/process';
import { ACTOR_COLORS, STATUS_ICONS } from '../types/process';

export function ProcessNode({ data }: NodeProps) {
  const nodeData = data as unknown as ProcessNodeData;
  const color = ACTOR_COLORS[nodeData.actor];
  const statusIcon = STATUS_ICONS[nodeData.status];

  return (
    <>
      <Handle type="target" position={Position.Top} className="!w-2 !h-2" />
      <div
        className="px-4 py-3 rounded-lg shadow-md border-l-4 bg-white min-w-[200px] max-w-[240px] cursor-pointer hover:shadow-lg transition-shadow"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-start gap-2">
          <span className="text-xs mt-0.5 shrink-0" title={nodeData.status}>
            {statusIcon}
          </span>
          <span className="text-sm font-medium text-gray-800 leading-tight">
            {nodeData.label}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2" />
    </>
  );
}
