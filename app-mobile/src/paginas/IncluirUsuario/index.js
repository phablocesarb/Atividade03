import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import style from "./style";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function ListarUsuario() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [usuarios, setUsuarios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const carregarUsuarios = async () => {
        try {
            const response = await axios.get("http://localhost:8080/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, [isFocused]);

    const excluirUsuario = async (id) => {
        Alert.alert("Excluir", "Deseja excluir este usuário?", [
            { text: "Cancelar" },
            {
                text: "Confirmar",
                onPress: async () => {
                    try {
                        await axios.delete(`http://localhost:8080/usuarios/${id}`);
                        carregarUsuarios();
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
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={carregarUsuarios} />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={style.produtoButton}
                        onLongPress={() => excluirUsuario(item.id)}
                    >
                        <Text style={style.produtoText}>{item.nome}</Text>
                        <Text style={style.produtoText}>{item.email}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={style.buttonNewProduto}
                onPress={() => navigation.navigate("IncluirUsuario")}
            >
                <Text style={style.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
