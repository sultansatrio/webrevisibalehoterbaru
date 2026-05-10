import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, username, fullname, email, amount } = await request.json();
  if (!process.env.SECRET || !process.env.NEXT_PUBLIC_CLIENT) {
    return NextResponse.json(
      { error: "Midtrans credentials are not configured." },
      { status: 500 }
    );
  }

  const grossAmount = Number(amount);
  if (!id || !email || Number.isNaN(grossAmount)) {
    return NextResponse.json(
      { error: "Invalid payment payload." },
      { status: 400 }
    );
  }

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
  });

  let parameter = {
    transaction_details: {
      order_id: id,
      gross_amount: grossAmount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      user_name: username,
      fullname: fullname,
      email: email,
    },
  };

  const token = await snap.createTransaction(parameter).then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    return transactionToken;
  });

  console.log(token);
  return NextResponse.json({ token });
}
