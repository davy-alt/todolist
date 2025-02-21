// 1º URL PARA EDITAR
const urlEditar = 'http://localhost:3333/api/items'

// 2º Função para pegar o id da URL
const PegarId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
};

// 3º Função para listar o item específico
const listaritem = async (id) => {
  try {
    const res = await fetch(`${urlEditar}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.log('Erro ao buscar o item');
      return
    }

    const item = await res.json();
    return item

  } catch (error) {
    console.log(error);
  }
};

// 4º Função para mostrar o item no formulário
const showform = (item) => {
    document.getElementById('name').value = item.name;
    document.getElementById('description').value = item.description;
}

// 5º Atualizar o item


// 6º Evento para quando abrir a página buscar o item selecionado


// Evento de submissão do formulário para atualizar o item

