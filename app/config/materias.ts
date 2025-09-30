export const materiasConfig = {
  quimica: {
    nombre: 'Química',
    emoji: '🧪',
    color: 'quimica'
  },
  fisica: {
    nombre: 'Física',
    emoji: '⚡',
    color: 'fisica'
  },
  matematicas: {
    nombre: 'Matemáticas',
    emoji: '📊',
    color: 'matematicas'
  }
} as const;

export type MateriaSlug = keyof typeof materiasConfig;
