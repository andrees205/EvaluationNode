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
    try {
        const { id } = req.params;
        const result = await libroService.obtenerLibroPorId(id);
        if (!result) return res.status(404).json({ message: "Libro no encontrado" });
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};

export const crearLibro = async (req, res) => {
    const {titulo, anio_publicacion, autor_id, categoria_id, resumen } = req.body;
    try {
        const result = await libroService.crearLibro(titulo, anio_publicacion, autor_id, categoria_id, resumen);
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

export const buscarLibrosPorAnio = async (req, res) => {
    const { anio } = req.params;
    try {
        const result = await libroService.buscarLibrosPorAnio(anio);
        if (result.error) return res.status(404).json({ message: result.error });
        res.json(result);
    } catch (err) {
        errorHandler(err, req, res);
    }
};

export const buscarLibrosPorAutor = async (req, res, next) => {
    try {
        const { autor_id } = req.params;
        const libros = await libroService.buscarLibrosPorAutor(autor_id);
        res.json(libros);
    } catch (err) {
        next(err);
    }
};

export const buscarLibrosPorCategoria = async (req, res, next) => {
    try {
        const { categoria_id } = req.params;
        const libros = await libroService.buscarLibrosPorCategoria(categoria_id);
        res.json(libros);
    } catch (err) {
        next(err);
    }
};

