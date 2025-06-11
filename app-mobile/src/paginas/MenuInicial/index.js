import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

export default function MenuInicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menu Inicial</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListarProduto")}
      >
        <Text style={styles.textoBotao}>Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListarCategoria")}
      >
        <Text style={styles.textoBotao}>Categorias</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListarFornecedor")}
      >
        <Text style={styles.textoBotao}>Fornecedores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("ListarUsuario")}
      >
        <Text style={styles.textoBotao}>Usuários</Text>
      </TouchableOpacity>
    </View>
  );
}
