<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
session_cache_limiter(false);
session_start();

set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . 'src/php/',
    get_include_path(),
)));


require '../vendor/autoload.php';
require_once APPLICATION_PATH . 'src/php/Middleware/RequestBodyValidation.php';
require_once APPLICATION_PATH . 'src/php/Validation/Validator.php';
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Guzzle\Http\Client;

$app = new \Slim\App([
    'settings' => [
        'determineRouteBeforeAppMiddleware' => true,
        'displayErrorDetails' => true
    ]
]);
$container = $app->getContainer();

# container view
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(APPLICATION_PATH . 'src/views', [
        'cache' => false
    ]);

    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));

    return $view;
};

$container['notFoundHandler'] = function ($c) {
  return function ($request, $response) use ($c) {
      $_SESSION['lastRequestUri'] = $_SERVER['REQUEST_URI'];
      return $c['response']
          ->withStatus(302)
          ->withHeader('Location', '/');
  };
};

ActiveRecord\Config::initialize(function($cfg)
{
    $cfg->set_model_directory(APPLICATION_PATH . 'src/php/Models');
    $cfg->set_connections(
        [
            'development' => 'sqlite://../database/transit.db'
        ]
    );
});

require_once APPLICATION_PATH . 'src/php/routes/api.php';

# index
$app->get('/', function ($request, $response){
    $view = $this['view'];
    $templateVars = [
        'lastRequestUri' => isset($_SESSION['lastRequestUri']) ? $_SESSION['lastRequestUri'] : null
    ];
    return $this['view']->render(
        $response,
        'layout.html.twig',
        $templateVars
    );

});
$app->run();
