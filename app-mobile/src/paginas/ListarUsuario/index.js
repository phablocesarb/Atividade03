import { FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function ListarUsuario({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            atualizarLista();
        });
        return unsubscribe;
    }, [navigation]);

    const atualizarLista = useCallback(() => {
        api.get("/usuarios")
            .then((res) => setUsuarios(res.data))
            .catch((err) => console.log("Erro: ", err.message))
            .finally(() => setRefreshing(false));
    }, []);

    const excluirUsuario = async (id) => {
        Alert.alert("Excluir", "Deseja excluir este usuário?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await api.delete(`/usuarios/${id}`);
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
                    data={usuarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={style.Produtos}>
                            <Text
                                onPress={() =>
                                    navigation.navigate("AlterarUsuario", {
                                        id: item.id,
                                        nome: item.nome,
                                        email: item.email,
                                    })
                                }
                                style={style.DescriptionProduto}
                            >
                                {item.nome}
                            </Text>
                            <TouchableOpacity
                                style={style.deleteProduto}
                                onPress={() => excluirUsuario(item.id)}
                            >
                                <FontAwesome name="trash" size={20} color="#007bff" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={style.buttonNewProduto}
                    onPress={() => navigation.navigate("IncluirUsuario")}
                >
                    <Text style={style.iconButton}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}