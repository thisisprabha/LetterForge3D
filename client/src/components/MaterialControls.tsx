import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MaterialConfig } from '@shared/schema';

interface MaterialControlsProps {
  config: MaterialConfig;
  onChange: (config: MaterialConfig) => void;
}

export function MaterialControls({ config, onChange }: MaterialControlsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground mb-4">Material</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="baseColor" className="text-sm text-muted-foreground">Base Color</Label>
              <Input
                id="baseColor"
                type="color"
                value={config.baseColor}
                onChange={(e) => onChange({ ...config, baseColor: e.target.value })}
                className="w-16 h-9 p-1 cursor-pointer"
                disabled={config.noColor}
                data-testid="input-base-color"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Label htmlFor="noColor" className="text-sm text-muted-foreground">No Color / Clear</Label>
              <Switch
                id="noColor"
                checked={config.noColor ?? false}
                onCheckedChange={(checked) => onChange({ ...config, noColor: checked })}
                data-testid="switch-no-color"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="ior" className="text-sm text-muted-foreground">IOR (Index of Refraction)</Label>
              <Input
                id="ior"
                type="number"
                value={config.ior}
                onChange={(e) => onChange({ ...config, ior: parseFloat(e.target.value) })}
                step="0.01"
                min="1.4"
                max="1.6"
                className="w-20 h-9 text-right"
                data-testid="input-ior"
              />
            </div>
            <Slider
              value={[config.ior]}
              onValueChange={(value) => onChange({ ...config, ior: value[0] })}
              min={1.4}
              max={1.6}
              step={0.01}
              data-testid="slider-ior"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="roughness" className="text-sm text-muted-foreground">Roughness</Label>
              <Input
                id="roughness"
                type="number"
                value={config.roughness}
                onChange={(e) => onChange({ ...config, roughness: parseFloat(e.target.value) })}
                step="0.01"
                min="0"
                max="0.3"
                className="w-20 h-9 text-right"
                data-testid="input-roughness"
              />
            </div>
            <Slider
              value={[config.roughness]}
              onValueChange={(value) => onChange({ ...config, roughness: value[0] })}
              min={0}
              max={0.3}
              step={0.01}
              data-testid="slider-roughness"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="thickness" className="text-sm text-muted-foreground">Thickness</Label>
              <Input
                id="thickness"
                type="number"
                value={config.thickness}
                onChange={(e) => onChange({ ...config, thickness: parseFloat(e.target.value) })}
                step="0.1"
                min="0.1"
                max="2.0"
                className="w-20 h-9 text-right"
                data-testid="input-thickness"
              />
            </div>
            <Slider
              value={[config.thickness]}
              onValueChange={(value) => onChange({ ...config, thickness: value[0] })}
              min={0.1}
              max={2.0}
              step={0.1}
              data-testid="slider-thickness"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="dispersion" className="text-sm text-muted-foreground">Chromatic Dispersion</Label>
            <Switch
              id="dispersion"
              checked={config.dispersion}
              onCheckedChange={(checked) => onChange({ ...config, dispersion: checked })}
              data-testid="switch-dispersion"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="edgeSmooth" className="text-sm text-muted-foreground">Edge Smoothing</Label>
            <Switch
              id="edgeSmooth"
              checked={config.edgeSmooth ?? true}
              onCheckedChange={(checked) => onChange({ ...config, edgeSmooth: checked })}
              data-testid="switch-edge-smooth"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
