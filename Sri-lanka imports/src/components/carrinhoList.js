import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const CarrinhoList = props => {
  const criarLinha = ({descricao, quantidade, preco, nome}) => {
    const precoTotal = quantidade * preco
    let desc = descricao ? descricao : ""
    return { desc, quantidade, preco, nome, precoTotal }
  }

  const linhas = () => {
    let l = []
    props.itens.map(i => {
      l.push(criarLinha(i))
    });
    console.log(l);
    
    return l
  }

  const subTotal = itens => {
    return 2;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell align="right">Descricão</TableCell>
          <TableCell align="right">Preço</TableCell>
          <TableCell align="right">Quantidade</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {linhas().map(linha => (
          <TableRow key={linha.nome}>
            <TableCell>{linha.nome}</TableCell>
            <TableCell>{linha.descricao}</TableCell>
            <TableCell>{linha.preco}</TableCell>
            <TableCell>{linha.quantidade}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right">{subTotal(linhas)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default CarrinhoList
