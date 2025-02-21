    const BASE_URL = 'http://localhost:3333/api'

    const formCadastro = document.getElementById('item-form')

    //funções utilitarias
    const resetForm = () => {
        document.getElementById('name').value = "";
        document.getElementById('description').value = "";
    }

    /**inicio do cadastro do item**/
    /**Recebe informações do formulario**/
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        const item = {
            name: name,
            description: description
        };



        await sendItem(item)
        
    };

    const sendItem = async (objItem) => {
        try {
            const res = await fetch(`${BASE_URL}/items`, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                connection: 'close'
            },
            body: JSON.stringify(objItem) //Transformar um objeto js em um json
            })
            
            if(!res.ok){
                console.log("Erro ao enviar dados")
                return // server para parar a execução dessa função
            }
            console.log('Item Cadastrado com sucesso')
            resetForm()
        } catch (error) {
            console.log("error")
        }
    };
    /**FIM do cadastro do item**/

    /**Inicio buscar items**/

    //Buscar os items da api
    const listItems = async() => {
        try {
            const res = await fetch(`${BASE_URL}/items`, {
                method: 'GET',
                headers: {
                    "Content-Type":"application/json"
                },
            });

            if(!res.ok){
                console.log('Erro ao buscar itens')
                return
            }

            const items = await res.json()
            console.log(items)
            showItems(items)

        } catch (error) {
            console.log(error)
        }
    }
    //Mostar os items na tela
    const showItems = async(arrayItems) => {
        const itemList = document.getElementById('item-list')
        itemList.innerHTML = ''
            console.log(arrayItems)

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
                        <button onclick="editItem(${item.id})" class="item-card__button item-card__button--edit">Editar</button>
                        <button onclick="deletItem(${item.id})" class="item-card__button item-card__button--delete">Excluir</button>
                    </footer>
                </article>
            `).join("")
            itemList.innerHTML = cards
        
    };

    /**FIM de buscar do item**/

    //Deletar item
    const deletItem = async (objId) => {
        try {
            const res = await fetch(`${BASE_URL}/items/${objId}`, {
                 method: 'DELETE'
            })
           
            if(res.ok){
                console.log('Erro ao exluir')
                return
            }
        } catch (error) {
            
        }
        
    }

    //editar item
    const editItem = (objId) => {
        const url = `pages/item.html?id=${objId}`
        window.location = url
    }

    //Eventos de interação | basicamente executa tudo oque está sendo feito a cima
    formCadastro.addEventListener('submit', handleFormSubmit)
    document.addEventListener('DOMContentLoaded', listItems)