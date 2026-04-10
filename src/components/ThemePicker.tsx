import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeColor } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const COLORS: { name: ThemeColor; class: string }[] = [
  { name: 'zinc', class: 'bg-zinc-500' },
  { name: 'rose', class: 'bg-rose-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'green', class: 'bg-green-500' },
  { name: 'orange', class: 'bg-orange-500' },
];

export const ThemePicker: React.FC = () => {
  const { theme, setThemeColor, toggleMode } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMode}
        className="rounded-full"
      >
        {theme.mode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      <Dialog>
        <DialogTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
          <Palette className="h-5 w-5" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Customize Theme</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setThemeColor(color.name)}
                  className={`w-12 h-12 rounded-full transition-all ${color.class} ${
                    theme.color === color.name ? 'ring-4 ring-primary ring-offset-2' : 'hover:scale-110'
                  }`}
                  aria-label={`Set theme to ${color.name}`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
