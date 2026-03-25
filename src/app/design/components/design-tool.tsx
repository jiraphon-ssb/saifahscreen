'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import Link from 'next/link';

import { useToast } from '@/hooks/use-toast';
import { useHistory } from '@/hooks/use-history';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

import CanvasArea from "./canvas-area";
import MainToolbar from './main-toolbar';
import EditorPanel from './editor-panel';
import LZString from 'lz-string';

export type DesignElement = {
  id: string;
  type: 'image' | 'text';
  name: string;
  
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  
  url?: string;
  text?: string; 
  
  rotation: number;
  opacity: number;
  visible: boolean;

  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  textShadow?: string;

  filters?: {
      brightness: number;
      contrast: number;
      grayscale: number;
      sepia: number;
  };
  flip?: {
      horizontal: boolean;
      vertical: boolean;
  };
};

export type ProductConfiguration = {
    productType: 'premium' | 'oversize';
    tshirt: {
      name: string;
      imageUrl: string;
      colorValue: string;
    };
}

export type DesignState = {
    productConfig: ProductConfiguration;
    elements: DesignElement[];
}

export type ActiveTool = 'Product' | 'Elements' | 'Layers' | 'Inspector';

const defaultTshirt = PlaceHolderImages.find(p => p.id === 't-shirt-mockup-white-saifah');

const initialDesignState: DesignState = {
    productConfig: {
        productType: 'premium',
        tshirt: {
            name: 'White',
            imageUrl: defaultTshirt?.imageUrl || '/images/t-shirt-mockup-white-saifah.webp',
            colorValue: '#FFFFFF',
        }
    },
    elements: [],
}

interface DesignToolProps {
  designId: string | null;
}

