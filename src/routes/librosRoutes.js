import { Router } from "express";
import * as libroController from '../controllers/libroController.js';
import { runValidations, validarLibro } from "../middlewares/validators.js";

const router = Router();


router.get('/', libroController.obtenerTodosLosLibros);
router.get('/:id', libroController.obtenerLibroPorId);

router.post('/', runValidations(validarLibro), libroController.crearLibro);
router.put('/', runValidations(validarLibro), libroController.actualizarLibro);

router.delete('/:id', libroController.eliminarLibro);

router.get('/anio/:anio', libroController.buscarLibrosPorAnio);
router.get('/autor/:autor_id', libroController.buscarLibrosPorAutor);
router.get('/categoria/:categoria_id', libroController.buscarLibrosPorCategoria);

export default router;