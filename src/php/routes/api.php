<?php
    $app->group('/api', function(){
        # trip info
        $this->get('/trip-info', function($request, $response, $args){
            $json = json_decode(file_get_contents(APPLICATION_PATH . 'public/trip-updates.json'));
            return $response
                ->withJson($json);
        });
        $this->get('/settings', function($request, $response, $args){
            $appSettings = AppSettings::find_by_id(1);
            return $response
                ->withJson($appSettings->to_array());
        });
        $this->put('/settings', function($request, $response, $args){
            $params = $request->getParsedBody();
            $appSettings = AppSettings::find_by_id(1);
            $appSettings->update_attributes($params);
            return $response
                ->withJson($appSettings->to_array());
        })
        ->add( new RequestBodyValidation(
            APPLICATION_PATH . 'src/schema/validation/settings-put.json'));
    });
?>
