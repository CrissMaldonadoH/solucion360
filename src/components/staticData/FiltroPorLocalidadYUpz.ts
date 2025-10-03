export type Localidad =
  | "ANTONIO NARIÑO"
  | "BARRIOS UNIDOS"
  | "BOSA"
  | "CANDELARIA"
  | "CHAPINERO"
  | "CIUDAD BOLIVAR"
  | "ENGATIVA"
  | "FONTIBON"
  | "KENNEDY"
  | "LOS MARTIRES"
  | "PUENTE ARANDA"
  | "RAFAEL URIBE"
  | "SAN CRISTOBAL"
  | "SANTA FE"
  | "SUBA"
  | "SUMAPAZ"
  | "TEUSAQUILLO"
  | "TUNJUELITO"
  | "USAQUEN"
  | "USME";

type UpzCode = string;

type LocalidadesYUpzMap = Record<Localidad, UpzCode[]>;

export const localidadesYUpz:LocalidadesYUpzMap = {
    
    "ANTONIO NARIÑO": [
        "38-RESTREPO",
        "35-CIUDAD JARDIN"
      ],
      "BARRIOS UNIDOS": [
        "21-LOS ANDES",
        "103-PARQUE EL SALITRE",
        "98-LOS ALCAZARES",
        "22-DOCE DE OCTUBRE"
      ],
      "BOSA": [
        "84-BOSA OCCIDENTAL",
        "85-BOSA CENTRAL",
        "49-APOGEO",
        "87-TINTAL SUR",
        "86-EL PORVENIR"
      ],
      "CANDELARIA": [
        "94-LA CANDELARIA"
      ],
      "CHAPINERO": [
        "99-CHAPINERO",
        "88-EL REFUGIO",
        "119-CERROS ORIENTALES (Chapinero)",
        "90-PARDO RUBIO",
        "97-CHICO LAGO",
        "89-SAN ISIDRO-PATIOS"
      ],
      "CIUDAD BOLIVAR": [
        "63-EL MOCHUELO",
        "64-MONTE BLANCO",
        "65-ARBORIZADORA",
        "66-SAN FRANCISCO",
        "67-LUCERO",
        "68-EL TESORO",
        "69-ISMAEL PERDOMO",
        "70-JERUSALEM",
        "120-RIO TUNJUELO (Ciudad Bolivar)"
      ],
      "ENGATIVA": [
        "26-LAS FERIAS",
        "29-EL MINUTO DE DIOS",
        "30-BOYACA REAL",
        "31-SANTA CECILIA",
        "116-ALAMOS",
        "73-GARCES NAVAS",
        "74-ENGATIVA",
        "105-JARDIN BOTANICO",
        "72-BOLIVIA"
      ],
      "FONTIBON": [
        "75-FONTIBON",
        "76-FONTIBON SAN PABLO",
        "77-ZONA FRANCA",
        "117-AEROPUERTO EL DORADO",
        "112-GRANJAS DE TECHO",
        "114-MODELIA",
        "115-CAPELLANIA",
        "110-CIUDAD SALITRE OCCIDENTAL"
      ],
      "KENNEDY": [
        "44-AMERICAS",
        "45-CARVAJAL",
        "46-CASTILLA",
        "47-KENNEDY CENTRAL",
        "48-TIMIZA",
        "113-BAVARIA",
        "79-CALANDAIMA",
        "80-CORABASTOS",
        "81-GRAN BRITALIA",
        "82-PATIO BONITO",
        "83-LAS MARGARITAS",
        "78-TINTAL NORTE"
      ],
      "LOS MARTIRES": [
        "102-LA SABANA",
        "37-SANTA ISABEL"
      ],
      "PUENTE ARANDA": [
        "40-CIUDAD MONTES",
        "41-MUZU",
        "111-PUENTE ARANDA",
        "108-ZONA INDUSTRIAL",
        "43-SAN RAFAEL"
      ],
      "RAFAEL URIBE": [
        "36-SAN JOSE",
        "39-QUIROGA",
        "55-DIANA TURBAY",
        "54-MARRUECOS",
        "53-MARCO FIDEL SUAREZ"
      ],
      "SAN CRISTOBAL": [
        "32-SAN BLAS",
        "33-SOSIEGO",
        "119-CERROS ORIENTALES (San Cristobal)",
        "50-LA GLORIA",
        "51-LOS LIBERTADORES",
        "34-20 DE JULIO"
      ],
      "SANTA FE": [
        "91-SAGRADO CORAZON",
        "92-LA MACARENA",
        "119-CERROS ORIENTALES (Santa fe)",
        "95-LAS CRUCES",
        "96-LOURDES",
        "93-LAS NIEVES"
      ],
      "SUBA": [
        "2-LA ACADEMIA",
        "3-GUAYMARAL",
        "17-SAN JOSE DE BAVARIA",
        "19-EL PRADO",
        "20-LA ALHAMBRA",
        "23-CASA BLANCA SUBA",
        "118-ZONA NORTE (Suba)",
        "25-LA FLORESTA",
        "27-SUBA",
        "28-EL RINCON",
        "71-TIBABUYES",
        "18-BRITALIA",
        "24-NIZA"
      ],
      "SUMAPAZ": [
        "121-RIO BLANCO (norte Sumapaz)",
        "122-RIO SUMAPAZ (Cuenca río Sumapaz)"
      ],
      "TEUSAQUILLO": [
        "100-GALERIAS",
        "101-TEUSAQUILLO",
        "109-CIUDAD SALITRE ORIENTAL",
        "106-LA ESMERALDA",
        "107-QUINTA PAREDES",
        "104-PARQUE SIMON BOLIVAR-CAN"
      ],
      "TUNJUELITO": [
        "62-TUNJUELITO",
        "42-VENECIA"
      ],
      "USAQUEN": [
        "1-PASEO DE LOS LIBERTADORES",
        "9-VERBENAL",
        "10-LA URIBE",
        "11-SAN CRISTOBAL NORTE",
        "12-TOBERIN",
        "119-CERROS ORIENTALES (Usaquén)",
        "14-USAQUEN",
        "15-COUNTRY CLUB",
        "16-SANTA BARBARA"
      ],
      "USME": [
        "52-LA FLORA",
        "56-DANUBIO",
        "57-GRAN YOMASA",
        "58-COMUNEROS",
        "120-RIO TUNJUELO (Usme)",
        "60-PARQUE ENTRENUBES",
        "61-CIUDAD USME",
        "119-CERROS ORIENTALES (Usme)",
        "59-ALFONSO LOPEZ"
      ]

}