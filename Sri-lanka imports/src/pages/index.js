import Axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../environment/config";
import ItensList from "../components/itensList";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => {
  const [itens, setitens] = useState()

  useEffect(() => {
    const itensBody = {
      query: `
        query{
          item{
            nome
            quantidade
            preco
            _id
          }
        }
        `,
    }

    Axios.post(API_URL, itensBody)
      .then(res => {
        console.log(res)

        setitens(res.data.data.item)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const addToCart = (row, event) => {
    event.preventDefault()
    const mutationAddItemToCarrinho = {
      query: `
      mutation{
        addItemToCarrinho(itemId: "${row._id}"){
          itens{
            nome
          }
        }
      }
      `,
    }

    Axios.post(API_URL, mutationAddItemToCarrinho)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <Layout>
      <SEO title="Home" />
      {itens && (
        <ItensList itens={itens} isAdmin={false} selection={addToCart} />
      )}
    </Layout>
  )
}

export default IndexPage
