# Solucionador de Sopa de Letras

## Tecnologías empleadas

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Lenguaje:** JavaScript
- **Herramientas:** Postman (para pruebas API)

## Recursos especiales utilizados

- Algoritmo personalizado para búsqueda de palabras en cualquier dirección.
- Validaciones:
  - Solo acepta matrices 14x14
  - No permite letras seguidas como "DF", "XZ"
- Interfaz responsive

## Guía de despliegue

### Requisitos previos

- Tener instalado **Node.js**

### Clonar repositorio

```bash
git clone https://github.com/OneTwoDan/word-search
cd word-search
```

### Backend

```bash
cd backend
npm install
npm start
```

Corre en: `http://localhost:3000/api/search`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Uso de la aplicación

1. Ingresar palabras separadas por comas

   - Ejemplo: `GATO, PERRO, ELEFANTE`

2. Ingresar matriz 14x14 separada por comas y filas por salto de línea
   - Ejemplo:

```text
N,D,E,K,I,C,A,N,G,U,R,O,G,E
S,X,R,Y,K,V,I,I,Q,G,W,Q,O,D
...
```

3. Presionar **Buscar palabras**
4. Visualizar palabras encontradas y no encontradas
