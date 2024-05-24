<?php

namespace Tests\Unit\Jobs;

use App\Jobs\ProcessEmail;
use App\Mail\DebtTicket;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ProcessEmailTests extends TestCase
{
    public function test_process_email_should_send_with_success()
    {
        Mail::fake();

        $to = 'email@org.com';
        $name = 'John Doe';
        $debtAmount = 100;
        $debtDueDate = '2020-01-01';

        $mailable = new DebtTicket($name, $debtAmount, $debtDueDate);

        $processEmailJob = new ProcessEmail($to, $mailable);

        $processEmailJob->handle();

        Mail::assertSent(DebtTicket::class);
    }

    public function test_process_email_should_send_with_correctly_data()
    {
        Mail::fake();

        $to = 'email@org.com';
        $name = 'John Doe';
        $debtAmount = 100;
        $debtDueDate = '2020-01-01';

        $mailable = new DebtTicket($name, $debtAmount, $debtDueDate);

        $processEmailJob = new ProcessEmail($to, $mailable);

        $processEmailJob->handle();

        Mail::assertSent(DebtTicket::class, function ($mail) use ($to, $mailable) {
            $mail->assertTo($to);
            return true;
        });
    }
}
