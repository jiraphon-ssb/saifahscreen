'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Undo2, Redo2, Share2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useToast } from '@/hooks/use-toast';
import { useHistory } from '@/hooks/use-history';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

import CanvasArea from "./canvas-area";
import MainToolbar from './main-toolbar';
import EditorPanel from './editor-panel';
import LZString from 'lz-string';
import { setIDB } from '@/lib/idb';

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
  curve?: number;

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

export type OrderItem = {
    id: string;
    tshirt: {
        name: string;
        colorValue: string;
        imageUrl: string;
    };
    sizes: {
        [key: string]: number;
    };
}

export type DesignState = {
    productConfig: ProductConfiguration;
    elements: DesignElement[];
    orders: OrderItem[];
}

export type ActiveTool = 'Product' | 'Elements' | 'Layers' | 'Inspector' | 'Orders';

const defaultTshirt = PlaceHolderImages.find(p => p.id === 't-shirt-mockup-white-saifah');

const initialDesignState: DesignState = {
    productConfig: {
        productType: 'premium',
        tshirt: {
            name: 'White',
            imageUrl: defaultTshirt?.imageUrl || '/images/t-shirt-mockup-white-saifah.png',
            colorValue: '#FFFFFF',
        }
    },
    elements: [],
    orders: [],
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
  const [mobileActiveTool, setMobileActiveTool] = useState<ActiveTool>('Product');
  const [isMobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [hideMockup, setHideMockup] = useState(false);
  
  const [designState, setDesignState, undo, redo, canUndo, canRedo] = useHistory<DesignState>(initialDesignState);

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
              
              // Migrate old .webp mockup URLs to .png
              let productConfig = fetchedDesign.productConfiguration;
              if (productConfig?.tshirt?.imageUrl?.endsWith('.webp')) {
                productConfig.tshirt.imageUrl = productConfig.tshirt.imageUrl.replace('.webp', '.png');
              }

              if (Array.isArray(elements) && productConfig) {
                 const newDesignState: DesignState = { 
                   productConfig, 
                   elements,
                   orders: fetchedDesign.orders || []
                 };
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
      case 'Elements': return 'เพิ่ม';
      case 'Layers': return 'เลเยอร์';
      case 'Inspector': return 'แก้ไข';
      default: return '';
    }
  };

  const handleSetSelectedElement = (id: string | null) => {
    setSelectedElementId(id);
    if (id) {
      setActiveTool('Inspector');
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
  
  const addOrder = (colorName: string, colorValue: string, imageUrl: string) => {
    setDesignState(prev => {
        const id = `order-${Date.now()}`;
        const newOrder: OrderItem = {
            id,
            tshirt: { name: colorName, colorValue, imageUrl },
            sizes: { 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0 }
        };
        return { ...prev, orders: [...prev.orders, newOrder] };
    });
  };

  const removeOrder = (id: string) => {
    setDesignState(prev => ({
        ...prev,
        orders: prev.orders.filter(o => o.id !== id)
    }));
  };

  const updateOrderSize = (orderId: string, size: string, quantity: number) => {
    setDesignState(prev => ({
        ...prev,
        orders: prev.orders.map(o => o.id === orderId ? {
            ...o,
            sizes: { ...o.sizes, [size]: quantity }
        } : o)
    }), true); // Don't push to history for every keystroke if needed, but here simple is better
  };

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
              fontWeight: 600,
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
    orders: designState.orders,
    addOrder,
    removeOrder,
    updateOrderSize,
    currentTshirt: designState.productConfig.tshirt,
  };

  const handleShare = async () => {
    try {
        const rawData = JSON.stringify({
            productConfiguration: designState.productConfig,
            designConfiguration: designState.elements,
            orders: designState.orders,
        });
        await setIDB('saifah_pending_summary', rawData);
        window.location.href = `/summary`;
    } catch (e) {
        console.error("Failed to save and redirect:", e);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      if (isInput) return;

      // Delete / Backspace → delete selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }
      // Ctrl/Cmd + Z → Undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl/Cmd + Shift + Z → Redo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      // Ctrl/Cmd + D → Duplicate
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && selectedElementId) {
        e.preventDefault();
        duplicateElement(selectedElementId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, deleteElement, undo, redo, duplicateElement]);

  return (
    <TooltipProvider>
    <div className="h-[100dvh] w-[100dvw] overflow-hidden bg-background text-foreground flex flex-col">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-14 shrink-0 items-center justify-between border-b bg-card px-2 md:px-6 z-30 shadow-sm"
      >
        <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-zinc-100" asChild>
              <Link href="/">
                <X className="h-5 w-5 text-zinc-950" />
                <span className="sr-only">ปิด</span>
              </Link>
            </Button>
            <div className="h-6 w-px bg-zinc-200 hidden md:block" />
            <h1 className="font-black text-sm md:text-base hidden md:block tracking-tight text-zinc-950 uppercase">SAIFAH DESIGN STUDIO</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-950 rounded-full text-white hidden sm:inline ml-2">
               {designState.elements.length} LAYERS
             </span>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
            <div className="hidden md:flex items-center gap-1 mr-2 bg-zinc-100 rounded-lg p-1">
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-md" 
                          onClick={undo} 
                          disabled={!canUndo}
                      >
                          <Undo2 className="h-4 w-4" />
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>ย้อนกลับ</TooltipContent>
              </Tooltip>
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-md" 
                          onClick={redo} 
                          disabled={!canRedo}
                      >
                          <Redo2 className="h-4 w-4" />
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>ทำซ้ำ</TooltipContent>
              </Tooltip>
            </div>
            
            <Separator orientation="vertical" className="h-6 hidden md:block mr-2" />
            
            <Button size="sm" className="gap-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">แชร์แบบนี้</span>
            </Button>
        </div>
      </motion.header>
      
      <div className="hidden md:flex flex-row flex-1 h-full min-h-0 bg-secondary/10">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
           <MainToolbar 
             activeTool={activeTool} 
             setActiveTool={setActiveTool} 
             selectedElementId={selectedElementId}
           />
        </motion.div>
        
        <motion.aside 
           initial={{ x: -100, opacity: 0 }} 
           animate={{ x: 0, opacity: 1 }} 
           transition={{ duration: 0.5, delay: 0.1, type: 'spring', damping: 20 }}
           className="flex h-full w-[360px] shrink-0 flex-col border-r border-white/10 glass-panel z-30 overflow-hidden"
        >
            <ScrollArea className="flex-1">
                    <EditorPanel 
                        activeTool={activeTool}
                        setActiveTool={setActiveTool}
                        config={designState.productConfig}
                        setConfig={setProductConfig}
                        onAddImage={addImageToCanvas}
                        onAddText={addTextToCanvas}
                        {...commonEditorProps}
                        orders={designState.orders}
                        addOrder={addOrder}
                        removeOrder={removeOrder}
                        updateOrderSize={updateOrderSize}
                        currentTshirt={designState.productConfig.tshirt}
                    />
            </ScrollArea>
        </motion.aside>
        
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
           className="flex-1 relative h-full w-full bg-secondary/5"
        >
           <CanvasArea 
                elements={designState.elements} 
                imageUrl={designState.productConfig.tshirt.imageUrl}
                selectedElementId={selectedElementId}
                setSelectedElementId={handleSetSelectedElement}
                updateElement={updateElement}
                deleteElement={deleteElement}
                duplicateElement={duplicateElement}
                bringToFront={bringToFront}
                sendToBack={sendToBack}
                undo={undo}
                redo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
                hideMockup={hideMockup}
            />
        </motion.div>
      </div>

      <div className="flex md:hidden flex-col flex-1 min-h-0">
         <CanvasArea
             elements={designState.elements} 
             imageUrl={designState.productConfig.tshirt.imageUrl}
             selectedElementId={selectedElementId}
             setSelectedElementId={handleSetSelectedElement}
             updateElement={updateElement}
             deleteElement={deleteElement}
             duplicateElement={duplicateElement}
             bringToFront={bringToFront}
             sendToBack={sendToBack}
             undo={undo}
             redo={redo}
             canUndo={canUndo}
             canRedo={canRedo}
             hideMockup={hideMockup}
           />
         <MainToolbar
            activeTool={activeTool}
            setActiveTool={handleToolSelectForMobile}
            selectedElementId={selectedElementId}
         />
         <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
            <SheetContent side="bottom" className="h-[60vh] flex flex-col p-0 rounded-t-[28px] overflow-hidden border-none" onOpenAutoFocus={(e) => e.preventDefault()}>
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-zinc-300" />
              </div>
              <SheetHeader className="px-4 pb-3 border-b flex-shrink-0">
                 <SheetTitle className="text-base font-bold">{getToolName(activeTool)}</SheetTitle>
                 <SheetDescription className="sr-only">
                     แก้ไข {getToolName(activeTool)}
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
                     orders={designState.orders}
                     addOrder={addOrder}
                     removeOrder={removeOrder}
                     updateOrderSize={updateOrderSize}
                     currentTshirt={designState.productConfig.tshirt}
                  />
             </ScrollArea>
           </SheetContent>
          </Sheet>
       </div>
    </div>
    </TooltipProvider>
  );
}
