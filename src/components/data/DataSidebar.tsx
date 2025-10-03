import { DataSidebarProps } from "@/src/types/Types";
import { useState, useEffect, useRef } from 'react';

export default function DataSidebar({ data, documents }: DataSidebarProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [document, setDocument] = useState<{codigo: number; sigla: string; campo: string;} | null>(null);

  useEffect(() => {
    const found = documents.find(doc => doc.codigo === data.TIPO_DOCUMENTO);
    if (found) {
      setDocument(found);
    }
  }, [data.TIPO_DOCUMENTO, documents]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(prev => (prev === index ? null : index));
  };

  const fullName = `${data.PRIMER_NOMBRE ?? ''} ${data.SEGUNDO_NOMBRE ?? ''} ${data.PRIMER_APELLIDO ?? ''} ${data.SEGUNDO_APELLIDO ?? ''}`;

  const AccordionSection = ({index, title, children, }: {index: number; title: string; children: React.ReactNode;}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const isOpen = activeAccordion === index;

    return (
      <div className="bg-[#f6f6f6] my-5 text-sm rounded-xl overflow-hidden">
        <button
          className="text-main w-full flex items-center justify-between px-5 py-3 font-bold cursor-pointer text-sm"
          onClick={() => toggleAccordion(index)}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${index}`}
        >
          {title}
          <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>&#8964;</span>
        </button>
        <div
          id={`accordion-content-${index}`}
          ref={contentRef}
          className={`transition-all duration-500 ease-in-out overflow-hidden`}
          style={{
            maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="py-4 px-6">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='h-[500px] overflow-y-auto custom-scrollbar'>
      <div className='text-main'>
        <h3 className="font-bold text-2xl">{fullName.trim()}</h3>
        <p className='text-lg'>{document?.sigla} {data.NUMERO_DOCUMENTO}</p>
      </div>

      <AccordionSection index={0} title="Información personal">
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Sexo:</span> {data.SEXO}
        </p>
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Edad:</span> {data.EDAD}
        </p>
      </AccordionSection>

      <AccordionSection index={1} title="Datos de contacto">
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Teléfono:</span> {data.TELEFONO}
        </p>
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Dirección:</span> {data.DIRECCION_VIVIENDA}
        </p>
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Localidad:</span> {data.NOMLOCALIDAD}
        </p>
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>UPZ:</span> {data.NOMUPZ}
        </p>
      </AccordionSection>

      <AccordionSection index={2} title="Caracterización">
        {[
          { label: "Persona en condición de discapacidad", value: data.DISCAPACIDAD },
          { label: "Persona en ruralidad", value: data.RURAL },
          { label: "Persona Víctima del Conflicto", value: data.VICTIMA },
          { label: "Pensionado", value: data.PENSIONADO },
          { label: "Fallecido", value: data.FALLECIDO },
          { label: "Habitante de calle", value: data.HABITANTE_CALLE },
          { label: "Indígena", value: data.INDIGENA },
          { label: "Negro / Afrodescendiente", value: data.NAP },
          { label: "Palenquero", value: data.PALENQUERO },
          { label: "Gitano", value: data.GITANO },
          { label: "Raizal", value: data.RAIZAL },
          { label: "LGTBI", value: data.LGTBI },
          { label: "Migrante", value: data.MIGRANTE },
        ].map((item, idx) => (
          <p key={idx} className="text-gray-400 mb-3">
            <span className='font-bold text-second'>{item.label}:</span> {item.value === 1 ? "Sí" : "No"}
          </p>
        ))}

        {data.PENSIONADO === 1 && (
          <p className="text-gray-400 mb-3">
            <span className='font-bold text-second'>Entidad Pensión:</span> Colpensiones
          </p>
        )}

        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Sisben:</span> {data.CLASIFICACION_SISBEN}
        </p>
        <p className="text-gray-400 mb-3">
          <span className='font-bold text-second'>Nivel de Inseguridad alimentaria:</span> {data.INSEGURIDAD_ALIMENTARIA}
        </p>
      </AccordionSection>
    </div>
  );
}
