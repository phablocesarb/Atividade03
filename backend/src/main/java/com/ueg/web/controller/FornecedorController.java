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
import com.ueg.web.model.Fornecedor;
import com.ueg.web.repository.FornecedorRepository;

@RestController
@RequestMapping("/fornecedores")
@CrossOrigin(origins = "http://localhost:4200")
public class FornecedorController {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    // Listar todos os fornecedores
    @GetMapping
    public List<Fornecedor> listar() {
        return fornecedorRepository.findAll();
    }

    // Consultar fornecedor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> consultar(@PathVariable Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado: " + id));
        return ResponseEntity.ok(fornecedor);
    }

    // Inserir novo fornecedor
    @PostMapping
    public Fornecedor inserir(@RequestBody Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    // Alterar fornecedor
    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> alterar(@PathVariable Long id, @RequestBody Fornecedor fornecedorData) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado: " + id));

        fornecedor.setNome(fornecedorData.getNome());
        fornecedor.setCnpj(fornecedorData.getCnpj());
        fornecedor.setTelefone(fornecedorData.getTelefone());

        Fornecedor atualizado = fornecedorRepository.save(fornecedor);
        return ResponseEntity.ok(atualizado);
    }

    // Excluir fornecedor
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado: " + id));

        fornecedorRepository.delete(fornecedor);

        Map<String, Boolean> resposta = new HashMap<>();
        resposta.put("excluido", Boolean.TRUE);
        return ResponseEntity.ok(resposta);
    }
}