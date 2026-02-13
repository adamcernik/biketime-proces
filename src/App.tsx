import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ProcessNode } from './nodes/ProcessNode';
import { DecisionNode } from './nodes/DecisionNode';
import { ActorNode } from './nodes/ActorNode';
import { NoteNode } from './nodes/NoteNode';
import { LabeledEdge } from './edges/LabeledEdge';

import { Sidebar } from './components/Sidebar';
import { Legend } from './components/Legend';
import { Toolbar } from './components/Toolbar';

import { initialNodes, initialEdges } from './data/btr-main-process';

const nodeTypes = {
  process: ProcessNode,
  decision: DecisionNode,
  actor: ActorNode,
  note: NoteNode,
};

const edgeTypes = {
  labeled: LabeledEdge,
};

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="w-screen h-screen flex bg-gray-50">
      {/* Main canvas */}
      <div className="flex-1 relative">
        {/* Title */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 px-4 py-2">
          <h1 className="text-base font-bold text-gray-800">BikeTime Rental — Procesní model</h1>
          <p className="text-xs text-gray-500">B2B SaaS platforma pro pronájem elektrokol</p>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: '#9CA3AF', strokeWidth: 1.5 },
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#D1D5DB" />
          <Toolbar />
          <Legend />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <Sidebar node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
