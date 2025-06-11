import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function IncluirFornecedor({ navigation }) {
    const [nome, setNome] = useState(null);
    const [cnpj, setCnpj] = useState(null);

    function incluirFornecedor() {
        const fornecedor = {
            id: 0,
            nome,
            cnpj
        };

        try {
            api.post("/fornecedores", fornecedor);
        } catch (error) {
            console.log("Erro ao incluir fornecedor: " + error.message);
        }

        navigation.navigate("ListarFornecedor");
    }

    return (
        <View style={style.container}>
            <Text style={style.label}>Nome do Fornecedor</Text>
            <TextInput
                style={style.input}
                placeholder="Nome do fornecedor"
                onChangeText={setNome}
                value={nome}
            />

            <Text style={style.label}>CNPJ</Text>
            <TextInput
                style={style.input}
                placeholder="CNPJ"
                keyboardType="numeric"
                onChangeText={setCnpj}
                value={cnpj}
            />

            <TouchableOpacity style={style.buttonNewProduto} onPress={incluirFornecedor}>
                <Text style={style.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
