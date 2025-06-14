import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  Produtos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#007bff33'
  },
  DescriptionProduto: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  deleteProduto: {
    marginLeft: 10,
  },
  buttonNewProduto: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  iconButton: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  }
});

export default styles;
