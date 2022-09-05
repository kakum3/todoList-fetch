import React, { useState, useEffect } from "react";
import "../../styles/listaTareas.css";

const ListaTareas = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState(null);
  const [occult, setOccult] = useState("hidden");

  const funcionEliminar = (indiceElemento) => {
    const newArr = [...lista];
    newArr.splice(indiceElemento, 1);
    setLista(newArr);
  };

  const addTareas = (evento) => {
    if (evento.keyCode === 13) {
      setLista([...lista, tarea]);
      setTarea("");
    }
  };

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/kakum3", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("El request se hizo bien");
          return resp.json();
        } else {
          console.log("Hubo un Error " + resp.status + " en el request");
        }
      })
      .then((body) => {
        console.log("Este es el body del request", body);
        console.log(body.map((t) => t.label));
        setLista(body.map((t) => t.label));
      })
      .catch((error) => {
        console.error("ERROR:", error);
      });
  }, []);

  useEffect(() => {
    if (lista != null) {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/kakum3", {
        method: "PUT",
        body: JSON.stringify(
          lista.map((item) => ({ label: item, done: false }))
        ),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("El request del PUT se hizo bien");
            return res.json();
          } else {
            console.log(
              "Hubo un Error " + res.status + " en el request del PUT"
            );
          }
        })
        .then(async (response) => {
          console.log("Success", await response);
        })
        .catch((error) => console.error(error));
    }
  }, [lista]);

  if (lista == null) {
    return null;
  }

  return (
    <div className="w-75 mx-5 justify-content-center">
      <input
        type="text"
        className="input1 border-bottom w-50 mt-1 "
        placeholder="Añadir tarea"
        onChange={(e) => setTarea(e.target.value)}
        value={tarea}
        onKeyUp={(event) => addTareas(event)}
      />
      <div className="w-100">
        <ul className="list-group">
          {lista.length == 0
            ? ""
            : lista.map((tarea, index) => (
                <li
                  key={index}
                  className=" list-group-item d-flex justify-content-between "
                  onMouseEnter={() => setOccult(index)}
                  onMouseLeave={() => setOccult("hidden")}
                >
                  {" "}
                  {tarea}
                  <button
                    className="hidden"
                    onClick={() => funcionEliminar(index)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              ))}
        </ul>
      </div>
      <div className="text-muted fw-lighter ms-2">
        {lista.length} Item(s) left
      </div>
    </div>
  );
};

export default ListaTareas;
