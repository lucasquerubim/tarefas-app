// ⚠️ IMPORTANTE: troque o IP abaixo pelo IP da sua máquina na rede local
// (descubra com "ipconfig" no Windows ou "ifconfig"/"ip a" no Mac/Linux).
// Se for testar pelo navegador (npx expo start --web), pode usar "localhost".
const API_URL = 'http://192.168.0.100:3000/tasks';

export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro ao buscar tarefas');
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Erro ao criar tarefa');
  return response.json();
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Erro ao atualizar tarefa');
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao excluir tarefa');
  return response.json();
}
