import { errorHandler } from "../middlewares/errorHandler.js";
import * as autoresServices from "../services/autoresServices.js";

export const getAllAutores = async (req, res, next) => {
  try {
    const autores = await autoresServices.getAllAutores();
    res.json(autores);
  } catch (err) {
    errorHandler(err);
  }
};

export const getAutorById = async (req, res, next) => {
  try {
    const { id_autor } = req.params;
    const autor = await autoresServices.getAutorById(id_autor);

    if (!autor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res.json(autor);
  } catch (err) {
    errorHandler(err);
  }
};

export const postCrearAutor = async (req, res, next) => {
  try {
    const { nombre, nacionalidad, biografia, correo } = req.body;
    const newAutor = await autoresServices.postCrearAutor(
      nombre,
      nacionalidad,
      biografia,
      correo
    );
    res.status(201).json(newAutor);
  } catch (err) {
    errorHandler(err);
  }
};

export const putActualizarAutor = async (req, res, next) => {
  try {
    const { id_autor } = req.params;
    const { nombre, nacionalidad, biografia, correo } = req.body;

    const result = await autoresServices.actualizarAutor(
      id_autor,
      nombre,
      nacionalidad,
      biografia,
      correo
    );

    if (!result || result.rowCount === 0) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res.status(200).json({
      message: "Autor actualizado correctamente",
      autor: result.rows[0],
    });
  } catch (err) {
    errorHandler(err);
  }
};

export const eliminarAutor = async (req, res, next) => {
  try {
    const { id_autor } = req.params;
    const result = await autoresServices.eliminarAutor(id_autor);
    res.json(result);
  } catch (err) {
    errorHandler(err);
  }
};

export const getBuscarPorNombre = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const autores = await autoresServices.buscarAutorPorNombre(nombre);
    res.json(autores);
  } catch (err) {
    errorHandler(err);
  }
};

export const getBuscarPorNacionalidad = async (req, res, next) => {
  try {
    const { nacionalidad } = req.params;
    const autores = await autoresServices.buscarAutorPorNacionalidad(nacionalidad);
    res.json(autores);
  } catch (err) {
    errorHandler(err);
  }
};
