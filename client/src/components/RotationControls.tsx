import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { RotationState } from '@shared/schema';

interface RotationControlsProps {
  rotation: RotationState;
  onChange: (rotation: RotationState) => void;
}

const ROTATION_STEP = 0.1;

export function RotationControls({ rotation, onChange }: RotationControlsProps) {
  const handleRotate = (axis: 'x' | 'y', delta: number) => {
    onChange({
      ...rotation,
      [axis]: rotation[axis] + delta,
    });
  };

  const handleReset = () => {
    onChange({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Rotation</h3>
      
      <div className="flex flex-col items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleRotate('x', -ROTATION_STEP)}
          data-testid="button-rotate-up"
          className="hover-elevate active-elevate-2"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleRotate('y', -ROTATION_STEP)}
            data-testid="button-rotate-left"
            className="hover-elevate active-elevate-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            onClick={handleReset}
            data-testid="button-rotate-reset"
            className="hover-elevate active-elevate-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleRotate('y', ROTATION_STEP)}
            data-testid="button-rotate-right"
            className="hover-elevate active-elevate-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleRotate('x', ROTATION_STEP)}
          data-testid="button-rotate-down"
          className="hover-elevate active-elevate-2"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
