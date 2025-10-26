// Esta es una implementación temporal sin backend
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  console.log(`Llamada a API simulada: ${endpoint}`, options)
  // Aquí puedes agregar lógica mock según sea necesario
  return Promise.resolve({ success: true, message: "Operación simulada exitosa" })
}