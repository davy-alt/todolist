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
                "Content-Type": "application/json"
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

    //Eventos de interação | basicamente executa tudo oque está sendo feito a cima
    formCadastro.addEventListener('submit', handleFormSubmit)