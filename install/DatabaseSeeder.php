<?php
class DatabaseSeeder {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function seed() {
        $this->seedProducts();
        $this->seedCustomers();
    }

    private function seedProducts() {
        $products = [
            // Painéis Solares
            [
                'type' => 'solar_panel',
                'model' => 'TSM-550DE19',
                'manufacturer' => 'TRINA',
                'description' => 'MÓDULO FOTOVOLTAICO TRINA 550W MONO VERTEX S+ DE19',
                'price' => 980.00,
                'warranty' => 25,
                'specifications' => json_encode([
                    'nominalPower' => 550,
                    'efficiency' => 21.5,
                    'dimensions' => ['width' => 1.096, 'height' => 2.172],
                    'weight' => 27.5,
                    'area' => 2.38
                ])
            ],
            // Inversores
            [
                'type' => 'inverter',
                'model' => 'MIN 5000TL-X',
                'manufacturer' => 'Growatt',
                'description' => 'Inversor Growatt 5kW',
                'price' => 4500.00,
                'warranty' => 10,
                'specifications' => json_encode([
                    'maxCapacity' => 5,
                    'efficiency' => 98.4,
                    'voltageCompatibility' => ['220', '380'],
                    'monitoring' => ['wifi', 'app']
                ])
            ],
            // Estruturas
            [
                'type' => 'structure',
                'model' => 'RS-01',
                'manufacturer' => 'Romagnole',
                'description' => 'Estrutura para telhado cerâmico',
                'price' => 450.00,
                'warranty' => 12,
                'specifications' => json_encode([
                    'type' => 'roof',
                    'material' => 'aluminum',
                    'maxWeight' => 300,
                    'compatibility' => ['roof' => ['ceramic', 'fiber_cement']]
                ])
            ]
        ];

        $stmt = $this->pdo->prepare("
            INSERT INTO products (id, type, model, manufacturer, description, price, warranty, specifications, created_by)
            VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        foreach ($products as $product) {
            $stmt->execute([
                $product['type'],
                $product['model'],
                $product['manufacturer'],
                $product['description'],
                $product['price'],
                $product['warranty'],
                $product['specifications'],
                1 // ID do admin
            ]);
        }
    }

    private function seedCustomers() {
        $customers = [
            [
                'name' => 'João Silva',
                'document_type' => 'cpf',
                'document' => '123.456.789-00',
                'email' => 'joao.silva@email.com',
                'phone' => '(11) 98765-4321',
                'address_street' => 'Rua das Flores',
                'address_number' => '123',
                'address_neighborhood' => 'Centro',
                'address_city' => 'São Paulo',
                'address_state' => 'SP',
                'address_zipcode' => '01234-567',
                'consumption_average' => 450.00,
                'tariff_type' => 'residential',
                'power_company' => 'enel',
                'voltage' => '220'
            ],
            [
                'name' => 'Supermercado Bom Preço',
                'document_type' => 'cnpj',
                'document' => '12.345.678/0001-90',
                'email' => 'contato@bompreco.com',
                'phone' => '(11) 3333-4444',
                'address_street' => 'Avenida Comercial',
                'address_number' => '1000',
                'address_neighborhood' => 'Centro',
                'address_city' => 'São Paulo',
                'address_state' => 'SP',
                'address_zipcode' => '04444-000',
                'consumption_average' => 3500.00,
                'tariff_type' => 'commercial',
                'power_company' => 'enel',
                'voltage' => '380'
            ]
        ];

        $stmt = $this->pdo->prepare("
            INSERT INTO customers (
                id, representative_id, name, document_type, document, email, phone,
                address_street, address_number, address_neighborhood, address_city,
                address_state, address_zipcode, consumption_average, tariff_type,
                power_company, voltage
            )
            VALUES (
                UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        ");

        foreach ($customers as $customer) {
            $stmt->execute([
                1, // ID do representante
                $customer['name'],
                $customer['document_type'],
                $customer['document'],
                $customer['email'],
                $customer['phone'],
                $customer['address_street'],
                $customer['address_number'],
                $customer['address_neighborhood'],
                $customer['address_city'],
                $customer['address_state'],
                $customer['address_zipcode'],
                $customer['consumption_average'],
                $customer['tariff_type'],
                $customer['power_company'],
                $customer['voltage']
            ]);
        }
    }
}