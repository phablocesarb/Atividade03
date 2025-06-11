import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuInicial from './src/paginas/MenuInicial';

import AlterarProduto from './src/paginas/AlterarProduto';
import IncluirProduto from './src/paginas/IncluirProduto';
import ListarProduto from './src/paginas/ListarProduto';

import AlterarCategoria from './src/paginas/AlterarCategoria';
import IncluirCategoria from './src/paginas/IncluirCategoria';
import ListarCategoria from './src/paginas/ListarCategoria';

import AlterarFornecedor from './src/paginas/AlterarFornecedor';
import IncluirFornecedor from './src/paginas/IncluirFornecedor';
import ListarFornecedor from './src/paginas/ListarFornecedor';

import AlterarUsuario from './src/paginas/AlterarUsuario';
import IncluirUsuario from './src/paginas/IncluirUsuario';
import ListarUsuario from './src/paginas/ListarUsuario';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MenuInicial">
        <Stack.Screen
          name="MenuInicial"
          component={MenuInicial}
          options={{
            headerTintColor: "#007bff",
            title: "Menu Inicial"
          }}
        />

        <Stack.Screen
          name="ListarProduto"
          component={ListarProduto}
          options={{
            headerTintColor: "#007bff",
            title: "Listar Produtos"
          }}
        />

        <Stack.Screen
          name="IncluirProduto"
          component={IncluirProduto}
          options={{
            headerTintColor: "#007bff",
            title: "Incluir Produto"
          }}
        />

        <Stack.Screen
          name="AlterarProduto"
          component={AlterarProduto}
          options={{
            headerTintColor: "#007bff",
            title: "Alterar Produto"
          }}
        />

        <Stack.Screen
          name="ListarCategoria"
          component={ListarCategoria}
          options={{
            headerTintColor: "#007bff",
            title: "Listar Categorias"
          }}
        />

        <Stack.Screen
          name="IncluirCategoria"
          component={IncluirCategoria}
          options={{
            headerTintColor: "#007bff",
            title: "Incluir Categoria"
          }}
        />

        <Stack.Screen
          name="AlterarCategoria"
          component={AlterarCategoria}
          options={{
            headerTintColor: "#007bff",
            title: "Alterar Categoria"
          }}
        />

        <Stack.Screen
          name="ListarFornecedor"
          component={ListarFornecedor}
          options={{
            headerTintColor: "#007bff",
            title: "Listar Fornecedores"
          }}
        />

        <Stack.Screen
          name="IncluirFornecedor"
          component={IncluirFornecedor}
          options={{
            headerTintColor: "#007bff",
            title: "Incluir Fornecedor"
          }}
        />

        <Stack.Screen
          name="AlterarFornecedor"
          component={AlterarFornecedor}
          options={{
            headerTintColor: "#007bff",
            title: "Alterar Fornecedor"
          }}
        />

        <Stack.Screen
          name="ListarUsuario"
          component={ListarUsuario}
          options={{
            headerTintColor: "#007bff",
            title: "Listar Usuários"
          }}
        />

        <Stack.Screen
          name="IncluirUsuario"
          component={IncluirUsuario}
          options={{
            headerTintColor: "#007bff",
            title: "Incluir Usuário"
          }}
        />

        <Stack.Screen
          name="AlterarUsuario"
          component={AlterarUsuario}
          options={{
            headerTintColor: "#007bff",
            title: "Alterar Usuário"
          }}
        />
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
