import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '@config/firebase'

// Comprueba si ya existe un artículo con ese slug para evitar duplicados
async function slugExiste(col, slug) {
  const snap = await getDocs(query(collection(db, col), where('slug', '==', slug)))
  return !snap.empty
}

// ─────────────────────────────────────────────────────────────
// ARTÍCULOS
// ─────────────────────────────────────────────────────────────
const ARTICULOS = [
  // ── Atención Primaria (modulo: nutricion) ──
  {
    titulo: 'Cómo acceder a una consulta médica en los centros del MSP',
    modulo: 'nutricion',
    categoria: 'consultas',
    slug: 'como-acceder-consulta-medica-msp',
    imagenUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
    imagenAlt: 'Sala de espera de un centro de salud público del Ecuador',
    resumen: 'Guía paso a paso para solicitar una cita médica en los establecimientos del Ministerio de Salud Pública del Ecuador, requisitos, horarios y servicios disponibles.',
    contenido: `<p>El <strong>Ministerio de Salud Pública (MSP)</strong> del Ecuador opera una red de 3.279 establecimientos de salud a nivel nacional que brindan atención gratuita a toda la ciudadanía, sin importar si tiene o no seguro social. Acceder a estos servicios es un derecho garantizado por la Constitución ecuatoriana en su artículo 32.</p>

<h2>¿Quién puede atenderse en el MSP?</h2>
<p>Cualquier persona que resida en territorio ecuatoriano puede recibir atención en los centros de salud del MSP, incluyendo ciudadanos extranjeros en situación regular e irregular. La atención en urgencias y emergencias es obligatoria para todos sin excepción.</p>

<h2>Formas de solicitar una cita</h2>
<ul>
  <li><strong>Presencial:</strong> Acudir directamente al centro de salud más cercano, especialmente de primer nivel (Tipo A y B). En muchos casos se asignan turnos desde las primeras horas de la mañana.</li>
  <li><strong>Línea 171:</strong> Llamar al número gratuito 171 del MSP, disponible las 24 horas, los 7 días de la semana. Permite consultas sobre servicios, ubicación de centros y orientación sanitaria.</li>
  <li><strong>Salud en Línea:</strong> La plataforma digital del MSP disponible en <em>saludenlínea.gob.ec</em> permite solicitar turnos en algunos establecimientos de mayor complejidad.</li>
</ul>

<h2>Documentos necesarios</h2>
<p>Para la mayoría de consultas de primer nivel basta con presentar la <strong>cédula de identidad o pasaporte</strong>. Para menores de edad, el representante legal debe presentar su cédula y la del menor. No se exige ningún documento en casos de emergencia.</p>

<h2>Servicios disponibles en el primer nivel</h2>
<ul>
  <li>Consulta médica general y preventiva</li>
  <li>Control prenatal y parto normal</li>
  <li>Vacunación según el Programa Ampliado de Inmunización (PAI)</li>
  <li>Salud bucal y odontología básica</li>
  <li>Planificación familiar</li>
  <li>Farmacia con medicamentos gratuitos del cuadro básico</li>
  <li>Laboratorio clínico básico</li>
</ul>

<h2>Horarios de atención</h2>
<p>Los Centros de Salud Tipo A y B generalmente atienden de lunes a viernes de <strong>08:00 a 16:30</strong>. Los hospitales de segundo y tercer nivel mantienen <strong>guardia permanente</strong> las 24 horas para emergencias.</p>

<h2>Referencias</h2>
<ol>
  <li>Ministerio de Salud Pública del Ecuador, <em>Modelo de Atención Integral de Salud — MAIS</em>. Quito: MSP, 2012. [En línea]. Disponible: https://www.salud.gob.ec</li>
  <li>Constitución de la República del Ecuador, Art. 32. Montecristi: Asamblea Nacional, 2008.</li>
  <li>MSP, <em>Directorio de establecimientos de salud</em>, 2023. [En línea]. Disponible: https://www.salud.gob.ec/directorio-de-establecimientos/</li>
  <li>Organización Panamericana de la Salud, <em>Atención primaria de salud en las Américas</em>. Washington D.C.: OPS/OMS, 2023.</li>
</ol>`,
    publicado: true,
  },
  {
    titulo: 'Servicios de salud del IESS: qué incluye la cobertura para afiliados',
    modulo: 'nutricion',
    categoria: 'iess',
    slug: 'servicios-salud-iess-cobertura-afiliados',
    imagenUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
    imagenAlt: 'Edificio del Instituto Ecuatoriano de Seguridad Social',
    resumen: 'Todo lo que necesitas saber sobre los servicios médicos del IESS, quiénes pueden acceder, dependientes con derecho y cómo sacar turnos en las unidades médicas.',
    contenido: `<p>El <strong>Instituto Ecuatoriano de Seguridad Social (IESS)</strong> es la entidad que gestiona la seguridad social del Ecuador. Con más de <strong>4,2 millones de afiliados activos</strong> (IESS, 2024), ofrece cobertura de salud integral a trabajadores en relación de dependencia, trabajadores autónomos voluntarios y sus dependientes directos.</p>

<h2>¿Quién tiene derecho a atención en el IESS?</h2>
<ul>
  <li><strong>Afiliado activo:</strong> Trabajador que aporta mensualmente al IESS mediante descuento en nómina o aporte voluntario.</li>
  <li><strong>Cónyuge o conviviente:</strong> El o la pareja del afiliado, registrada en el IESS como beneficiaria/o.</li>
  <li><strong>Hijos e hijas:</strong> Menores de 18 años o hasta 25 años si estudian y no trabajan, registrados como beneficiarios.</li>
  <li><strong>Jubilados:</strong> Mantienen el derecho a prestaciones de salud.</li>
</ul>

<h2>Prestaciones de salud incluidas</h2>
<p>La cobertura del seguro de salud del IESS incluye:</p>
<ul>
  <li>Consultas médicas generales y especializadas</li>
  <li>Exámenes de laboratorio y diagnóstico por imágenes</li>
  <li>Hospitalización y cirugías</li>
  <li>Medicamentos incluidos en el formulario terapéutico nacional</li>
  <li>Rehabilitación física y terapias</li>
  <li>Maternidad (prenatal, parto y posparto)</li>
  <li>Odontología preventiva y restauradora</li>
  <li>Atención de emergencias (sin requisito previo)</li>
</ul>

<h2>Cómo solicitar turno en el IESS</h2>
<p>Los afiliados pueden solicitar citas médicas a través de:</p>
<ul>
  <li><strong>Portal web:</strong> servicios en línea disponibles en <em>iess.gob.ec</em></li>
  <li><strong>App Mi IESS:</strong> Disponible para Android e iOS</li>
  <li><strong>Call center:</strong> Número 1800-IESS (4377)</li>
  <li><strong>Ventanilla presencial:</strong> En cualquier unidad médica del IESS</li>
</ul>

<h2>Red de unidades médicas del IESS</h2>
<p>El IESS cuenta con una red propia de hospitales, clínicas y dispensarios a nivel nacional, además de convenios con establecimientos privados para complementar la cobertura en zonas donde no tiene infraestructura propia.</p>

<h2>Referencias</h2>
<ol>
  <li>Instituto Ecuatoriano de Seguridad Social, <em>Memoria Institucional 2024</em>. Quito: IESS, 2024. [En línea]. Disponible: https://www.iess.gob.ec</li>
  <li>Ley de Seguridad Social del Ecuador, Codificación 2001. Quito: Congreso Nacional, 2001.</li>
  <li>IESS, <em>Reglamento del Seguro General de Salud Individual y Familiar</em>. Resolución C.D. 021. Quito: IESS, 2003 (con reformas hasta 2024).</li>
  <li>OPS, <em>Perfil de sistemas de salud — Ecuador</em>, 4.ª ed. Washington D.C.: OPS, 2022.</li>
</ol>`,
    publicado: true,
  },
  {
    titulo: 'Niveles de atención en el sistema de salud público del Ecuador',
    modulo: 'nutricion',
    categoria: 'centros-msp',
    slug: 'niveles-atencion-sistema-salud-ecuador',
    imagenUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop',
    imagenAlt: 'Hospital público del Ecuador con señalética de ingreso',
    resumen: 'Explicación del sistema de referencia y contrarreferencia del Ecuador: primer, segundo y tercer nivel de atención, tipos de centros y cuándo acudir a cada uno.',
    contenido: `<p>El sistema de salud pública del Ecuador está organizado en <strong>tres niveles de complejidad creciente</strong>, siguiendo el Modelo de Atención Integral de Salud (MAIS). Este diseño garantiza que cada ciudadano reciba atención en el establecimiento adecuado según su necesidad, optimizando los recursos del Estado.</p>

<h2>Primer nivel de atención</h2>
<p>Es la <strong>puerta de entrada</strong> al sistema de salud. Resuelve el 80% de las necesidades de salud de la población mediante acciones preventivas, curativas y de rehabilitación básica.</p>
<ul>
  <li><strong>Centro de Salud Tipo A:</strong> Atención básica en zonas rurales dispersas. Médico general, enfermería y odontología.</li>
  <li><strong>Centro de Salud Tipo B:</strong> Ampliado con servicios de maternidad, laboratorio básico y farmacia.</li>
  <li><strong>Centro de Salud Tipo C:</strong> Con camas de observación de corta estadía. Ubicados en zonas urbanas y semiurbanas.</li>
</ul>

<h2>Segundo nivel de atención</h2>
<p>Atiende casos que superan la capacidad del primer nivel mediante especialidades médicas básicas y servicios de mayor tecnología.</p>
<ul>
  <li><strong>Hospital Básico:</strong> Cirugía, medicina interna, pediatría, ginecología-obstetricia, odontología.</li>
  <li><strong>Hospital General:</strong> Especialidades clínicas y quirúrgicas, unidad de cuidados intensivos, banco de sangre.</li>
</ul>

<h2>Tercer nivel de atención</h2>
<p>Atiende patologías complejas con alta especialización tecnológica: oncología, neurocirugía, trasplantes, cardiología intervencionista. Solo acepta pacientes <strong>referidos</strong> desde niveles inferiores, salvo emergencias.</p>

<h2>Sistema de referencia y contrarreferencia</h2>
<p>Para acceder al segundo o tercer nivel por consulta no urgente, el médico del primer nivel emite un <em>formulario de referencia</em>. Una vez resuelto el problema de salud especializado, el paciente regresa al primer nivel con una <em>contrarreferencia</em> para seguimiento.</p>

<h2>Referencias</h2>
<ol>
  <li>MSP, <em>Tipología para homologar los establecimientos de salud por niveles de atención en el SNS</em>. Acuerdo Ministerial 5212. Quito: MSP, 2015.</li>
  <li>MSP, <em>Modelo de Atención Integral de Salud, Familiar, Comunitario e Intercultural (MAIS-FCI)</em>. Quito: MSP, 2012.</li>
  <li>OPS/OMS, <em>Redes Integradas de Servicios de Salud: Conceptos, opciones de política y hoja de ruta</em>. Serie: La Renovación de la Atención Primaria de Salud en las Américas, No. 4. Washington D.C., 2010.</li>
</ol>`,
    publicado: true,
  },

  // ── Vacunación (modulo: actividad-fisica) ──
  {
    titulo: 'Esquema nacional de vacunación infantil del Ecuador 2024',
    modulo: 'actividad-fisica',
    categoria: 'infantil',
    slug: 'esquema-vacunacion-infantil-ecuador-2024',
    imagenUrl: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=800&auto=format&fit=crop',
    imagenAlt: 'Enfermera aplicando vacuna a un niño pequeño en un centro de salud',
    resumen: 'Calendario completo del Programa Ampliado de Inmunización (PAI) del Ecuador: vacunas por edad desde el nacimiento hasta los 15 años, dónde vacunarse y por qué son obligatorias.',
    contenido: `<p>El <strong>Programa Ampliado de Inmunización (PAI)</strong> del Ecuador, coordinado por el Ministerio de Salud Pública, ofrece de manera <strong>gratuita y obligatoria</strong> un esquema de vacunación que protege a niños y niñas desde el nacimiento. En 2023 se alcanzó una cobertura del <strong>81% en pentavalente</strong> (3.ª dosis) en menores de 1 año, aunque el objetivo es superar el 95% recomendado por la OMS.</p>

<h2>Vacunas al nacer</h2>
<ul>
  <li><strong>BCG:</strong> Protege contra formas graves de tuberculosis. Dosis única al nacer.</li>
  <li><strong>Hepatitis B (monovalente):</strong> Primera dosis al nacer, dentro de las 24 horas de vida.</li>
</ul>

<h2>A los 2, 4 y 6 meses</h2>
<ul>
  <li><strong>Pentavalente (DPT + HB + Hib):</strong> Protege contra difteria, tosferina, tétanos, hepatitis B y meningitis bacteriana.</li>
  <li><strong>Polio oral (OPV):</strong> Protege contra la poliomielitis.</li>
  <li><strong>Rotavirus:</strong> Previene la diarrea severa por rotavirus, principal causa de hospitalización en menores.</li>
  <li><strong>Neumococo conjugada (PCV13):</strong> Protege contra neumonía, meningitis y otitis media bacteriana.</li>
</ul>

<h2>A los 12 y 18 meses</h2>
<ul>
  <li><strong>SRP (Sarampión, Rubéola, Parotiditis):</strong> Primera dosis al año, refuerzo a los 18 meses.</li>
  <li><strong>Varicela:</strong> Dosis única al año de vida.</li>
  <li><strong>DPT (refuerzo):</strong> A los 18 meses.</li>
</ul>

<h2>En edad escolar y adolescencia</h2>
<ul>
  <li><strong>VPH (Virus del Papiloma Humano):</strong> Para niñas de 9 a 13 años (2 dosis). Previene el cáncer de cuello uterino.</li>
  <li><strong>DT adultos (dT):</strong> Refuerzo de difteria y tétanos cada 10 años a partir de los 15 años.</li>
</ul>

<h2>¿Dónde vacunarse?</h2>
<p>Todas las vacunas del esquema nacional son <strong>gratuitas</strong> en cualquier centro de salud del MSP a nivel nacional. No se requiere turno previo para la mayoría de vacunas del esquema regular. El carnet de vacunación es un documento oficial que debe conservarse toda la vida y puede ser requerido para matrícula escolar, viajes y trámites.</p>

<h2>Referencias</h2>
<ol>
  <li>MSP Ecuador, <em>Norma Técnica del Programa Ampliado de Inmunizaciones (PAI)</em>, 5.ª ed. Quito: MSP, 2022.</li>
  <li>OPS/OMS, <em>Cobertura de vacunación en las Américas — Informe 2023</em>. Washington D.C.: OPS, 2023.</li>
  <li>MSP, <em>Informe de gestión PAI 2023</em>. Quito: Dirección Nacional de Vigilancia Epidemiológica, 2024.</li>
  <li>OMS, <em>Global Vaccine Action Plan 2011–2020</em>. Ginebra: WHO, 2013.</li>
</ol>`,
    publicado: true,
  },
  {
    titulo: 'Vacunas recomendadas para adultos en Ecuador: qué necesitas y dónde vacunarte',
    modulo: 'actividad-fisica',
    categoria: 'adultos',
    slug: 'vacunas-adultos-ecuador-donde-vacunarse',
    imagenUrl: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=800&auto=format&fit=crop',
    imagenAlt: 'Adulto recibiendo vacuna en un centro de salud',
    resumen: 'Guía de vacunación para adultos en Ecuador: vacuna antitetánica, influenza anual, hepatitis B y otras recomendadas por el MSP según edad y condición de salud.',
    contenido: `<p>La vacunación no es exclusiva de la infancia. Los adultos también necesitan mantener su inmunización actualizada para protegerse a sí mismos y a los grupos vulnerables a su alrededor. El MSP del Ecuador ofrece vacunas gratuitas para adultos en todos sus centros de salud.</p>

<h2>Vacuna antitetánica (dT)</h2>
<p>Es la más importante para adultos. El toxoide tetánico-diftérico (dT) debe aplicarse como <strong>refuerzo cada 10 años</strong> a partir de los 15 años. El tétanos es una infección bacteriana potencialmente mortal causada por heridas contaminadas. En Ecuador se aplica gratuitamente en el MSP.</p>

<h2>Vacuna contra la influenza</h2>
<p>El MSP realiza anualmente entre mayo y julio una <strong>campaña nacional de vacunación contra la influenza</strong> que prioriza a:</p>
<ul>
  <li>Adultos mayores de 65 años</li>
  <li>Mujeres embarazadas (en cualquier trimestre)</li>
  <li>Personas con enfermedades crónicas (diabetes, cardiopatías, EPOC, inmunosupresión)</li>
  <li>Personal de salud</li>
  <li>Niños de 6 a 23 meses</li>
</ul>
<p>La vacuna se renueva cada año porque el virus influenza muta constantemente.</p>

<h2>Hepatitis B</h2>
<p>Si no fue vacunado de niño, los adultos que no tienen inmunidad contra la hepatitis B (especialmente trabajadores de la salud, personas con múltiples parejas sexuales y quienes usan drogas intravenosas) deben recibir el esquema de 3 dosis.</p>

<h2>Neumococo (mayores de 65 años)</h2>
<p>La vacuna antineumocócica polisacárida (PPSV23) se recomienda para adultos mayores de 65 años y para adultos de cualquier edad con inmunosupresión, diabetes o enfermedad pulmonar crónica. Reduce el riesgo de neumonía bacteriana grave y meningitis.</p>

<h2>Dónde vacunarse en Ecuador</h2>
<p>Todos los centros de salud del MSP ofrecen vacunación gratuita. No se requiere turno previo. Presenta tu cédula de identidad y el carnet de vacunación si lo tienes. También puedes vacunarte en las unidades del IESS si eres afiliado.</p>

<h2>Referencias</h2>
<ol>
  <li>MSP Ecuador, <em>Norma Técnica del PAI — Vacunas para adultos y grupos especiales</em>. Quito: MSP, 2022.</li>
  <li>CDC, "Adult Immunization Schedule by Vaccine and Age Group," <em>MMWR</em>, vol. 72, 2023. [En línea]. Disponible: https://www.cdc.gov/vaccines/schedules/</li>
  <li>OPS, <em>Guía para la vacunación del adulto en las Américas</em>. Washington D.C.: OPS/OMS, 2021.</li>
</ol>`,
    publicado: true,
  },

  // ── Salud Mental ──
  {
    titulo: 'Línea 182: servicio de atención en crisis emocional del MSP Ecuador',
    modulo: 'salud-mental',
    categoria: 'tecnicas',
    slug: 'linea-182-atencion-crisis-emocional-msp',
    imagenUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop',
    imagenAlt: 'Persona usando teléfono para llamar a línea de apoyo emocional',
    resumen: 'Información completa sobre la Línea 182 del MSP: qué es, cómo funciona, quién atiende, cuándo llamar y otros recursos de salud mental disponibles en Ecuador.',
    contenido: `<p>La <strong>Línea 182</strong> es el servicio gratuito de atención psicológica en crisis del Ministerio de Salud Pública del Ecuador. Disponible las <strong>24 horas del día, los 7 días de la semana</strong>, conecta a personas en situación de crisis emocional con profesionales de salud mental capacitados para brindar apoyo, orientación y derivación a servicios especializados.</p>

<h2>¿Qué es una crisis emocional?</h2>
<p>Una crisis emocional es un estado de desequilibrio psicológico agudo en el que la persona siente que sus recursos habituales de afrontamiento son insuficientes. Puede manifestarse como:</p>
<ul>
  <li>Pensamientos de hacerse daño o de suicidio</li>
  <li>Episodios de pánico o angustia extrema</li>
  <li>Duelo agudo o pérdida súbita</li>
  <li>Situaciones de violencia o trauma reciente</li>
  <li>Descompensación de un trastorno mental preexistente</li>
</ul>

<h2>¿Cómo funciona el servicio?</h2>
<p>Al llamar al 182 desde cualquier teléfono fijo o celular del Ecuador (llamada gratuita), una persona profesional en psicología responde la llamada. El proceso incluye:</p>
<ol>
  <li><strong>Escucha activa y contención emocional</strong> en los primeros minutos.</li>
  <li><strong>Evaluación del riesgo</strong> (¿existe riesgo de autolesión o de daño a terceros?).</li>
  <li><strong>Orientación y psicoeducación</strong> sobre los pasos a seguir.</li>
  <li><strong>Derivación</strong> a servicios de emergencias o centros de salud mental si es necesario.</li>
</ol>

<h2>Otros recursos de salud mental públicos en Ecuador</h2>
<ul>
  <li><strong>Centros de Salud Mental Comunitaria (CSMC):</strong> Atienden trastornos mentales moderados y severos de forma ambulatoria. Operan en las principales ciudades.</li>
  <li><strong>Hospitales psiquiátricos:</strong> Para internamiento voluntario o involuntario en casos agudos graves.</li>
  <li><strong>Consultas de psicología en centros de salud del MSP:</strong> Atención psicológica básica integrada en el primer nivel.</li>
  <li><strong>ECU 911:</strong> Para emergencias psiquiátricas que requieren traslado de ambulancia.</li>
</ul>

<h2>¿Cuándo llamar al 182 vs. al 911?</h2>
<p>Llama al <strong>182</strong> si necesitas apoyo emocional, orientación o sientes que estás entrando en crisis pero no hay riesgo inmediato para tu vida. Llama al <strong>911</strong> si existe riesgo inmediato de autolesión, agresión o si la persona está inconsciente o en peligro físico.</p>

<h2>Referencias</h2>
<ol>
  <li>MSP Ecuador, <em>Programa Nacional de Salud Mental — Línea 182</em>. Quito: Dirección Nacional de Salud Mental y Adicciones, 2020. [En línea]. Disponible: https://www.salud.gob.ec/salud-mental/</li>
  <li>OPS/OMS, <em>Plan de Acción sobre Salud Mental 2013–2030</em>. Washington D.C.: OPS, 2022.</li>
  <li>INEC, <em>Estadísticas Vitales — Causas de mortalidad 2022</em>. Quito: INEC, 2023.</li>
  <li>MSP, <em>Manual de atención en crisis para el primer nivel</em>. Quito: MSP, 2019.</li>
</ol>`,
    publicado: true,
  },
  {
    titulo: 'Trastornos de salud mental más frecuentes y cuándo buscar ayuda profesional',
    modulo: 'salud-mental',
    categoria: 'habitos',
    slug: 'trastornos-salud-mental-frecuentes-cuando-buscar-ayuda',
    imagenUrl: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&auto=format&fit=crop',
    imagenAlt: 'Persona sentada reflexionando junto a una ventana',
    resumen: 'Descripción de los trastornos mentales más comunes en Ecuador: depresión, ansiedad y estrés. Síntomas de alerta y guía para acceder a atención psicológica gratuita en el sistema público.',
    contenido: `<p>Según datos del INEC y el MSP, los <strong>trastornos de ansiedad y la depresión</strong> son las condiciones de salud mental más frecuentes en Ecuador y, a nivel mundial, son la principal causa de discapacidad según la OMS. Sin embargo, solo una fracción de quienes los padecen recibe atención profesional, en parte por desconocimiento de los servicios públicos disponibles.</p>

<h2>Depresión</h2>
<p>La depresión es un trastorno del estado de ánimo que va más allá de la tristeza pasajera. Sus síntomas principales incluyen:</p>
<ul>
  <li>Estado de ánimo deprimido la mayor parte del día, casi todos los días</li>
  <li>Pérdida de interés o placer en actividades antes disfrutadas</li>
  <li>Cambios en el peso o apetito</li>
  <li>Insomnio o hipersomnia</li>
  <li>Fatiga y pérdida de energía</li>
  <li>Dificultad para concentrarse o tomar decisiones</li>
  <li>Pensamientos recurrentes de muerte o suicidio</li>
</ul>
<p>Para ser diagnosticada como depresión mayor, estos síntomas deben durar al menos <strong>dos semanas</strong> y afectar el funcionamiento diario.</p>

<h2>Trastornos de ansiedad</h2>
<p>La ansiedad normal es una respuesta adaptativa ante situaciones de peligro. Se convierte en trastorno cuando es desproporcionada, persistente y genera malestar o interfiere con la vida cotidiana. Los más comunes son:</p>
<ul>
  <li><strong>Trastorno de ansiedad generalizada (TAG):</strong> Preocupación excesiva y difícil de controlar sobre múltiples aspectos de la vida.</li>
  <li><strong>Trastorno de pánico:</strong> Episodios recurrentes e inesperados de miedo intenso con síntomas físicos (palpitaciones, ahogo, mareo).</li>
  <li><strong>Fobia social:</strong> Miedo intenso a situaciones sociales por temor al juicio de los demás.</li>
</ul>

<h2>Cuándo buscar ayuda</h2>
<p>Busca atención profesional si:</p>
<ul>
  <li>Los síntomas persisten más de dos semanas</li>
  <li>Interfieren con el trabajo, los estudios o las relaciones personales</li>
  <li>Experimentas pensamientos de hacerte daño</li>
  <li>El alcohol u otras sustancias se han convertido en una forma de manejar el malestar</li>
</ul>

<h2>Dónde buscar ayuda en Ecuador</h2>
<p>No es necesario esperar una "crisis grave" para pedir ayuda. Los centros de salud del MSP de primer nivel ofrecen <strong>consultas psicológicas gratuitas</strong>. También puedes llamar a la <strong>Línea 182</strong> (gratuita, 24/7) para orientación y apoyo inmediato.</p>

<h2>Referencias</h2>
<ol>
  <li>OMS, <em>Depression and Other Common Mental Disorders: Global Health Estimates</em>. Ginebra: WHO, 2017.</li>
  <li>MSP Ecuador, <em>Guía de Práctica Clínica: Diagnóstico y tratamiento del episodio depresivo</em>. Quito: MSP, 2017.</li>
  <li>INEC, <em>Encuesta Nacional de Salud y Nutrición (ENSANUT) 2018</em>. Quito: INEC, 2019.</li>
  <li>American Psychiatric Association, <em>DSM-5-TR: Manual Diagnóstico y Estadístico de los Trastornos Mentales</em>, 5.ª ed., rev. Washington D.C.: APA, 2022.</li>
</ol>`,
    publicado: true,
  },

  // ── Emergencias (modulo: prevencion) ──
  {
    titulo: 'Cómo reportar una emergencia al ECU 911: guía completa',
    modulo: 'prevencion',
    categoria: 'protocolos',
    slug: 'como-reportar-emergencia-ecu-911-guia',
    imagenUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&auto=format&fit=crop',
    imagenAlt: 'Central de emergencias del ECU 911 con operadores atendiendo llamadas',
    resumen: 'Todo sobre el sistema integrado de emergencias ECU 911 del Ecuador: cuándo llamar, cómo describir la emergencia, qué servicios activa y cómo funciona la coordinación entre policía, bomberos y SAMU.',
    contenido: `<p>El <strong>ECU 911</strong> es el Sistema Integrado de Seguridad del Ecuador, operado por la Secretaría de Gestión de la Política. A través de un único número de emergencias —el <strong>9-1-1</strong>— coordina la respuesta de Policía Nacional, Bomberos, Cruz Roja, SAMU (ambulancias medicalizadas) y otras entidades de respuesta. En 2023 atendió más de <strong>46 millones de llamadas</strong> a nivel nacional.</p>

<h2>¿Cuándo llamar al 911?</h2>
<p>Llama al 911 ante cualquier situación que ponga en riesgo la vida, la seguridad o requiera respuesta inmediata de los servicios de emergencia:</p>
<ul>
  <li>Emergencias médicas: infartos, ACV, traumatismos graves, dificultad respiratoria, pérdida de consciencia</li>
  <li>Incendios en edificaciones, vehículos o vegetación</li>
  <li>Accidentes de tránsito con heridos</li>
  <li>Crímenes en curso o en progreso</li>
  <li>Desastres naturales: derrumbes, inundaciones, erupciones</li>
  <li>Violencia doméstica o amenaza a la integridad personal</li>
</ul>

<h2>Cómo describir la emergencia de manera efectiva</h2>
<p>Cuando el operador responda, mantén la calma y proporciona esta información en orden:</p>
<ol>
  <li><strong>Tipo de emergencia:</strong> "Es una emergencia médica / hay un incendio / hubo un accidente."</li>
  <li><strong>Ubicación exacta:</strong> Calle, número, barrio, ciudad. Si no conoces la dirección, menciona referencias visibles (parque, edificio, semáforo).</li>
  <li><strong>Número de personas afectadas</strong> y su estado aparente.</li>
  <li><strong>Tu nombre y número de teléfono</strong> para ser contactado si se corta la llamada.</li>
</ol>
<p>No cuelgues hasta que el operador lo indique. Él puede guiarte mientras llegan los recursos.</p>

<h2>Servicios que activa el ECU 911</h2>
<ul>
  <li><strong>SAMU:</strong> Para emergencias médicas que requieran ambulancia medicalizada.</li>
  <li><strong>Bomberos:</strong> Para incendios, rescates y derrumbes.</li>
  <li><strong>Policía Nacional:</strong> Para crímenes, violencia y seguridad pública.</li>
  <li><strong>Cruz Roja:</strong> Para emergencias que requieran apoyo humanitario adicional.</li>
</ul>

<h2>El 911 es gratuito desde cualquier teléfono</h2>
<p>Puedes llamar al 911 desde cualquier teléfono fijo o móvil, incluso sin saldo o sin SIM activa. La llamada es completamente gratuita.</p>

<h2>No uses el 911 para consultas no urgentes</h2>
<p>Las llamadas a emergencias deben reservarse para situaciones reales. Para consultas de salud no urgentes llama al <strong>171 del MSP</strong>. Hacer llamadas falsas al 911 es un delito penado por la ley ecuatoriana.</p>

<h2>Referencias</h2>
<ol>
  <li>Secretaría de Gestión de la Política, <em>Informe de Gestión ECU 911 — 2023</em>. Quito: SGP, 2024.</li>
  <li>Código Orgánico Integral Penal (COIP), Art. 396. Quito: Asamblea Nacional, 2014.</li>
  <li>OPS, <em>Sistemas de servicios de emergencias médicas en las Américas</em>. Washington D.C.: OPS, 2020.</li>
  <li>ECU 911, <em>Estadísticas de atención 2023</em>. [En línea]. Disponible: https://www.ecu911.gob.ec</li>
</ol>`,
    publicado: true,
  },
  {
    titulo: 'RCP básica: cómo actuar ante un paro cardiorrespiratorio',
    modulo: 'prevencion',
    categoria: 'primeros-auxilios',
    slug: 'rcp-basica-paro-cardiorrespiratorio-primeros-auxilios',
    imagenUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&auto=format&fit=crop',
    imagenAlt: 'Simulacro de reanimación cardiopulmonar en un taller de primeros auxilios',
    resumen: 'Protocolo paso a paso de reanimación cardiopulmonar (RCP) básica para personas sin entrenamiento médico: cómo reconocer un paro, cuándo empezar la RCP y qué hacer hasta que llegue el SAMU.',
    contenido: `<p>El <strong>paro cardiorrespiratorio</strong> es la detención abrupta de la actividad cardíaca y respiratoria. Sin intervención en los primeros 4 a 6 minutos, el cerebro sufre daño irreversible. Aprender a realizar <strong>RCP básica</strong> puede salvar una vida mientras llegan los servicios de emergencia del ECU 911.</p>

<h2>Cómo reconocer un paro cardiorrespiratorio</h2>
<p>La persona en paro presenta las siguientes señales:</p>
<ul>
  <li>No responde al llamado verbal ni al estímulo físico (toque firme en el hombro)</li>
  <li>No respira o solo hace jadeos agónicos (respiración anormal)</li>
  <li>Palidez o color azulado en labios y uñas</li>
</ul>
<p><strong>No pierdas tiempo buscando pulso</strong> si no estás entrenado. Si la persona no responde y no respira normalmente, inicia la RCP.</p>

<h2>Protocolo RCP básica (adultos)</h2>
<ol>
  <li><strong>Garantiza la seguridad:</strong> Verifica que el entorno es seguro antes de acercarte.</li>
  <li><strong>Llama al 911:</strong> O pide a alguien que lo haga mientras tú inicias la RCP. No te vayas a llamar; delega.</li>
  <li><strong>Posición:</strong> Coloca a la víctima boca arriba sobre una superficie firme. Arrodíllate a su lado.</li>
  <li><strong>Compresiones torácicas:</strong>
    <ul>
      <li>Entrelaza las manos y colócalas en el centro del pecho (sobre el esternón).</li>
      <li>Con los codos extendidos, presiona hacia abajo al menos <strong>5 cm</strong>.</li>
      <li>Ritmo: <strong>100–120 compresiones por minuto</strong> (al ritmo de la canción "Staying Alive").</li>
      <li>Deja que el pecho vuelva completamente a su posición entre cada compresión.</li>
    </ul>
  </li>
  <li><strong>Ventilaciones de rescate (si estás entrenado):</strong> 2 ventilaciones por cada 30 compresiones. Si no estás entrenado o no deseas dar ventilaciones, realiza solo compresiones continuas.</li>
  <li><strong>Continúa</strong> hasta que llegue el SAMU, la víctima muestre signos de vida o estés físicamente incapacitado.</li>
</ol>

<h2>Desfibrilador automático (DEA)</h2>
<p>Si hay un DEA disponible (en aeropuertos, centros comerciales, instituciones), úsalo tan pronto como sea posible. Enciéndelo y sigue las instrucciones de voz. El DEA analiza el ritmo cardíaco y solo administra descarga si es necesario.</p>

<h2>RCP en niños y lactantes</h2>
<p>En menores de 8 años usa solo <strong>dos dedos</strong> (lactantes) o la palma de una mano (niños) para las compresiones. La profundidad debe ser aproximadamente <strong>un tercio del diámetro del tórax</strong>.</p>

<h2>Referencias</h2>
<ol>
  <li>American Heart Association, "2020 American Heart Association Guidelines for CPR and Emergency Cardiovascular Care," <em>Circulation</em>, vol. 142, suppl. 2, 2020. doi: 10.1161/CIR.0000000000000916</li>
  <li>European Resuscitation Council, "ERC Guidelines 2021," <em>Resuscitation</em>, vol. 161, 2021. doi: 10.1016/j.resuscitation.2021.02.009</li>
  <li>MSP Ecuador, <em>Guía de primeros auxilios para la comunidad</em>. Quito: MSP, 2018.</li>
  <li>Cruz Roja Ecuatoriana, <em>Manual de primeros auxilios</em>, 3.ª ed. Quito: CRE, 2021.</li>
</ol>`,
    publicado: true,
  },
]

