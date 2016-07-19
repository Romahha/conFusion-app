'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

                this.getDishes = function(){
                    
                     return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});; 
                };

                this.getPromotion = function(index){
                    
                    return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});;
                };
          
        }])

        .service('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            
     
            // Implement two functions, one named getLeaders,
            this.getLeaders = function(){
 
                    return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});; 
                    
                            };
            // the other named getLeader(index)
            this.getLeader = function(index){
              
                    return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});; 
                    };

    
    
        }])

        .service ('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL){

               this.feedBack = function(){
 
                  
                  return  $resource(baseURL + "feedback", null,  {'update':{method:'PUT' }});;
                  
                   
                  

                
             };
        }])

;