-- Enable required extensions
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL,
  `role` enum('admin', 'representative') NOT NULL,
  `region` varchar(255),
  `active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Customers table
CREATE TABLE IF NOT EXISTS `customers` (
  `id` varchar(36) NOT NULL,
  `representative_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `document_type` enum('cpf', 'cnpj') NOT NULL,
  `document` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` json NOT NULL,
  `consumption_info` json NOT NULL,
  `installation_info` json NOT NULL,
  `generation_type` enum('individual', 'shared', 'remote') NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`representative_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products table
CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(36) NOT NULL,
  `type` varchar(50) NOT NULL,
  `model` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `warranty` int NOT NULL,
  `specifications` json NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(36),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Proposals table
CREATE TABLE IF NOT EXISTS `proposals` (
  `id` varchar(36) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `representative_id` varchar(36) NOT NULL,
  `status` enum('draft', 'sent', 'pending_financing', 'accepted', 'completed', 'rejected') NOT NULL,
  `technical_data` json NOT NULL,
  `financial_data` json NOT NULL,
  `total_value` decimal(10,2) NOT NULL,
  `validity_days` int NOT NULL DEFAULT 30,
  `notes` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`representative_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Proposal items table
CREATE TABLE IF NOT EXISTS `proposal_items` (
  `id` varchar(36) NOT NULL,
  `proposal_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int NOT NULL CHECK (`quantity` > 0),
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`proposal_id`) REFERENCES `proposals` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes
CREATE INDEX `idx_customers_representative` ON `customers` (`representative_id`);
CREATE INDEX `idx_proposals_customer` ON `proposals` (`customer_id`);
CREATE INDEX `idx_proposals_representative` ON `proposals` (`representative_id`);
CREATE INDEX `idx_proposal_items_proposal` ON `proposal_items` (`proposal_id`);
CREATE INDEX `idx_products_type` ON `products` (`type`);

SET FOREIGN_KEY_CHECKS = 1;