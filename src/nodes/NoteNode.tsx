import type { NodeProps } from '@xyflow/react';
import type { NoteNodeData } from '../types/process';

const PHASE_BG: Record<string, string> = {
  reservation: '#DBEAFE',
  validation: '#D1FAE5',
  handover: '#FEF3C7',
};

export function NoteNode({ data }: NodeProps) {
  const nodeData = data as unknown as NoteNodeData;
  const bg = PHASE_BG[nodeData.phase] ?? '#F3F4F6';

  return (
    <div
      className="px-4 py-3 rounded-lg border border-gray-300 shadow-sm min-w-[160px]"
      style={{ backgroundColor: bg }}
    >
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        {nodeData.label}
      </div>
      <div className="text-sm font-semibold text-gray-800 mt-1">
        {nodeData.text}
      </div>
    </div>
  );
}
