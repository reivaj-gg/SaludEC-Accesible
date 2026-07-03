export function validateField(name, value) {
  const v = value?.trim() ?? ''
  switch (name) {
    case 'nombre':
      if (!v) return 'El nombre completo es obligatorio.'
      if (v.split(/\s+/).length < 2) return 'Ingresa tu nombre y apellido (mínimo dos palabras).'
      if (v.length < 5) return 'El nombre debe tener al menos 5 caracteres.'
      return ''
    case 'email':
      if (!v) return 'El correo electrónico es obligatorio.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return 'Ingresa un correo válido (ej: tu@correo.com).'
      return ''
    case 'asunto':
      if (!v) return 'El asunto es obligatorio.'
      if (v.length < 3) return 'El asunto debe tener al menos 3 caracteres.'
      return ''
    case 'mensaje':
      if (!v) return 'El mensaje es obligatorio.'
      if (v.length < 20) return `El mensaje debe tener al menos 20 caracteres (${v.length}/20).`
      return ''
    default:
      return ''
  }
}

export function validateContactForm(form) {
  const errors = {}
  for (const field of ['nombre', 'email', 'asunto', 'mensaje']) {
    const err = validateField(field, form[field])
    if (err) errors[field] = err
  }
  return errors
}

export function validateIMC({ peso, talla }) {
  const errors = {}
  const p = parseFloat(peso)
  const t = parseFloat(talla)

  if (!peso) errors.peso = 'El peso es obligatorio.'
  else if (isNaN(p) || p < 10 || p > 500) errors.peso = 'Ingresa un peso válido (10–500 kg).'

  if (!talla) errors.talla = 'La talla es obligatoria.'
  else if (isNaN(t) || t < 50 || t > 250) errors.talla = 'Ingresa una talla válida (50–250 cm).'

  return errors
}

export function calcularIMC(pesoKg, tallaCm) {
  const tallaM = tallaCm / 100
  return pesoKg / (tallaM * tallaM)
}

export function interpretarIMC(imc) {
  if (imc < 18.5) return { categoria: 'Bajo peso', color: 'warning', descripcion: 'Por debajo del rango saludable.' }
  if (imc < 25)   return { categoria: 'Peso normal', color: 'success', descripcion: 'En el rango de peso saludable.' }
  if (imc < 30)   return { categoria: 'Sobrepeso', color: 'warning', descripcion: 'Ligeramente por encima del rango saludable.' }
  return { categoria: 'Obesidad', color: 'danger', descripcion: 'Consulta a un profesional de la salud.' }
}
