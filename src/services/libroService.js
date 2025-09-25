import { pool } from '../db.js';
import { errorHandler } from '../middlewares/errorHandler.js';

export const obtenerTodosLosLibros = async (req, res) => {
        const result = await pool.query('SELECT * FROM libros');
        res.json(result.rows);
};

export const obtenerLibroPorId = async (req, res) => {
    const { id } = req.params;
        const result = await pool.query("SELECT * FROM libros WHERE id_libro = $1", [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: "Libro no encontrado" });
        res.json(result.rows[0]);
};

export const crearLibro = async (id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen) => {
        const query = `INSERT INTO libros
        (id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const result = await pool.query(query, [id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen]);
        return result.rows[0];
};

export const actualizarLibro = async (libro) => {
    const query = `UPDATE libros 
                   SET titulo=$1, anio_publicacion=$2, autor_id=$3, categoria_id=$4, resumen=$5
                   WHERE id_libro=$6
                   RETURNING *;`;
        const result = await pool.query(query, libro);
        if (result.rowCount === 0) throw new Error("Libro no encontrado");
        return result.rows[0];

};

export const eliminarLibro = async (id_libro) => {
        const libroEliminar = await pool.query("SELECT * FROM libros WHERE id_libro=$1", [id_libro]);
        if (libroEliminar.rowCount === 0) throw new Error("El libro no existe");
        await pool.query("DELETE FROM libros WHERE id_libro=$1", [id_libro]);
        return { message: "Libro eliminado correctamente", libro: libroEliminar.rows[0] };
};
