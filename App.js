import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TaskItem from './src/components/TaskItem';
import TaskForm from './src/components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './src/api/taskApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar à API. Verifique se o backend está rodando e se o IP em src/api/taskApi.js está correto.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  function handleAddPress() {
    setEditingTask(null);
    setShowForm(true);
  }

  function handleEditPress(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  async function handleSave(taskData) {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, { ...editingTask, ...taskData });
      } else {
        await createTask(taskData);
      }
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingTask(null);
  }

  function handleDelete(task) {
    Alert.alert('Confirmar exclusão', `Excluir a tarefa "${task.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(task.id);
            loadTasks();
          } catch (err) {
            Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
          }
        },
      },
    ]);
  }

  async function handleToggle(task) {
    try {
      await updateTask(task.id, { ...task, concluida: !task.concluida });
      loadTasks();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>📋 Minhas Tarefas</Text>

      {showForm && (
        <TaskForm initialTask={editingTask} onSave={handleSave} onCancel={handleCancel} />
      )}

      {!showForm && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#00b894" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onEdit={handleEditPress}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa cadastrada ainda.</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#2d3436' },
  addButton: {
    backgroundColor: '#0984e3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  empty: { textAlign: 'center', color: '#b2bec3', marginTop: 40, fontSize: 15 },
});
