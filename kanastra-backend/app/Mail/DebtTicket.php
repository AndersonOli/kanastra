<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DebtTicket extends Mailable
{
    use Queueable, SerializesModels;

    public string $name;
    public float $debtAmount;
    public string $debtDueDate;

    /**
     * Create a new message instance.
     */
    public function __construct($name, $debtAmount, $debtDueDate)
    {
        $this->name = $name;
        $this->debtAmount = $debtAmount;
        $this->debtDueDate = $debtDueDate;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Debt Ticket Report',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket.ticket-report',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
