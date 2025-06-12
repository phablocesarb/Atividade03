import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function ListarFornecedor() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [fornecedores, setFornecedores] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregarFornecedores = useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await api.get("/fornecedores");
            setFornecedores(response.data);
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        if (isFocused) carregarFornecedores();
    }, [isFocused, carregarFornecedores]);

    const excluirFornecedor = (id) => {
        Alert.alert("Excluir", "Deseja excluir este fornecedor?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await api.delete(`/fornecedores/${id}`);
                        carregarFornecedores();
                    } catch (error) {
                        console.error("Erro ao excluir:", error);
                    }
                }
            }
        ]);
    };

    const onRefresh = useCallback(() => {
        carregarFornecedores();
    }, [carregarFornecedores]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.container}>
                <FlatList
                    data={fornecedores}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
        </SafeAreaView>
    );
}