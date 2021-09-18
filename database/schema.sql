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
	"password" TEXT,
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


CREATE TABLE "public.Items" (
	"itemId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"numInStock" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Orders" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"transactionId" TEXT NOT NULL,
	"isCompleted" BOOLEAN NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Variations" (
	"varId" serial NOT NULL,
	"type" serial NOT NULL,
	"value" serial NOT NULL,
	"itemId" serial NOT NULL,
	"createdAt" serial NOT NULL,
	CONSTRAINT "Variations_pk" PRIMARY KEY ("varId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."OrderItems" (
	"orderId" integer NOT NULL,
	"itemId" integer NOT NULL,
	"qty" integer NOT NULL,
	"varId1" integer NOT NULL,
	"varId2" integer NOT NULL,
	"varId3" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk1" FOREIGN KEY ("createdAt") REFERENCES "Items"("itemId");


ALTER TABLE "Variations" ADD CONSTRAINT "Variations_fk0" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");

ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk0" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk1" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk2" FOREIGN KEY ("varId1") REFERENCES "Variations"("varId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk3" FOREIGN KEY ("varId2") REFERENCES "Variations"("varId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk4" FOREIGN KEY ("varId3") REFERENCES "Variations"("varId");






ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Variations" ADD CONSTRAINT "Variations_fk0" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");

ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk0" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk1" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");
CREATE TABLE "public.Items" (
	"itemId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"numInStock" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Orders" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"transactionId" TEXT NOT NULL,
	"isCompleted" BOOLEAN NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Users" (
	"userId" serial NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Variations" (
	"varId" serial NOT NULL,
	"type" serial NOT NULL,
	"value" serial NOT NULL,
	"itemId" serial NOT NULL,
	"createdAt" serial NOT NULL,
	CONSTRAINT "Variations_pk" PRIMARY KEY ("varId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."OrderItems" (
	"orderId" integer NOT NULL,
	"itemId" integer NOT NULL,
	"qty" integer NOT NULL,
	"varId1" integer,
	"varId2" integer,
	"varId3" integer
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk1" FOREIGN KEY ("createdAt") REFERENCES "Items"("itemId");


ALTER TABLE "Variations" ADD CONSTRAINT "Variations_fk0" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");

ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk0" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk1" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk2" FOREIGN KEY ("varId1") REFERENCES "Variations"("varId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk3" FOREIGN KEY ("varId2") REFERENCES "Variations"("varId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_fk4" FOREIGN KEY ("varId3") REFERENCES "Variations"("varId");
