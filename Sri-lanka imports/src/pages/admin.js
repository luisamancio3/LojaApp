import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../environment/config";
import useForm from "../components/helpers/useForm";
import ItensList from "../components/itensList";
import Layout from "../components/layout";
import SEO from "../components/seo";

const admin = () => {
  const [admin, setAdmin] = useState(false)
  const { values, handleChange, handleSubmit } = useForm(login)

  const [itens, setItens] = useState()

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
        setItens(res.data.data.item)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function login() {
    const requestBody = {
      query: `
      mutation{
        login(userInput: {email: "${values.email}", senha: "${
        values.password
      }"})
      }
      `,
    }
    Axios.post(API_URL, requestBody)
      .then(() => {
        setAdmin(true)
      })
      .catch(err => {
        throw err
      })
  }

  const postItem = data => {
    const mutationAddItem = {
      query: `
       mutation{
         createItem(itemInput: 
          {
            nome: "${data.nome}",
            descricao: "${data.descricao}", 
            preco: ${data.preco},
            quantidade: ${data.quantidade}
          }
          ){
            nome
            descricao
            quantidade
            preco
          }
       }
      `,
    }

    Axios.post(API_URL, mutationAddItem)
      .then(res => {
        setItens(...itens, res.data.data.createItem)
      })
      .catch(err => console.log(err))
  }

  const deleteItem = data => {
    const mutationDeleteItem = {
      query: `
      mutation{
        deleteItem(id: "${data._id}"){
          nome
          descricao
          preco
          quantidade
        }
      }
      `,
    }
    Axios.post(API_URL, mutationDeleteItem)
      .then(res => {
        setItens(res.data.data.deleteItem)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateItem = newData => {
    console.log(newData)

    const mutationUpdateItem = {
      query: `
      mutation{
        updateItem(item: 
          {
            nome: "${newData.nome}",
            descricao: "${newData.descricao}"
            preco: ${newData.preco},
            quantidade: ${newData.quantidade}
        },
          id: "${newData._id}"
          ){
            nome
            descricao
            preco
            quantidade
          }
      }
      `,
    }

    Axios.post(API_URL, mutationUpdateItem)
      .then(res => {
        setItens(res.data.data.updateItem)
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (!admin) {
    return (
      <Layout>
        <Card raised={true}>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SEO title="Admin" />
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                type="email"
                name="email"
                label="Email"
                onChange={handleChange}
                style={{
                  margin: ".5rem 0",
                }}
                required
              />
              <TextField
                type="password"
                name="password"
                label="Senha"
                onChange={handleChange}
                style={{
                  margin: ".5rem 0",
                }}
                required
              />
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    margin: ".5rem 0",
                  }}
                >
                  Entrar
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Layout>
    )
  }
  return (
    <Layout>
      <SEO title="Admin" />
      {itens && (
        <ItensList
          itens={itens}
          isAdmin={true}
          adicionar={postItem}
          remover={deleteItem}
          atualizar={updateItem}
        />
      )}
    </Layout>
  )
}

export default admin
