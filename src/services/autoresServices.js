import { pool } from "../db.js";

// Obtener todos los autores
export const getAllAutores = async () => {
  const result = await pool.query("SELECT * FROM autores");
  return result.rows;
};

// Obtener autor por ID
export const getAutorById = async (id_autor) => {
  const result = await pool.query(
    "SELECT * FROM autores WHERE id_autor = $1",
    [id_autor]
  );
  return result.rows[0];
};

// Crear
export const postCrearAutor = async (nombre, nacionalidad, biografia, correo) => {
  const query = `
    INSERT INTO autores (id_autor, nombre, nacionalidad, biografia, correo)
    VALUES (gen_random_uuid(), $1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [nombre, nacionalidad, biografia, correo];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Actualizar
export const actualizarAutor = async (
  id_autor,
  nombre,
  nacionalidad,
  biografia,
  correo
) => {
  const query = `
    UPDATE autores
    SET nombre = $1,
        nacionalidad = $2,
        biografia = $3,
        correo = $4
    WHERE id_autor = $5
    RETURNING *;
  `;
  const values = [nombre, nacionalidad, biografia, correo, id_autor];
  const result = await pool.query(query, values);
  return result;
};

// Eliminar
export const eliminarAutor = async (id_autor) => {
  const autorAEliminar = await pool.query(
    "SELECT * FROM autores WHERE id_autor = $1",
    [id_autor]
  );

  if (autorAEliminar.rowCount === 0) throw new Error("Autor no encontrado");

  await pool.query("DELETE FROM autores WHERE id_autor = $1", [id_autor]);

  return {
    message: "Autor eliminado correctamente",
    autor: autorAEliminar.rows[0],
  };
};

// Buscar autor por nombre
export const buscarAutorPorNombre = async (nombre) => {
  const buscar = `%${nombre}%`;
  const result = await pool.query(
    "SELECT * FROM autores WHERE nombre ILIKE $1",
    [buscar]
  );
  return result.rows;
};

// Buscar autor por nacionalidad
export const buscarAutorPorNacionalidad = async (nacionalidad) => {
  const buscar = `%${nacionalidad}%`;
  const result = await pool.query(
    "SELECT * FROM autores WHERE nacionalidad ILIKE $1",
    [buscar]
  );
  return result.rows;
};
