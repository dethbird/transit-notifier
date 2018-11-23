<?php
    $app->group('/api', function(){
        # trip info
        $this->get('/trip-info', function($request, $response, $args){
            $json = json_decode(file_get_contents(APPLICATION_PATH . 'public/trip-updates.json'));
            return $response
                ->withJson($json);
        });
        $this->get('/settings', function($request, $response, $args){
            $database = $this['database'];
            $data = $database->select("app_settings", '*', [
              "id" => 1
            ]);
            return $response
                ->withJson($data[0]);
        });
    });
?>
