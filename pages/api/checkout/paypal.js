import paypal from "paypal-rest-sdk";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

paypal.configure({
  mode: "sandbox", // or "live" when you go live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { productId, buyerEmail } = req.body;

    // Fetch product
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error || !product) return res.status(404).json({ error: "Product not found" });

    // Build PayPal payment object
    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: product.title,
                sku: product.id,
                price: product.price.toString(),
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: { currency: "USD", total: product.price.toString() },
          description: product.description || `Purchase of ${product.title}`,
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error });
      }

      // Record pending order
      await supabase.from("orders").insert({
        product_id: productId,
        buyer_email: buyerEmail,
        amount: product.price,
        payment_status: "pending",
        payment_provider: "paypal",
      });

      // Return approval URL
      const approvalUrl = payment.links.find((l) => l.rel === "approval_url").href;
      res.status(200).json({ url: approvalUrl });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PayPal checkout failed" });
  }
}