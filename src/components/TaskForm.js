import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TaskForm({ initialTask, onSave, onCancel }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitulo(initialTask.titulo || '');
      setDescricao(initialTask.descricao || '');
    } else {
      setTitulo('');
      setDescricao('');
    }
  }, [initialTask]);

  function handleSave() {
    if (!titulo.trim()) return;
    onSave({ titulo, descricao });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar para a prova"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Detalhes da tarefa (opcional)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonTextWhite}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  label: { fontSize: 13, color: '#636e72', marginBottom: 4, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  buttons: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  button: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, marginLeft: 10 },
  cancelButton: { backgroundColor: '#dfe6e9' },
  saveButton: { backgroundColor: '#00b894' },
  buttonText: { color: '#2d3436', fontWeight: 'bold' },
  buttonTextWhite: { color: '#fff', fontWeight: 'bold' },
});
