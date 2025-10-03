import React, { useState, useRef, forwardRef } from 'react';

let toggleIdCounter = 0;

type ToggleProps = {
  label?: string;
  onToggle?: (checked: boolean) => void;
};

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({ label = "Toggle Me!", onToggle }, ref) => {
    const [isChecked, setIsChecked] = useState(false);
    const toggleId = useRef(`toggle-${toggleIdCounter++}`).current;
    const inputRef = useRef(null);

    const handleToggleChange = () => {
        setIsChecked(!isChecked);
        if (onToggle) onToggle(!isChecked);
    };

    // Asigna la referencia del input a la ref pasada al componente
    React.useEffect(() => {
        if (typeof ref === 'function') {
            ref(inputRef.current);
        } else if (ref && 'current' in ref) {
            ref.current = inputRef.current;
        }
    }, [ref]);

    return (
        <div className="flex items-center justify-start w-full mb-1">
            <label htmlFor={toggleId} className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        ref={inputRef}
                        id={toggleId}
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={handleToggleChange}
                    />
                    <div className={`w-8 h-3 rounded-full shadow-inner ${ isChecked ? 'bg-main' : 'bg-gray-400' }`}></div>
                    <div className={`dot absolute w-5 h-5 bg-white rounded-full shadow -top-1.5 transition transform ${ isChecked ? 'translate-x-5' : 'translate-x-0' }`}></div>
                </div>
                <div className="ml-2 text-gray-700 font-medium text-sm">
                    {label}
                </div>
            </label>
        </div>
    );
});

Toggle.displayName = "Toggle";

export default Toggle;
