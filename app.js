const express = require("express");
const bodyParser = require("body-parser-graphql");
const graphQlHttp = require("express-graphql");
const {buildSchema} = require("graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const Item = require("./models/item");
const Carrinho = require("./models/carrinho");
const User = require("./models/user");

const app = express();

app.use(cors());

app.use(bodyParser.graphql());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method) {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(
  "/graphql",
  graphQlHttp({
    schema: buildSchema(`
        type Item {
            _id: ID!
            nome: String!
            descricao: String!
            preco: Float!
            quantidade: Int!
        }
        
        type Carrinho {
            itens: [Item!]
        }

        type GetCarrinho{
          itens: [String!]
        }

        input ItemInput{
            nome: String!
            descricao: String!
            preco: Float!
            quantidade: Int!
        }

        input UserInput{
          email: String!
          senha: String!
        }

         type RootQuery{
            item: [Item]!
            carrinho: GetCarrinho
         }

         type RootMutation{
            createItem(itemInput: ItemInput): Item
            deleteItem(id: ID): [Item]
            updateItem(item: ItemInput, id: ID): [Item]
            addItemToCarrinho(itemId: ID): Carrinho
            itemByID(itemId: ID): Item
            login(userInput: UserInput): Boolean
         }

         schema {
             query: RootQuery
             mutation: RootMutation
         } 
    `),
    rootValue: {
      item: () => {
        return Item.find()
          .then(res => {
            return res.map(item => {
              return {...item._doc};
            });
          })
          .catch(err => {
            throw err;
          });
      },
      carrinho: () => {
        return Carrinho.find()
          .then(res => {
            console.log(res[0].itens);
            
            return res[0].itens
          })
          .catch(err => {
             console.log(err);
             
          });
      },
      login: ({email, password}) => {
        return true;
      },
      updateItem: args => {
        console.log(args.item, args.id);

        return Item.findByIdAndUpdate(args.id, args.item)
          .then(() => {
            return Item.find();
          })
          .catch(err => {
            console.log(err);
          });
      },
      deleteItem: args => {
        return Item.findByIdAndRemove(args.id)
          .then(() => {
            return Item.find()
              .then(res => {
                return res.itens;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      },
      itemByID: args => {
        return Item.findById(args.itemId.itemId)
          .then()
          .catch(err => {
            throw err;
          });
      },
      createItem: args => {
        const item = new Item({
          nome: args.itemInput.nome,
          descricao: args.itemInput.descricao,
          preco: args.itemInput.preco,
          quantidade: args.itemInput.quantidade
        });

        return item
          .save()
          .then(res => {
            return {...res._doc};
          })
          .catch(err => {
            throw err;
          });
      },
      addItemToCarrinho: async args => {
        let carrinho;
        await Carrinho.findById("5ceef1fe3904583e4041f11e")
          .then(res => (carrinho = res))
          .catch(err => console.log(err));

        carrinho.itens.push(args.itemId);
        console.log(carrinho);

        return Carrinho.findByIdAndUpdate("5ceef1fe3904583e4041f11e", carrinho)
          .then(res => {
            return Carrinho.find();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-p9ths.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
