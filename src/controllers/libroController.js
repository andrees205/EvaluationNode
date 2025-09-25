import { errorHandler } from '../middlewares/errorHandler.js';
import * as libroService from '../services/libroService.js';

export const obtenerTodosLosLibros = async (req, res) => {
    try {
        const result = await libroService.obtenerTodosLosLibros();
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};

export const obtenerLibroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await libroService.obtenerLibroPorId(id);
        if (!result) return res.status(404).json({ message: "Libro no encontrado" });
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};

export const crearLibro = async (req, res) => {
    const { id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen } = req.body;
    try {
        const result = await libroService.crearLibro(id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen);
        res.status(201).json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};

export const actualizarLibro = async (req, res) => {
    const { id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen } = req.body;
    try {
        const result = await libroService.actualizarLibro([titulo, anio_publicacion, autor_id, categoria_id, resumen, id_libro]);
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};

export const eliminarLibro = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await libroService.eliminarLibro(id);
        if (result.error) return res.status(404).json({ message: result.error });
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};
