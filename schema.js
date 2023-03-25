const graphql = require('graphql');
const Pet = require('./models/Pet');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    species: { type: GraphQLString },
    breed: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pet: {
      type: PetType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Pet.findById(args.id);
      },
    },
    pets: {
      type: new GraphQLList(PetType),
      resolve(parent, args) {
        return Pet.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPet: {
      type: PetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        species: { type: new GraphQLNonNull(GraphQLString) },
        breed: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let pet = new Pet({
          name: args.name,
          species: args.species,
          breed: args.breed,
          age: args.age,
        });
        return pet.save();
      },
    },
    deletePet: {
      type: PetType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parent, args) {
        return Pet.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
