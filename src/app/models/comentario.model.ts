export interface Comentario {
  id?: number; // asignado por el backend
  noticia_id: number; // ID de la noticia/evento
  autor_nombre: string; // UID del usuario que comenta
  contenido: string;
  fecha_creacion?: string; // ISO string
}