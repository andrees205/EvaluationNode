import { Router } from "express";
import * as autoresControllers from "../controllers/autoresControllers.js";

const router = Router();

router.get("/", autoresControllers.getAllAutores);
router.get("/:id_autor", autoresControllers.getAutorById);
router.post("/", autoresControllers.postCrearAutor);
router.put("/:id_autor", autoresControllers.putActualizarAutor);
router.delete("/:id_autor", autoresControllers.eliminarAutor);
router.get("/buscar/nombre/:nombre", autoresControllers.getBuscarPorNombre);
router.get("/buscar/nacionalidad/:nacionalidad", autoresControllers.getBuscarPorNacionalidad);

export default router;
