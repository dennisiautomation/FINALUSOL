<?php
class Router {
    private $db;
    private $routes = [];

    public function __construct(DatabaseService $db) {
        $this->db = $db;
    }

    public function addRoute($method, $path, $handler) {
        $this->routes[$method][$path] = $handler;
    }

    public function handleRequest($method, $path) {
        if (isset($this->routes[$method][$path])) {
            $handler = $this->routes[$method][$path];
            return $handler($this->db);
        }
        
        http_response_code(404);
        return ['error' => 'Route not found'];
    }
}