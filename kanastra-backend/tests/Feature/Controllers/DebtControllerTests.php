<?php

namespace Tests\Feature\Controllers;

use App\Jobs\ProcessDebtCSVImport;
use App\Models\Debt;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DebtControllerTests extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_debts()
    {
        Debt::factory()->count(5)->create();

        $response = $this->get('/api/debt');

        $response->assertStatus(200)
            ->assertJson([
            ]);

        $response->assertStatus(200);
        $responseData = $response->json();
        $this->assertCount(5, $responseData['data']);
        $this->assertEquals(5, $responseData['total']);
    }

    public function test_can_show_a_debt()
    {
        $debt = Debt::factory()->create();

        $response = $this->get('/api/debt/' . $debt->id);

        $response->assertStatus(200)
            ->assertJson([
                'id' => $debt->id,
                'created_at' => $debt->created_at->toISOString(),
                'updated_at' => $debt->updated_at->toISOString(),
                'name' => $debt->name,
                'governmentId' => $debt->governmentId,
                'email' => $debt->email,
                'debtAmount' => $debt->debtAmount,
                'debtDueDate' => $debt->debtDueDate,
                'debtId' => $debt->debtId,
            ]);
    }

    public function test_can_create_a_debt_from_csv()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('debts.csv', 10);

        $response = $this->post('/api/debt', ['file' => $file]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'The file has been sent for processing successfully!']);

        Storage::disk('public')->assertExists('csv/' . $file->hashName());
    }

    public function test_can_create_a_debt_from_csv_and_should_call_the_job()
    {
        Bus::fake();
        Storage::fake('public');

        $file = UploadedFile::fake()->create('debts.csv', 10);

        $response = $this->post('/api/debt', ['file' => $file]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'The file has been sent for processing successfully!']);

        Storage::disk('public')->assertExists('csv/' . $file->hashName());
        Bus::assertDispatched(ProcessDebtCSVImport::class);
    }

    public function test_can_delete_a_debt()
    {
        $debt = Debt::factory()->create();

        $response = $this->delete('/api/debt/' . $debt->id);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Debt deleted successfully']);

        $this->assertDatabaseMissing('debts', ['id' => $debt->id]);
    }

    public function test_can_update_a_debt()
    {
        $debt = Debt::factory()->create();

        $data = [
            'name' => 'Updated Name',
            'governmentId' => '1234567890',
            'email' => 'updated@example.com',
            'debtAmount' => 1000,
            'debtDueDate' => '2024-05-31',
            'debtId' => '1adb6ccf-ff16-467f-bea7-5f05d494280f'
        ];

        $response = $this->post('/api/debt/' . $debt->id, $data);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Debt updated successfully']);

        $this->assertDatabaseHas('debts', $data);
    }
}
