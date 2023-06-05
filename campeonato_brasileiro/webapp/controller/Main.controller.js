sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {

           /*     
                //variaveis
                //variaveis de texto
                var time = "Fortaleza";
                //variaveis numericas
                var pontos = 13;
                //variaveis ou tabela com ARRAY
                var top4 =["Botafogo","Palmeiras","São Paulo","Atlético-MG"];

                //Escrever dados no console
                console.log(time);
                console.log(pontos);
                console.log(top4);

                //Objetos
                var meuTime = {
                    nome : "Gremio",
                    pontos: 14,
                    artilheiro: ["Soares","Vina", "Scooby", "Salsinha"],
                    adicionarPontos: function(pontosNovos){
                        this.pontos = this.pontos + pontosNovos;
                     }
                };
                console.log(meuTime);
                console.log("Gremio Ganhou!");
                meuTime.adicionarPontos(3);
                console.log(meuTime.pontos);

            */
            /*
                //criação modelo
                //variaveis modelos
                var dadosGerais = {
                    rodada: "10a",
                    campeonato: "Campeonato Brasileiro 2023 - FioriNET"
                };

                // criar modelo
                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);

                var view = this.getView();
                view.setModel(dadosModel,"ModelosDadosGerais");
            */
            // Objetos
            var dadosGerais = {};
            var classificacao = {};
            var partidas = {};

            // Modelos
            var dadosModel = new JSONModel(dadosGerais);
            var classificacaoModel = new JSONModel(classificacao);
            var partidasModel = new JSONModel(partidas);

            this.getView().setModel(dadosModel, "ModeloDadosGerais");
            this.getView().setModel(classificacaoModel, "ModeloClassificacao");
            this.getView().setModel(partidasModel, "ModeloPartidas");
            
            this.burcarDadosGerais();
            this.buscarClassificacao();
            //this.buscarPartidas(rodada)
            //this.buscarPartidas();

            },
            burcarDadosGerais: function(){
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async: true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_74d2efea7b1bc6ae7b08c79b89b087"
                    }
                };

                //fazendo chamada a API
                $.ajax(configuracoes)
                .done(function(resposta){
                    dadosModel2.setData(resposta);
                    //informa a rodada
                    this.buscarPartidas(resposta.rodada_atual.rodada);

                }.bind(this))
                .fail(function(erro){
                    
                })
                ;
            }
            ,
            buscarClassificacao: function(){
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async: true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_74d2efea7b1bc6ae7b08c79b89b087"
                    }
                };

                //fazendo chamada a API
                $.ajax(configuracoes)
                .done(function(resposta){
                    classificacaoModel2.setData( {"classificacao": resposta} );
                    

                })
                .fail(function(erro){
                    
                })
                ;
            }
            ,
            buscarPartidas: function(rodada){
                var partidasModel2 = this.getView().getModel("ModeloPartidas");

                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/"+ rodada,
                    method : "GET",
                    async: true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_74d2efea7b1bc6ae7b08c79b89b087"
                    }
                };

                //fazendo chamada a API
                $.ajax(configuracoes)
                .done(function(resposta){
                    partidasModel2.setData(resposta);
                    debugger

                })
                .fail(function(erro){
                    debugger
                })
                ;
                
                }
            
        });
    });
