import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Tarih parametresi zorunludur" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("time_slot")
    .eq("date", date)
    .in("status", ["pending", "approved"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const bookedSlots = data.map((item) => item.time_slot);
  return NextResponse.json({ bookedSlots });
}