
import { useState, useEffect, useRef } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface RoleToggleProps {
  value: "founder" | "investor";
  onChange: (value: "founder" | "investor") => void;
}

const RoleToggle = ({ value, onChange }: RoleToggleProps) => {
  const [activeIndicatorStyle, setActiveIndicatorStyle] = useState({
    left: "0",
    width: "50%",
  });
  
  const founderRef = useRef<HTMLButtonElement>(null);
  const investorRef = useRef<HTMLButtonElement>(null);
  
  // Update indicator position when value changes or on initial render
  useEffect(() => {
    const activeRef = value === "founder" ? founderRef : investorRef;
    if (activeRef.current && activeRef.current.parentElement) {
      const parentWidth = activeRef.current.parentElement.offsetWidth;
      const activeWidth = activeRef.current.offsetWidth;
      const leftPosition = value === "founder" ? "0" : `calc(50% - 3px)`;
      
      setActiveIndicatorStyle({
        left: leftPosition,
        width: `calc(${activeWidth}px + 6px)`,
      });
    }
  }, [value]);
  
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        I am a:
      </label>
      <div className="relative h-12">
        <div
          className="absolute h-full bg-gray-200 rounded-full transition-all duration-300 ease-in-out"
          style={activeIndicatorStyle}
        />
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(val) => {
            if (val) onChange(val as "founder" | "investor");
          }}
          className="grid grid-cols-2 h-full bg-transparent rounded-full overflow-hidden border border-gray-300"
        >
          <ToggleGroupItem
            ref={founderRef}
            value="founder"
            className="z-10 rounded-full data-[state=on]:bg-transparent data-[state=off]:bg-transparent data-[state=on]:text-gray-900 data-[state=off]:text-gray-600 data-[state=on]:font-medium transition-all"
          >
            I'm a Founder
          </ToggleGroupItem>
          <ToggleGroupItem
            ref={investorRef}
            value="investor"
            className="z-10 rounded-full data-[state=on]:bg-transparent data-[state=off]:bg-transparent data-[state=on]:text-gray-900 data-[state=off]:text-gray-600 data-[state=on]:font-medium transition-all"
          >
            I'm an Investor
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default RoleToggle;
