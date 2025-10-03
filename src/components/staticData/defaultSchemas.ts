import { SchemaDefinitionType } from "@/src/types/Types";

export const defaultSchemas:SchemaDefinitionType = [
  {
    name: "ca_vi_validacion_reglas_contactabilidad_aepm",
    properties: {
      tipo_documento: {
        type: "number",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      direccion_sirbe: {
        type: "string",
      },
      telefono_sirbe: {
        type: "number",
      },
      telefono_img: {
        type: "number",
      },
      direccion_img: {
        type: "string",
      },
      telefono_capital_salud: {
        type: "string",
      },
      direccion_capital_salud: {
        type: "string",
      },
      motivo: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_reglas_egreso_aepm",
    properties: {
      tipo_documento: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      telefono: {
        type: "number",
      },
      cantidad_entregas: {
        type: "number",
      },
      valor_entregas: {
        type: "number",
      },
      motivo: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_reglas_fallecidos_comedor",
    properties: {
      codigo_sirbe: {
        type: "number",
      },
      tipo_documento: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      telefono: {
        type: "number",
      },
    },
  },
  {
    name: "ca_vi_validacion_reglas_jardines_comedor",
    properties: {
      codigo_sirbe: {
        type: "number",
      },
      tipo_documento: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_reglas_nombre_comedor",
    properties: {
      codigo_sirbe: {
        type: "number",
      },
      tipo_documento: {
        type: "string",
      },
      nombre_sirbe: {
        type: "string",
      },
      nombre_img: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      nombre_capital_salud: {
        type: "string",
      },
      telefono: {
        type: "number",
      },
    },
  },
  {
    name: "ca_vi_validacion_reglas_respuesta_social_comedor",
    properties: {
      codigo_sirbe: {
        type: "number",
      },
      tipo_documento: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      telefono: {
        type: "number",
      },
    },
  },
  {
    name: "ca_vi_validacion_inasistencia_jardines",
    properties: {
      sigla: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      telefono: {
        type: "number",
      },
      parentesco: {
        type: "string",
      },
      dias_programados: {
        type: "number",
      },
      dias_asistencia: {
        type: "number",
      },
      pct_inasistencia: {
        type: "number",
      },
      codigo_jardin: {
        type: "number",
      },
      jardin_infantil: {
        type: "string",
      },
      primer_nombre_jefe_hogar: {
        type: "string",
      },
      segundo_nombre_jefe_hogar: {
        type: "string",
      },
      primer_apellido_jefe_hogar: {
        type: "string",
      },
      segundo_apellido_jefe_hogar: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_fallecidos_jardines",
    properties: {
      sigla: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      telefono: {
        type: "number",
      },
      parentesco: {
        type: "string",
      },
      codigo_jardin: {
        type: "number",
      },
      jardin_infantil: {
        type: "string",
      },
      primer_nombre_jefe_hogar: {
        type: "string",
      },
      segundo_nombre_jefe_hogar: {
        type: "string",
      },
      primer_apellido_jefe_hogar: {
        type: "string",
      },
      segundo_apellido_jefe_hogar: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_inseguridad_alimentaria_jardines",
    properties: {
      sigla: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      telefono: {
        type: "number",
      },
      parentesco: {
        type: "string",
      },
      codigo_jardin: {
        type: "number",
      },
      jardin_infantil: {
        type: "string",
      },
      inseguridad_alimentaria: {
        type: "string",
      },
      primer_nombre_jefe_hogar: {
        type: "string",
      },
      segundo_nombre_jefe_hogar: {
        type: "string",
      },
      primer_apellido_jefe_hogar: {
        type: "string",
      },
      segundo_apellido_jefe_hogar: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_asistencia_comedor_jardines",
    properties: {
      sigla: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      telefono: {
        type: "number",
      },
      parentesco: {
        type: "string",
      },
      codigo_jardin: {
        type: "number",
      },
      jardin_infantil: {
        type: "string",
      },
      asistencia_jardin: {
        type: "number",
      },
      raciones_entregadas_comedor: {
        type: "number",
      },
      primer_nombre_jefe_hogar: {
        type: "string",
      },
      segundo_nombre_jefe_hogar: {
        type: "string",
      },
      primer_apellido_jefe_hogar: {
        type: "string",
      },
      segundo_apellido_jefe_hogar: {
        type: "string",
      },
    },
  },
  {
    name: "ca_vi_validacion_reglas_contactabildiad_comedor",
    properties: {
      idpersona: {
        type: "number",
      },
      tipo_documento: {
        type: "string",
      },
      numero_documento: {
        type: "string",
      },
      primer_nombre: {
        type: "string",
      },
      segundo_nombre: {
        type: "string",
      },
      primer_apellido: {
        type: "string",
      },
      segundo_apellido: {
        type: "string",
      },
      edad: {
        type: "number",
      },
      telefono_sirbe: {
        type: "number",
      },
      direccion_sirbe: {
        type: "string",
      },
      telefono_img: {
        type: "number",
      },
      direccion_img: {
        type: "string",
      },
      telefono_capital_salud: {
        type: "string",
      },
      direccion_capital_salud: {
        type: "string",
      },
      motivo: {
        type: "string",
      },
    },
  },
  //... (otros esquemas)
];

