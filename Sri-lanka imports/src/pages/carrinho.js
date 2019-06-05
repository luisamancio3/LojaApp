import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../environment/config";
import CarrinhoList from "../components/carrinhoList";
import Layout from "../components/layout";
import SEO from "../components/seo";

const carrinho = () => {
  const [carrinho, setCarrinho] = useState()

  useEffect(() => {
    const queryCarrinhoList = {
      query: `
        query{
          carrinho{
            nome
            descricao
            preco
            quantidade
            _id
          }
        }
      `,
    }

    Axios.post(API_URL, queryCarrinhoList)
      .then(res => {
        setCarrinho(res.data.data.carrinho);
        })
      .catch(err => {
        console.log(err.message)
      })
  }, [])
  

  return (
    <Layout>
      <SEO title="carrinho" />
      <Card raised={true}>
        <CardContent>
          <CarrinhoList itens={carrinho || []} />
        </CardContent>
      </Card>
    </Layout>
  )
}

export default carrinho
