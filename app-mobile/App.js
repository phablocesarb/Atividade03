import React from "react";

import Home from './src/paginas/Home';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from 'react-native';


import IncluirProduto from './src/paginas/IncluirProduto';
import ListarProduto from './src/paginas/ListarProduto';

import IncluirCategoria from './src/paginas/IncluirCategoria';
import ListarCategoria from './src/paginas/ListarCategoria';

import IncluirFornecedor from './src/paginas/IncluirFornecedor';
import ListarFornecedor from './src/paginas/ListarFornecedor';

import IncluirUsuario from './src/paginas/IncluirUsuario';
import ListarUsuario from './src/paginas/ListarUsuario';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />

                <Stack.Screen name="ListarProduto" component={ListarProduto} />
                <Stack.Screen name="IncluirProduto" component={IncluirProduto} />

                <Stack.Screen name="ListarCategoria" component={ListarCategoria} />
                <Stack.Screen name="IncluirCategoria" component={IncluirCategoria} />

                <Stack.Screen name="ListarFornecedor" component={ListarFornecedor} />
                <Stack.Screen name="IncluirFornecedor" component={IncluirFornecedor} />

                <Stack.Screen name="ListarUsuario" component={ListarUsuario} />
                <Stack.Screen name="IncluirUsuario" component={IncluirUsuario} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
