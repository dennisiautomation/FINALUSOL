<?php
class Logger {
    private $logFile;
    
    public function __construct($logFile = null) {
        $this->logFile = $logFile ?? __DIR__ . '/../logs/install.log';
        $this->ensureLogDirectory();
    }
    
    private function ensureLogDirectory() {
        $dir = dirname($this->logFile);
        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }
    }
    
    public function log($message, $level = 'INFO') {
        $timestamp = date('Y-m-d H:i:s');
        $logMessage = "[$timestamp] [$level] $message\n";
        
        file_put_contents($this->logFile, $logMessage, FILE_APPEND);
        
        if (defined('DEBUG') && DEBUG) {
            error_log($logMessage);
        }
    }
    
    public function error($message) {
        $this->log($message, 'ERROR');
    }
    
    public function info($message) {
        $this->log($message, 'INFO');
    }
    
    public function debug($message) {
        if (defined('DEBUG') && DEBUG) {
            $this->log($message, 'DEBUG');
        }
    }
}