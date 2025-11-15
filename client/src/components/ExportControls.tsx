import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Download, Package } from 'lucide-react';
import { ExportConfig } from '@shared/schema';

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
            onValueChange={(value) => onChange({ ...config, format: value as 'png' | 'usdz' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png" id="format-png" data-testid="radio-format-png" />
              <Label htmlFor="format-png" className="cursor-pointer font-normal">PNG (Image)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="usdz" id="format-usdz" data-testid="radio-format-usdz" />
              <Label htmlFor="format-usdz" className="cursor-pointer font-normal">USDZ (iOS 3D)</Label>
            </div>
          </RadioGroup>
        </div>

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
            {isExporting ? 'Exporting...' : 'Batch Export All (36 chars)'}
          </Button>
        </div>
      </div>
    </div>
  );
}
