import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function ListarCategoria({ navigation }) {
    const [categorias, setCategorias] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            atualizarLista();
        });
        return unsubscribe;
    }, [navigation]);

    const atualizarLista = useCallback(() => {
        api.get("/categorias")
            .then((res) => setCategorias(res.data))
            .catch((err) => console.log("Erro: ", err.message))
            .finally(() => setRefreshing(false));
    }, []);

    const excluirCategoria = async (id) => {
        try {
            await api.delete(`/categorias/${id}`);
            atualizarLista();
        } catch (err) {
            console.log("Erro ao excluir: ", err.message);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        atualizarLista();
    }, [atualizarLista]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.container}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    data={categorias}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={style.Produtos}>
                            <Text
                                onPress={() => navigation.navigate("AlterarCategoria", { id: item.id, nome: item.nome })}
                                style={style.DescriptionProduto}
                            >
                                {item.nome}
                            </Text>
                            <TouchableOpacity style={style.deleteProduto} onPress={() => excluirCategoria(item.id)}>
                                <FontAwesome name="trash" size={20} color="#007bff" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity style={style.buttonNewProduto} onPress={() => navigation.navigate("IncluirCategoria")}>
                    <Text style={style.iconButton}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
