import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AlterarProduto from './src/paginas/AlterarProduto';
import IncluirProduto from './src/paginas/IncluirProduto';
import ListarProduto from './src/paginas/ListarProduto';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListarProduto">

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

        {<Stack.Screen
          name="AlterarProduto"
          component={AlterarProduto}
          options={{
            headerTintColor: "#007bff",
            title: "Alterar Produto"
          }}
        />

        }

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

