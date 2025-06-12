import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../services/api";
import style from "./style";

export default function IncluirUsuario({ navigation }) {
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);

  function incluirUsuario() {
    const usuario = {
      id: 0,
      nome: nome,
      email: email
    };

    try {
      const response = api.post("/usuarios", usuario);
    } catch (error) {
      console.log("Erro ao incluir usuário: " + error.message);
    }

    navigation.navigate("ListarUsuario");
  }

  return (
    <View style={style.container}>
      <Text style={style.label}>Nome do Usuário</Text>
      <TextInput
        style={style.input}
        placeholder="Nome"
        onChangeText={setNome}
        value={nome}
      />

      <Text style={style.label}>E-mail</Text>
      <TextInput
        style={style.input}
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TouchableOpacity style={style.buttonNewProduto} onPress={incluirUsuario}>
        <Text style={style.iconButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
