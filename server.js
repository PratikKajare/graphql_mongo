const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose');

const MONDB = "mongodb+srv://pratikkajare:2813pratik@cluster1.j5xcliw.mongodb.net/?retryWrites=true&w=majority";
async function startserver() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app});

    app.use((req, res) => {
        res.send('Hello from express apollo')
    });
    
    await mongoose.connect(MONDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log('Moongoose connected')

    app.listen(3000, () => {
        console.log("hosted on 4000");
    })
}
startserver();