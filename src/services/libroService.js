import { pool } from '../db.js';

export const obtenerTodosLosLibros = async (req, res) => {
        const result = await pool.query('SELECT * FROM libros');
        return result.rows;
};
export const obtenerLibroPorId = async (id) => {
    const result = await pool.query("SELECT * FROM libros WHERE id_libro = $1", [id]);
    if (result.rowCount === 0) return null;
    return result.rows[0];
};

export const crearLibro = async (titulo, anio_publicacion, autor_id, categoria_id, resumen) => {
        const query = `INSERT INTO libros
        (id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING *;`;
        const result = await pool.query(query, [titulo, anio_publicacion, autor_id, categoria_id, resumen]);
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

export const buscarLibrosPorAnio = async (anio) => {
    const result = await pool.query(
        "SELECT * FROM libros WHERE anio_publicacion = $1", [anio]
    );
    return result.rows;
};

export const buscarLibrosPorAutor = async (autor_id) => {
    const result = await pool.query(
        "SELECT * FROM libros WHERE autor_id = $1", [autor_id]
    );
    return result.rows;
};

export const buscarLibrosPorCategoria = async (categoria_id) => {
    const result = await pool.query(
        "SELECT * FROM libros WHERE categoria_id = $1", [categoria_id]
    );
    return result.rows;
};

