import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function IncluirUsuario({ navigation }) {
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);

    async function incluirUsuario() {
        const usuario = {
            id: 0,
            nome,
            email
        };

        try {
            await api.post("/usuarios", usuario);
            navigation.navigate("ListarUsuario");
        } catch (error) {
            console.log("Erro ao incluir usuário: " + error.message);
        }
    }

    return (
        <View style={style.container}>
            <Text style={style.label}>Nome</Text>
            <TextInput
                style={style.input}
                placeholder="Nome do usuário"
                onChangeText={setNome}
                value={nome}
            />

            <Text style={style.label}>Email</Text>
            <TextInput
                style={style.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            <TouchableOpacity style={style.buttonNewProduto} onPress={incluirUsuario}>
                <Text style={style.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
