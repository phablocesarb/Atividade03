import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import style from "./style";

export default function ListarFornecedor() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [fornecedores, setFornecedores] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregarFornecedores = async () => {
        try {
            const response = await axios.get("http://localhost:8080/fornecedores");
            setFornecedores(response.data);
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
        }
    };

    useEffect(() => {
        carregarFornecedores();
    }, [isFocused]);

    const excluirFornecedor = async (id) => {
        Alert.alert("Excluir", "Deseja excluir este fornecedor?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await axios.delete(`http://localhost:8080/fornecedores/${id}`);
                        carregarFornecedores();
                    } catch (error) {
                        console.error("Erro ao excluir:", error);
                    }
                },
            },
        ]);
    };

    return (
        <View style={style.container}>
            <FlatList
                data={fornecedores}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={carregarFornecedores} />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={style.produtoButton}
                        onLongPress={() => excluirFornecedor(item.id)}
                    >
                        <Text style={style.produtoText}>{item.nome}</Text>
                        <Text style={style.produtoText}>{item.cnpj}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={style.buttonNewProduto}
                onPress={() => navigation.navigate("IncluirFornecedor")}
            >
                <Text style={style.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
