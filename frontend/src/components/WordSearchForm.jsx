import { useState } from "react"

export default function WordSearchForm() {
  const [words, setWords] = useState("")
  const [matrix, setMatrix] = useState("")
  const [result, setResult] = useState(null)
  const [matrixError, setMatrixError] = useState("")

  console.log("words", words)
  console.log("matrix", matrix)

  const parseMatrix = () => {
    return matrix
      .trim()
      .split("\n")
      .map((row) =>
        row
          .split(",")
          .map((cell) => cell.trim().toUpperCase())
          .filter(Boolean)
      )
  }

  const isMatrixValid = (formattedMatrix) => {
    const is14x14 =
      formattedMatrix.length === 14 &&
      formattedMatrix.every((row) => row.length === 14)

    const allSingleLetters = formattedMatrix.every((row) =>
      row.every((cell) => /^[A-Z]$/.test(cell))
    )

    if (!is14x14) {
      setMatrixError("La sopa de letras debe ser exactamente 14x14")
      return false
    }

    if (!allSingleLetters) {
      setMatrixError("Cada celda debe contener exactamente una letra (A-Z)")
      return false
    }

    setMatrixError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedWords = words
      .split(",")
      .map((w) => w.trim().toUpperCase())
      .filter(Boolean)

    const formattedMatrix = parseMatrix()

    if (!isMatrixValid(formattedMatrix)) return

    const res = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        words: formattedWords,
        wordSearch: formattedMatrix,
      }),
    })

    const data = await res.json()
    setResult(data)
  }

  const isDisabled = !words.trim() || !matrix.trim()

  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Solucionador de Sopa de Letras
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Palabras (Separado por comas)
          </label>
          <input
            type="text"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            placeholder="Ejemplo: GATO,PERRO,ELEFANTE"
            className="w-full p-3 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Sopa de letras (14x14) cada letra separada por coma. Separe las
            filas con un salto de línea (presione 'Enter')
          </label>
          <textarea
            value={matrix}
            onChange={(e) => setMatrix(e.target.value)}
            rows={10}
            placeholder="Ejemplo: A,B,C,...(Enter) O,P,Q,..."
            className="w-full p-3 border rounded-xl shadow-sm font-mono text-sm focus:ring focus:ring-blue-300"
          />
          {matrixError && (
            <p className="text-red-500 text-sm mt-2 font-medium">
              {matrixError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`font-bold py-3 px-6 rounded-xl transition ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
        >
          Buscar palabras
        </button>
      </form>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Encontradas</h2>
            <ul className="list-disc pl-5 text-gray-800">
              {result.found.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">No encontradas</h2>
            <ul className="list-disc pl-5 text-gray-800">
              {result.notFound.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
