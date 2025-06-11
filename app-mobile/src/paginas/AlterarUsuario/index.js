import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import styles from "./style";

export default function AlterarUsuario({ navigation, route }) {
    const idUsuario = route.params.id;
    const [nome, setNome] = useState(route.params.nome);
    const [email, setEmail] = useState(route.params.email);

    function alterarUsuario(id, nome, email) {
        const usuario = {
            id,
            nome,
            email
        };

        try {
            api.put("/usuarios/" + id, usuario);
        } catch (error) {
            console.error("Erro ao alterar usuário: " + error.message);
        }
        navigation.navigate("ListarUsuario");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Usuário"
                onChangeText={setNome}
                value={nome}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => alterarUsuario(idUsuario, nome, email)}
            >
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
