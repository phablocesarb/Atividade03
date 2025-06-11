import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function IncluirCategoria({ navigation }) {
    const [nome, setNome] = useState(null);

    async function incluirCategoria() {
        const categoria = {
            id: 0,
            nome
        };

        try {
            await api.post("/categorias", categoria);
            navigation.navigate("ListarCategoria");
        } catch (error) {
            console.log("Erro ao incluir categoria: " + error.message);
        }
    }

    return (
        <View style={style.container}>
            <Text style={style.label}>Nome da Categoria</Text>
            <TextInput
                style={style.input}
                placeholder="Digite o nome da categoria"
                onChangeText={setNome}
                value={nome}
            />

            <TouchableOpacity style={style.buttonNewProduto} onPress={incluirCategoria}>
                <Text style={style.iconButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
