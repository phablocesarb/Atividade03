import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function IncluirFornecedor({ navigation }) {
  const [nome, setNome] = useState(null);

  function incluirFornecedor() {
    const fornecedor = {
      id: 0,
      nome: nome
    };

    try {
      const response = api.post("/fornecedores", fornecedor);
    } catch (error) {
      console.log("Erro ao incluir fornecedor: " + error.message);
    }

    navigation.navigate("ListarFornecedor");
  }

  return (
    <View style={style.container}>
      <Text style={style.label}>Fornecedor</Text>
      <TextInput
        style={style.input}
        placeholder="Nome do Fornecedor"
        onChangeText={setNome}
        value={nome}
      />

      <TouchableOpacity style={style.buttonNewProduto} onPress={incluirFornecedor}>
        <Text style={style.iconButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
