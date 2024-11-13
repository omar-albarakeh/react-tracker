<?php
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $id = $data['id'];
    $type = $data['type'];
    $amount = $data['amount'];
    $date = $data['date'];
    $notes = $data['notes'];

    $stmt = $pdo->prepare("UPDATE transactions SET type = :type, amount = :amount, date = :date, notes = :notes WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':notes', $notes);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Transaction updated']);
    } else {
        echo json_encode(['error' => 'Failed to update transaction']);
    }
}
?>
