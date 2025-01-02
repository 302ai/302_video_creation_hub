import ColorPicker from "@rc-component/color-picker";
import { useCallback, useEffect, useState } from "react";
import "@rc-component/color-picker/assets/index.css";

interface ColorPickerButtonProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPickerButton({
  label,
  color,
  onChange,
}: ColorPickerButtonProps) {
  const [pickerState, setPickerState] = useState({
    visible: false,
    coordinates: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const picker = document.querySelector(".rc-color-picker-panel");
      if (picker && !picker.contains(event.target as Node)) {
        setPickerState((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { right, top } = e.currentTarget.getBoundingClientRect();

    setPickerState({
      visible: true,
      coordinates: {
        x: right + 10,
        y: top,
      },
    });
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[14px]">{label}</span>
      <div
        className="h-9 w-9 cursor-pointer rounded-sm"
        onClick={handleClick}
        style={{
          backgroundColor: color,
          border: "1px solid #eee",
        }}
      />
      {pickerState.visible && (
        <div
          className="fixed"
          style={{
            left: `${pickerState.coordinates.x}px`,
            top: `${pickerState.coordinates.y}px`,
            zIndex: 100,
          }}
        >
          <ColorPicker
            value={color}
            onChange={(color) => onChange(color.toHexString())}
          />
        </div>
      )}
    </div>
  );
}
