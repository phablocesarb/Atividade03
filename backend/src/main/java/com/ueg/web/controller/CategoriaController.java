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
import com.ueg.web.model.Categoria;
import com.ueg.web.repository.CategoriaRepository;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Listar todas as categorias
    @GetMapping
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    // Consultar categoria por ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> consultar(@PathVariable Long id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada: " + id));
        return ResponseEntity.ok(categoria);
    }

    // Inserir nova categoria
    @PostMapping
    public Categoria inserir(@RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    // Alterar categoria
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> alterar(@PathVariable Long id, @RequestBody Categoria categoriaData) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada: " + id));

        categoria.setNome(categoriaData.getNome());

        Categoria atualizado = categoriaRepository.save(categoria);
        return ResponseEntity.ok(atualizado);
    }

    // Excluir categoria
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada: " + id));

        categoriaRepository.delete(categoria);

        Map<String, Boolean> resposta = new HashMap<>();
        resposta.put("excluido", Boolean.TRUE);
        return ResponseEntity.ok(resposta);
    }
}