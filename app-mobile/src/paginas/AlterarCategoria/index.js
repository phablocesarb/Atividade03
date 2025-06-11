import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import styles from "./style";

export default function AlterarCategoria({ navigation, route }) {
    const idCategoria = route.params.id;
    const [nome, setNome] = useState(route.params.nome);

    function alterarCategoria(id, nome) {
        const categoria = {
            id,
            nome
        };

        try {
            api.put("/categorias/" + id, categoria);
        } catch (error) {
            console.error("Erro ao alterar categoria: " + error.message);
        }
        navigation.navigate("ListarCategoria");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome da Categoria</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da Categoria"
                onChangeText={setNome}
                value={nome}
            />

            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => alterarCategoria(idCategoria, nome)}
            >
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
