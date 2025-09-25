import * as categoriasServices from "../services/categoriasServices.js";

export const getAllCategorias = async (req, res, next) => {
  try {
    const categorias = await categoriasServices.getAllCategorias();
    res.json(categorias);
  } catch (err) {
    errorHandler(err);
  }
};

export const getCategoriaById = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    const categoria = await categoriasServices.getCategoriaById(id_categoria);

    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });

    res.json(categoria);
  } catch (err) {
    errorHandler(err);
  }
};

export const postCrearCategoria = async (req, res, next) => {
  try {
    const { nombre_categoria, clasificacion } = req.body;
    const newCategoria = await categoriasServices.postCrearCategoria(
      nombre_categoria,
      clasificacion
    );
    res.status(201).json(newCategoria);
  } catch (err) {
    errorHandler(err);
  }
};

export const putActualizarCategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    const { nombre_categoria, clasificacion } = req.body;

    const result = await categoriasServices.actualizarCategoria(
      id_categoria,
      nombre_categoria,
      clasificacion
    );

    if (!result || result.rowCount === 0)
      return res.status(404).json({ message: "Categoría no encontrada" });

    res.json({ message: "Categoría actualizada correctamente", categoria: result.rows[0] });
  } catch (err) {
    errorHandler(err);
  }
};

export const eliminarCategoria = async (req, res, next) => {
  try {
    const { id_categoria } = req.params;
    const result = await categoriasServices.eliminarCategoria(id_categoria);
    res.json(result);
  } catch (err) {
    errorHandler(err);
  }
};

export const getBuscarPorNombre = async (req, res, next) => {
  try {
    const { nombre_categoria } = req.params;
    const categorias = await categoriasServices.buscarCategoriaPorNombre(nombre_categoria);
    res.json(categorias);
  } catch (err) {
    errorHandler(err);
  }
};

export const getBuscarPorClasificacion = async (req, res, next) => {
  try {
    const { clasificacion } = req.params;
    const categorias = await categoriasServices.buscarCategoriaPorClasificacion(clasificacion);
    res.json(categorias);
  } catch (err) {
    errorHandler(err);
  }
};
