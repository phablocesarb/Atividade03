import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import style from "./style";

export default function ListarCategoria() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [categorias, setCategorias] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregarCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    useEffect(() => {
        carregarCategorias();
    }, [isFocused]);

    const excluirCategoria = async (id) => {
        Alert.alert("Excluir", "Deseja excluir esta categoria?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await axios.delete(`http://localhost:8080/categorias/${id}`);
                        carregarCategorias();
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
                data={categorias}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={carregarCategorias} />
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
    );
}
