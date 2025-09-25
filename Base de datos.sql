CREATE DATABASE biblioteca

 CREATE TABLE autores (
    id_autor UUID PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    nacionalidad VARCHAR(100),
    biografia TEXT,
    correo VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE categorias (
    id_categoria UUID PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    clasificacion VARCHAR(100) NOT NULL
);

CREATE TABLE libros (
    id_libro UUID PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL CHECK (LENGTH(titulo) >= 10), 
    anio_publicacion INT NOT NULL CHECK (anio_publicacion > 1900),
    autor_id UUID NOT NULL,
    categoria_id UUID NOT NULL,
    resumen TEXT,
    
    CONSTRAINT fk_libros_autores 
        FOREIGN KEY (autor_id) REFERENCES autores(id_autor),
    CONSTRAINT fk_libros_categorias 
        FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria)
);

INSERT INTO autores (id_autor, nombre, nacionalidad, biografia, correo) VALUES
('11111111-1111-1111-1111-111111111111', 'Gabriel García Márquez', 'Colombiana', 'Escritor colombiano, Nobel de Literatura en 1982.', 'gabriel@mail.com'),
('22222222-2222-2222-2222-222222222222', 'Isabel Allende', 'Chilena', 'Famosa por novelas como La casa de los espíritus.', 'isabel@mail.com'),
('33333333-3333-3333-3333-333333333333', 'J.K. Rowling', 'Británica', 'Autora de la saga Harry Potter.', 'jkrowling@mail.com'),
('44444444-4444-4444-4444-444444444444', 'George Orwell', 'Británica', 'Escritor y periodista, autor de 1984 y Rebelión en la granja.', 'orwell@mail.com'),
('55555555-5555-5555-5555-555555555555', 'Mario Vargas Llosa', 'Peruana', 'Escritor y político, Nobel de Literatura en 2010.', 'mario@mail.com');

INSERT INTO categorias (id_categoria, nombre_categoria, clasificacion) VALUES
('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Novela', 'Ficción'),
('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Ciencia Ficción', 'Ficción'),
('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Historia', 'No Ficción'),
('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', 'Biografía', 'No Ficción'),
('aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'Fantasía', 'Ficción');

INSERT INTO libros (id_libro, titulo, anio_publicacion, autor_id, categoria_id, resumen) VALUES
('bbbbbbbb-1111-1111-1111-111111111111', 'Cien años de soledad', 1967, '11111111-1111-1111-1111-111111111111', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Saga de la familia Buendía en el pueblo ficticio de Macondo.'),
('bbbbbbbb-2222-2222-2222-222222222222', 'La casa de los espíritus', 1982, '22222222-2222-2222-2222-222222222222', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Novela que mezcla historia, política y fantasía en Chile.'),
('bbbbbbbb-3333-3333-3333-333333333333', 'Harry Potter y la piedra filosofal', 1997, '33333333-3333-3333-3333-333333333333', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'Primer libro de la saga de Harry Potter, donde descubre su origen mágico.'),
('bbbbbbbb-4444-4444-4444-444444444444', '1984: Una distopía totalitaria', 1949, '44444444-4444-4444-4444-444444444444', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Novela distópica que describe un régimen totalitario y vigilancia constante.'),
('bbbbbbbb-5555-5555-5555-555555555555', 'La ciudad y los perros', 1963, '55555555-5555-5555-5555-555555555555', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Novela que critica la sociedad militar y social de Perú en los años 60.');
