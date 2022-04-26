-- CreateTable
CREATE TABLE "blockchains" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100),
    "status" INTEGER,
    "rpcProvider" TEXT,
    "wsProvider" TEXT,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" BIGSERIAL NOT NULL,
    "address" VARCHAR(255) NOT NULL DEFAULT E'',
    "blockchainId" BIGINT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "abi" JSONB NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "listenEvents" BOOLEAN NOT NULL DEFAULT false,
    "initialBlockNumber" INTEGER NOT NULL DEFAULT 0,
    "lastBlockNumber" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "source" TEXT,
    "campaignId" TEXT,
    "sub" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "transactionHash" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "status" INTEGER NOT NULL,
    "walletAddress" VARCHAR(50),
    "nonce" VARCHAR(50),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "lastSignAt" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" BIGSERIAL NOT NULL,
    "contractId" BIGINT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" BIGINT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "datetime" TIMESTAMP(6) NOT NULL,
    "input" TEXT,
    "decodedInput" JSONB,
    "txNameFromInput" TEXT,
    "from" TEXT,
    "to" TEXT,
    "status" BOOLEAN DEFAULT false,
    "value" BIGINT NOT NULL DEFAULT 0,
    "gas" BIGINT NOT NULL,
    "cumulativeGasUsed" BIGINT NOT NULL DEFAULT 0,
    "gasPrice" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts" (
    "id" BIGSERIAL NOT NULL,
    "nft_metadata_id" BIGINT,
    "sale_info" JSONB,
    "status" INTEGER,
    "show" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "owner_wallet_address" VARCHAR(50),
    "token_id" TEXT NOT NULL,
    "is_on_marketplace" BOOLEAN NOT NULL DEFAULT false,
    "last_sale" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_metadata" (
    "id" BIGSERIAL NOT NULL,
    "metadata" JSONB,
    "token_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estates" (
    "id" BIGSERIAL NOT NULL,
    "nft_id" BIGINT,
    "type" INTEGER NOT NULL,
    "token_address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "seller" TEXT NOT NULL,
    "buyer" TEXT,
    "seller_signature" TEXT NOT NULL,
    "buyer_signature" TEXT,
    "tx" VARCHAR(100),
    "status" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "closed_at" TIMESTAMP(6),
    "expire_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.walletAddress_unique" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "transactions.transactionHash_unique" ON "transactions"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "nfts.token_id_unique" ON "nfts"("token_id");

-- CreateIndex
CREATE INDEX "index_nfts_on_nft_metadata_id" ON "nfts"("nft_metadata_id");

-- CreateIndex
CREATE UNIQUE INDEX "nft_metadata.token_id_unique" ON "nft_metadata"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "estates.tx_unique" ON "estates"("tx");

-- CreateIndex
CREATE INDEX "index_sales_on_nft_id" ON "estates"("nft_id");

-- CreateIndex
CREATE INDEX "index_sales_on_closed_at" ON "estates"("closed_at");

-- CreateIndex
CREATE INDEX "index_sales_on_status" ON "estates"("status");

-- AddForeignKey
ALTER TABLE "contracts" ADD FOREIGN KEY ("blockchainId") REFERENCES "blockchains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts" ADD FOREIGN KEY ("nft_metadata_id") REFERENCES "nft_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estates" ADD FOREIGN KEY ("nft_id") REFERENCES "nfts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
