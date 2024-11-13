<?php
require 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM transactions ORDER BY date DESC");
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($transactions);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to fetch transactions']);
}
?>
