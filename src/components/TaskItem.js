import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.checkbox} onPress={() => onToggle(task)}>
        <View style={[styles.circle, task.concluida && styles.circleChecked]}>
          {task.concluida && <Text style={styles.check}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.titulo, task.concluida && styles.tituloConcluido]}>
          {task.titulo}
        </Text>
        {task.descricao ? <Text style={styles.descricao}>{task.descricao}</Text> : null}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.btn}>
          <Text style={styles.btnText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task)} style={styles.btn}>
          <Text style={styles.btnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  checkbox: { marginRight: 10 },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#00b894',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleChecked: { backgroundColor: '#00b894' },
  check: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  info: { flex: 1 },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#2d3436' },
  tituloConcluido: { textDecorationLine: 'line-through', color: '#b2bec3' },
  descricao: { fontSize: 13, color: '#636e72', marginTop: 2 },
  actions: { flexDirection: 'row' },
  btn: { marginLeft: 8, padding: 4 },
  btnText: { fontSize: 18 },
});