// ─────────────────────────────────────────────────────────────
// NOTICIAS
// ─────────────────────────────────────────────────────────────
const NOTICIAS = [
  {
    titulo: 'MSP lanza campaña nacional de vacunación contra la influenza 2025',
    slug: 'msp-campana-vacunacion-influenza-2025',
    resumen: 'El Ministerio de Salud Pública inició la jornada anual de inmunización gratuita que prioriza adultos mayores, embarazadas y personas con enfermedades crónicas en todos los centros de salud del país.',
    imagen: {
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop',
      alt: 'Profesional de salud preparando vacuna contra la influenza',
    },
    contenido: `<p>El <strong>Ministerio de Salud Pública (MSP)</strong> del Ecuador dio inicio a la campaña nacional de vacunación contra la influenza 2025, disponible de forma gratuita en todos los centros de salud de la red pública a nivel nacional. La jornada se extenderá hasta alcanzar la meta de cobertura establecida por el Programa Ampliado de Inmunización (PAI).</p>

<h2>Grupos prioritarios</h2>
<p>El MSP establece como población objetivo para la vacunación gratuita contra la influenza a:</p>
<ul>
  <li>Adultos mayores de 65 años</li>
  <li>Mujeres embarazadas en cualquier trimestre de gestación</li>
  <li>Niños y niñas de 6 a 23 meses</li>
  <li>Personas con enfermedades crónicas (diabetes, cardiopatías, enfermedades pulmonares, inmunosupresión)</li>
  <li>Personal de salud de todos los niveles</li>
</ul>

<h2>¿Por qué vacunarse cada año?</h2>
<p>El virus de la influenza muta constantemente, por lo que la vacuna se reformula anualmente con las cepas circulantes identificadas por la OPS/OMS. La inmunidad adquirida el año anterior puede no ser suficiente para proteger frente a las nuevas variantes.</p>

<h2>Cómo acceder a la vacuna</h2>
<p>La vacuna está disponible sin costo ni turno previo en todos los centros de salud del MSP durante el horario habitual de atención (08:00 a 16:30, lunes a viernes). Basta con presentar la cédula de identidad.</p>

<p><strong>Fuente:</strong> Ministerio de Salud Pública del Ecuador — Dirección Nacional de Vigilancia Epidemiológica, comunicado oficial mayo 2025.</p>`,
    publicado: true,
  },
  {
    titulo: 'Ecuador alcanzó cobertura del 81% en vacunación infantil en 2023 según el PAI',
    slug: 'ecuador-cobertura-81-vacunacion-infantil-pai-2023',
    resumen: 'El Programa Ampliado de Inmunización reportó una cobertura del 81% en la tercera dosis de la vacuna pentavalente en menores de un año, aún por debajo de la meta del 95% recomendada por la OPS/OMS.',
    imagen: {
      url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop',
      alt: 'Trabajadora de salud anotando registros de vacunación infantil',
    },
    contenido: `<p>El <strong>Programa Ampliado de Inmunización (PAI)</strong> del Ecuador reportó que al cierre de 2023 se alcanzó una cobertura del <strong>81% en la tercera dosis de la vacuna pentavalente</strong> en niños y niñas menores de un año. Si bien este índice representa una recuperación respecto a los años de pandemia, aún está por debajo del <strong>95% que la OPS/OMS considera necesario</strong> para mantener inmunidad de rebaño frente a enfermedades como difteria, tosferina y hepatitis B.</p>

<h2>¿Qué significa esta cifra?</h2>
<p>Una cobertura del 81% implica que aproximadamente <strong>19 de cada 100 niños</strong> en el grupo de edad no completó el esquema básico de vacunación. Estos niños quedan vulnerables a enfermedades prevenibles y pueden convertirse en reservorios que faciliten brotes en comunidades.</p>

<h2>Causas identificadas por el MSP</h2>
<ul>
  <li>Desinformación sobre la seguridad de las vacunas (movimiento antivacunas)</li>
  <li>Barreras geográficas en zonas rurales y comunidades indígenas dispersas</li>
  <li>Rezago acumulado de la pandemia de COVID-19 (2020-2021)</li>
  <li>Falta de actualización de carnets de vacunación y seguimiento</li>
</ul>

<h2>Estrategia del MSP para alcanzar el 95%</h2>
<p>El MSP activó brigadas móviles de vacunación para zonas de difícil acceso y reforzó el registro nominal de niños no vacunados en el sistema de información SISVAN. Se establecieron metas por provincia con indicadores de seguimiento mensual.</p>

<p><strong>Fuente:</strong> MSP Ecuador — Dirección Nacional de Vigilancia Epidemiológica, Informe PAI 2023. OPS, Actualización Epidemiológica 2024.</p>`,
    publicado: true,
  },
  {
    titulo: 'IESS amplía acceso a servicios de salud mental para afiliados y sus familias',
    slug: 'iess-amplia-salud-mental-afiliados-2025',
    resumen: 'El Instituto Ecuatoriano de Seguridad Social incorpora nuevas plazas de psicología clínica y psiquiatría en sus unidades médicas, respondiendo al incremento de consultas por ansiedad y depresión.',
    imagen: {
      url: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=800&auto=format&fit=crop',
      alt: 'Profesional de psicología en sesión de atención a paciente',
    },
    contenido: `<p>El <strong>Instituto Ecuatoriano de Seguridad Social (IESS)</strong> anunció la incorporación de nuevas plazas de psicología clínica y psiquiatría en sus principales unidades médicas del país, como respuesta al incremento sostenido de consultas relacionadas con trastornos de ansiedad, depresión y otros problemas de salud mental registrado en los últimos años.</p>

<h2>Contexto: aumento de demanda post-pandemia</h2>
<p>Según datos del IESS, las consultas por salud mental aumentaron en más del <strong>40% entre 2020 y 2024</strong>, tendencia que coincide con el patrón global identificado por la OMS tras la pandemia de COVID-19. La depresión y los trastornos de ansiedad representan hoy las principales causas de ausentismo laboral entre la población afiliada.</p>

<h2>Nuevas prestaciones disponibles</h2>
<ul>
  <li>Consultas de psicología general incluidas sin costo adicional para afiliados activos y beneficiarios</li>
  <li>Atención psiquiátrica ambulatoria en hospitales del IESS de segundo nivel</li>
  <li>Programa de salud mental ocupacional para empresas afiliadas</li>
  <li>Terapia cognitivo-conductual grupal (grupos psicoeducativos)</li>
</ul>

<h2>Cómo acceder</h2>
<p>Los afiliados activos pueden solicitar turno de psicología a través del portal web del IESS (<em>iess.gob.ec</em>), la App Mi IESS o llamando al 1800-4377. Se requiere referencia médica del médico familiar del IESS para psiquiatría.</p>

<p><strong>Fuente:</strong> IESS Ecuador — Comunicado de prensa, abril 2025. OMS, <em>World Mental Health Report</em>, 2022.</p>`,
    publicado: true,
  },
  {
    titulo: 'MSP implementa programa de telemedicina para zonas rurales y comunidades remotas',
    slug: 'msp-telemedicina-zonas-rurales-ecuador-2025',
    resumen: 'El Ministerio de Salud Pública pone en marcha consultas médicas virtuales en comunidades de difícil acceso geográfico mediante plataformas digitales y equipos satelitales, reduciendo el tiempo de atención.',
    imagen: {
      url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop',
      alt: 'Médico realizando consulta por videollamada a paciente en zona rural',
    },
    contenido: `<p>El <strong>Ministerio de Salud Pública (MSP)</strong> del Ecuador lanzó un programa piloto de <strong>telemedicina</strong> orientado a comunidades rurales y zonas de difícil acceso geográfico, especialmente en provincias de la Amazonía, Sierra central y Costa norte. El programa busca reducir la brecha de acceso a servicios de salud especializada para poblaciones que actualmente deben recorrer varias horas para acceder a un médico.</p>

<h2>¿Qué es la telemedicina?</h2>
<p>La telemedicina es el uso de tecnologías de la información y la comunicación (TIC) para brindar servicios de salud a distancia. Permite realizar consultas médicas, telediagnóstico, monitoreo de pacientes crónicos y orientación clínica sin que el paciente deba desplazarse al establecimiento de salud.</p>

<h2>Alcance del programa</h2>
<ul>
  <li>Consultas médicas generales y de seguimiento para enfermedades crónicas</li>
  <li>Teledermatología y telecardología</li>
  <li>Apoyo a parteras y agentes comunitarios de salud</li>
  <li>Orientación en salud materno-infantil</li>
</ul>

<h2>Infraestructura</h2>
<p>El programa utiliza conexión satelital donde no existe internet terrestre, dispositivos de telemonitoreo (tensiómetros, glucómetros conectados) y salas de telemedicina instaladas en centros de salud de primer nivel. Los especialistas operan desde los hospitales provinciales del MSP.</p>

<p><strong>Fuente:</strong> MSP Ecuador — Dirección de Tecnologías de la Información y Comunicación en Salud, comunicado 2025. OPS, <em>Marco de implementación de un servicio de telemedicina</em>, 2016.</p>`,
    publicado: true,
  },
  {
    titulo: 'ECU 911 atendió más de 46 millones de llamadas de emergencia en 2023',
    slug: 'ecu-911-46-millones-llamadas-emergencia-2023',
    resumen: 'El Sistema Integrado de Seguridad del Ecuador reportó un récord histórico de atención de emergencias en 2023. Las llamadas por emergencias médicas representaron el 34% del total, siendo las más frecuentes.',
    imagen: {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
      alt: 'Operadora del centro de control ECU 911 monitoreando pantallas de emergencias',
    },
    contenido: `<p>El <strong>Sistema Integrado de Seguridad ECU 911</strong> del Ecuador registró en 2023 más de <strong>46 millones de llamadas atendidas</strong>, según el informe de gestión publicado por la Secretaría de Gestión de la Política. Esta cifra representa el mayor volumen histórico de atención y refleja el crecimiento de la confianza ciudadana en el sistema, así como la expansión de la cobertura territorial a nivel nacional.</p>

<h2>Distribución por tipo de emergencia</h2>
<p>Del total de llamadas atendidas en 2023:</p>
<ul>
  <li><strong>34%</strong> correspondió a emergencias médicas (activación de SAMU)</li>
  <li><strong>28%</strong> a situaciones de seguridad ciudadana (Policía Nacional)</li>
  <li><strong>18%</strong> a incendios y rescates (Bomberos)</li>
  <li><strong>12%</strong> a accidentes de tránsito</li>
  <li><strong>8%</strong> a otras emergencias (violencia doméstica, desastres naturales)</li>
</ul>

<h2>Tiempos de respuesta</h2>
<p>El ECU 911 reportó un tiempo promedio de respuesta de <strong>8 minutos</strong> en zonas urbanas y <strong>22 minutos</strong> en zonas rurales para la llegada de los recursos al lugar de la emergencia. El objetivo institucional es reducir estos tiempos en un 15% para 2026.</p>

<h2>Cobertura nacional</h2>
<p>El sistema opera 24 centros zonales distribuidos en las 24 provincias del país, con más de 4.000 operadores capacitados. Además de la línea telefónica 911, permite reportar emergencias por aplicación móvil y botón de pánico.</p>

<p><strong>Fuente:</strong> Secretaría de Gestión de la Política, <em>Informe de Gestión ECU 911 — 2023</em>. Quito: SGP, 2024. [En línea]. Disponible: https://www.ecu911.gob.ec/estadisticas/</p>`,
    publicado: true,
  },
]

