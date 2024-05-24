<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket Debt Notice</title>
    </head>
    <body>
        <h1>Outstanding Ticket Debt Notice</h1>
        <p>Hi {{ $name }},</p>
        <p>We would like to inform you that you have an outstanding debt related to your ticket with the following details:</p>
        <p><strong>Debt Amount:</strong> ${{ $debtAmount }}</p>
        <p><strong>Due Date:</strong> {{ $debtDueDate }}</p>

        <p>Please make sure to settle this amount by the due date to avoid any penalties or further action.</p>
        <p>If you have any questions or need assistance, feel free to contact us at email@org.com</p>
        <p>Thank you for your prompt attention to this matter.</p>
    </body>
</html>
