import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { UserType } from "../typeDefs/User";
import bcrypt from 'bcryptjs';
import MessageType from "../typeDefs/Message";

export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_ : any, args : any) {
        const { name, username, password } = args;

        const encryptPassword = await bcrypt.hash(password, 10);

        const result = await Users.insert({ 
            name: name, 
            username: username, 
            password: encryptPassword, 
        });

        console.log(result);
        return {...args, id: result.identifiers[0].id, password: encryptPassword}
    }
}

export const DELETE_USER = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_ : any, {id} : any) {
        const result = await Users.delete(id);
        if (result.affected === 1) {
            return true;
        }
        return false;
    }
}

export const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        input: {
            type: new GraphQLInputObjectType({
                name: "UserInput",
                fields: {
                    name: { type: GraphQLString },
                    username: { type: GraphQLString },
                    oldPassword: { type: GraphQLString },
                    newPassword: { type: GraphQLString },
                },
            }),
        },
    },
    async resolve(_ : any, {id, input} : any) {

        const userFound = await Users.findOne({ where: { id: id } });

        if (!userFound) {
            return { success: false, message: "User not found" }
        }

        const isMatch = await bcrypt.compare(input.oldPassword, userFound.password);

        if (!isMatch) {
            return { success: false, message: "Old password is incorrect" }
        }

        const newPasswordHash = await bcrypt.hash(input.newPassword, 10);

        const response = await Users.update({id}, {username: input.username, name: input.name, password: newPasswordHash})

        if (response.affected === 0) {
            return { success: false, message: "User not updated" }
        }

        return { success: true, message: "User updated successfully" }
    }
}