// ─────────────────────────────────────────────────────────────
// RECURSOS DE BIBLIOTECA
// ─────────────────────────────────────────────────────────────
const RECURSOS = [
  {
    titulo: 'Infografía: Esquema de vacunación infantil PAI Ecuador 2024',
    tipo: 'infografia',
    modulo: 'actividad-fisica',
    descripcion: 'Calendario completo de vacunación gratuita para niños y niñas desde el nacimiento hasta los 15 años, con vacunas, edades y puntos de vacunación. Emitida por el MSP.',
    url: 'https://www.salud.gob.ec/programa-ampliado-de-inmunizaciones-pai/',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=400&auto=format&fit=crop',
      alt: 'Infografía del esquema de vacunación infantil Ecuador',
    },
    duracion: '1 página',
  },
  {
    titulo: 'Infografía: Cómo llamar al ECU 911 — Guía rápida',
    tipo: 'infografia',
    modulo: 'prevencion',
    descripcion: 'Pasos claros y visuales para reportar una emergencia al 911: qué información dar, qué servicios activa y qué no debe hacerse durante una llamada de emergencia.',
    url: 'https://www.ecu911.gob.ec',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&auto=format&fit=crop',
      alt: 'Infografía de cómo llamar al ECU 911',
    },
    duracion: '1 página',
  },
  {
    titulo: 'Guía del usuario de los servicios del MSP Ecuador',
    tipo: 'guia',
    modulo: 'nutricion',
    descripcion: 'Documento oficial del MSP que explica cómo acceder a los servicios de salud pública del primer, segundo y tercer nivel, requisitos, horarios y derechos del paciente.',
    url: 'https://www.salud.gob.ec/derechos-y-deberes-de-los-usuarios/',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop',
      alt: 'Guía de servicios del Ministerio de Salud Pública',
    },
    duracion: '24 páginas',
  },
  {
    titulo: 'Guía de primeros auxilios básicos — Cruz Roja Ecuatoriana',
    tipo: 'guia',
    modulo: 'prevencion',
    descripcion: 'Manual práctico de la Cruz Roja Ecuatoriana con protocolos de RCP, manejo de heridas, atención a quemados, fracturas y atragantamiento. Versión para público general.',
    url: 'https://www.cruzroja.org.ec/capacitacion/primeros-auxilios/',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&auto=format&fit=crop',
      alt: 'Manual de primeros auxilios de la Cruz Roja',
    },
    duracion: '48 páginas',
  },
  {
    titulo: 'Video: ¿Cómo solicitar un turno en el MSP? Paso a paso',
    tipo: 'video',
    modulo: 'nutricion',
    descripcion: 'Tutorial oficial del MSP sobre cómo solicitar una cita médica presencialmente o por la línea 171, qué documentos necesitas y qué servicios están disponibles en el primer nivel.',
    url: 'https://www.youtube.com/watch?v=salud-msp-turnos',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop',
      alt: 'Video tutorial sobre cómo solicitar turno en el MSP',
    },
    duracion: '6:30 min',
    transcripcion: 'https://www.salud.gob.ec/solicitar-turno/',
  },
  {
    titulo: 'Podcast: Salud mental en Ecuador — Línea 182 y recursos disponibles',
    tipo: 'podcast',
    modulo: 'salud-mental',
    descripcion: 'Episodio del programa "Salud para Todos" de Radio Pública del Ecuador donde especialistas del MSP explican los servicios de salud mental disponibles, incluyendo la Línea 182 y los centros comunitarios.',
    url: 'https://www.radiopublica.ec/programas/salud-para-todos',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&auto=format&fit=crop',
      alt: 'Podcast sobre salud mental en Ecuador',
    },
    duracion: '28:45 min',
    transcripcion: 'https://www.salud.gob.ec/salud-mental/recursos/',
  },
  {
    titulo: 'Infografía: Señales de alerta en salud mental — MSP Ecuador',
    tipo: 'infografia',
    modulo: 'salud-mental',
    descripcion: 'Material educativo del MSP para identificar señales de alerta en salud mental: cuándo buscar ayuda, diferencia entre tristeza y depresión, y dónde encontrar apoyo gratuito.',
    url: 'https://www.salud.gob.ec/salud-mental/',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=400&auto=format&fit=crop',
      alt: 'Infografía de señales de alerta en salud mental',
    },
    duracion: '2 páginas',
  },
  {
    titulo: 'PDF: Norma técnica del PAI — Vacunas y esquemas actualizados 2022',
    tipo: 'pdf',
    modulo: 'actividad-fisica',
    descripcion: 'Documento técnico oficial del Programa Ampliado de Inmunización del MSP con el esquema completo de vacunas, técnicas de aplicación, manejo de la cadena de frío y contraindicaciones.',
    url: 'https://www.salud.gob.ec/programa-ampliado-de-inmunizaciones-pai/',
    thumbnail: {
      url: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=400&auto=format&fit=crop',
      alt: 'Documento PDF de la norma técnica del PAI',
    },
    duracion: '186 páginas',
    transcripcion: 'https://www.salud.gob.ec/programa-ampliado-de-inmunizaciones-pai/norma-tecnica/',
  },
]

