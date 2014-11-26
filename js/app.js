
var app = angular.module('AcheFacil',['ngRoute']).config(
	function($routeProvider) {

	/*Rotas*/		
    $routeProvider
    .when("/servicos/:id_cat",{
        templateUrl:"templates/servicos.html",
        controller:"Servicos"
    });  
    $routeProvider
    .when("/empresa/:id",{
        templateUrl:"templates/empresa.html",
        controller:"Empresa"
    });
    $routeProvider
    .when("/agenda/",{
        templateUrl:"templates/agenda.html",
        controller:"Agenda"
    }).otherwise({
    	redirectTo: '/agenda'
    });

//fastclick
}).run(function () {
    FastClick.attach(document.body);
});



//controller de Serviços
app.controller('Servicos', function($scope, $filter, $routeParams, Servicos){

      $scope.servicos = {};
      purl = $routeParams.id_cat;
        Servicos.getServicos(function(data) {
          $scope.servicos = data;
          debugger;
          alert(data[0]);
          var cat = data.id_cat;
          var param = parseInt($routeParams['id_cat'], 10);
          $scope.servicos = param;
          

         

        }); 

/*    
    $scope.servicos = {};
     
        Servicos.getServicos(function(data) {
           $scope.servicos = data;
        }); 
*/

      /*
        var myfilter = $filter;
         Servicos.getServicos(function(data) {
                   $scope.servicos = myfilter('filter')(data,{
                      id_cat:$routeParams.id_cat

                   })[0];
             });  

        */

    

});
//controller de empresa
app.controller('Empresa', function($scope,$filter ,$routeParams,$window, Servicos){

   var myfilter = $filter;
   Servicos.getServicos(function(data) {
             $scope.empresa = myfilter('filter')(data,{
                id:$routeParams.id
             })[0];
         
     });

   $scope.backApp = function () {
       $window.history.back();
   }
    
});
//controller de categorias
app.controller('Agenda', function($scope, $routeParams, Agenda){

    $scope.agenda = {};
    Agenda.getAgenda(function(data) {
        
        $scope.agenda = data;

    })
});

app.factory('Agenda', function($http) {
    var agendaList;
    var obj = {};

    obj = {
        getAgenda: function(callback) {
            //se já tiver os dados retornar
            if (agendaList) {
                callback(agendaList);
                return false;
            } else {
                
                $http({
                    method: 'GET',
                    url: 'data/categorias.json'
                }).success(function(data) {
                    // erros
                    obj.saveAgenda(data);
                    callback(data);

                }).
                error(function() {
                    //error
                });
            }
        },
        saveAgenda: function(data) {
            agendaList = data;
        }
    }

    return obj;

})

//SERVICOS
app.factory('Servicos', function($http) {
    var servicosList;
    var obj = {};

    obj = {
        getServicos: function(callback) {


           if(servicosList){

            callback(servicosList);
            return false;

           }else{

                $http({
                        method:'GET',
                        url:'data/servicos.json'

                }).success(function(data){
                       obj.saveServicos(data);
                       callback(data); 
                }).error(function () {
                    // error
                });

           }
        },

        saveServicos: function(data) {
            servicosList = data;
        }

    }


  return obj;

})
    
