import { pool } from "../db.js";

// Obtener todas las categorías
export const getAllCategorias = async () => {
  const result = await pool.query("SELECT * FROM categorias");
  return result.rows;
};

// Obtener categoría por ID
export const getCategoriaById = async (id_categoria) => {
  const result = await pool.query(
    "SELECT * FROM categorias WHERE id_categoria = $1",
    [id_categoria]
  );
  return result.rows[0];
};

// Crear
export const postCrearCategoria = async (nombre_categoria, clasificacion) => {
  const query = `
    INSERT INTO categorias (id_categoria, nombre_categoria, clasificacion)
    VALUES (gen_random_uuid(), $1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [nombre_categoria, clasificacion]);
  return result.rows[0];
};

// Actualizar
export const actualizarCategoria = async (id_categoria, nombre_categoria, clasificacion) => {
  const query = `
    UPDATE categorias
    SET nombre_categoria = $1,
        clasificacion = $2
    WHERE id_categoria = $3
    RETURNING *;
  `;
  const values = [nombre_categoria, clasificacion, id_categoria];
  const result = await pool.query(query, values);
  return result;
};

// Eliminar 
export const eliminarCategoria = async (id_categoria) => {
  const catAEliminar = await pool.query(
    "SELECT * FROM categorias WHERE id_categoria = $1",
    [id_categoria]
  );

  if (catAEliminar.rowCount === 0) throw new Error("Categoría no encontrada");

  await pool.query("DELETE FROM categorias WHERE id_categoria = $1", [id_categoria]);

  return {
    message: "Categoría eliminada correctamente",
    categoria: catAEliminar.rows[0],
  };
};

// Buscar por nombre
export const buscarCategoriaPorNombre = async (nombre_categoria) => {
  const buscar = `%${nombre_categoria}%`;
  const result = await pool.query(
    "SELECT * FROM categorias WHERE nombre_categoria ILIKE $1",
    [buscar]
  );
  return result.rows;
};

// Buscar por clasificación
export const buscarCategoriaPorClasificacion = async (clasificacion) => {
  const buscar = `%${clasificacion}%`;
  const result = await pool.query(
    "SELECT * FROM categorias WHERE clasificacion ILIKE $1",
    [buscar]
  );
  return result.rows;
};