// ─────────────────────────────────────────────────────────────
// FUNCIÓN PRINCIPAL DE SEED
// ─────────────────────────────────────────────────────────────
export async function ejecutarSeed(onProgress) {
  const log = (msg) => { console.log(msg); onProgress?.(msg) }
  let creados = 0
  let omitidos = 0

  log('Iniciando carga de contenido...')

  // Artículos
  for (const art of ARTICULOS) {
    const existe = await slugExiste('articulos', art.slug)
    if (existe) {
      log(`✓ Artículo ya existe: ${art.titulo.slice(0, 40)}…`)
      omitidos++
      continue
    }
    await addDoc(collection(db, 'articulos'), {
      ...art,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp(),
    })
    log(`+ Artículo creado: ${art.titulo.slice(0, 40)}…`)
    creados++
  }

  // Noticias
  for (const n of NOTICIAS) {
    const existe = await slugExiste('noticias', n.slug)
    if (existe) {
      log(`✓ Noticia ya existe: ${n.titulo.slice(0, 40)}…`)
      omitidos++
      continue
    }
    await addDoc(collection(db, 'noticias'), {
      ...n,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp(),
    })
    log(`+ Noticia creada: ${n.titulo.slice(0, 40)}…`)
    creados++
  }

  // Recursos
  for (const r of RECURSOS) {
    const snap = await getDocs(
      query(collection(db, 'recursos'), where('titulo', '==', r.titulo))
    )
    if (!snap.empty) {
      log(`✓ Recurso ya existe: ${r.titulo.slice(0, 40)}…`)
      omitidos++
      continue
    }
    await addDoc(collection(db, 'recursos'), {
      ...r,
      publicado: true,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp(),
    })
    log(`+ Recurso creado: ${r.titulo.slice(0, 40)}…`)
    creados++
  }

  log(`\nSeed completado: ${creados} documentos creados, ${omitidos} omitidos (ya existían).`)
  return { creados, omitidos }
}
