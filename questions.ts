export interface QuestionItem {
  id: number;
  themeId: 1 | 2 | 3 | 4;
  themeTitleEs: string;
  themeTitleHy: string;
  numberInTheme: number;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export interface ThemeMeta {
  id: 1 | 2 | 3 | 4;
  titleEs: string;
  titleHy: string;
  descriptionEs: string;
  descriptionHy: string;
  color: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: 1,
    titleEs: "Funciones del lenguaje",
    titleHy: "Լեզվի գործառույթները",
    descriptionEs: "Las distintas intenciones comunicativas del hablante",
    descriptionHy: "Խոսողի հաղորդակցական նպատակներն ու գործառույթները",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    titleEs: "Modalidades oracionales",
    titleHy: "Նախադասությունների տեսակները",
    descriptionEs: "La actitud e intención del emisor en la oración",
    descriptionHy: "Խոսողի վերաբերմունքը և նախադասության հնչերանգային տեսակները",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: 3,
    titleEs: "Elementos de la comunicación",
    titleHy: "Հաղորդակցության տարրերը",
    descriptionEs: "Emisor, receptor, mensaje, código, canal y contexto",
    descriptionHy: "Ուղարկող, ստացող, հաղորդագրություն, կոդ, կապուղի և համատեքստ",
    color: "from-amber-600 to-orange-600"
  },
  {
    id: 4,
    titleEs: "Categorías gramaticales",
    titleHy: "Խոսքի մասերը",
    descriptionEs: "Clasificación de palabras según su forma y función",
    descriptionHy: "Բառերի քերականական խմբերը և դրանց դերերը",
    color: "from-rose-600 to-pink-600"
  }
];

