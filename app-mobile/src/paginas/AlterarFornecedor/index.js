import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import styles from "./style";

export default function AlterarFornecedor({ navigation, route }) {
    const idFornecedor = route.params.id;
    const [nome, setNome] = useState(route.params.nome);
    const [cnpj, setCnpj] = useState(route.params.cnpj);

    function alterarFornecedor(id, nome, cnpj) {
        const fornecedor = {
            id,
            nome,
            cnpj
        };

        try {
            api.put("/fornecedores/" + id, fornecedor);
        } catch (error) {
            console.error("Erro ao alterar fornecedor: " + error.message);
        }
        navigation.navigate("ListarFornecedor");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Fornecedor"
                onChangeText={setNome}
                value={nome}
            />

            <Text style={styles.label}>CNPJ</Text>
            <TextInput
                style={styles.input}
                placeholder="CNPJ"
                keyboardType="numeric"
                onChangeText={setCnpj}
                value={cnpj}
            />

            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => alterarFornecedor(idFornecedor, nome, cnpj)}
            >
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
