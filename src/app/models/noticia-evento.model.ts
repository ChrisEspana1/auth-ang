export interface NoticiaEvento {
  id?: number; // Opcional, asignado por el backend
  titulo: string;
  descripcion: string;
  fecha_publicacion?: string; // ISO string, asignado por el backend
  autor_uid: string; // UID de Firebase Auth
  imagen_url: string; // URL de la imagen destacada
  etiquetas?: string[]; // Lista de palabras clave
  tipo: 'noticia' | 'evento';
  fecha_evento?: string; // ISO string, solo si es evento
  created_at?: string;
  updated_at?: string;
}
