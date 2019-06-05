import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const CarrinhoList = props => {
  
 console.log(props.itens);
 

  const criarLinha = ({descricao, quantidade, preco, nome}) => {
    let precoTotal = quantidade * preco
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

  const subTotal = () => {
    let total = 0;
    props.itens.map(item => {
      total += item.preco
    });
    return total
  } 

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell align="left">Descricão</TableCell>
          <TableCell align="left">Preço</TableCell>
          <TableCell align="left">Quantidade</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.itens.length > 0 && linhas().map(linha => (
          <TableRow key={Math.random()}>
            <TableCell>{linha.nome}</TableCell>
            <TableCell>{linha.descricao || "      "}</TableCell>
            <TableCell>{linha.preco}</TableCell>
            <TableCell>{linha.quantidade}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right">{subTotal()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default CarrinhoList
