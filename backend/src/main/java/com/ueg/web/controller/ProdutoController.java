package com.ueg.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ueg.web.exception.ResourceNotFoundException;
import com.ueg.web.model.Produto;
import com.ueg.web.repository.ProdutoRepository;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // Listar todos os produtos
    @GetMapping
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    // Consultar produto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Produto> consultar(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado: " + id));
        return ResponseEntity.ok(produto);
    }

    // Inserir novo produto
    @PostMapping
    public Produto inserir(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    // Alterar produto
    @PutMapping("/{id}")
    public ResponseEntity<Produto> alterar(@PathVariable Long id, @RequestBody Produto produtoData) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado: " + id));

        produto.setNome(produtoData.getNome());
        produto.setQuantidade(produtoData.getQuantidade());
        produto.setPreco(produtoData.getPreco());
        produto.setCategoria(produtoData.getCategoria());
        produto.setFornecedor(produtoData.getFornecedor());
        produto.setQuantidadeEstoque(produtoData.getQuantidadeEstoque());

        Produto atualizado = produtoRepository.save(produto);
        return ResponseEntity.ok(atualizado);
    }

    // Excluir produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado: " + id));

        produtoRepository.delete(produto);

        Map<String, Boolean> resposta = new HashMap<>();
        resposta.put("excluido", Boolean.TRUE);
        return ResponseEntity.ok(resposta);
    }
}
