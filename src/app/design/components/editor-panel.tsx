'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { SlidersHorizontal, ShoppingBag } from 'lucide-react';
import type { DesignElement, ProductConfiguration, ActiveTool, OrderItem } from './design-tool';
import ProductPanel from './product-panel';
import AddElementsPanel from './add-elements-panel';
import LayersPanel from './layers-panel';
import InspectorPanel from './inspector-panel';
import OrderPanel from './order-panel';

interface EditorPanelProps {
  activeTool: ActiveTool;
  setActiveTool: (tool: ActiveTool) => void;
  config: ProductConfiguration;
  setConfig: (config: ProductConfiguration) => void;
  onAddImage: (imageUrl: string) => void;
  onAddText: (text: string) => void;
  elements: DesignElement[];
  selectedElement: DesignElement | null;
  updateElement: (id: string, props: Partial<DesignElement>, pushToHistory?: boolean) => void;
  deleteElement: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  duplicateElement: (id: string) => void;
  setSelectedElementId: (id: string | null) => void;
  onToggleVisibility: (id: string) => void;
  // New Order Props
  orders: OrderItem[];
  addOrder: (colorName: string, colorValue: string, imageUrl: string) => void;
  removeOrder: (id: string) => void;
  updateOrderSize: (orderId: string, size: string, quantity: number) => void;
  currentTshirt: { name: string, colorValue: string, imageUrl: string };
}

export default function EditorPanel({
  activeTool,
  setActiveTool,
  config,
  setConfig,
  onAddImage,
  onAddText,
  elements,
  selectedElement,
  updateElement,
  deleteElement,
  bringToFront,
  sendToBack,
  duplicateElement,
  setSelectedElementId,
  onToggleVisibility,
  orders,
  addOrder,
  removeOrder,
  updateOrderSize,
  currentTshirt,
}: EditorPanelProps) {
  
  switch (activeTool) {
    case 'Product':
      return <ProductPanel config={config} setConfig={setConfig} orders={orders} addOrder={addOrder} removeOrder={removeOrder} updateOrderSize={updateOrderSize} />;
    case 'Elements':
      return <AddElementsPanel onAddText={onAddText} onAddImage={onAddImage} />;
    case 'Layers':
      return (
        <LayersPanel
          elements={elements}
          selectedElementId={selectedElement?.id || null}
          onSelectElement={setSelectedElementId}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
          onToggleVisibility={onToggleVisibility}
          onDuplicateElement={duplicateElement}
          onDeleteElement={deleteElement}
        />
      );
    case 'Inspector':
      if (selectedElement) {
          return <InspectorPanel
            key={selectedElement.id} // Force re-mount on element change
            selectedElement={selectedElement}
            updateElement={updateElement}
            deleteElement={deleteElement}
            bringToFront={bringToFront}
            sendToBack={sendToBack}
            duplicateElement={duplicateElement}
          />
      }
      return (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-4 h-full">
              <SlidersHorizontal className="w-12 h-12 mb-4" />
              <h3 className="font-semibold text-foreground">เครื่องมือแก้ไข</h3>
              <p className="text-sm">เลือกองค์ประกอบบน Canvas เพื่อเริ่มแก้ไขคุณสมบัติ</p>
          </div>
      );
    default:
      return <ProductPanel config={config} setConfig={setConfig} orders={orders} addOrder={addOrder} removeOrder={removeOrder} updateOrderSize={updateOrderSize} />;
  }
}
