<?php
return [
    'GET' => function($db) {
        $stmt = $db->query("SELECT * FROM proposals");
        return $stmt->fetchAll();
    },
    
    'POST' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        try {
            $db->beginTransaction();
            
            // Insert proposal
            $proposalId = $db->insert('proposals', [
                'id' => uniqid(),
                'customer_id' => $data['customer_id'],
                'representative_id' => $data['representative_id'],
                'status' => $data['status'],
                'technical_data' => json_encode($data['technical_data']),
                'financial_data' => json_encode($data['financial_data']),
                'total_value' => $data['total_value'],
                'validity_days' => $data['validity_days'],
                'notes' => $data['notes'] ?? null
            ]);

            // Insert proposal items
            foreach ($data['items'] as $item) {
                $db->insert('proposal_items', [
                    'id' => uniqid(),
                    'proposal_id' => $proposalId,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price']
                ]);
            }

            $db->commit();
            return ['id' => $proposalId];
            
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
        }
    },
    
    'PUT' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'];
        
        try {
            $db->beginTransaction();
            
            // Update proposal
            $db->update('proposals', $id, [
                'status' => $data['status'],
                'technical_data' => json_encode($data['technical_data']),
                'financial_data' => json_encode($data['financial_data']),
                'total_value' => $data['total_value'],
                'validity_days' => $data['validity_days'],
                'notes' => $data['notes'] ?? null
            ]);

            // Update items if provided
            if (isset($data['items'])) {
                // Delete existing items
                $db->query("DELETE FROM proposal_items WHERE proposal_id = ?", [$id]);
                
                // Insert new items
                foreach ($data['items'] as $item) {
                    $db->insert('proposal_items', [
                        'id' => uniqid(),
                        'proposal_id' => $id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price']
                    ]);
                }
            }

            $db->commit();
            return ['success' => true];
            
        } catch (Exception $e) {
            $db->rollback();
            throw $e;
        }
    },
    
    'DELETE' => function($db) {
        $id = $_GET['id'];
        $db->delete('proposals', $id);
        return ['success' => true];
    }
];