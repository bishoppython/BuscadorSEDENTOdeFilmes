//Buscador Sedente de Filmes
//Criação de Anderson Bispo
//Aluno do Curso de BSI - Bacharelado em Sistemas da Informação pela,
//UFRPE - Univeridade Federal Rural de Pernambuco, Pólo Palmares - PE - 7ª Período


//Criei uma chamada para nosso formulario, acrescentando sua chamada na pesquisa quando for dado Enter ('submit'),
//quando isso ocorrer irá fazer a chamada da nossa função pesquisar Filmes
document.getElementById('formulario').addEventListener('submit', pesquisarFilmes);

function pesquisarFilmes(e){
    var filmePesquisa = document.getElementById('pesquisar').value;
    buscarFilmes(filmePesquisa);
    e.preventDefault()
}

function buscarFilmes(filmePesquisa){
//Neste GET nós fazemos a conexão com a API do OMBD, concatenando-a com a variavel que criamos lá em cima
axios.get('https://www.omdbapi.com/?apikey=3b2a4cf8&s=' + filmePesquisa)
.then(function (response) {
  console.log(response);
  var filmes = response.data.Search; //criei um array para coleta dos dados da api
  var mostrarFilmes = ''; //vai preencher essa array vazia com os dados

  for(var i = 0; i < filmes.length; i++){
      mostrarFilmes += `
          <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                  <img src="${filmes[i].Poster}" class="img-thumbnail">
                  <h4>${filmes[i].Title}</h4>
                  <p><a href="#" class="btn btn-success btn-sm" role="button" onClick="filmeDetalhes('${filmes[i].imdbID}')">Ver Detalhes</a></p>
              </div>
          </div>
      `;
  }

  document.getElementById('filmes').innerHTML = mostrarFilmes; //Contatenação com o ID filmes do nosso container no index

})
.catch(function (error) {
  console.log(error);
});
}

function filmeDetalhes(id){
    //console.log(id);
    sessionStorage.setItem('filmeID', id);
    window.location = 'detalhes.html';
    return false;
}

function mostraFilme(){
    var filmeID = sessionStorage.getItem('filmeID');

    axios.get('https://www.omdbapi.com/?apikey=3b2a4cf8&i=' + filmeID)
.then(function (response) {
    var filme = response.data;
  console.log(filme);
  var mostraFilme = `
         <div class="col-md-6">
              <img src="${filme.Poster}" class="img-responsive">
                    <h3><strong>${filme.Title}</strong></h3> 
         </div>
         <div class="col-md-6">
            <div class="well clearfix">
            <ul class="list-group">
                <li class="list-group-item"><strong>Gênero: </strong>${filme.Genre}</li>
                <li class="list-group-item"><strong>Lançamento: </strong>${filme.Released}</li>
                <li class="list-group-item"><strong>Idiomas: </strong>${filme.Language}</li>
                <li class="list-group-item"><strong>Duração: </strong>${filme.Runtime}</li>
                <li class="list-group-item"><strong>imDB: </strong>${filme.imdbRating}</li>
            </ul>

            <h3>Descrição</h3>
            ${filme.Plot}
            <hr>
            <a href="https://imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-primary" pull-left> Ver no iMDB</a>
            <a href="index.html" class="btn btn-success" pull-right> Voltar a Pesquisar</a>
            </div>
         </div>      
  `

  document.getElementById('filmes').innerHTML = mostraFilme;

})
.catch(function (error) {
  console.log(error);
});
}
