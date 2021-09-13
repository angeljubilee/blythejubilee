drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Items" (
	"itemId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"numInStock" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "Items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."Orders" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"transactionId" TEXT NOT NULL,
	"isCompleted" BOOLEAN NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "Orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."Variations" (
	"varId" serial NOT NULL,
	"type" TEXT NOT NULL,
	"value" TEXT NOT NULL,
	"itemId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "Variations_pk" PRIMARY KEY ("varId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."OrderItems" (
	"orderId" integer NOT NULL,
	"itemId" integer NOT NULL,
	"qty" integer NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Variations" ADD CONSTRAINT "Variations_fk0" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");

ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk0" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk1" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");