export const ALL_QUESTIONS: QuestionItem[] = [
  // ==================== 1. Funciones del lenguaje (1-20) ====================
  {
    id: 1,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 1,
    questionEs: "¿Qué son las funciones del lenguaje?",
    questionHy: "Ի՞նչ են լեզվի գործառույթները։",
    answerEs: "Son las distintas intenciones que tiene el hablante al comunicarse.",
    answerHy: "Դրանք խոսողի տարբեր նպատակներն են հաղորդակցվելիս։"
  },
  {
    id: 2,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 2,
    questionEs: "¿Cuántas funciones principales del lenguaje hay?",
    questionHy: "Քանի՞ հիմնական լեզվական գործառույթ կա։",
    answerEs: "Hay seis.",
    answerHy: "Վեց։"
  },
  {
    id: 3,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 3,
    questionEs: "¿Cuáles son las seis funciones del lenguaje?",
    questionHy: "Որո՞նք են լեզվի վեց գործառույթները։",
    answerEs: "Referencial, expresiva, apelativa, fática, metalingüística y poética.",
    answerHy: "Տեղեկատվական, արտահայտչական, կոչական, հաղորդակցական կապի, մետալեզվական և գեղարվեստական։"
  },
  {
    id: 4,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 4,
    questionEs: "¿Qué función informa sobre hechos o situaciones?",
    questionHy: "Ո՞ր գործառույթն է տեղեկություն հաղորդում փաստերի կամ իրավիճակների մասին։",
    answerEs: "La función referencial.",
    answerHy: "Տեղեկատվական գործառույթը։"
  },
  {
    id: 5,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 5,
    questionEs: "¿Qué función aparece en «Hoy hace frío»?",
    questionHy: "Ո՞ր գործառույթն է «Hoy hace frío» նախադասության մեջ։",
    answerEs: "La función referencial.",
    answerHy: "Տեղեկատվական գործառույթը։"
  },
  {
    id: 6,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 6,
    questionEs: "¿Qué función expresa sentimientos del emisor?",
    questionHy: "Ո՞ր գործառույթն է արտահայտում խոսողի զգացմունքները։",
    answerEs: "La función expresiva o emotiva.",
    answerHy: "Արտահայտչական կամ հուզական գործառույթը։"
  },
  {
    id: 7,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 7,
    questionEs: "¿Qué función aparece en «¡Estoy muy contento!»?",
    questionHy: "Ո՞ր գործառույթն է «¡Estoy muy contento!» նախադասության մեջ։",
    answerEs: "La función expresiva.",
    answerHy: "Արտահայտչական գործառույթը։"
  },
  {
    id: 8,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 8,
    questionEs: "¿Qué función intenta influir en el receptor?",
    questionHy: "Ո՞ր գործառույթն է փորձում ազդել լսողի վրա։",
    answerEs: "La función apelativa o conativa.",
    answerHy: "Կոչական գործառույթը։"
  },
  {
    id: 9,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 9,
    questionEs: "¿Qué función aparece en «Cierra la ventana»?",
    questionHy: "Ո՞ր գործառույթն է «Cierra la ventana» նախադասության մեջ։",
    answerEs: "La función apelativa.",
    answerHy: "Կոչական գործառույթը։"
  },
  {
    id: 10,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 10,
    questionEs: "¿Qué función sirve para comprobar si la comunicación funciona?",
    questionHy: "Ո՞ր գործառույթն է օգտագործվում ստուգելու համար՝ հաղորդակցությունը աշխատո՞ւմ է։",
    answerEs: "La función fática.",
    answerHy: "Հաղորդակցական կապի գործառույթը։"
  },
  {
    id: 11,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 11,
    questionEs: "¿Qué función aparece en «¿Me escuchas?»?",
    questionHy: "Ո՞ր գործառույթն է «¿Me escuchas?» հարցում։",
    answerEs: "La función fática.",
    answerHy: "Հաղորդակցական կապի գործառույթը։"
  },
  {
    id: 12,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 12,
    questionEs: "¿Qué función utilizamos para hablar de la propia lengua?",
    questionHy: "Ո՞ր գործառույթն ենք օգտագործում հենց լեզվի մասին խոսելիս։",
    answerEs: "La función metalingüística.",
    answerHy: "Մետալեզվական գործառույթը։"
  },
  {
    id: 13,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 13,
    questionEs: "¿Qué función aparece en «Perro es un sustantivo»?",
    questionHy: "Ո՞ր գործառույթն է «Perro es un sustantivo» նախադասության մեջ։",
    answerEs: "La función metalingüística.",
    answerHy: "Մետալեզվական գործառույթը։"
  },
  {
    id: 14,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 14,
    questionEs: "¿Qué función se centra en la forma estética del mensaje?",
    questionHy: "Ո՞ր գործառույթն է կենտրոնանում հաղորդագրության գեղեցիկ ձևի վրա։",
    answerEs: "La función poética.",
    answerHy: "Գեղարվեստական գործառույթը։"
  },
  {
    id: 15,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 15,
    questionEs: "¿Dónde encontramos frecuentemente la función poética?",
    questionHy: "Որտե՞ղ ենք հաճախ հանդիպում գեղարվեստական գործառույթին։",
    answerEs: "En poemas, canciones, literatura y publicidad.",
    answerHy: "Բանաստեղծություններում, երգերում, գրականության և գովազդի մեջ։"
  },
  {
    id: 16,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 16,
    questionEs: "«Bebe agua todos los días». ¿Qué función predomina?",
    questionHy: "«Ամեն օր ջուր խմի՛ր»։ Ո՞ր գործառույթն է հիմնական։",
    answerEs: "La apelativa.",
    answerHy: "Կոչական։"
  },
  {
    id: 17,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 17,
    questionEs: "«La Tierra gira alrededor del Sol». ¿Qué función tiene?",
    questionHy: "«Երկիրը պտտվում է Արեգակի շուրջ»։ Ի՞նչ գործառույթ ունի։",
    answerEs: "Referencial.",
    answerHy: "Տեղեկատվական։"
  },
  {
    id: 18,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 18,
    questionEs: "«¡Qué miedo tengo!». ¿Qué función tiene?",
    questionHy: "«Ի՜նչ վախեցած եմ»։ Ի՞նչ գործառույթ ունի։",
    answerEs: "Expresiva.",
    answerHy: "Արտահայտչական։"
  },
  {
    id: 19,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 19,
    questionEs: "«Hola, ¿sigues ahí?». ¿Qué función tiene?",
    questionHy: "«Բարև, դեռ այստե՞ղ ես»։ Ի՞նչ գործառույթ ունի։",
    answerEs: "Fática.",
    answerHy: "Հաղորդակցական կապի։"
  },
  {
    id: 20,
    themeId: 1,
    themeTitleEs: "Funciones del lenguaje",
    themeTitleHy: "Լեզվի գործառույթները",
    numberInTheme: 20,
    questionEs: "¿Una misma oración puede tener más de una función?",
    questionHy: "Կարո՞ղ է մեկ նախադասությունը մեկից ավելի գործառույթ ունենալ։",
    answerEs: "Sí, pero normalmente una función predomina sobre las demás.",
    answerHy: "Այո, բայց սովորաբար դրանցից մեկը հիմնական է լինում։"
  },

  // ==================== 2. Modalidades oracionales (21-40) ====================
  {
    id: 21,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 1,
    questionEs: "¿Qué indican las modalidades oracionales?",
    questionHy: "Ի՞նչ են ցույց տալիս նախադասությունների տեսակները։",
    answerEs: "La actitud o intención del hablante.",
    answerHy: "Խոսողի վերաբերմունքը կամ նպատակը։"
  },
  {
    id: 22,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 2,
    questionEs: "¿Cuáles son las principales modalidades oracionales?",
    questionHy: "Որո՞նք են նախադասությունների հիմնական տեսակները։",
    answerEs: "Enunciativa, interrogativa, exclamativa, exhortativa, desiderativa y dubitativa.",
    answerHy: "Պատմողական, հարցական, բացականչական, հրամայական, ցանկական և կասկածական։"
  },
  {
    id: 23,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 3,
    questionEs: "¿Qué expresa una oración enunciativa?",
    questionHy: "Ի՞նչ է արտահայտում պատմողական նախադասությունը։",
    answerEs: "Una información, afirmación o negación.",
    answerHy: "Տեղեկություն, հաստատում կամ ժխտում։"
  },
  {
    id: 24,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 4,
    questionEs: "«Mi hermano estudia medicina». ¿Qué modalidad es?",
    questionHy: "«Եղբայրս բժշկություն է սովորում»։ Ի՞նչ տեսակ է։",
    answerEs: "Enunciativa afirmativa.",
    answerHy: "Հաստատական պատմողական։"
  },
  {
    id: 25,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 5,
    questionEs: "«No tengo hambre». ¿Qué modalidad es?",
    questionHy: "«Ես քաղցած չեմ»։ Ի՞նչ տեսակ է։",
    answerEs: "Enunciativa negativa.",
    answerHy: "Ժխտական պատմողական։"
  },
  {
    id: 26,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 6,
    questionEs: "¿Qué expresa una oración interrogativa?",
    questionHy: "Ի՞նչ է արտահայտում հարցական նախադասությունը։",
    answerEs: "Una pregunta.",
    answerHy: "Հարց։"
  },
  {
    id: 27,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 7,
    questionEs: "«¿Dónde está mi libro?». ¿Qué modalidad es?",
    questionHy: "«Որտե՞ղ է իմ գիրքը»։ Ի՞նչ տեսակ է։",
    answerEs: "Interrogativa.",
    answerHy: "Հարցական։"
  },
  {
    id: 28,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 8,
    questionEs: "¿Qué expresa una oración exclamativa?",
    questionHy: "Ի՞նչ է արտահայտում բացականչական նախադասությունը։",
    answerEs: "Una emoción intensa.",
    answerHy: "Ուժեղ զգացմունք։"
  },
  {
    id: 29,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 9,
    questionEs: "«¡Qué bonito es este lugar!». ¿Qué modalidad es?",
    questionHy: "«Ի՜նչ գեղեցիկ է այս վայրը»։ Ի՞նչ տեսակ է։",
    answerEs: "Exclamativa.",
    answerHy: "Բացականչական։"
  },
  {
    id: 30,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 10,
    questionEs: "¿Qué expresa una oración exhortativa?",
    questionHy: "Ի՞նչ է արտահայտում հրամայական նախադասությունը։",
    answerEs: "Una orden, petición, consejo o prohibición.",
    answerHy: "Հրաման, խնդրանք, խորհուրդ կամ արգելք։"
  },
  {
    id: 31,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 11,
    questionEs: "«Haz los deberes». ¿Qué modalidad es?",
    questionHy: "«Կատարի՛ր տնային աշխատանքը»։ Ի՞նչ տեսակ է։",
    answerEs: "Exhortativa o imperativa.",
    answerHy: "Հրամայական։"
  },
  {
    id: 32,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 12,
    questionEs: "«No corras». ¿Qué modalidad es?",
    questionHy: "«Մի՛ վազիր»։ Ի՞նչ տեսակ է։",
    answerEs: "Exhortativa negativa.",
    answerHy: "Ժխտական հրամայական։"
  },
  {
    id: 33,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 13,
    questionEs: "¿Qué expresa una oración desiderativa?",
    questionHy: "Ի՞նչ է արտահայտում ցանկական նախադասությունը։",
    answerEs: "Un deseo.",
    answerHy: "Ցանկություն։"
  },
  {
    id: 34,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 14,
    questionEs: "«Ojalá ganemos el partido». ¿Qué modalidad es?",
    questionHy: "«Երանի հաղթենք խաղը»։ Ի՞նչ տեսակ է։",
    answerEs: "Desiderativa.",
    answerHy: "Ցանկական։"
  },
  {
    id: 35,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 15,
    questionEs: "¿Qué expresa una oración dubitativa?",
    questionHy: "Ի՞նչ է արտահայտում կասկածական նախադասությունը։",
    answerEs: "Duda o posibilidad.",
    answerHy: "Կասկած կամ հավանականություն։"
  },
  {
    id: 36,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 16,
    questionEs: "«Quizás venga mañana». ¿Qué modalidad es?",
    questionHy: "«Գուցե նա վաղը գա»։ Ի՞նչ տեսակ է։",
    answerEs: "Dubitativa.",
    answerHy: "Կասկածական։"
  },
  {
    id: 37,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 17,
    questionEs: "«Tal vez llueva esta tarde». ¿Qué modalidad es?",
    questionHy: "«Գուցե այսօր կեսօրից հետո անձրև գա»։ Ի՞նչ տեսակ է։",
    answerEs: "Dubitativa.",
    answerHy: "Կասկածական։"
  },
  {
    id: 38,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 18,
    questionEs: "¿Qué palabras suelen aparecer en las oraciones desiderativas?",
    questionHy: "Ի՞նչ բառեր են հաճախ հանդիպում ցանկական նախադասություններում։",
    answerEs: "Ojalá, deseo que, espero que.",
    answerHy: "Ojalá, deseo que, espero que։"
  },
  {
    id: 39,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 19,
    questionEs: "¿Qué palabras suelen aparecer en las oraciones dubitativas?",
    questionHy: "Ի՞նչ բառեր են հաճախ հանդիպում կասկածական նախադասություններում։",
    answerEs: "Quizás, quizá, tal vez, posiblemente.",
    answerHy: "Quizás, quizá, tal vez, posiblemente։"
  },
  {
    id: 40,
    themeId: 2,
    themeTitleEs: "Modalidades oracionales",
    themeTitleHy: "Նախադասությունների տեսակները",
    numberInTheme: 20,
    questionEs: "«¿Puedes ayudarme?». ¿Qué modalidad es?",
    questionHy: "«Կարո՞ղ ես ինձ օգնել»։ Ի՞նչ տեսակ է։",
    answerEs: "Interrogativa, aunque también puede funcionar como petición.",
    answerHy: "Հարցական է, բայց կարող է նաև խնդրանք արտահայտել։"
  },

  // ==================== 3. Elementos de la comunicación (41-60) ====================
  {
    id: 41,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 1,
    questionEs: "¿Qué es la comunicación?",
    questionHy: "Ի՞նչ է հաղորդակցությունը։",
    answerEs: "Es el proceso de transmitir e intercambiar información.",
    answerHy: "Դա տեղեկություն փոխանցելու և փոխանակելու գործընթաց է։"
  },
  {
    id: 42,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 2,
    questionEs: "¿Cuáles son los principales elementos de la comunicación?",
    questionHy: "Որո՞նք են հաղորդակցության հիմնական տարրերը։",
    answerEs: "Emisor, receptor, mensaje, código, canal y contexto.",
    answerHy: "Ուղարկող, ստացող, հաղորդագրություն, կոդ, հաղորդակցման միջոց և համատեքստ։"
  },
  {
    id: 43,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 3,
    questionEs: "¿Quién es el emisor?",
    questionHy: "Ո՞վ է emisor-ը։",
    answerEs: "La persona que produce o envía el mensaje.",
    answerHy: "Նա, ով ստեղծում կամ ուղարկում է հաղորդագրությունը։"
  },
  {
    id: 44,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 4,
    questionEs: "¿Quién es el receptor?",
    questionHy: "Ո՞վ է receptor-ը։",
    answerEs: "La persona que recibe e interpreta el mensaje.",
    answerHy: "Նա, ով ստանում և հասկանում է հաղորդագրությունը։"
  },
  {
    id: 45,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 5,
    questionEs: "¿Qué es el mensaje?",
    questionHy: "Ի՞նչ է mensaje-ն։",
    answerEs: "La información que se transmite.",
    answerHy: "Փոխանցվող տեղեկությունը։"
  },
  {
    id: 46,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 6,
    questionEs: "¿Qué es el código?",
    questionHy: "Ի՞նչ է código-ն։",
    answerEs: "El sistema de signos utilizado para comunicarse.",
    answerHy: "Հաղորդակցվելու համար օգտագործվող նշանների համակարգը։"
  },
  {
    id: 47,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 7,
    questionEs: "¿Puede una lengua ser un código?",
    questionHy: "Կարո՞ղ է լեզուն լինել կոդ։",
    answerEs: "Sí, por ejemplo el español.",
    answerHy: "Այո, օրինակ՝ իսպաներենը։"
  },
  {
    id: 48,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 8,
    questionEs: "¿Qué es el canal?",
    questionHy: "Ի՞նչ է canal-ը։",
    answerEs: "El medio por el que se transmite el mensaje.",
    answerHy: "Այն միջոցը, որով փոխանցվում է հաղորդագրությունը։"
  },
  {
    id: 49,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 9,
    questionEs: "¿Qué puede ser un canal de comunicación?",
    questionHy: "Ի՞նչը կարող է լինել հաղորդակցման միջոց։",
    answerEs: "El teléfono, el papel, Internet, la radio, etc.",
    answerHy: "Հեռախոսը, թուղթը, ինտերնետը, ռադիոն և այլն։"
  },
  {
    id: 50,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 10,
    questionEs: "¿Qué es el contexto?",
    questionHy: "Ի՞նչ է contexto-ն։",
    answerEs: "La situación en la que se produce la comunicación.",
    answerHy: "Այն իրավիճակը, որտեղ տեղի է ունենում հաղորդակցությունը։"
  },
  {
    id: 51,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 11,
    questionEs: "Ana manda un mensaje a Pablo. ¿Quién es el emisor?",
    questionHy: "Անան հաղորդագրություն է ուղարկում Պաբլոյին։ Ո՞վ է ուղարկողը։",
    answerEs: "Ana.",
    answerHy: "Անան։"
  },
  {
    id: 52,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 12,
    questionEs: "En la misma situación, ¿quién es el receptor?",
    questionHy: "Նույն իրավիճակում ո՞վ է ստացողը։",
    answerEs: "Pablo.",
    answerHy: "Պաբլոն։"
  },
  {
    id: 53,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 13,
    questionEs: "Ana escribe «Nos vemos a las seis». ¿Cuál es el mensaje?",
    questionHy: "Անան գրում է՝ «Nos vemos a las seis»։ Ո՞րն է հաղորդագրությունը։",
    answerEs: "«Nos vemos a las seis».",
    answerHy: "«Կհանդիպենք ժամը վեցին»։"
  },
  {
    id: 54,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 14,
    questionEs: "Si Ana envía el mensaje por WhatsApp, ¿cuál es el canal?",
    questionHy: "Եթե Անան հաղորդագրությունն ուղարկում է WhatsApp-ով, ո՞րն է հաղորդակցման միջոցը։",
    answerEs: "El teléfono/Internet/WhatsApp como medio de transmisión.",
    answerHy: "Հեռախոսը կամ ինտերնետը՝ որպես փոխանցման միջոց։"
  },
  {
    id: 55,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 15,
    questionEs: "Si Ana y Pablo hablan español, ¿cuál es el código?",
    questionHy: "Եթե Անան և Պաբլոն խոսում են իսպաներեն, ո՞րն է կոդը։",
    answerEs: "El español.",
    answerHy: "Իսպաներենը։"
  },
  {
    id: 56,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 16,
    questionEs: "Un profesor explica una lección a sus alumnos. ¿Quién es el emisor?",
    questionHy: "Ուսուցիչը դաս է բացատրում աշակերտներին։ Ո՞վ է ուղարկողը։",
    answerEs: "El profesor.",
    answerHy: "Ուսուցիչը։"
  },
  {
    id: 57,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 17,
    questionEs: "¿Quiénes son los receptores en esa situación?",
    questionHy: "Ովքե՞ր են ստացողները այդ իրավիճակում։",
    answerEs: "Los alumnos.",
    answerHy: "Աշակերտները։"
  },
  {
    id: 58,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 18,
    questionEs: "En una conversación telefónica, ¿pueden cambiar los papeles de emisor y receptor?",
    questionHy: "Հեռախոսային զրույցի ժամանակ կարո՞ղ են ուղարկողի և ստացողի դերերը փոխվել։",
    answerEs: "Sí, constantemente.",
    answerHy: "Այո, անընդհատ։"
  },
  {
    id: 59,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 19,
    questionEs: "¿Por qué es importante que emisor y receptor conozcan el mismo código?",
    questionHy: "Ինչո՞ւ է կարևոր, որ ուղարկողն ու ստացողը հասկանան նույն կոդը։",
    answerEs: "Porque así pueden entender el mensaje.",
    answerHy: "Որովհետև այդպես կարող են հասկանալ հաղորդագրությունը։"
  },
  {
    id: 60,
    themeId: 3,
    themeTitleEs: "Elementos de la comunicación",
    themeTitleHy: "Հաղորդակցության տարրերը",
    numberInTheme: 20,
    questionEs: "¿Qué ocurre si el receptor no entiende el código?",
    questionHy: "Ի՞նչ է տեղի ունենում, եթե ստացողը չի հասկանում կոդը։",
    answerEs: "La comunicación puede fallar.",
    answerHy: "Հաղորդակցությունը կարող է չստացվել։"
  },

  // ==================== 4. Categorías gramaticales (61-80) ====================
  {
    id: 61,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 1,
    questionEs: "¿Qué son las categorías gramaticales?",
    questionHy: "Ի՞նչ են քերականական կարգերը։",
    answerEs: "Son grupos en los que se clasifican las palabras según sus características y función.",
    answerHy: "Դրանք բառերի խմբեր են՝ ըստ դրանց հատկությունների և գործառույթի։"
  },
  {
    id: 62,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 2,
    questionEs: "¿Cuáles son las principales categorías gramaticales?",
    questionHy: "Որո՞նք են հիմնական խոսքի մասերը։",
    answerEs: "Sustantivo, adjetivo, determinante, pronombre, verbo, adverbio, preposición, conjunción e interjección.",
    answerHy: "Գոյական, ածական, որոշիչ, դերանուն, բայ, մակբայ, նախդիր, շաղկապ և ձայնարկություն։"
  },
  {
    id: 63,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 3,
    questionEs: "¿Qué es un sustantivo?",
    questionHy: "Ի՞նչ է գոյականը։",
    answerEs: "Una palabra que nombra personas, animales, objetos, lugares o ideas.",
    answerHy: "Բառ, որը անվանում է մարդկանց, կենդանիներ, առարկաներ, վայրեր կամ գաղափարներ։"
  },
  {
    id: 64,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 4,
    questionEs: "¿Qué categoría es «casa»?",
    questionHy: "«Casa» բառը խոսքի ո՞ր մասն է։",
    answerEs: "Sustantivo.",
    answerHy: "Գոյական։"
  },
  {
    id: 65,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 5,
    questionEs: "¿Qué es un adjetivo?",
    questionHy: "Ի՞նչ է ածականը։",
    answerEs: "Una palabra que expresa una cualidad del sustantivo.",
    answerHy: "Բառ, որը ցույց է տալիս գոյականի հատկանիշը։"
  },
  {
    id: 66,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 6,
    questionEs: "¿Qué categoría es «bonito» en «un coche bonito»?",
    questionHy: "«Un coche bonito» արտահայտության մեջ «bonito»-ն խոսքի ո՞ր մասն է։",
    answerEs: "Adjetivo.",
    answerHy: "Ածական։"
  },
  {
    id: 67,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 7,
    questionEs: "¿Qué es un verbo?",
    questionHy: "Ի՞նչ է բայը։",
    answerEs: "Una palabra que expresa acción, estado o proceso.",
    answerHy: "Բառ, որը ցույց է տալիս գործողություն, վիճակ կամ գործընթաց։"
  },
  {
    id: 68,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 8,
    questionEs: "¿Qué categoría es «estudiamos»?",
    questionHy: "«Estudiamos» բառը խոսքի ո՞ր մասն է։",
    answerEs: "Verbo.",
    answerHy: "Բայ։"
  },
  {
    id: 69,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 9,
    questionEs: "¿Qué es un pronombre?",
    questionHy: "Ի՞նչ է դերանունը։",
    answerEs: "Una palabra que puede sustituir a un sustantivo.",
    answerHy: "Բառ, որը կարող է փոխարինել գոյականին։"
  },
  {
    id: 70,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 10,
    questionEs: "¿Qué categoría es «ella»?",
    questionHy: "«Ella» բառը խոսքի ո՞ր մասն է։",
    answerEs: "Pronombre.",
    answerHy: "Դերանուն։"
  },
  {
    id: 71,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 11,
    questionEs: "¿Qué es un determinante?",
    questionHy: "Ի՞նչ է որոշիչը։",
    answerEs: "Una palabra que acompaña y concreta al sustantivo.",
    answerHy: "Բառ, որը ուղեկցում և հստակեցնում է գոյականը։"
  },
  {
    id: 72,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 12,
    questionEs: "¿Qué categoría es «mi» en «mi casa»?",
    questionHy: "«Mi casa» արտահայտության մեջ «mi»-ն խոսքի ո՞ր մասն է։",
    answerEs: "Determinante posesivo.",
    answerHy: "Ստացական որոշիչ։"
  },
  {
    id: 73,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 13,
    questionEs: "¿Qué es un adverbio?",
    questionHy: "Ի՞նչ է մակբայը։",
    answerEs: "Una palabra que modifica un verbo, un adjetivo u otro adverbio.",
    answerHy: "Բառ, որը լրացնում կամ փոփոխում է բայի, ածականի կամ այլ մակբայի իմաստը։"
  },
  {
    id: 74,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 14,
    questionEs: "¿Qué categoría es «rápidamente»?",
    questionHy: "«Rápidamente» բառը խոսքի ո՞ր մասն է։",
    answerEs: "Adverbio.",
    answerHy: "Մակբայ։"
  },
  {
    id: 75,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 15,
    questionEs: "¿Qué es una preposición?",
    questionHy: "Ի՞նչ է նախդիրը։",
    answerEs: "Una palabra que relaciona otras palabras.",
    answerHy: "Բառ, որը կապում է այլ բառեր։"
  },
  {
    id: 76,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 16,
    questionEs: "¿Qué categoría es «con»?",
    questionHy: "«Con» բառը խոսքի ո՞ր մասն է։",
    answerEs: "Preposición.",
    answerHy: "Նախդիր։"
  },
  {
    id: 77,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 17,
    questionEs: "¿Qué es una conjunción?",
    questionHy: "Ի՞նչ է շաղկապը։",
    answerEs: "Una palabra que une palabras u oraciones.",
    answerHy: "Բառ, որը միացնում է բառեր կամ նախադասություններ։"
  },
  {
    id: 78,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 18,
    questionEs: "¿Qué categoría es «pero»?",
    questionHy: "«Pero» բառը խոսքի ո՞ր մասն է։",
    answerEs: "Conjunción.",
    answerHy: "Շաղկապ։"
  },
  {
    id: 79,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 19,
    questionEs: "¿Qué es una interjección?",
    questionHy: "Ի՞նչ է ձայնարկությունը։",
    answerEs: "Una palabra o expresión breve que manifiesta una emoción o reacción.",
    answerHy: "Կարճ բառ կամ արտահայտություն, որը ցույց է տալիս զգացմունք կամ արձագանք։"
  },
  {
    id: 80,
    themeId: 4,
    themeTitleEs: "Categorías gramaticales",
    themeTitleHy: "Խոսքի մասերը",
    numberInTheme: 20,
    questionEs: "Analiza las categorías gramaticales de «Mi hermano pequeño estudia mucho».",
    questionHy: "Որոշի՛ր «Mi hermano pequeño estudia mucho» նախադասության խոսքի մասերը։",
    answerEs: "Mi → determinante; hermano → sustantivo; pequeño → adjetivo; estudia → verbo; mucho → adverbio.",
    answerHy: "Mi → որոշիչ, hermano → գոյական, pequeño → ածական, estudia → բայ, mucho → մակբայ։"
  }
];

export interface ExamTicket {
  ticketNumber: number;
  questions: QuestionItem[];
}

/**
 * Generate 20 standard exam tickets (each ticket contains 1 question from each of the 4 themes)
 */
export function getStandardTickets(): ExamTicket[] {
  const tickets: ExamTicket[] = [];
  for (let i = 1; i <= 20; i++) {
    const q1 = ALL_QUESTIONS.find(q => q.themeId === 1 && q.numberInTheme === i)!;
    const q2 = ALL_QUESTIONS.find(q => q.themeId === 2 && q.numberInTheme === i)!;
    const q3 = ALL_QUESTIONS.find(q => q.themeId === 3 && q.numberInTheme === i)!;
    const q4 = ALL_QUESTIONS.find(q => q.themeId === 4 && q.numberInTheme === i)!;
    tickets.push({
      ticketNumber: i,
      questions: [q1, q2, q3, q4]
    });
  }
  return tickets;
}

/**
 * Pull a random ticket or create a randomized ticket
 */
export function getRandomTicket(ticketPool?: ExamTicket[]): ExamTicket {
  const pool = ticketPool || getStandardTickets();
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
