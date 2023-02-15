import React from "react";
import { useNotas } from "./useNotas";
import { ChangeAlert } from "../ChangeAlert/ChangeAlert ";
import { NotasItem } from "../NotasItem";
import { NotasHeader } from "./NotasHeader";
import { NotasForm } from "../NotasForm";
import { NotasSearch } from "../NotasSearch";
import { NotasCounter } from "../NotasCounter";
import { Notaslist } from "../NotasList";
import { NotasError } from "../NotasError";
import { NotasLoading } from "../NotasLoanding";
import { EmptyNotas } from "../EmptyNotas";
import { Modal } from "../Modal";
import { CreateNotasButton } from "../CreateNotasButton";

export function Notes() {
  const {
    error,
    loading,
    searchedNotas,
    completeNota,
    deleteNota,
    openModal,
    totalNotas,
    completedNotas,
    searchValue,
    setSearchValue,
    setOpenModal,
    addNotas,
    sincronizeNotas,
  } = useNotas();

  return (
    <React.Fragment>
      <div id="modal"></div>
      <NotasHeader loading={loading}>
        <NotasCounter totalNotas={totalNotas} completedNotas={completedNotas} />
        <NotasSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </NotasHeader>

      <Notaslist
        error={error}
        loading={loading}
        totalNotas={totalNotas}
        searchedNotas={searchedNotas}
        searchText={searchValue}
        onError={() => <NotasError />}
        onLoading={() => <NotasLoading />}
        onEmptyNotas={() => <EmptyNotas />}
        onEmptySearchResults={(searchText) => (
          <p>No hay resultados para {searchText}</p>
        )}
      >
        {(Notas) => (
          <NotasItem
            key={Notas.text}
            text={Notas.text}
            completed={Notas.completed}
            onComplete={() => completeNota(Notas.id)}
            onDelete={() => deleteNota(Notas.id)}
          />
        )}
      </Notaslist>

      {!!openModal && (
        <Modal>
          <NotasForm addNotas={addNotas} setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateNotasButton setOpenModal={setOpenModal} />
      <ChangeAlert sincronize={sincronizeNotas} />
    </React.Fragment>
  );
}

export default Notes;
