-- CreateIndex
CREATE INDEX "index_contracts_on_blockchain_id" ON "contracts"("blockchainId");

-- CreateIndex
CREATE INDEX "index_orders_on_user_id" ON "orders"("userId");

-- CreateIndex
CREATE INDEX "index_transactions_on_transaction_id" ON "transactions"("contractId");
