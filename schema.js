import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import Db from './db';

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve: person => person.id,
            },
            firstName: {
                type: GraphQLString,
                resolve: person => person.firstName,
            },
            lastName: {
                type: GraphQLString,
                resolve: person => person.lastName,
            },
            email: {
                type: GraphQLString,
                resolve: person => person.email,
            },
            posts: {
                type: new GraphQLList(Post),
                resolve: person => person.getPosts(),
            },
        };
    },
});


const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This represents a post',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve: post => post.id,
            },
            title: {
                type: GraphQLString,
                resolve: post => post.title,
            },
            content: {
                type: GraphQLString,
                resolve: post => post.content,
            },
            person: {
                type: Person,
                resolve: post => post.getPerson(),
            },
        };
    },
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            people: {
                type: new GraphQLList(Person),
                args: {
                    id: {
                        type: GraphQLInt,
                    },
                    email: {
                        type: GraphQLString,
                    },
                },
                resolve: (root, args) => {
                    return Db.models.person.findAll({
                        where: args,
                    });
                },
            },
            posts: {
                type: new GraphQLList(Post),
                args: {},
                resolve: (root, args) => {
                    return Db.models.post.findAll({
                        where: args,
                    });
                },
            },
        };
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Function to create stuff',
    fields: () => {
        return {
            addPerson: {
                type: Person,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                },
                resolve: (root, {
                    firstName,
                    lastName,
                    email,
                }) => {
                    return Db.models.person.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email.toLowerCase(),
                    });
                },
            },
        };
    },
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

export default Schema;
