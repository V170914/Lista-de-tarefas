import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [listas, setListas] = useState([]);
  const [nomeLista, setNomeLista] = useState("");
  const [itemInputs, setItemInputs] = useState({});

  function adicionarLista() {
    if (nomeLista.trim() !== "") {
      setListas((old) => [
        ...old,
        { nome: nomeLista, itens: [] }
      ]);
      setNomeLista("");
    }
  }

  function removerLista(indexLista) {
    setListas((old) => old.filter((_, i) => i !== indexLista));
  }

  function adicionarItem(indexLista) {
    const texto = itemInputs[indexLista];
    if (!texto?.trim()) return;

    const novaLista = [...listas];
    novaLista[indexLista].itens.push({
      texto,
      status: "fazer" // fazer | andamento | concluido
    });

    setListas(novaLista);
    setItemInputs({ ...itemInputs, [indexLista]: "" });
  }

  function removerItem(indexLista, indexItem) {
    const novaLista = [...listas];
    novaLista[indexLista].itens.splice(indexItem, 1);
    setListas(novaLista);
  }

  function alterarStatus(indexLista, indexItem, novoStatus) {
    const novaLista = [...listas];
    novaLista[indexLista].itens[indexItem].status = novoStatus;
    setListas(novaLista);
  }

  return (
    <div className="app">
      <h1>Minhas Listas</h1>

      <div className="nova-lista">
        <input
          value={nomeLista}
          onChange={(e) => setNomeLista(e.target.value)}
          placeholder="Ex: Plano de Estudos - Férias"
        />
        <button onClick={adicionarLista}>Criar</button>
      </div>

      {listas.map((lista, indexLista) => (
        <div className="card-lista" key={indexLista}>
          <div className="topo-lista">
            <h2>{lista.nome}</h2>
            <button className="btn-apagar" onClick={() => removerLista(indexLista)}>
              ✖
            </button>
          </div>

          <div className="novo-item">
            <input
              value={itemInputs[indexLista] || ""}
              onChange={(e) =>
                setItemInputs({ ...itemInputs, [indexLista]: e.target.value })
              }
              placeholder="Novo conteúdo..."
            />
            <button onClick={() => adicionarItem(indexLista)}>+</button>
          </div>

          <ul>
            {lista.itens.map((item, indexItem) => (
              <li key={indexItem} className={`item ${item.status}`}>
                <span>{item.texto}</span>

                <div className="acoes">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      alterarStatus(indexLista, indexItem, e.target.value)
                    }
                  >
                    <option value="fazer">A fazer</option>
                    <option value="andamento">Em andamento</option>
                    <option value="concluido">Concluído</option>
                  </select>

                  <button onClick={() => removerItem(indexLista, indexItem)}>
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
