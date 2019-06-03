import MaterialTable from "material-table";
import React from "react";

const ItensList = props => {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Nome",
        field: "nome",
        editable: props.isAdmin ? "always" : "never",
      },
      {
        title: "Quantidade",
        field: "quantidade",
        type: "numeric",
        editable: props.isAdmin ? "always" : "never",
      },
      {
        title: "Preço",
        field: "preco",
        type: "numeric",
        editable: props.isAdmin ? "always" : "never",
      },
      {
        title: "Descrição",
        field: "descricao",
        editable: props.isAdmin ? "always" : "never",
      },
      {
        title: "Adicionar ao carrihno",
        field: "adicionarCarrinho",
        editable: props.isAdmin ? "never" : "always",
      },
    ],
    data: props.itens,
  });
  

  return (
    <MaterialTable
      title="Sri Lanka imports"
      columns={state.columns}
      data={state.data}
      options={!props.isAdmin ? {
        selection: true
      }: {}}
      onSelectionChange={(row) => props.selection(row)}
      editable={
        props.isAdmin
          ? {
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve()
                    props.adicionar(newData)
                  }, 600)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve()
                    props.atualizar(newData, oldData)
                  }, 600)
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve()
                    props.remover(oldData)
                  }, 600)
                }),
            }
          : {}
      }
    />
  )
}

export default ItensList
