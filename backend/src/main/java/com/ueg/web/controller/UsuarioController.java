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
import com.ueg.web.model.Usuario;
import com.ueg.web.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os usuários
    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    // Consultar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> consultar(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + id));
        return ResponseEntity.ok(usuario);
    }

    // Inserir novo usuário
    @PostMapping
    public Usuario inserir(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Alterar usuário
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> alterar(@PathVariable Long id, @RequestBody Usuario usuarioData) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + id));

        usuario.setNome(usuarioData.getNome());
        usuario.setEmail(usuarioData.getEmail());
        usuario.setSenha(usuarioData.getSenha());

        Usuario atualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(atualizado);
    }

    // Excluir usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + id));

        usuarioRepository.delete(usuario);

        Map<String, Boolean> resposta = new HashMap<>();
        resposta.put("excluido", Boolean.TRUE);
        return ResponseEntity.ok(resposta);
    }
}
