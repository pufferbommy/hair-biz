import { prisma } from "@/db";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) return new Response("Unauthorized", { status: 401 });

  const shops = await prisma.shop.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return Response.json({
    shops,
  });
}
