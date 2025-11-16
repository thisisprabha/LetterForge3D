import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download, Package } from 'lucide-react';
import { ExportConfig, CHARACTERS } from '@shared/schema';

interface ExportControlsProps {
  config: ExportConfig;
  onChange: (config: ExportConfig) => void;
  onExportCurrent: () => void;
  onBatchExport: () => void;
  isExporting: boolean;
}

export function ExportControls({
  config,
  onChange,
  onExportCurrent,
  onBatchExport,
  isExporting,
}: ExportControlsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Export</h3>
      
      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">Format</Label>
          <RadioGroup
            value={config.format}
            onValueChange={(value) => onChange({ ...config, format: value as 'png' | 'usdz' | 'png-animated' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png" id="format-png" data-testid="radio-format-png" />
              <Label htmlFor="format-png" className="cursor-pointer font-normal">PNG (Image)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png-animated" id="format-png-animated" />
              <Label htmlFor="format-png-animated" className="cursor-pointer font-normal">PNG (Animated)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="usdz" id="format-usdz" data-testid="radio-format-usdz" />
              <Label htmlFor="format-usdz" className="cursor-pointer font-normal">USDZ (iOS 3D)</Label>
            </div>
          </RadioGroup>
        </div>

        {config.format === 'png-animated' && (
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Animation Type</Label>
              <RadioGroup
                value={config.animationType}
                onValueChange={(value) => onChange({ ...config, animationType: value as 'rotation' | 'tilt' | 'both' })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rotation" id="anim-rotation" />
                  <Label htmlFor="anim-rotation" className="cursor-pointer font-normal text-xs">Rotation Only (Swipe Up)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tilt" id="anim-tilt" />
                  <Label htmlFor="anim-tilt" className="cursor-pointer font-normal text-xs">Tilt Only (Swipe Left)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="anim-both" />
                  <Label htmlFor="anim-both" className="cursor-pointer font-normal text-xs">Both Combined</Label>
                </div>
              </RadioGroup>
            </div>

            {(config.animationType === 'rotation' || config.animationType === 'both') && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Rotation Animation (Y-axis)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Start (deg)</Label>
                    <Input
                      type="number"
                      value={config.rotationStart}
                      onChange={(e) => onChange({ ...config, rotationStart: parseFloat(e.target.value) || 0 })}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">End (deg)</Label>
                    <Input
                      type="number"
                      value={config.rotationEnd}
                      onChange={(e) => onChange({ ...config, rotationEnd: parseFloat(e.target.value) || -90 })}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            )}

            {(config.animationType === 'tilt' || config.animationType === 'both') && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Tilt Animation (X-axis)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Start (deg)</Label>
                    <Input
                      type="number"
                      value={config.tiltStart}
                      onChange={(e) => onChange({ ...config, tiltStart: parseFloat(e.target.value) || 0 })}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">End (deg)</Label>
                    <Input
                      type="number"
                      value={config.tiltEnd}
                      onChange={(e) => onChange({ ...config, tiltEnd: parseFloat(e.target.value) || 45 })}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Frame Count</Label>
              <Input
                type="number"
                value={config.frameCount}
                onChange={(e) => onChange({ ...config, frameCount: parseInt(e.target.value) || 30 })}
                className="h-8"
                min={1}
                max={120}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">Resolution</Label>
          <Badge variant="secondary" className="font-mono">
            {config.resolution}×{config.resolution}
          </Badge>
        </div>

        <div className="space-y-2 pt-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={onExportCurrent}
            disabled={isExporting}
            data-testid="button-export-current"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Current Letter
          </Button>
          
          <Button
            variant="default"
            className="w-full"
            onClick={onBatchExport}
            disabled={isExporting}
            data-testid="button-batch-export"
          >
            <Package className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : `Batch Export All (${CHARACTERS.length} chars)`}
          </Button>
        </div>
      </div>
    </div>
  );
}
