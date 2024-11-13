<?php
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $id = $data['id'];

    $stmt = $pdo->prepare("DELETE FROM transactions WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Transaction deleted']);
    } else {
        echo json_encode(['error' => 'Failed to delete transaction']);
    }
}
?>
