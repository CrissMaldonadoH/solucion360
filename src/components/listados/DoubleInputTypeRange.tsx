import { useState, useRef } from "react"

export default function DoubleInputTypeRange() {
    
    const [initialAgeGroup, setInitialAgeGroup] = useState<number>(20);
  const [finalAgeGroup, setFinalAgeGroup] = useState<number>(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleMinRef = useRef<HTMLDivElement>(null);
  const handleMaxRef = useRef<HTMLDivElement>(null);


  const handleMouseDown = (e: React.MouseEvent, min:boolean) => {
    e.preventDefault();
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = moveEvent.clientX - rect.left;
      let newPercentage = (offsetX / rect.width) * 100;
      newPercentage = Math.max(0, Math.min(100, newPercentage));

      if(min){
          if(Math.round(newPercentage) > (finalAgeGroup - 2)){
            setInitialAgeGroup(finalAgeGroup - 1)  
            return
          }
          setInitialAgeGroup(Math.round(newPercentage));
      }else{
        if(Math.round(newPercentage) < (initialAgeGroup + 2)){
            setFinalAgeGroup(initialAgeGroup + 1)  
            return
          }
          setFinalAgeGroup(Math.round(newPercentage));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleInitialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)){
            if(value >= 0 && value <= (finalAgeGroup - 1)) setInitialAgeGroup(value)
        }
    };

    const handleFinalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if((initialAgeGroup + 1) >= 50 && value <= 100) setFinalAgeGroup(value);
        }
    };

  return (
    <>
        <div className="flex mb-4">
            <div className="w-1/2 mr-2">
                <input
                type="number"
                min={0}
                max={50}
                value={initialAgeGroup}
                onChange={handleInitialInputChange}
                className="w-full border border-gray-300 bg-white rounded px-2 py-1 text-gray-700 focus:outline-none"
                placeholder="Desde"
                //ref={initialAgeGroupRef}
                />
            </div>
            <div className="w-1/2 ml-2">
                <input
                type="number"
                min={0}
                max={100}
                value={finalAgeGroup}
                onChange={handleFinalInputChange}
                className="w-full border border-gray-300 bg-white rounded px-2 py-1 text-gray-700 focus:outline-none"
                placeholder="Hasta"
                //ref={finalAgeGroupRef}
                />
            </div>
        </div>
        <div
            className="relative h-10"
            ref={sliderRef}
        >
            <div
                ref={handleMinRef}
                onMouseDown={(e) =>handleMouseDown(e, true)}
                className="rounded-full h-5 w-5 bg-main absolute cursor-pointer z-20"
                    style={{
                    left: `calc(${(initialAgeGroup / 100) * 100}% - 10px)`, 
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            ></div>
            <div
                ref={handleMaxRef}
                onMouseDown={(e) =>handleMouseDown(e, false)}
                className="rounded-full h-5 w-5 bg-main absolute cursor-pointer z-20"
                    style={{
                    left: `calc(${(finalAgeGroup / 100) * 100}% - 10px)`, 
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            ></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded -translate-y-1/2"></div>
            <div
                className="absolute top-1/2 h-2 bg-second rounded -translate-y-1/2 z-0"
                style={{
                left: `${(initialAgeGroup / 100) * 100}%`,
                width: `${((finalAgeGroup - initialAgeGroup) / 100) * 100}%`,
                }}
            />
        </div>
    </>
  )
}