export default function DesignTool({ designId }: DesignToolProps) {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ActiveTool>('Product');
  const [isMobilePanelOpen, setMobilePanelOpen] = useState(false);
  
  const [designState, setDesignState, undo, redo, canUndo, canRedo] = useHistory<DesignState>(initialDesignState);

  // Removed Firebase design fetching logic

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(dataParam);
        if (decompressed) {
            const fetchedDesign = JSON.parse(decompressed);
            if (fetchedDesign) {
              const elements = typeof fetchedDesign.designConfiguration === 'string' 
                ? JSON.parse(fetchedDesign.designConfiguration) 
                : fetchedDesign.designConfiguration;
              const productConfig = fetchedDesign.productConfiguration;
              if (Array.isArray(elements) && productConfig) {
                 const newDesignState = { productConfig, elements };
                 setDesignState(newDesignState, true);
              }
            }
        }
      } catch (e) {
        console.error("Failed to load design from URL:", e);
        toast({
          variant: 'destructive',
          title: 'ไม่สามารถโหลดดีไซน์ได้',
          description: 'ลิงก์ข้อมูลไม่ถูกต้องหรือเสียหาย'
        });
      }
    }
  }, [searchParams, setDesignState, toast]);
  
  const handleToolSelectForMobile = (tool: ActiveTool) => {
    setActiveTool(tool);
    setMobilePanelOpen(true);
  };

  const getToolName = (tool: ActiveTool) => {
    switch (tool) {
      case 'Product': return 'สินค้า';
      case 'Elements': return 'เพิ่มองค์ประกอบ';
      case 'Layers': return 'เลเยอร์';
      case 'Inspector': return 'เครื่องมือแก้ไข';
      default: return 'Editor';
    }
  };

  const handleSetSelectedElement = (id: string | null) => {
    setSelectedElementId(id);
    if (id) {
      setActiveTool('Inspector');
      // On mobile, if an element is selected, open the inspector panel
      if (window.innerWidth < 768) {
        setMobilePanelOpen(true);
      }
    } else {
      if (activeTool === 'Inspector') {
         setActiveTool('Layers');
      }
    }
  };

  const setProductConfig = useCallback((config: ProductConfiguration) => {
    setDesignState(prev => ({...prev, productConfig: config }));
  }, [setDesignState]);

  const updateElement = useCallback((id: string, newProps: Partial<DesignElement>, pushToHistory: boolean = true) => {
      setDesignState(prev => ({
          ...prev,
          elements: prev.elements.map(el => el.id === id ? { ...el, ...newProps } : el)
      }), !pushToHistory);
  }, [setDesignState]);

  const addElement = useCallback((newElement: DesignElement) => {
      setDesignState(prev => ({
          ...prev,
          elements: [...prev.elements, newElement]
      }));
      handleSetSelectedElement(newElement.id);
  }, [setDesignState]);
  
  const addTextToCanvas = (text: string) => {
    if (!text) return;
    const newElement = addElementDefaults('text', { text, name: text });
    addElement(newElement);
  };
  
  const addImageToCanvas = (imageUrl: string) => {
    const newElement = addElementDefaults('image', { url: imageUrl, name: `รูปภาพ-${designState.elements.length + 1}` });
    addElement(newElement);
  };
  
  const deleteElement = (id: string) => {
    setDesignState(prev => ({
        ...prev,
        elements: prev.elements.filter(el => el.id !== id)
    }));
    handleSetSelectedElement(null);
  }
  
  const duplicateElement = (id: string) => {
    const elementToDuplicate = designState.elements.find(el => el.id === id);
    if (!elementToDuplicate) return;

    const newElement: DesignElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        name: `${elementToDuplicate.name} (สำเนา)`,
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20,
    };

    addElement(newElement);
  };

  const bringToFront = (id: string) => {
    setDesignState(prev => {
        const item = prev.elements.find(el => el.id === id);
        if (!item) return prev;
        const filtered = prev.elements.filter(el => el.id !== id);
        return {...prev, elements: [...filtered, item]};
    });
  }

  const sendToBack = (id: string) => {
    setDesignState(prev => {
        const item = prev.elements.find(el => el.id === id);
        if (!item) return prev;
        const filtered = prev.elements.filter(el => el.id !== id);
        return {...prev, elements: [item, ...filtered]};
    });
  }
  
  const toggleVisibility = (id: string) => {
      const element = designState.elements.find(el => el.id === id);
      if (!element) return;
      updateElement(id, { visible: !(element.visible ?? true) });
  };

  const addElementDefaults = (type: 'text' | 'image', props: Partial<DesignElement>): DesignElement => {
      const base = {
        id: `${type}-${Date.now()}`,
        type: type,
        x: 150,
        y: 150,
        rotation: 0,
        opacity: 1,
        visible: true,
      };

      if (type === 'text') {
          return {
              ...base,
              name: 'ข้อความใหม่',
              text: 'ข้อความของคุณ',
              width: 'auto',
              height: 'auto',
              fontFamily: 'Inter, sans-serif',
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: 0,
              textAlign: 'center',
              color: '#000000',
              strokeColor: '#FFFFFF',
              strokeWidth: 0,
              textShadow: 'none',
              ...props,
          } as DesignElement;
      } else {
          return {
              ...base,
              name: 'รูปภาพใหม่',
              width: 200,
              height: 200,
              filters: { brightness: 100, contrast: 100, grayscale: 0, sepia: 0 },
              flip: { horizontal: false, vertical: false },
              ...props,
          } as DesignElement;
      }
  };

  const selectedElement = designState.elements.find(el => el.id === selectedElementId) || null;
  const commonEditorProps = {
    elements: designState.elements,
    selectedElement: selectedElement,
    updateElement: updateElement,
    deleteElement: deleteElement,
    bringToFront: bringToFront,
    sendToBack: sendToBack,
    duplicateElement: duplicateElement,
    setSelectedElementId: handleSetSelectedElement,
    onToggleVisibility: toggleVisibility,
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-muted text-foreground flex flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-2 md:px-6 z-30">
        <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/">
                <X className="h-4 w-4" />
                <span className="sr-only">ปิด</span>
              </Link>
            </Button>
            <h1 className="font-semibold text-base md:text-lg">เครื่องมือออกแบบ</h1>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
           {/* Actions can be added here if needed in the future */}
        </div>
      </header>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row flex-1 min-h-0">
        <MainToolbar 
          activeTool={activeTool} 
          setActiveTool={setActiveTool} 
          selectedElementId={selectedElementId}
        />
        <aside className="flex h-full w-[380px] shrink-0 flex-col border-r border-border/50 bg-card text-card-foreground">
            <ScrollArea className="flex-1 min-h-0">
                <EditorPanel 
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    config={designState.productConfig}
                    setConfig={setProductConfig}
                    onAddImage={addImageToCanvas}
                    onAddText={addTextToCanvas}
                    {...commonEditorProps}
                />
            </ScrollArea>
        </aside>
        <CanvasArea 
            elements={designState.elements} 
            imageUrl={designState.productConfig.tshirt.imageUrl}
            selectedElementId={selectedElementId}
            setSelectedElementId={handleSetSelectedElement}
            updateElement={updateElement}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
        />
      </div>

      {/* Mobile Layout */}
       <div className="flex md:hidden flex-col flex-1 min-h-0">
         <CanvasArea
            elements={designState.elements} 
            imageUrl={designState.productConfig.tshirt.imageUrl}
            selectedElementId={selectedElementId}
            setSelectedElementId={handleSetSelectedElement}
            updateElement={updateElement}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
         />
         <MainToolbar
            activeTool={activeTool}
            setActiveTool={handleToolSelectForMobile}
            selectedElementId={selectedElementId}
         />
         <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
           <SheetContent side="bottom" className="h-[55vh] flex flex-col p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
             <SheetHeader className="p-3 border-b text-left">
                <SheetTitle>{getToolName(activeTool)}</SheetTitle>
                <SheetDescription className="sr-only">
                    Use the controls below to edit your selection.
                </SheetDescription>
             </SheetHeader>
             <ScrollArea className="flex-1 min-h-0">
                 <EditorPanel
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    config={designState.productConfig}
                    setConfig={setProductConfig}
                    onAddImage={addImageToCanvas}
                    onAddText={addTextToCanvas}
                    {...commonEditorProps}
                 />
             </ScrollArea>
           </SheetContent>
         </Sheet>
       </div>
    </div>
  );
}
