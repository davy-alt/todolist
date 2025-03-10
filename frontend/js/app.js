const BASE_URL = "http://localhost:3333/api";

const formCadastro = document.getElementById("item-form");

//Funções utilitárias
const resetForm = () => {
  //Reseta os campos preenchidos após cadastrar um item
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
};

//mostrar messagem de cadastrado com sucesso
const showMessage = (text, cor) => {
  const message = document.getElementById('message')
  message.textContent = text
  message.style.color = 'green'
}

//Inicio do cadastro do item 
const handleFormSubmit = async(event) => {
  //previne da página atualizar
    event.preventDefault();

    //pega o valor dos campos preenchidos
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    //transforma os dados em um array
    const item = {
      name: name,
      description: description
    }

    //uma função de call back asyncrona
    await sendItem(item);
    
  };
    //função para enviar os itens para a API
  const sendItem = async (objItem) => {
      try {
        //resposta da api
          const res = await fetch(`${BASE_URL}/items`, {
            //posta os itens na API
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  connection: 'close'
              },
            body: JSON.stringify(objItem) //Transformar um obj JS em obj JSON
        })
        //erro caso a resposta seja diferente de ok(200)
        if(!res.ok){
           // Tenta converter a resposta JSON da requisição 'res' em um objeto JavaScript
        const error = await res.json().catch(() => {
  // Caso ocorra um erro durante a conversão, define o erro com a mensagem "Erro Desconhecido"
      return { message: "Erro Desconhecido" };
            })
            
            console.log(error)

            if(error.messages && Array.isArray(error.messages)){
              const errorContainer = document.getElementById('message')
              errorContainer.innerHTML = ''

              error.messages.forEach((err) => {
                const errorMessage = document.createElement('p')
                errorMessage.textContent = `${err.field}: ${err.error}`
                errorMessage.style.color = 'red'
                errorContainer.appendChild(errorMessage)
              })
            }else{
              showMessage(`Erro: ${error.messages || 'Erro Inesperado'}`, 'red')
            }
            return
        }
        showMessage('item cadastrado com sucesso')
        resetForm()
    } catch (error) {
        console.log(error)
    }
};
//Fim do cadastro do item 

//inicio de buscar itens
//buscar os items da api
const listItems = async () => {
  try {
    const res = await fetch(`${BASE_URL}/items`,{
      method: 'GET',
      headers: {
        "Content-Type":"application/json"
        
      }
    });

    if(!res.ok){
        const error = document.getElementById("message")
        error.textContent = "Não existe nenhum item cadastrado"
        error.style.color = "red"
        document.getElementById("item-list").textContent = ""
    return
  }
  
  const items = await res.json()
  console.log(items);
  showItems(items) //recebe os array de itens 
  } catch (error) {
    console.log(error);
  }
};
//mostra os itens na tela
const showItems = async (arrayItems) => {
  const itemList = document.getElementById('item-list')
  itemList.innerHTML = ''
  
  const cards = arrayItems.map((item) => `
    <article class="item-card">
            <header class="item-card__header">
              <h1 class="item-card__title">${item.name}</h1>
            </header>

            <section class="item-card__body">
              <p class="item-card__description">
                ${item.description}
              </p>
            </section>

            <footer class="item-card__footer">
              <button onclick="editItem(${item.id})" class="item-card__button item-card__button--edit">
                Editar
              </button>
              <button onclick="deleteItem(${item.id})" class="item-card__button item-card__button--delete">
                Excluir
              </button>
            </footer>
          </article>
  `).join("")
  itemList.innerHTML = cards
};
//fim de buscar itens

//deletar item
const deleteItem = async (objId) => {
  try {
    const res = await fetch(`${BASE_URL}/items/${objId}`, {
      method: 'DELETE'
    })

    if(!res.ok){
      console.log('Erro ao excluir')
      return
    }
  } catch (error) {
    console.log(error)
    
  }
}

//editar item 
const editItem = (objId) => {
  const url = `pages/item.html?id=${objId}`
  window.location = url
}

//Eventos de interação
formCadastro.addEventListener("submit", handleFormSubmit);
document.addEventListener("DOMContentLoaded", listItems);

