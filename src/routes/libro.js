import { Router } from "express";
import * as libroController from '../controllers/libroController.js';
import { runValidations, validarLibro } from "../middlewares/validators.js";

const router = Router();

router.get('/', libroController.obtenerTodosLosLibros);

router.get('/:id', libroController.obtenerLibroPorId);

router.post('/', libroController.crearLibro);

router.put('/', libroController.actualizarLibro);

router.delete('/:id', runValidations(validarLibro), libroController.eliminarLibro);

export default router;
