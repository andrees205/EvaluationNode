import { Router } from "express";
import * as categoriasControllers from "../controllers/categoriasControllers.js";

const router = Router();

router.get("/", categoriasControllers.getAllCategorias);
router.get("/:id_categoria", categoriasControllers.getCategoriaById);
router.post("/", categoriasControllers.postCrearCategoria);
router.put("/:id_categoria", categoriasControllers.putActualizarCategoria);
router.delete("/:id_categoria", categoriasControllers.eliminarCategoria);
router.get("/buscar/nombre/:nombre_categoria", categoriasControllers.getBuscarPorNombre);
router.get("/buscar/clasificacion/:clasificacion", categoriasControllers.getBuscarPorClasificacion);

export default router;
