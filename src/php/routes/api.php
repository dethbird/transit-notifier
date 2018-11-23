<?php
    $app->group('/api', function(){
        # trip info
        $this->get('/trip-info', function($request, $response, $args){
            $json = json_decode(file_get_contents(APPLICATION_PATH . 'public/trip-updates.json'));
            return $response
                ->withJson($json);
        });
    });
?>
