import type { Node } from '@xyflow/react';
import type { ProcessNodeData } from '../types/process';
import {
  ACTOR_COLORS,
  ACTOR_LABELS,
  PHASE_LABELS,
  STATUS_LABELS,
  STATUS_ICONS,
} from '../types/process';

interface SidebarProps {
  node: Node | null;
  onClose: () => void;
}

export function Sidebar({ node, onClose }: SidebarProps) {
  if (!node) return null;

  const isProcess = node.type === 'process' || node.type === 'decision';
  if (!isProcess) return null;

  const data = node.data as unknown as ProcessNodeData;
  const color = ACTOR_COLORS[data.actor];

  return (
    <div className="w-80 bg-white border-l border-gray-200 shadow-lg overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-bold text-gray-800 text-sm">Detail kroku</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4">
        {/* Label */}
        <div>
          <div
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold text-gray-800">{data.label}</span>
        </div>

        {/* Actor */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Aktér</div>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold"
            style={{ backgroundColor: color }}
          >
            {ACTOR_LABELS[data.actor]}
          </span>
        </div>

        {/* Phase */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Fáze</div>
          <span className="text-sm text-gray-700">{PHASE_LABELS[data.phase]}</span>
        </div>

        {/* Status */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Stav implementace</div>
          <span className="text-sm text-gray-700">
            {STATUS_ICONS[data.status]} {STATUS_LABELS[data.status]}
          </span>
        </div>

        {/* Description */}
        {data.description && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Popis</div>
            <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
          </div>
        )}

        {/* Notes */}
        {data.notes && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Poznámky</div>
            <p className="text-sm text-gray-500 italic leading-relaxed">{data.notes}</p>
          </div>
        )}

        {/* Dependencies */}
        {data.dependencies && data.dependencies.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Závislosti</div>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {data.dependencies.map((dep) => (
                <li key={dep}>{dep}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Node ID */}
        <div className="border-t border-gray-100 pt-3">
          <div className="text-xs text-gray-400">ID: {node.id}</div>
        </div>
      </div>
    </div>
  );
}
