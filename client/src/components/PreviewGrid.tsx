import { Card } from '@/components/ui/card';
import { CHARACTERS } from '@shared/schema';
import { MaterialConfig, RotationState } from '@shared/schema';
import { ThreeCanvas } from './ThreeCanvas';

interface PreviewGridProps {
  materialConfig: MaterialConfig;
  rotation: RotationState;
  onCharacterSelect: (character: string) => void;
}

export function PreviewGrid({ materialConfig, rotation, onCharacterSelect }: PreviewGridProps) {
  return (
    <div className="w-full h-full overflow-auto p-6">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {CHARACTERS.map((char) => (
          <Card
            key={char}
            className="aspect-square cursor-pointer hover-elevate active-elevate-2 overflow-hidden"
            onClick={() => onCharacterSelect(char)}
            data-testid={`card-preview-${char}`}
          >
            <div className="w-full h-full">
              <ThreeCanvas
                character={char}
                materialConfig={materialConfig}
                rotation={rotation}
              />
            </div>
            <div className="absolute bottom-2 right-2">
              <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono font-semibold">
                {char}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
