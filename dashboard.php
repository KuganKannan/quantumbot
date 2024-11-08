<?php
// Start session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.html"); // Redirect to login page if not logged in
    exit();
}

echo "Welcome to your dashboard, " . $_SESSION['username'] . "!";
?>
