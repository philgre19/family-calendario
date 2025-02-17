
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface AvatarItemSelectorProps {
  type: 'hair' | 'clothes' | 'accessory';
  selectedItemId?: string | null;
  onSelectItem: (itemId: string) => void;
}

export function AvatarItemSelector({ type, selectedItemId, onSelectItem }: AvatarItemSelectorProps) {
  const { data: items, isLoading } = useQuery({
    queryKey: ["avatar_items", type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("avatar_items")
        .select("*")
        .eq("type", type)
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Chargement des options...</div>;
  }

  return (
    <ScrollArea className="h-[120px] rounded-md border p-4">
      <div className="flex gap-2 pb-2">
        {items?.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            size="sm"
            className={cn(
              "h-[80px] w-[80px] p-2 transition-all",
              selectedItemId === item.id && "ring-2 ring-primary"
            )}
            onClick={() => onSelectItem(item.id)}
          >
            <img 
              src={item.image_url} 
              alt={item.name} 
              className="w-full h-full object-contain"
            />
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
