import { Button } from "@raonc/ui/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@raonc/ui/components/drawer";
import { ScrollArea } from "@raonc/ui/components/scroll-area";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@raonc/ui/components/toggle-group";
import { useEffect, useState } from "react";

interface Props {
  allNations: string[];
  allNotes: string[];
  selectedNations: string[];
  onSelectedNationsChange: (value: string[]) => void;
  selectedNotes: string[];
  onSelectedNotesChange: (value: string[]) => void;
}

export default function MobileCoffeeFilter({
  allNations,
  allNotes,
  selectedNations: _selectedNations,
  onSelectedNationsChange,
  selectedNotes: _selectedNotes,
  onSelectedNotesChange,
}: Props) {
  const [selectedNations, setSelectedNations] =
    useState<string[]>(_selectedNations);
  const [selectedNotes, setSelectedNotes] = useState<string[]>(_selectedNotes);
  const [defaultNationValue, setDefaultNationValue] =
    useState(_selectedNations);
  const [defaultNoteValue, setDefaultNoteValue] = useState(_selectedNotes);

  useEffect(() => {
    setDefaultNationValue(_selectedNations);
    setDefaultNoteValue(_selectedNotes);
  }, [_selectedNations, _selectedNotes]);

  const onCloseNationsDrawer = () => {
    onSelectedNationsChange(selectedNations);
  };
  const onCloseNotesDrawer = () => {
    onSelectedNotesChange(selectedNotes);
  };

  const nationFilterButtonLabel =
    _selectedNations.length > 0 ? _selectedNations.join(", ") : "나라별 필터";
  const noteFilterButtonLabel =
    _selectedNotes.length > 0 ? _selectedNotes.join(", ") : "노트별 필터";

  return (
    <div className="grid grid-cols-2 gap-2 md:hidden sticky top-[57px] bg-background pb-4">
      <Drawer onClose={onCloseNationsDrawer}>
        <DrawerTrigger asChild>
          <Button>
            <span className="line-clamp-1 whitespace-pre-wrap">
              {nationFilterButtonLabel}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>나라별 필터</DrawerTitle>
            <DrawerDescription>원하는 국가를 선택해주세요.</DrawerDescription>
            <div className="flex flex-wrap gap-2 m-4">
              <ToggleGroup
                type="multiple"
                className="flex flex-wrap gap-2 justify-start"
                onValueChange={setSelectedNations}
                defaultValue={defaultNationValue}
              >
                {allNations.map((nation) => (
                  <ToggleGroupItem
                    key={nation}
                    value={nation}
                    variant={"outline"}
                  >
                    {nation}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" className="text-16 h-12 font-bold">
                닫기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer onClose={onCloseNotesDrawer}>
        <DrawerTrigger asChild>
          <Button>
            <span className="line-clamp-1 whitespace-pre-wrap">
              {noteFilterButtonLabel}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>노트별 필터</DrawerTitle>
            <DrawerDescription>원하는 노트를 선택해주세요.</DrawerDescription>
            <ScrollArea className="max-h-[60dvh] m-4">
              <div className="flex flex-wrap gap-2">
                <ToggleGroup
                  type="multiple"
                  className="flex flex-wrap gap-2 justify-start"
                  onValueChange={setSelectedNotes}
                  defaultValue={defaultNoteValue}
                >
                  {allNotes.map((note) => (
                    <ToggleGroupItem
                      key={note}
                      value={note}
                      variant={"outline"}
                    >
                      {note}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </ScrollArea>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" className="text-16 h-12 font-bold">
                닫기
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
