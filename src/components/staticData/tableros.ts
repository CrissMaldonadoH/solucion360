import integracionIcon from '../../../public/icons/secretaria-integracion.png'
import imgLogo from '../../../public/img/imgLogo.png'
import { SdisType } from '@/src/types/Types'

export const sdis:SdisType = {
    id: 1,
    idSecretaria: "sector-integracion-social",
    secretaria: "Ministerio de Salud",
    colorExt: "bg-[#ebb347]",
    colorInt: "bg-[#092c60]",
    logo: imgLogo,
    icono: integracionIcon,
    estrategias: [
      {
        id: "1",
        servicio:
          "Centros de Apoyo al Adulto Mayor",
        fecha: "--",
        tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiNWU0MjE0NTItNTdmMy00NGIzLTk1NGUtNGZiNmQ0YWU5YjMwIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9',
        /*tableros: [
          {
            tablero:
              "Características de Población beneficiada Ingreso Mínimo Garantizado",
            route: "caracteristica-por-poblacion",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiZmI3NjZlMDUtOGNjOC00NzdhLThlYWYtN2VmYTFlZGJmZDNiIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
          {
            tablero:
              "Distribución de Beneficio Entregado a Hogares de Ingreso Mínimo Garantizado",
            route: "caracteristica-por-hogar",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiMmViZjAzZDgtYzJlZi00M2NiLWEyOTYtZWJlOTVkYjk4Y2M4IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
        ],*/
      },
    ],
    servicios: [
      {
        id: "1",
        servicio: "Entrega Periódica de Beneficio Económico",
        fecha: "--",
        tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiNzFmM2I3Y2EtOThhYy00ODJiLWFjZWEtMzRjMmIzYjk2MWU1IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9',
        /*tableros: [
          {
            tablero:
              "Características Población Beneficiada Servicio de Apoyos Económicos para Personas Mayores",
            route: "caracteristicas-Poblacion-apoyo-economico-personas-mayores",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiNGQ3ZTQ0OTEtMjBiMi00YTliLWFlZDEtMTNmMzM2MzZjMTA2IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
          {
            tablero:
              "Beneficio Percibido Servicio de Apoyos Económicos para Persona Mayor",
            route: "beneficio-percibido-apoyo-economico-personas-mayores",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiOWJhMTFhOGEtNmZiNS00ZDRhLWFkYTAtMGJhZmMzYTU3NDE2IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
          {
            tablero: "Egresos, Ingresos y Traslados del servicio ",
            route: "egresos-ingresos-y-traslados-del-servicio",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiMDgzOWViNjAtZDdkZC00OWNlLWFhM2ItMzUyZjU0MDA3ZTA2IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
        ],*/
      },

      {
        id: "2",
        servicio: "Mapa de servicio",
        fecha: "--",
        tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiYjQ4OWE4ZmUtOThlMC00YjJjLWJhODAtZDBjODM0OWQ2ZTRjIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9'
        /*tableros: [
          {
            tablero: "¿A quién le estoy prestando el servicio?",
            route: "a-quien-le-estoy-prestando-el-servicio",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiMzBkYjViZjMtZDNlYi00MGUxLWJlN2UtZDUyZjMwYjBiZjkxIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
          {
            tablero: "Movimientos en los estados del servicio",
            route: "movimientos-en-estados-del-servicio",
            iframe:
              "https://app.powerbi.com/view?r=eyJrIjoiYTliOTg1NjctZmNlNC00MjhmLThlOGEtNDU2Nzg0MWJlZTFjIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
          },
        ],*/
      },
      {
        id: "3",
        servicio: "Programa de Alimentación Escolar PAE",
        fecha: "--",
        tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiYTk5MzI5NzktMThjNy00ZmFjLWJmNmUtN2ZhMTg1OTE0YmYxIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9',
        /*tableros: [],*/
      },
      {
        id: "4",
        servicio: "Servicio Apoyo Social",
        fecha: "--",
        tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiODA5ZjY2MWItMGQzZi00NzI0LTk3NTUtYTE2MTBiNjZhNGY1IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9',
        /*tableros: [],*/
      },
      {
        id: "5",
        servicio: "Servicio de Educación Infantil",
        fecha: "--",
        tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiNGY1ZjkxNmMtODY2Mi00MmY0LWIxY2MtNzA3MTg1OTQwOThhIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9',
        /*tableros: [],*/
      },
    ],
    anomalias: [
      {
        estrategias: [
          {
            id: "1",
            servicio:
              "Centros de Apoyo al Adulto Mayor",
            fecha: "--",
            tablero:'',
            /*tableros: [
              {
                tablero: "Contactabilidad",
                route: "anomalias-img",
                iframe:
                  "https://app.powerbi.com/view?r=eyJrIjoiYzA3MzVmNjUtMzdlYi00MDJjLWJiNjQtOTg3ODI5N2ZlZWM1IiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9",
              },
            ],*/
          },
        ],
      },
      {
        servicios: [
          {
            id: "1",
            servicio: "Entrega Periódica de Beneficio Económico",
            fecha: "--",
            tablero:''
            /*tableros: [
              {
                tablero: "Validación Criterios de Egreso",
                route: "validacion-criterios-egreso",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_egreso_aepm",
                urlAPi:{
                    endpoint: 'ds_validacion_ciudadano_sdis',
                    view: 'ca_vi_validacion_reglas_egreso_aepm',
                    params:{
                        start_index:0,
                        count:50
                    }
                },
                titulo: "Validación Criterios de Egreso Apoyos Económicos",
                texto:
                  "<p>Validación de los criterios de egreso para el servicio de Apoyos Económicos, los motivos evaluados son Fallecido, Pensionado, Colombia Mayor.</p><p><br></p><p><strong>Fallecido:</strong> Persona que se encuentra en Atención dentro del servicio, pero que a la fecha de validación fue detectado en la fuente de fallecidos.</p><p><strong>Pensionado:</strong> Persona que se encuentra en Atención dentro del servicio, pero que a la fecha de validación fue detectado en la fuente de pensionados.</p><p><strong>Colombia Mayor:</strong> Persona que se encuentra en Atención dentro del servicio en modalidad diferente a “Cofinanciado D”, pero que a la fecha de validación fue detectado en la fuente de Colombia Mayor.</p><p><br></p>",
              },
              {
                tablero: "Anomalías en Contactabilidad",
                route: "contactabilidad-AEPM",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_contactabilidad_aepm",
                urlAPi:
                  "https://172.174.1.113:9443/server/c360/ds_validacion_ciudadano_sdis/views/ca_vi_validacion_reglas_contactabilidad_aepm?$start_index=0&$count=50&$format=json",
                titulo: "Validación Contactabilidad Apoyos Económicos",
                texto:
                  '<p class="ql-align-justify">Validación de contactabilidad de los beneficiarios en Atención del servicio de Apoyos Económicos, los motivos evaluados son Número de Contacto y Dirección.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>Número de Contacto:</strong> Persona que se encuentra en Atención dentro del servicio de Apoyos Económicos, pero al validar el número de contacto en las bases de SIRBE, IMG o Capital Salud se detectan diferencias.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>Dirección: </strong>Persona que se encuentra en Atención dentro del servicio de Apoyos Económicos, pero al validar la dirección registrada en las bases de SIRBE, IMG o Capital Salud se detectan diferencias.</p><p><br></p><p><br></p><p class="ql-align-justify"><br></p>',
              },
            ],*/
          },
          {
            id: "2",
            servicio: "Mapa de servicio",
            fecha: "--",
            tablero:'https://app.fabric.microsoft.com/view?r=eyJrIjoiNjY0ZGFhZWYtY2U4NS00ZmIwLTlkMjMtZjEzNjBhYjk3M2JiIiwidCI6ImMzYTU1OWY1LTFlMDktNDcxMi05ZDFlLTJlOTdkMDhkMmJlNyJ9'
            /*tableros: [
              {
                tablero: "Reglas de Fallecidos Comedor",
                route: "reglas-fallecido",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_fallecidos_comedor",
                urlAPi:{
                    endpoint: 'ds_validacion_ciudadano_sdis',
                    view: 'ca_vi_validacion_reglas_fallecidos_comedor',
                    params:{
                        start_index:0,
                        count:50
                    }
                },
                titulo: "Validación Fallecidos Comedores Comunitarios",
                texto:
                  "<p>Validación de beneficiarios que se encuentran en Atención dentro del servicio de Comedores Comunitarios y que a la fecha de corte fueron detectados en la base de fallecidos.</p>",
              },
              {
                tablero: "Reglas de Jardínes Comedor",
                route: "reglas-jardines-comedor",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_jardines_comedor",
                urlAPi: {
                    endpoint: 'ds_validacion_ciudadano_sdis',
                    view: 'ca_vi_validacion_reglas_jardines_comedor',
                    params:{
                        start_index:0,
                        count:50
                    }
                },
                titulo: "Validación Atención Servicio Jardines",
                texto:
                  "<p>Validación de beneficiarios que se encuentran en Atención dentro del servicio de Comedores Comunitarios y que a la fecha de corte fueron detectados en Atención dentro del servicio de Jardines Infantiles. </p>",
              },
              {
                tablero: "Reglas Nombres Comedor",
                route: "reglas-nombres-comedor",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_nombre_comedor",
                urlAPi: {
                    endpoint: 'ds_validacion_ciudadano_sdis',
                    view: 'ca_vi_validacion_reglas_nombre_comedor',
                    params:{
                        start_index:0,
                        count:50
                    }
                },
                texto:
                  "<p>Validación de beneficiarios que se encuentran en Atención dentro del servicio de Comedores Comunitarios y que a la fecha de corte fueron detectados con diferencias en su nombre y apellidos inferior a un 50%.</p>",
              },
              {
                tablero: "Reglas Respuesta Social Comedor",
                route: "reglas-respuesta-social-comedor",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_respuesta_social_comedor",
                urlAPi: {
                    endpoint: 'ds_validacion_ciudadano_sdis',
                    view: 'ca_vi_validacion_reglas_respuesta_social_comedor',
                    params:{
                        start_index:0,
                        count:50
                    }
                },
                titulo: "Validación Atención Servicio Respuesta Social",
                texto:
                  "<p>Validación de beneficiarios que se encuentran en Atención dentro del servicio de Comedores Comunitarios y que a la fecha de corte fueron detectados como atendidos dentro del último mes dentro del servicio de Respuesta Social. </p>",
              },
              {
                tablero: "Reglas Contactabildiad Comedores",
                route: "reglas-contactabilidad-comedores",
                iframe: "",
                api: true,
                vista: "ca_vi_validacion_reglas_contactabildiad_comedor",
                urlAPi: {
                    endpoint: 'ds_validacion_ciudadano_sdis',
                    view: 'ca_vi_validacion_reglas_contactabildiad_comedor',
                    params:{
                        start_index:0,
                        count:50
                    }
                },
                titulo: "Validación Contactabilidad Comedores Comunitarios",
                texto:
                  "<p>Validación de contactabilidad de los beneficiarios en Atención del servicio de Comedores Comunitarios, los motivos evaluados son Número de Contacto y Dirección.</p><p><br></p><p><strong>Número de Contacto:</strong> Persona que se encuentra en Atención dentro del servicio de Comedores Comunitarios, pero al validar el número de contacto en las bases de SIRBE, IMG o Capital Salud se detectan diferencias.&nbsp;</p><p><br></p><p><strong>Dirección:</strong> Persona que se encuentra en Atención dentro del servicio de Comedores Comunitarios, pero al validar la dirección registrada en las bases de SIRBE, IMG o Capital Salud se detectan diferencias.</p>",
              },
            ],*/
          },
          {
            id: "3",
            servicio: "Programa de Alimentación Escolar PAE",
            fecha: "--",
            tablero:'',
            /*tableros: [],*/
          },
          {
            id: "4",
            servicio: "Servicio Apoyo Social",
            fecha: "--",
            tablero:'',
            /*tableros: [],*/
          },
          {
            id: "5",
            servicio: "Servicio de Educación Infantil",
            fecha: "--",
            tablero:'',
            /*tableros: [],*/
          },
        ],
      },
    ],
  }