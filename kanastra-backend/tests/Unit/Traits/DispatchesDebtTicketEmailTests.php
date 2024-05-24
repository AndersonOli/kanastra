<?php

namespace Tests\Unit\Traits;

use App\Jobs\ProcessEmail;
use App\Mail\DebtTicket;
use App\Traits\DispatchesDebtTicketEmail;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class DispatchesDebtTicketEmailTests extends TestCase
{
    use DispatchesDebtTicketEmail;

    public function test_dispatch_debt_email()
    {
        Bus::fake();

        $email = 'example@example.com';
        $name = 'John Doe';
        $amount = 100;
        $dueDate = now();

        $this->dispatchDebtEmail($email, $name, $amount, $dueDate);

        Bus::assertDispatched(ProcessEmail::class, function ($job) use ($email, $name, $amount, $dueDate) {
            return $job->to === $email &&
                $job->mailable instanceof DebtTicket &&
                $job->mailable->name === $name &&
                $job->mailable->debtAmount == $amount &&
                $job->mailable->debtDueDate == $dueDate;
        });
    }
}
