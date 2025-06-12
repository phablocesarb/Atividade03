import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api"; // Use o mesmo api do seu produto
import style from "./style";

export default function ListarCategoria() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [categorias, setCategorias] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregarCategorias = useCallback(async () => {
        setRefreshing(true);
        try {
            const response = await api.get("/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        if (isFocused) carregarCategorias();
    }, [isFocused, carregarCategorias]);

    const excluirCategoria = (id) => {
        Alert.alert("Excluir", "Deseja excluir esta categoria?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await api.delete(`/categorias/${id}`);
                        carregarCategorias();
                    } catch (error) {
                        console.error("Erro ao excluir:", error);
                    }
                }
            }
        ]);
    };

    const onRefresh = useCallback(() => {
        carregarCategorias();
    }, [carregarCategorias]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.container}>
                <FlatList
                    data={categorias}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={style.produtoButton}
                            onLongPress={() => excluirCategoria(item.id)}
                        >
                            <Text style={style.produtoText}>{item.nome}</Text>
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity
                    style={style.buttonNewProduto}
                    onPress={() => navigation.navigate("IncluirCategoria")}
                >
                    <Text style={style.iconButton}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}