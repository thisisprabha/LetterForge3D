import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Grid3x3, Maximize2 } from 'lucide-react';
import { ThreeCanvas } from '@/components/ThreeCanvas';
import { MaterialControls } from '@/components/MaterialControls';
import { RotationControls } from '@/components/RotationControls';
import { CharacterSelector } from '@/components/CharacterSelector';
import { ExportControls } from '@/components/ExportControls';
import { PreviewGrid } from '@/components/PreviewGrid';
import { useToast } from '@/hooks/use-toast';
import {
  MaterialConfig,
  ExportConfig,
  RotationState,
  ViewMode,
  CHARACTERS,
  materialConfigSchema,
  exportConfigSchema,
} from '@shared/schema';
import { exportToPNG, exportToUSDZ, batchExportPNG, downloadBlob } from '@/lib/exportUtils';
import * as THREE from 'three';

export default function Home() {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [selectedCharacter, setSelectedCharacter] = useState('0');
  const [materialConfig, setMaterialConfig] = useState<MaterialConfig>(
    materialConfigSchema.parse({})
  );
  const [exportConfig, setExportConfig] = useState<ExportConfig>(
    exportConfigSchema.parse({})
  );
  const [rotation, setRotation] = useState<RotationState>({ x: 0, y: 0 });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<string>('');

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  const handleRendererReady = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    mesh: THREE.Mesh | null
  ) => {
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    meshRef.current = mesh;
  };

  const handleExportCurrent = async () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
      toast({
        title: 'Export Error',
        description: 'Renderer not ready. Please wait for the scene to load.',
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(true);

    try {
      if (exportConfig.format === 'png') {
        const blob = await exportToPNG(
          rendererRef.current,
          sceneRef.current,
          cameraRef.current,
          `${selectedCharacter}.png`,
          exportConfig.resolution
        );
        downloadBlob(blob, `glass-letter-${selectedCharacter}.png`);
        toast({
          title: 'Export Successful',
          description: `${selectedCharacter}.png has been downloaded.`,
        });
      } else {
        const blob = await exportToUSDZ(
          meshRef.current,
          `${selectedCharacter}.usdz`,
          materialConfig
        );
        downloadBlob(blob, `glass-letter-${selectedCharacter}.usdz`);
        toast({
          title: 'Export Successful',
          description: `${selectedCharacter}.usdz has been downloaded.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleBatchExport = async () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
      toast({
        title: 'Export Error',
        description: 'Renderer not ready. Please wait for the scene to load.',
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(true);
    setExportProgress('Starting batch export...');

    try {
      const renderCharacter = async (char: string): Promise<Blob> => {
        setSelectedCharacter(char);
        await new Promise(resolve => setTimeout(resolve, 200));

        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
          throw new Error('Renderer not available');
        }

        return exportToPNG(
          rendererRef.current,
          sceneRef.current,
          cameraRef.current,
          `${char}.png`,
          exportConfig.resolution
        );
      };

      await batchExportPNG(CHARACTERS, renderCharacter, (current, total) => {
        setExportProgress(`Exporting ${current}/${total}...`);
      });

      toast({
        title: 'Batch Export Complete',
        description: `All ${CHARACTERS.length} characters exported successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Batch Export Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="h-16 border-b border-border flex items-center justify-between px-6">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">3D Glass Letter Generator</h1>
          <p className="text-xs text-muted-foreground">Physically accurate glass with chromatic dispersion</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('single')}
            data-testid="button-mode-single"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Single
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            data-testid="button-mode-grid"
          >
            <Grid3x3 className="w-4 h-4 mr-2" />
            Preview Grid
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {viewMode === 'single' ? (
          <div className="grid grid-cols-[250px_1fr_350px] h-full">
            {/* Left: Character Selector */}
            <div className="border-r border-border overflow-y-auto">
              <div className="p-4">
                <CharacterSelector
                  selectedCharacter={selectedCharacter}
                  onChange={(char) => {
                    setSelectedCharacter(char);
                    // Don't reset rotation - keep global rotation
                  }}
                />
              </div>
            </div>

            {/* Center: Canvas (Portrait style) */}
            <div className="p-4 flex items-center justify-center">
              <Card className="w-full h-full max-w-2xl border-2">
                <ThreeCanvas
                  character={selectedCharacter}
                  materialConfig={materialConfig}
                  rotation={rotation}
                  onRendererReady={handleRendererReady}
                />
              </Card>
            </div>

            {/* Right: Controls (Rotation | Material | Export) */}
            <div className="border-l border-border overflow-y-auto">
              <div className="p-6 space-y-6">
                <RotationControls rotation={rotation} onChange={setRotation} />

                <Separator />

                <MaterialControls config={materialConfig} onChange={setMaterialConfig} />

                <Separator />

                <ExportControls
                  config={exportConfig}
                  onChange={setExportConfig}
                  onExportCurrent={handleExportCurrent}
                  onBatchExport={handleBatchExport}
                  isExporting={isExporting}
                />

                {exportProgress && (
                  <div className="text-sm text-center text-muted-foreground">
                    {exportProgress}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <PreviewGrid
            materialConfig={materialConfig}
            rotation={rotation}
            onCharacterSelect={(char) => {
              setSelectedCharacter(char);
              // Don't reset rotation - keep global rotation
              setViewMode('single');
            }}
          />
        )}
      </main>
    </div>
  );
}
