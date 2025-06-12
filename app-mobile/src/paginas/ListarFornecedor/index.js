import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function ListarFornecedor({ navigation }) {
    const [fornecedores, setFornecedores] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            atualizarLista();
        });
        return unsubscribe;
    }, [navigation]);

    const atualizarLista = useCallback(() => {
        api.get("/fornecedores")
            .then((res) => setFornecedores(res.data))
            .catch((err) => console.log("Erro: ", err.message))
            .finally(() => setRefreshing(false));
    }, []);

    const excluirFornecedor = async (id) => {
        Alert.alert("Excluir", "Deseja excluir este fornecedor?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await api.delete(`/fornecedores/${id}`);
                        atualizarLista();
                    } catch (error) {
                        console.error("Erro ao excluir:", error);
                    }
                }
            }
        ]);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        atualizarLista();
    }, [atualizarLista]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    data={fornecedores}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={style.Produtos}>
                            <Text
                                onPress={() =>
                                    navigation.navigate("AlterarFornecedor", {
                                        id: item.id,
                                        nome: item.nome,
                                        cnpj: item.cnpj,
                                    })
                                }
                                style={style.DescriptionProduto}
                            >
                                {item.nome}{"\n"}{item.cnpj}
                            </Text>
                            <TouchableOpacity
                                style={style.deleteProduto}
                                onPress={() => excluirFornecedor(item.id)}
                            >
                                <FontAwesome name="trash" size={20} color="#007bff" />
                            </TouchableOpacity>
                        </View>
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