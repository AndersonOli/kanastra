<?php

namespace App\Traits;

use App\Jobs\ProcessEmail;
use App\Mail\DebtTicket;

trait DispatchesDebtTicketEmail
{
    public function dispatchDebtEmail($email, $name, $amount, $dueDate): void
    {
        $reportDebtEmail = new DebtTicket($name, $amount, $dueDate);

        dispatch(new ProcessEmail($email, $reportDebtEmail));
    }
}
