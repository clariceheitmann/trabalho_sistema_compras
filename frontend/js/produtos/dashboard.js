const container = document.getElementById('container_produtos');

console.log(container);


fetch('http://localhost:3000/produtos')

    .then(res => res.json())

    .then(dados => {


        container.innerHTML = "";


        dados.forEach(produto => {


            container.innerHTML += `

            <div class="card">


                <img 
                src="${produto.imagem}" 
                alt="${produto.nome}"
                >


                <h3>${produto.nome}</h3>


                <p>${produto.categoria}</p>


                <p class="preco">
                    R$ ${produto.preco}
                </p>


                <p class="estoque">
                    Estoque: ${produto.qtdeEstoque}
                </p>


            </div>

        `;


        });


    })


    .catch(err => {


        console.error(
            "Erro ao buscar produtos:",
            err
        );


    });