import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CHARACTERS } from '@shared/schema';

interface CharacterSelectorProps {
  selectedCharacter: string;
  onChange: (character: string) => void;
}

export function CharacterSelector({ selectedCharacter, onChange }: CharacterSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Character</h3>
      
      <ScrollArea className="h-[200px]">
        <div className="grid grid-cols-6 gap-2">
          {CHARACTERS.map((char) => (
            <Button
              key={char}
              variant={selectedCharacter === char ? 'default' : 'outline'}
              size="sm"
              onClick={() => onChange(char)}
              className="font-mono font-semibold"
              data-testid={`button-char-${char}`}
            >
              {char}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
