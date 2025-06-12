import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function IncluirCategoria({ navigation }) {
  const [nome, setNome] = useState(null);

  function incluirCategoria() {
    const categoria = {
      id: 0,
      nome: nome
    };

    try {
      const response = api.post("/categorias", categoria);
    } catch (error) {
      console.log("Erro ao incluir categoria: " + error.message);
    }

    navigation.navigate("ListarCategoria");
  }

  return (
    <View style={style.container}>
      <Text style={style.label}>Categoria</Text>
      <TextInput
        style={style.input}
        placeholder="Nome da Categoria"
        onChangeText={setNome}
        value={nome}
      />

      <TouchableOpacity style={style.buttonNewProduto} onPress={incluirCategoria}>
        <Text style={style.iconButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
