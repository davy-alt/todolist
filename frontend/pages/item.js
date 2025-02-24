//1º URL PARA EDITAR
const BASE_URL = 'http://localhost:3333/api';

//2º Função para pegar o id da URL
const pegarParametroDaUrl = (name) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}
const itemId = pegarParametroDaUrl('id')

//3º Função para listar o item específico
const buscarItem = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/items/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!res.ok){
            console.log("Erro ao buscar item")
            return
        }
        const item = await res.json()
        mostrarItem(item)
    } catch (error) {
        console.log(error)
    }
}

//4º Função para mostrar o item no formulário
const mostrarItem = (objItem) => {
    const formConteiner = document.querySelector('#form-container')
    console.log(formConteiner)
    formConteiner.innerHTML = `
            <h2 class="form-container__title">Cadastro de Atividades</h2>
            <form id="item-form" action="#"  method="post"> 
                <input 
                type="text" 
                name="name" 
                id="name" 
                class="item-form__input"
                placeholder="Digite a Atividade"
                value="${objItem.name}"
                />
                <textarea id="description" class="item-form__textarea" placeholder="Descreva Sua Atividade">${objItem.description}</textarea>
                <button type="submit" class="item-form__button"> Atualizar </button>
            </form>
    `
    const form = document.getElementById("item-form")
    form.addEventListener('submit', (event)=> {
        event.preventDefault();
        atualizarItem(objItem.id)
    })
}

//5º Atualizar o item
const atualizarItem = async (id) => {
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    
    try {
        const res = await fetch(`${BASE_URL}/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description})
        })
        if(!res.ok){
            console.log("Erro ao editar")
            return
        }
    } catch (error) {
        console.log(error)
    }
}

//6º Evento para quando abrir a página buscar o item selecionado
document.addEventListener("DOMContentLoaded", () => {
    if(itemId){
        //Mostrar os itens
        buscarItem(itemId)
    } else {
        console.log("Id da atividade não encontrado")
    }
})