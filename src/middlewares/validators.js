import { body, validationResult } from "express-validator";

export const runValidations = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        })
    }
}

export const validarLibro = [
    body('anio_publicacion')
        .notEmpty().withMessage('El año de publicación es obligatorio'),
    body('autor_id')
        .notEmpty().withMessage('El autor_id es obligatorio'),
    body('categoria_id')
        .notEmpty().withMessage('El categoria_id es obligatorio'),
];