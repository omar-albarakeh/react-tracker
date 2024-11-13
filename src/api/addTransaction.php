<?php
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $type = $data['type'];
    $amount = $data['amount'];
    $date = $data['date'];
    $notes = $data['notes'];

    $stmt = $pdo->prepare("INSERT INTO transactions (type, amount, date, notes) VALUES (:type, :amount, :date, :notes)");
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':notes', $notes);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Transaction added']);
    } else {
        echo json_encode(['error' => 'Failed to add transaction']);
    }
}
?>
