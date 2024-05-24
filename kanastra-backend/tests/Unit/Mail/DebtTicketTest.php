<?php

namespace Tests\Unit\Mail;

use Tests\TestCase;
use App\Mail\DebtTicket;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;

class DebtTicketTest extends TestCase
{
    /**
     * ProcessEmailTests the DebtTicket mailable properties.
     */
    public function test_debt_ticket_properties()
    {
        $name = 'John Doe';
        $debtAmount = 1500.75;
        $debtDueDate = '2023-06-15';

        $debtTicket = new DebtTicket($name, $debtAmount, $debtDueDate);

        $this->assertEquals($name, $debtTicket->name);
        $this->assertEquals($debtAmount, $debtTicket->debtAmount);
        $this->assertEquals($debtDueDate, $debtTicket->debtDueDate);
    }

    /**
     * ProcessEmailTests the DebtTicket mailable envelope.
     */
    public function test_debt_ticket_envelope()
    {
        $debtTicket = new DebtTicket('John Doe', 1500.75, '2023-06-15');

        $envelope = $debtTicket->envelope();

        $this->assertInstanceOf(Envelope::class, $envelope);
        $this->assertEquals('Debt Ticket Report', $envelope->subject);
    }

    /**
     * ProcessEmailTests the DebtTicket mailable content.
     */
    public function test_debt_ticket_content()
    {
        $debtTicket = new DebtTicket('John Doe', 1500.75, '2023-06-15');

        $content = $debtTicket->content();

        $this->assertInstanceOf(Content::class, $content);
        $this->assertEquals('emails.ticket.ticket-report', $content->view);
    }

    /**
     * ProcessEmailTests the DebtTicket mailable has no attachments.
     */
    public function test_debt_ticket_attachments()
    {
        $debtTicket = new DebtTicket('John Doe', 1500.75, '2023-06-15');

        $attachments = $debtTicket->attachments();

        $this->assertIsArray($attachments);
        $this->assertEmpty($attachments);
    }
}
