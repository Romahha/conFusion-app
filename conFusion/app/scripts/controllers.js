'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory',  function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
                           

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
                $scope.sendFeedback = function() {
                

                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;                   

                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.feedBack().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    
                }
                
            };




        }])

        .controller('DishDetailController', ['$scope','$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
                    $scope.dish = {};
                    $scope.showDish = false;
                    $scope.message="Loading ...";
                    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            var commentdish =  {rating:"", comment:"", author:"", date:""};
             $scope.commentdish = commentdish;

            var ratings =      [{value: 1, label: "1",},
                                {value: 2, label: "2",},
                                {value: 3, label: "3",},
                                {value: 4, label: "4",},
                                {value: 5, label: "5"}];

            $scope.ratings = ratings;


                                        
            $scope.submitComment = function () {
                console.log($scope.commentdish);
                //Step 2: This is how you record the date
                commentdish.date= new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push(commentdish);
                console.log($scope.commentdish);
                
                //Step 4: reset your form to pristine
                var divForShowInrealLife= document.getElementById("divForShowInrealLife");
                divForShowInrealLife.remove();
                document.getElementById("myform").reset();

                //Step 5: reset your JavaScript object that holds your comment
            }

            

        }])
      // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',
            function($scope, menuFactory, corporateFactory) {


                        $scope.dish = {};
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

                        $scope.promotions = {};
                        $scope.showPromotions = false;

                        $scope.promotions = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.promotions = response;
                                $scope.showPromotions = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

                        $scope.leadership = {};
                        $scope.showLeadership = false;

                        $scope.leadership = corporateFactory.getLeader().get({id:3})
                        .$promise.then(
                            function(response){
                                $scope.leadership = response;
                                $scope.showLeadership = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );



        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

                        $scope.leadership = {};
                        $scope.showLeadership = false;
                        $scope.leadership= corporateFactory.getLeaders().query(
                        
                                function(response) {
                                    $scope.leadership = response;
                                    $scope.showLeadership = true;
                                },
                                function(response) {
                                    $scope.message = "Error: "+response.status + " " + response.statusText;
                                });                   
                           

            
        }])
;    
    

