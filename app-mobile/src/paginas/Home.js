import React from 'react';
import { Button, ScrollView, StyleSheet, Text } from 'react-native';

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gestão de Produtos</Text>

      <Button
        title="Listar Produtos"
        onPress={() => navigation.navigate('ListarProduto')}
      />

      <Button
        title="Listar Categorias"
        onPress={() => navigation.navigate('ListarCategoria')}
      />

      <Button
        title="Listar Fornecedores"
        onPress={() => navigation.navigate('ListarFornecedor')}
      />

      <Button
        title="Listar Usuários"
        onPress={() => navigation.navigate('ListarUsuario')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexGrow: 1,
    gap: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
});

